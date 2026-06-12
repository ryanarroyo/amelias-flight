# Context: Amelia's Flight

A tribute / portfolio website that visualizes Amelia Earhart's 1937 world flight as an
interactive, beautiful, scroll-driven story.

## Purpose

- **Type:** Tribute + portfolio piece (not a commercial product, museum kiosk, or research tool).
- **Primary experience:** Scrollytelling narrative — the user scrolls top-to-bottom and the
  story of the flight unfolds leg-by-leg, with the map animating in sync with scroll position.

## Glossary

- **Leg** — One segment of the journey: a single departure point → arrival point hop. The flight
  is canonically divided into legs (≈29 per the TIGHAR archive). Each Leg has a date, origin,
  destination, and distance.
- **Scrollytelling** — The chosen interaction model. Scroll position is the single driver of
  application state; advancing the scroll advances the narrative and animates the map. Linear,
  story-first, non-free-explore.
- **The Journey** — The full ordered sequence of Legs from Oakland (departure) onward, including
  the completed stages and the planned/final Pacific legs.
- **The Vanishing** — The climax: the final Leg, Lae → Howland Island (July 2, 1937), where the
  plane disappeared. Styled distinctly from completed Legs (ghosted/dashed line, fading plane
  marker, last-transmission quote).

## Narrative arc / scope

1. **Prologue** — Brief intro card acknowledging the failed first attempt (March 1937, Luke Field
   crash). Not rendered as map legs; context only.
2. **The Journey** — The eastbound second attempt (May–July 1937): Oakland → Miami → Caribbean →
   South America → Africa → India → Southeast Asia → Lae. The ~29 legs, told in sequence.
3. **The Vanishing** — Lae → Howland as the styled climax.
4. **Legacy coda** — Short, restrained closing on her disappearance and legacy. A one-line nod to
   TIGHAR's ongoing search is acceptable. NOT a deep-dive into disappearance theories — the tribute
   tone must hold.

## Map / rendering

- **Map style:** Rotating 3D-feel globe via **D3 orthographic projection**. As the user scrolls,
  the globe rotates to keep the active Leg centered; the route traces along the surface.
- **Self-contained:** No external map tiles, no API keys. World geometry is bundled (e.g.
  world-atlas TopoJSON). This keeps it buildable as a single Claude-design artifact.
- **Rendering:** Globe + route drawn to **Canvas** for smooth scroll-linked rotation; UI, text,
  labels in HTML/SVG overlay.
- **Palette:** Modern editorial minimal (see Aesthetic). Light, airy stage; restrained palette;
  the globe rendered cleanly (soft neutral landmasses, pale ocean) with a single accent color for
  the route line so the data/typography carry the piece.

## Data

- **Fidelity:** Historically rigorous but pragmatic. Canonical leg sequence; real city/airfield
  coordinates; dates and distances matched to the published record. Sources credited in footer
  (TIGHAR, Wikimedia).
- **Offline constraint:** The Claude-design build step has NO internet. All data must be compiled
  ahead of time into a static **`legs.json`** and embedded in the front-end — no runtime fetching.
- **`legs.json` schema (per leg):** `seq`, `date`, `origin {name, lat, lon}`,
  `destination {name, lat, lon}`, `distance_mi`, `distance_km`, `caption`,
  `status` (completed | final-vanished).
- **Production:** Researched and compiled as **Phase 1** (real data, verified), not a placeholder.
- **STATUS: DONE.** `data/legs.json` written and validated. **30 legs.** Legs 1–4 = Oakland→Miami
  shakedown; official world flight starts at leg 5 (Miami → San Juan, 1937-06-01). Distances from
  TIGHAR (statute mi), great-circle verified. Totals: 24,285 mi all / 21,585 mi official. Final leg
  30 = Lae → Howland, status `final-vanished`. Place names rendered as of 1937.
- **Chapter mapping (from the data):** North America/shakedown (legs 1–4) · Caribbean & South
  America (5–9) · South Atlantic & Africa (10–17) · South Asia (18–22) · SE Asia & Pacific approach
  (23–29, incl. the Bandoeng/Soerabaja turn-back as an emotional beat) · The Vanishing (30).

## Scroll structure

- **Layout:** Sticky globe + scrolling text rail. Globe is pinned (sticky, fills most of the
  viewport); a narrower column of text **step cards** scrolls past it. A card entering the
  viewport advances the narrative and the globe animation.
- **Granularity:** **Chapter-grouped.** ~5–6 **Chapters** by region (e.g. North America, South
  America/Caribbean, Africa, South Asia, Southeast Asia–Pacific, The Vanishing). Within a Chapter
  the globe animates through that region's individual Legs, but prose lives at the Chapter level.
- **Hero Legs:** A few pivotal Legs get their own dedicated card (departure from Oakland/Miami,
  major ocean crossings, and the final Lae → Howland Vanishing).

## Glossary additions

- **Chapter** — A region-level grouping of Legs that owns one or more text step cards. The unit of
  prose. ~5–6 total.
