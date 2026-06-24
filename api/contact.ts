import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Contact endpoint for "Send a message".
 *
 * The destination address is never shipped to the browser — it lives only in
 * the CONTACT_TO_EMAIL server env var. Spam is filtered in layers, in the order
 * recommended for 2026: honeypot → server-side screening → CAPTCHA (Turnstile),
 * plus a timing trap and a best-effort per-IP rate limit. Client-side checks are
 * treated as noise filtering only; everything that matters is re-checked here.
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      — Resend API key (https://resend.com, free tier)
 *   CONTACT_TO_EMAIL    — where messages are delivered (e.g. your inbox)
 *   TURNSTILE_SECRET_KEY— Cloudflare Turnstile secret key
 * Optional:
 *   CONTACT_FROM        — verified sender; defaults to Resend's onboarding sender
 */

const MIN_FILL_MS = 3000 // humans take longer than this to fill the form
const MAX_NAME = 120
const MAX_EMAIL = 200
const MAX_MESSAGE = 5000
const RATE_MAX = 5 // submissions per IP
const RATE_WINDOW_MS = 10 * 60 * 1000 // per 10 minutes

// Best-effort in-memory limiter. Serverless instances are ephemeral, so this is
// a speed bump, not a guarantee — Turnstile is the real gate.
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_MAX
}

function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0]!.trim()
  if (Array.isArray(fwd) && fwd.length) return fwd[0]!
  const real = req.headers['x-real-ip']
  return (typeof real === 'string' && real) || 'unknown'
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false
  const body = new URLSearchParams({ secret, response: token })
  if (ip && ip !== 'unknown') body.set('remoteip', ip)
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    })
    const data = (await r.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) ?? {}
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()
  const honeypot = String(body.company ?? '').trim() // hidden field; bots fill it
  const startedAt = Number(body.startedAt)
  const token = String(body.turnstileToken ?? '')

  // 1) Honeypot — pretend success so bots don't learn they were caught.
  if (honeypot) return res.status(200).json({ ok: true })

  // 2) Timing trap — instant submits are bots. Silent success, same reason.
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return res.status(200).json({ ok: true })
  }

  // 3) Server-side validation — the real trust boundary.
  if (!name || name.length > MAX_NAME) return res.status(400).json({ ok: false, error: 'Please enter your name.' })
  if (!email || email.length > MAX_EMAIL || !isEmail(email))
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
  if (!message || message.length < 2 || message.length > MAX_MESSAGE)
    return res.status(400).json({ ok: false, error: 'Please enter a message.' })

  const ip = clientIp(req)

  // 4) Rate limit.
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'Too many messages — please try again later.' })

  // 5) Turnstile (CAPTCHA) — verified server-side.
  if (!token || !(await verifyTurnstile(token, ip)))
    return res.status(400).json({ ok: false, error: 'Verification failed — please try again.' })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM || "Amelia's Flight <onboarding@resend.dev>"
  if (!apiKey || !to) {
    console.error('contact: missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return res.status(500).json({ ok: false, error: 'The form is not configured yet.' })
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New message from ${name} — Amelia's Flight`,
        text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
      }),
    })
    if (!r.ok) {
      console.error('contact: resend error', r.status, await r.text())
      return res.status(502).json({ ok: false, error: 'Could not send your message — please try again.' })
    }
  } catch (err) {
    console.error('contact: send failed', err)
    return res.status(502).json({ ok: false, error: 'Could not send your message — please try again.' })
  }

  return res.status(200).json({ ok: true })
}

function safeParse(s: string): Record<string, unknown> | null {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}
