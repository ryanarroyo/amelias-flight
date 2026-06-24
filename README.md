# Amelia's Flight

A tribute website visualizing Amelia Earhart's 1937 around-the-world flight as a scroll-driven
story on a rotating globe. Implemented from the approved [claude.ai/design](https://claude.ai/design)
handoff, in the stack chosen during planning (see [`CONTEXT.md`](./CONTEXT.md) and
[`docs/adr/`](./docs/adr)).

## Stack

- **Vite + React 18 + TypeScript**
- **d3-geo** orthographic globe rendered to `<canvas>`
- **world-atlas** TopoJSON, bundled locally — no map tiles, no API keys, no runtime fetch
  (see [ADR-0001](./docs/adr/0001-self-contained-d3-globe-no-tiles.md))

## Pages

1. **The Flight** — scrollytelling: a sticky globe rotates and draws the route leg-by-leg as you
   scroll, with running stats, a live leg readout, and the Lae → Howland "Vanishing" climax
   (dashed final leg, fading plane, unreached Howland, frozen stats, last transmission).
2. **The Electra** — a Lockheed Model 10-E schematic page with a **Plan / Blueprint / Perspective**
   toggle, performance gauges, a specifications table, and notable-facts column.
3. **Theories** — a text page summarizing the major disappearance hypotheses.

## Develop

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
```

## Contact form

The footer's **"Send a message"** opens an in-theme dialog that posts to the Vercel
serverless function in [`api/contact.ts`](./api/contact.ts), which emails you via
[Resend](https://resend.com). Your address is never shipped to the browser — it lives only
in the `CONTACT_TO_EMAIL` server env var. Spam is filtered in layers: honeypot field, a
sub-3s timing trap, **Cloudflare Turnstile** (verified server-side), server-side validation,
and a best-effort per-IP rate limit.

Set these in **Vercel → Project → Settings → Environment Variables** (and in `.env.local`
for local `vercel dev`). See [`.env.example`](./.env.example):

| Variable | Where | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | server | Resend API key (free tier: 3,000 emails/mo) |
| `CONTACT_TO_EMAIL` | server | Inbox that receives messages |
| `TURNSTILE_SECRET_KEY` | server | Cloudflare Turnstile secret key |
| `VITE_TURNSTILE_SITE_KEY` | client | Turnstile site key (public); falls back to Cloudflare's test key in dev |
| `CONTACT_FROM` | server | Optional. Defaults to Resend's onboarding sender |

The `/api` function runs on Vercel; `npm run preview` serves only static files, so use
`vercel dev` to exercise the endpoint locally.

## Project layout

```
src/
├── App.tsx                 # view state + nav
├── components/
│   ├── Nav.tsx
│   ├── FlightPage.tsx      # sticky globe stage + scroll narrative
│   ├── StepCard.tsx        # one scroll step (leg / chapter / hero)
│   ├── ElectraPage.tsx     # schematic toggle + specs
│   └── TheoriesPage.tsx
├── lib/
│   ├── GlobeEngine.ts      # canvas globe + scroll sequencing engine
│   ├── cards.ts            # chapter / hero / image-slot card data
│   ├── electraSvgs.ts      # verbatim Plan/Blueprint/Perspective SVGs
│   └── electraStatic.ts    # verbatim Electra header/body markup
└── data/
    └── amelia.ts           # the 30-leg flight log + theory summaries
```

## Data & credits

Flight log compiled from TIGHAR; coordinates great-circle-verified. Maps: Natural Earth via
Wikimedia Commons. Archival photo slots are stubbed as placeholders pending public-domain sourcing
(Smithsonian / Library of Congress / Purdue).

Built as a tribute.
