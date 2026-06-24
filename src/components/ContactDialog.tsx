import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }
const ACCENT = '#B23A33'

// Cloudflare's "always passes" test key — lets the form work in local dev before
// the real VITE_TURNSTILE_SITE_KEY is set. Replaced by the env var in production.
const TURNSTILE_TEST_KEY = '1x00000000000000000000AA'
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || TURNSTILE_TEST_KEY

let turnstileScript: Promise<void> | null = null
function loadTurnstile(): Promise<void> {
  if (turnstileScript) return turnstileScript
  turnstileScript = new Promise<void>((resolve, reject) => {
    if (window.turnstile) return resolve()
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('turnstile failed to load'))
    document.head.appendChild(s)
  })
  return turnstileScript
}

const reducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const startedAt = useRef(0)
  const token = useRef('')
  const widgetId = useRef<string | null>(null)
  const captchaRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  // Open / close lifecycle: stamp the start time, lock scroll, wire Esc + focus.
  useEffect(() => {
    if (!open) return
    startedAt.current = Date.now()
    setStatus('idle')
    setError('')
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') trapFocus(e, dialogRef.current)
    }
    document.addEventListener('keydown', onKey)
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 30)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(focusTimer)
    }
  }, [open, onClose])

  // Render the Turnstile widget when the dialog opens.
  useEffect(() => {
    if (!open) return
    let cancelled = false
    loadTurnstile()
      .then(() => {
        if (cancelled || !captchaRef.current || !window.turnstile) return
        if (widgetId.current) return
        widgetId.current = window.turnstile.render(captchaRef.current, {
          sitekey: SITE_KEY,
          theme: 'light',
          callback: (t) => {
            token.current = t
          },
          'expired-callback': () => {
            token.current = ''
          },
          'error-callback': () => {
            token.current = ''
          },
        })
      })
      .catch(() => {
        /* widget optional in dev; server still enforces */
      })
    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current)
        } catch {
          /* noop */
        }
        widgetId.current = null
        token.current = ''
      }
    }
  }, [open])

  if (!open) return null

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError('')

    // Honeypot lives in the form data below as `company`.
    const form = e.target as HTMLFormElement
    const honeypot = (form.elements.namedItem('company') as HTMLInputElement | null)?.value ?? ''

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          company: honeypot,
          startedAt: startedAt.current,
          turnstileToken: token.current,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok && data.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
        setError(data.error || 'Something went wrong — please try again.')
        if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current)
        token.current = ''
      }
    } catch {
      setStatus('error')
      setError('Network error — please try again.')
    }
  }

  const animate = !reducedMotion()

  return (
    <div
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(28,27,24,0.42)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(16px,6vh,80px) 18px',
        overflowY: 'auto',
        animation: animate ? 'afFade 160ms ease-out' : undefined,
      }}
    >
      <style>{'@keyframes afFade{from{opacity:0}to{opacity:1}}'}</style>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        style={{
          width: '100%',
          maxWidth: 480,
          background: '#F6F4EF',
          border: '1px solid rgba(28,27,24,0.12)',
          borderRadius: 8,
          boxShadow: '0 24px 60px -12px rgba(28,27,24,0.35)',
          padding: 'clamp(24px,4vw,34px)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <div style={{ ...mono, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>
              Get in touch
            </div>
            <h2 id="contact-title" style={{ ...serif, fontWeight: 400, fontSize: 'clamp(26px,4vw,34px)', lineHeight: 1.05, margin: 0 }}>
              Send a message
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              appearance: 'none',
              border: 0,
              background: 'none',
              cursor: 'pointer',
              fontSize: 22,
              lineHeight: 1,
              color: '#756f64',
              padding: 4,
              marginTop: 2,
            }}
          >
            ×
          </button>
        </div>

        {status === 'sent' ? (
          <div style={{ marginTop: 22 }}>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#3a372f', margin: '0 0 20px' }}>
              Thank you — your message is on its way. I’ll reply to the address you gave.
            </p>
            <button onClick={onClose} style={primaryBtn}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }} noValidate>
            <Field label="Name">
              <input
                ref={firstFieldRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={120}
                autoComplete="name"
                style={inputStyle}
              />
            </Field>
            <Field label="Your email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={200}
                autoComplete="email"
                style={inputStyle}
              />
            </Field>
            <Field label="Message">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={5000}
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
              />
            </Field>

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div ref={captchaRef} style={{ minHeight: 4 }} />

            {status === 'error' && (
              <div style={{ ...mono, fontSize: 12, color: ACCENT, lineHeight: 1.5 }}>{error}</div>
            )}

            <button type="submit" disabled={status === 'sending'} style={{ ...primaryBtn, opacity: status === 'sending' ? 0.6 : 1 }}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            <p style={{ ...mono, fontSize: 10.5, lineHeight: 1.6, color: '#9a9486', margin: 0 }}>
              Your message goes straight to my inbox. Protected by Cloudflare Turnstile.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...mono, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#756f64' }}>{label}</span>
      {children}
    </label>
  )
}

const inputStyle: CSSProperties = {
  font: 'inherit',
  fontSize: 15,
  fontFamily: "'IBM Plex Sans',system-ui,sans-serif",
  color: '#1c1b18',
  background: '#fff',
  border: '1px solid rgba(28,27,24,0.18)',
  borderRadius: 5,
  padding: '10px 12px',
  width: '100%',
  boxSizing: 'border-box',
}

const primaryBtn: CSSProperties = {
  appearance: 'none',
  cursor: 'pointer',
  font: 'inherit',
  fontFamily: "'IBM Plex Mono',monospace",
  fontSize: 12,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#fff',
  background: ACCENT,
  border: `1px solid ${ACCENT}`,
  borderRadius: 999,
  padding: '12px 22px',
  alignSelf: 'flex-start',
}

/** Keep Tab focus inside the dialog. */
function trapFocus(e: KeyboardEvent, container: HTMLElement | null) {
  if (!container) return
  const focusables = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
  )
  if (!focusables.length) return
  const first = focusables[0]!
  const last = focusables[focusables.length - 1]!
  const active = document.activeElement
  if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}
