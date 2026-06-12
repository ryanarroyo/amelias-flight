# Self-contained D3 orthographic globe, no map tiles

The flight visualization renders on a rotating globe drawn with **D3-geo (orthographic
projection) + bundled world TopoJSON to Canvas**, deliberately *not* a tiled map service
(Mapbox / MapLibre / Leaflet). The driving constraint is that the front-end is produced as a
single self-contained Claude-design artifact and is meant to graft into a static Vite deploy:
it must have **no external tile fetches and no API keys**, and an editorial-minimal tribute
reads better as a clean stylized globe than as modern street tiles.

## Considered Options

- **Tiled slippy map (Mapbox/MapLibre/Leaflet).** Rejected: requires external tile services and
  keys (breaks the offline/self-contained build), looks anachronistically modern, and is the
  hardest to make "beautiful tribute" rather than "Google Maps."
- **Flat D3 map (equirectangular/SVG vintage adventure map).** Viable, lighter, but distorts the
  Pacific and undersells the round-the-world scale that is the emotional point of the piece.
- **D3 orthographic globe to Canvas (chosen).** Self-contained, conveys circumnavigation, and
  styles cleanly for editorial-minimal.

## Consequences

- Rendering the globe + route to **Canvas** (not thousands of SVG paths) is required for smooth
  scroll-linked rotation; UI/labels stay in HTML/JSX overlay.
- World geometry ships as a bundled asset; the app never makes a network call for map data.
- `prefers-reduced-motion` must suppress continuous rotation while still drawing the route.
