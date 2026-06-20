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

## Branch / PR status (as of 2026-06-20)

| Work | Branch | PR | State |
|---|---|---|---|
| #1 The Last Hours | `add-last-hours-page` | #1 (base `main`) | **open, awaiting review/merge** |
| #3 The Records + quote fix | `add-records-timeline` | #2 (stacked on #1) | **open, awaiting review/merge** |
| #2 The Island + photos | `add-island-page` | — | **committed (`7fab71b`), NOT pushed; no PR yet** |

Stacked-PR order: merge **#1 → #2**, and the stacked PRs auto-retarget to `main`. The Island branch
still needs `git push` + a PR opened (base `add-records-timeline`).

**Pending side task:** the 1937 Howland runways aerial could not be verified rights-clean — manual
archive request prepped in [`howland-1937-aerial-request.md`](./howland-1937-aerial-request.md).
When a file comes back with its credit line, wire it into The Island via `FramedPhoto` and update
the sources note in `src/data/island.ts`.

---

## ✅ Shipped

### 1. "The Last Hours" — interactive Itasca radio-log timeline  *(branch `add-last-hours-page`, PR #1)*
The real KHAQQ ↔ *Itasca* transmissions of July 2, 1937, timestamped, building to the final
"we are on the line 157 337." Dual GMT/Itasca-local clocks; a "log variants" toggle; a play-the-night
auto-advance; and a self-contained Web Audio radio atmosphere (breathing static + the cutter's real
Morse "A" homing bursts — no voice ever reconstructed).
- Files: `data/radioLog.ts`, `components/RadioLogPage.tsx`, `lib/radioAudio.ts`.

### 3. "The Records" — pre-1937 record-flights page  *(branch `add-records-timeline`, PR #2)*
Five record flights traced on an interactive globe (1928 *Friendship*; 1932 solo Atlantic; 1935
Honolulu→Oakland; 1935 LA→Mexico City→Newark). Click a record → globe eases to center it and draws
the arc; honest footnote covers the **uncertified** 1931 autogiro altitude.
- Files: `data/records.ts`, `components/RecordsPage.tsx`, `lib/recordsGlobe.ts`.
- **Quick fix (done here):** replaced the unsourced "Adventure is worthwhile in itself" on the
  Pilots page with a verified quote from her final letter (*Last Flight*).

### 2. "The Island" (Finding Howland) — the navigation problem made tangible  *(branch `add-island-page`)*
Why a ~1.5-mile speck was nearly impossible to find after 2,556 mi. Globe intro beat (Lae→Howland) →
a to-scale top-down **SVG** diagram driven by a five-step rail: the target (5-mi sight ring) ·
dead reckoning (heading-error slider grows the uncertainty) · the sun line (157/337 LOP; circle
collapses to a line; toggle a 2nd sun line for the fix they lacked) · the radio (three failed
direction-finders) · the search (plane sweeps the line and slides past). All figures research-locked
and cited; estimated/contested values flagged.
- Files: `data/island.ts`, `components/IslandDiagram.tsx`, `components/IslandPage.tsx`.
- **Photos (verified PD, eye-checked):** USFWS oblique aerial; 1937 NARA colonists'-camp photo; NASA
  ISS orbital "speck" view — in `public/photos/howland-*.jpg`.
- **Open follow-up:** push branch + open stacked PR; optionally add the 1937 runways aerial (see
  pending side task above).

---

## Backlog (prioritized)

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
- **Note:** the final-letter quote is already in use on the Pilots page (the quick fix above) — avoid
  duplicating it verbatim as the centerpiece here.

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
- **USFWS / NASA / NARA RG 80-CF** — public-domain Howland imagery (used on The Island).
