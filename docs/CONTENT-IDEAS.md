# Content Roadmap — unique, meaningful additions

Ideas for extending *Amelia's Flight* with content that is genuinely differentiated from the
existing Earhart material online. Derived from a two-stream web research pass (competitive
landscape + primary sources), June 2026.

**Core insight:** Every major institution *describes* the human core of this story; almost none
let you *experience* it. The route map and theories rundown (which this site already has) are the
saturated forms. The white space is making the *adjacent, untold* parts interactive — and weaving
in primary sources (Purdue, NARA, Library of Congress) that currently sit in catalogs with no
narrative.

A recurring caveat to honor on-site: George Palmer Putnam (husband/publisher) edited her published
prose, so "her voice" in the books is partly his — worth one honest line.

---

## ✅ In progress

### 1. "The Last Hours" — interactive Itasca radio-log timeline
The real KHAQQ ↔ *Itasca* transmissions of July 2, 1937, timestamped, building to the final
"we are on the line 157 337." Expands the existing "Vanishing" climax from a single quote into a
primary-source experience.
- **Why unique:** unbuilt anywhere; data is public-domain, timestamped, small.
- **Two signature details:** dual **GMT / Itasca-local** clocks (famous times are local, +11½h);
  a **"variants" toggle** — multiple operators kept different logs, so marquee lines have 2–4
  wordings ("circling" typed over "drifting" in the original). Showing that *is* the historiography.
- **Sources:** NARA Bellarts log scan (ID 6210268,
  https://www.archives.gov/college-park/highlights/earhart-log); TIGHAR transcriptions
  (https://tighar.org/Projects/Earhart/Archives/Research/Bulletins/37_ItascaLogs/Itascalog.html).

---

## Backlog (prioritized)

### 2. "The Island" (Finding Howland) — the navigation problem made tangible  *(Tier 1, high effort — IN PROGRESS)*
Interactive showing why finding a ~1.7-mile speck after 2,556 mi was nearly impossible: the
dead-reckoning error cone widening with distance; why the sun-line (LOP 157/337) fixes your line
but not your position on it; why radio direction-finding failed that morning.
- **Why unique:** the single biggest gap online — Smithsonian only *narrates* it, never simulates.
- **The one "aha":** a single sun line + DR uncertainty = the places you could be form a *long
  segment of the LOP*, far bigger than the ~12 mi within which a low sandbar is even visible.
  "Running on line north and south" was a desperate search, not a fix.

**Locked design decisions (this session):**
- **Name:** "The Island". Nav slot: right before **The Last Hours** (navigation failure → radio
  drama → silence).
- **Visual:** hybrid — one globe beat (Lae→Howland, reuse `recordsGlobe`) then zoom/hand off to a
  flat, top-down **to-scale** tactical map (pixels = miles) for the actual geometry. The flat view
  is the only honest way to show the visibility gap; orthographic can't show scale at this zoom.
- **Tone/interactivity:** explanatory on-rails reveal of the three layers, PLUS a few honest
  controls (drag heading error → uncertainty grows; toggle "what a 2nd sun line would've done" →
  collapses to a fix) and one quiet "run the line" beat. Not game-like.
- **Tech:** render the flat diagram in **SVG** (crisp lines/labels/handles); globe stays canvas.
- **Files (planned):** `data/island.ts` (verified facts + cross-track math constants + per-stage
  copy), `components/IslandPage.tsx`, a small SVG diagram module.
- **Process:** focused research pass FIRST to lock numbers (island size, practical spotting
  distance, LOP reasoning, RDF failure specifics, probable-error radius) before writing copy/scale.
- **Phasing:** (A) research + to-scale diagram with the three layers as animated reveal — the core
  aha; (B) the interactive sliders; (C) optional reflective "run the line" beat.

### 3. "Before the World Flight" — pre-1937 records timeline  *(Tier 2, best effort:payoff)*
Reuse the globe to trace the records most people don't know: 1928 *Friendship* (first woman across
the Atlantic, as passenger, 20h40m — the book title); 1932 solo Atlantic (14h56m through ice and
engine flames; first woman to solo it, first woman awarded the DFC); 1935 Honolulu→Oakland solo
(2,408 mi open ocean, more than Lindbergh, a route that had killed others); 1935 LA→Mexico
City→Newark.
- **Builds on:** GlobeEngine — same rendering, new leg data.
- **Flag:** the 1931 autogiro altitude "record" (18,415 ft) is NOT FAI/NAA-certified — label as
  "claimed."

### 4. "The Other Amelia" — life beyond the cockpit  *(Tier 2, low effort, content-driven)*
Gallery/essay: 1933 fashion line at Macy's (pioneered mix-and-match "separates," parachute-silk,
propeller buttons); the luggage brand (note "designed" vs "endorsed" is unsettled); co-founding the
Ninety-Nines (Nov 2, 1929; first president 1931); Purdue career counselor; Cosmopolitan editor; and
the set piece — Apr 20, 1933, she and Eleanor Roosevelt left a White House dinner *in evening gowns*
and flew to Baltimore and back, Eleanor at the controls. (The "epoch… evening dress and slippers"
quote is Eleanor's, not Amelia's — attribute correctly.)

### 5. Her own words — "Courage" + the letters  *(Tier 2, low effort)*
Animated reveal of the verified poem "Courage," the 1931 pre-wedding letter ("…the confinements of
even an attractive cage"), and the final 1937 letter ("Women must try to do things as men have
tried…"), each deep-linked to the Purdue manuscript scan.
- **Rights:** *20 Hrs 40 Min* is US public domain (2024); *The Fun of It* under copyright until
  2028, *Last Flight* until 2033 — excerpt only.
- **Fix to make now:** the quote "Adventure is worthwhile in itself" on the Pilots page has NO
  primary source (popularly attributed only). Replace with a verified quote.

### 6. Theories → neutral evidence ledger  *(Tier 3, upgrade existing page)*
Recast each hypothesis as claim → supporting evidence → counter-evidence → current status. Include
the 2024 Deep Sea Vision sonar "plane" that proved to be a **rock** (debunked Nov 2024) and the
**active** Purdue/ALI Nikumaroro "Taraia Object" expedition (postponed to ~late 2026). Differentiates
from TIGHAR (advocacy) and news cycle (ephemeral) by being neutral and showing science self-correct.

### 7. "Still Unsolved" — a small living-news note  *(Tier 3, tiny)*
One restrained module: as of mid-2026 no wreckage confirmed; the Nikumaroro expedition is the live
thread to watch. Gives the tribute a heartbeat instead of freezing it in 1937.

---

## Rights-clean asset sources
- **Library of Congress Prints & Photographs** — embeddable images: https://www.loc.gov/rr/print/list/106_earh.html
- **Wikisource** — full text of *20 Hrs 40 Min* (public domain): https://en.wikisource.org/wiki/20_Hrs._40_Min.
- **Purdue e-Archives** — 3,500+ scans, "view the real document" deep links: https://earchives.lib.purdue.edu/digital/collection/earhart
- **NARA** — ~16,000 pages of 1937 official records (declassified Sept 2025): https://www.archives.gov/research/amelia-earhart