- **Step card** — A single scroll-triggered text block in the rail; entering the viewport advances
  state. Most map to a Chapter; Hero Legs get their own.

## Tech stack & destination

- **Stack:** React + TypeScript + Tailwind. **D3-geo + topojson** for the orthographic globe;
  scroll via IntersectionObserver (or `scrollama`). `legs.json` embedded inline as a constant.
  Globe/route drawn to Canvas; UI in JSX.
- **Design deliverable form:** A single self-contained Claude-design artifact (one React +
  Tailwind file pulling D3 from CDN).
- **Destination:** Prototype-quality artifact, but **structured to graft into a Vite + React repo**
  for real deployment (Vercel/Netlify). Keep `legs.json` separable, globe/scroll logic in clear
  components, no artifact-only hacks.

## Aesthetic

- **Direction:** Modern editorial minimal (Option C). Light, airy, generous whitespace; crisp
  grotesk sans typography; a single restrained accent color; data and typography do the work.
- **Tone:** Designerly and quiet — lets the journey and the numbers speak. Emotional weight comes
  from restraint and the Vanishing climax, not from ornament.
- **Globe in this style:** Clean and minimal — pale ocean, soft neutral landmasses, hairline
  graticule, route in the single accent color (a warm crimson/red reads well against neutral and
  nods to expedition maps without going full vintage).

## Content elements

- **Quotes:** Curated, public-domain Earhart quotes — roughly one per Chapter. Text only.
- **Running stats:** A scroll-driven counter — cumulative miles flown, days elapsed, legs
  completed, and % around the world. Derived from `legs.json`.
- **Persistent leg readout:** A small fixed panel showing the current Leg's date / origin →
  destination / distance as the globe animates.
- **Archival photos:** DEFERRED to the production repo. In the prototype, leave tasteful captioned
  image placeholders so layout is ready. Production task: source public-domain images
  (Smithsonian, Library of Congress, Purdue Karnes archive). Keeps the artifact self-contained and
  rights-clean.

## Pages & navigation

- **Two pages, one self-contained artifact.** A minimal top nav switches between two views via
  app state (no external router) so it stays a single file.
  - **"The Flight"** — the scrollytelling tribute (default view, everything above).
  - **"Theories"** — a separate, calm, **text-based page** (images where relevant) giving
    high-level summaries of the major disappearance theories. Purpose: pique interest and convey
    *how many* competing theories exist. **No map / no globe** on this page.
- **Tone separation:** Keeping theories on their own page is deliberate — the tribute story stays
  clean and emotional; the analytical "what happened?" material is siloed. Reconciles with the
  earlier rule that the main scroll is NOT a theories deep-dive.

## Theories page — content

High-level, evocative summaries (each ~2–4 sentences) of the major hypotheses, framed as "the
mystery has many answers." Major theories to cover:
1. **Crash-and-sank** — the simplest, most widely accepted: out of fuel, down in deep water near
   Howland.
2. **Castaway / Nikumaroro (Gardner Island)** — TIGHAR's hypothesis: landed and died as a castaway;
   artifacts and bone analysis debated.
3. **Japanese capture (Saipan / Marshall Islands)** — captured by the Japanese; died or executed.
4. **Spy mission** — flew a covert reconnaissance role (often paired with the capture theory).
5. **Assumed-identity ("Irene Bolam")** — survived and lived under a new name; thoroughly debunked
   but culturally persistent.
Footer/disclaimer notes these range from mainstream-accepted to fringe/debunked.

## Opening, robustness, micro-interactions

- **Hero:** Calm full-screen typographic title ("Amelia Earhart · The 1937 World Flight"), subtitle,
  globe softly rotating behind, subtle scroll cue.
- **Footer:** Sources & credits (TIGHAR, Wikimedia, Smithsonian), data-fidelity note, restrained
  "built as a tribute" line.
- **Reduced motion:** Honor `prefers-reduced-motion` — route still draws, continuous rotation
  suppressed, all content reachable. Non-negotiable.
- **Mobile:** First-class responsive — sticky globe top, text rail beneath; identical scroll logic.
- **Micro-interactions:** Minimal. Hovering the leg readout may highlight that leg's arc. No
  click-to-explore (don't blur the scrollytelling model into free-exploration).

## The Vanishing — climax treatment

- Route up to Lae: solid accent line. Final Lae → Howland leg: **dashed / ghosted**.
- Plane marker **pulses then fades** mid-ocean; the line **never reaches Howland** — Howland is
  marked but unreached, with a deliberate visible gap.
- Globe rotation **stops**; all motion stills.
- Earhart's documented **last radio transmission** stands alone as the only text:
  *"We are running on line north and south…"*
- **Stats freeze** at final totals; intentional whitespace beat → quiet legacy coda.
- **Coda is purely textual** — no Nikumaroro / search-area marker on the globe. Keeps tribute tone.

## Decisions (see docs/adr/ for detail)

- [0001](docs/adr/0001-self-contained-d3-globe-no-tiles.md) — Self-contained D3 orthographic globe,
  no map tiles.
