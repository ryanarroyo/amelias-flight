# Development Plan — Amelia's Flight

A tribute / portfolio website that visualizes Amelia Earhart's 1937 world flight as an
interactive, scroll-driven story on a rotating globe, plus a companion "Theories" page.

See [CONTEXT.md](./CONTEXT.md) for the resolved design decisions and glossary, and
[docs/adr/0001](./docs/adr/0001-self-contained-d3-globe-no-tiles.md) for the rendering-stack
rationale.

---

## 1. Product summary

| Aspect | Decision |
|---|---|
| Format | Scrollytelling narrative (scroll position drives all state) |
| Map | Rotating D3 orthographic globe, drawn to Canvas, no tiles, no API keys |
| Aesthetic | Modern editorial minimal — light, airy, crisp grotesk type, one accent color |
| Scope | Eastbound 2nd attempt; brief 1st-attempt prologue; Lae→Howland as climax; quiet coda |
| Pages | (1) "The Flight" scrollytelling, (2) "Theories" text page — one self-contained artifact, state-toggled nav |
| Stack | React + TypeScript + Tailwind + D3-geo + topojson; data embedded inline |
| Destination | Claude-design artifact → grafts into a Vite repo → deploy on Vercel/Netlify |

---

## 2. Data assets (DONE — Phase 1 complete)

- **`data/legs.json`** — ✅ Researched & validated. 30 legs, TIGHAR-sourced statute-mile distances,
  great-circle-verified coordinates, 1937-era place names, `status` of `completed` |
  `final-vanished`. Totals: 24,285 mi (all) / 21,585 mi (official world flight, Miami onward).
- **`data/theories.json`** — ✅ Five high-level theory summaries with stance labels, for page 2.

These are the source of truth. The front-end embeds them inline (no runtime fetch).

### Derived values the front-end computes from `legs.json`
- Cumulative miles / days elapsed / legs completed / % around the world (for the running stats).
- Chapter grouping (region) — see CONTEXT.md "Chapter mapping."
- Great-circle interpolation between each origin→destination for drawing arcs on the globe.

---

## 3. Build phases

### Phase 1 — Data (DONE)
Compile and verify `legs.json` and `theories.json`. ✅

### Phase 2 — Front-end prototype (via Claude design)
Use [DESIGN-PROMPT.md](./DESIGN-PROMPT.md) to generate the self-contained artifact:
1. Hero → scrollytelling globe story → Vanishing climax → legacy coda → footer.
2. Theories page reachable via minimal top nav.
3. Reduced-motion + responsive/mobile handled.

**Acceptance criteria for the prototype**
- Globe rotates smoothly and keeps the active leg roughly centered as you scroll.
- Route draws progressively, leg by leg, in the accent color; completed vs. final-vanished styled
  differently (solid vs. dashed; plane fades; Howland unreached).
- Persistent leg readout + running stats update correctly against `legs.json`.
- Chapters and hero legs trigger at the right scroll positions.
- `prefers-reduced-motion`: no continuous rotation, route still drawn, all content reachable.
- Mobile layout: sticky globe top, text rail beneath, identical logic.
- Theories page renders all five summaries; no map on that page.
- No external network calls for map/data (tiles, fonts-as-blocker, or JSON).

### Phase 3 — Productionize (lift into a real repo)
1. Scaffold **Vite + React + TS + Tailwind**.
2. Split the artifact into components:
   `Hero`, `GlobeCanvas`, `ScrollStage`, `StepCard`, `LegReadout`, `StatsBar`, `Vanishing`,
   `Coda`, `Footer`, `Nav`, `TheoriesPage`.
3. Move `legs.json` / `theories.json` to `src/data/` as imported modules.
4. Pin the world TopoJSON as a bundled asset (e.g. `world-atlas/land-110m`), not a CDN fetch.
5. Add real fonts (self-hosted), favicon, OpenGraph/meta, title.
6. Source **public-domain archival photos** (Smithsonian, Library of Congress, Purdue Karnes
   archive) to fill the prototype's image placeholders. Verify licensing; add credits.

### Phase 4 — Polish & QA
- Performance pass (Canvas redraw throttling, `requestAnimationFrame`, devicePixelRatio scaling).
- Cross-browser + mobile device testing; check scroll on trackpad, touch, and keyboard.
- Accessibility: focus order, headings, alt text, reduced-motion, color contrast (light theme).
- Lighthouse pass; lazy-load images.

### Phase 5 — Deploy
- Deploy to Vercel/Netlify. Add a custom domain if desired.
- Footer credits finalized (TIGHAR, Wikimedia, Smithsonian) + data-fidelity note.

---

## 4. Technical notes & risks

- **Smooth scroll-linked rotation is the main risk.** Mitigations: render globe to Canvas (not
  SVG paths), throttle redraws to animation frames, precompute great-circle arc points per leg,
  scale for `devicePixelRatio`.
- **Globe re-centering vs. readability.** Rotate the projection so the active leg's midpoint is
  near center; ease between legs rather than snapping.
- **Date-line / Pacific wrap.** The final Lae→Howland leg crosses toward the antimeridian; verify
  the arc interpolation renders correctly across the date line on the orthographic projection
  (orthographic clips the far hemisphere, which actually helps — confirm the gap-to-Howland reads).
- **Self-contained constraint.** World geometry must be bundled. In the prototype it may load from
  a pinned CDN (e.g. `cdn.jsdelivr.net/npm/world-atlas`); in production, vendor it locally.
- **Reduced-motion** is a hard requirement, not a nice-to-have.

---

## 5. Deliverables produced in this session

1. `data/legs.json` — verified 30-leg dataset (real data).
2. `data/theories.json` — five theory summaries for page 2.
3. `CONTEXT.md` — resolved design decisions + glossary.
4. `docs/adr/0001-...md` — rendering-stack decision record.
5. `PLAN.md` — this file.
6. `DESIGN-PROMPT.md` — the prompt to paste into Claude's design tool to build the front-end.
