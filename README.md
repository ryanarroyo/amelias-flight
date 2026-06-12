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
