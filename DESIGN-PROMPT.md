# Claude Design Prompt — Amelia's Flight

Paste everything in the fenced block below into Claude's design tool. The flight data and theory
data are embedded inline, so the artifact is fully self-contained.

---

````text
Build a beautiful, self-contained interactive website called "Amelia's Flight" — a tribute that
visualizes Amelia Earhart's 1937 around-the-world flight as a scroll-driven story on a rotating
globe. This is a portfolio piece: the craft and polish ARE the point.

## Stack & constraints
- Single self-contained React + TypeScript component, styled with Tailwind.
- Use D3 (d3-geo, d3-geo's orthographic projection) and topojson for the globe. You may load
  d3 and world-atlas TopoJSON from a CDN (e.g. esm.sh / jsdelivr `world-atlas/land-110m.json`).
- NO map tiles, NO Mapbox/Leaflet, NO API keys, NO backend. All data is embedded inline (below).
- Render the globe and the flight route to a <canvas> for smooth animation; keep text/UI in JSX
  overlays. Scale the canvas for devicePixelRatio.

## Aesthetic — modern editorial minimal
- Light, airy, generous whitespace. The data and typography carry the piece; ornament is minimal.
- Crisp grotesk sans for body/UI; an elegant large display face for headings is welcome.
- A single restrained accent color — a warm crimson/red (e.g. ~#C0392B / #B23A33) — used for the
  route line and key numbers. Everything else is neutral (off-white background, soft grays, near-
  black text).
- The globe is clean and minimal: pale ocean, soft neutral landmasses, a hairline graticule.
- Quiet, confident, emotional through restraint — not flashy, not vintage-kitsch, not neon-tech.

## Structure — two pages in one artifact
A minimal top navigation switches between two views via component state (no router):
  • "The Flight"  (default) — the scrollytelling story
  • "Theories"            — a text page about the disappearance theories
Keep nav unobtrusive (small, top corner). Smooth transition between views.

## Page 1 — "The Flight" (scrollytelling)
Layout: a STICKY globe filling most of the viewport, with a narrower column of text "step cards"
that scroll past it. As each card enters the viewport (IntersectionObserver), advance the
narrative and animate the globe.

Sequence top to bottom:
1. HERO (full screen): title "Amelia Earhart", subtitle "The 1937 World Flight", a one-line
   framing sentence, the globe already softly rotating behind it, and a subtle scroll cue.
   Include one quiet sentence noting the failed first attempt (March 1937, a takeoff crash at
   Luke Field, Hawaii) as a prologue — context only, not on the map.

2. THE JOURNEY: as the user scrolls, the globe rotates so the active leg stays roughly centered,
   and the route draws progressively, leg by leg, in the accent color (animate the arc growing
   along a great-circle path between origin and destination; show a small plane/dot at the leading
   edge). Group the legs into ~6 CHAPTERS with their own heading cards; within a chapter the globe
   advances through that chapter's individual legs. Chapters:
     - "California to the Caribbean" (legs 1–5: the shakedown + official start at Miami)
     - "Down the Americas" (legs 6–9)
     - "Across the Atlantic & Africa" (legs 10–17)
     - "Arabia & India" (legs 18–19)
     - "Monsoon Asia & the Indies" (legs 20–28, including the turn-back — see below)
     - "The Last Airfield" (leg 29: Lae)
   Give a few HERO LEGS their own dedicated card: the official start (Miami→San Juan), the South
   Atlantic crossing (Natal→Saint-Louis), the Arabian Sea crossing (Assab→Karachi), and the
   emotional turn-back (Soerabaja→Bandoeng, "the hardest thing in aviation: turning back").
   Each leg's caption text is in the data — surface it.

3. Persistent UI while scrolling the journey:
   - A small fixed LEG READOUT panel: current leg's date, "Origin → Destination", and distance.
   - A RUNNING STATS strip that updates as you scroll: cumulative miles flown, days elapsed,
     legs completed, and "% around the world" (use cumulative miles / 24,285 total).
   - Optionally, hovering the leg readout highlights that leg's arc. Keep micro-interactions
     minimal — this is NOT a free-explore map.
   - Leave a couple of tasteful captioned IMAGE PLACEHOLDERS (empty bordered frames with a caption
     like "Earhart and the Lockheed Electra — photo to be added") where archival photos will go.

4. THE VANISHING (climax) — leg 30, Lae → Howland, July 2, 1937. Style it distinctly:
   - The route up to Lae is solid accent color; this final leg draws as a DASHED / ghosted line.
   - The plane marker pulses, then FADES mid-ocean. The line NEVER reaches Howland — mark Howland
     but leave a deliberate visible GAP.
   - The globe's gentle rotation STOPS; all motion stills.
   - The stats FREEZE at their final totals.
   - Earhart's last radio transmission appears alone as the only text:
     "We are running on line north and south."
   - Then an intentional beat of empty whitespace.

5. LEGACY CODA: a short, restrained closing — a sentence or two on her disappearance and legacy,
   purely textual (no markers on the globe, no theories here). Calm and dignified.

6. FOOTER: sources & credits — "Flight data: TIGHAR (tighar.org). Maps: Wikimedia Commons.
   Imagery: Smithsonian / Library of Congress." A one-line data-fidelity note and a restrained
   "Built as a tribute." line.

## Page 2 — "Theories" (text only, NO map/globe)
A calm, editorial, text-based page. Lead with the intro paragraph, then present the five theories
as elegant cards/sections (title, a small stance label/tag, the summary, and the short hook as a
pull-quote). Close with the closing paragraph. Leave optional image placeholders where a relevant
image could go. Match the same minimal aesthetic. Make clear the theories range from mainstream-
accepted to debunked — convey "one disappearance, many answers."

## Behavior requirements
- Honor `prefers-reduced-motion`: skip continuous globe rotation and arc-draw animation, but still
  render the full route and all content; everything must remain reachable by scrolling.
- Fully responsive / mobile-first-class: on small screens the sticky globe sits at the top and the
  text rail flows beneath it; identical scroll-driven logic.
- Smooth performance: throttle canvas redraws with requestAnimationFrame; precompute great-circle
  arc points per leg.

## DATA — embed these exactly as inline constants.

const LEGS = [
  { "seq": 1, "date": "1937-05-21", "origin": { "name": "Oakland, California, USA", "lat": 37.7214, "lon": -122.2208 }, "destination": { "name": "Burbank, California, USA", "lat": 34.2007, "lon": -118.3590 }, "distance_mi": 325, "distance_km": 523, "caption": "A quiet shakedown hop south, the Electra stretching her legs before the world.", "status": "completed" },
  { "seq": 2, "date": "1937-05-21", "origin": { "name": "Burbank, California, USA", "lat": 34.2007, "lon": -118.3590 }, "destination": { "name": "Tucson, Arizona, USA", "lat": 32.1161, "lon": -110.9410 }, "distance_mi": 450, "distance_km": 724, "caption": "Out across the desert, an engine fire at Tucson a small omen brushed aside.", "status": "completed" },
  { "seq": 3, "date": "1937-05-22", "origin": { "name": "Tucson, Arizona, USA", "lat": 32.1161, "lon": -110.9410 }, "destination": { "name": "New Orleans, Louisiana, USA", "lat": 29.9934, "lon": -90.2581 }, "distance_mi": 1250, "distance_km": 2012, "caption": "A long pull across the American South toward the Gulf.", "status": "completed" },
  { "seq": 4, "date": "1937-05-23", "origin": { "name": "New Orleans, Louisiana, USA", "lat": 29.9934, "lon": -90.2581 }, "destination": { "name": "Miami, Florida, USA", "lat": 25.7959, "lon": -80.2870 }, "distance_mi": 675, "distance_km": 1086, "caption": "Last leg of the shakedown, the Electra dropping into Miami for final overhaul.", "status": "completed" },
  { "seq": 5, "date": "1937-06-01", "origin": { "name": "Miami, Florida, USA", "lat": 25.7959, "lon": -80.2870 }, "destination": { "name": "San Juan, Puerto Rico", "lat": 18.4394, "lon": -66.0018 }, "distance_mi": 1033, "distance_km": 1662, "caption": "The official world flight begins, southeast over open Caribbean water.", "status": "completed" },
  { "seq": 6, "date": "1937-06-02", "origin": { "name": "San Juan, Puerto Rico", "lat": 18.4394, "lon": -66.0018 }, "destination": { "name": "Caripito, Venezuela", "lat": 10.1069, "lon": -63.0972 }, "distance_mi": 750, "distance_km": 1207, "caption": "Across the Antilles to the oil town of Caripito on the South American mainland.", "status": "completed" },
  { "seq": 7, "date": "1937-06-03", "origin": { "name": "Caripito, Venezuela", "lat": 10.1069, "lon": -63.0972 }, "destination": { "name": "Paramaribo, Surinam", "lat": 5.4528, "lon": -55.1878 }, "distance_mi": 667, "distance_km": 1073, "caption": "Skirting the Guiana coast above jungle and muddy river mouths.", "status": "completed" },
  { "seq": 8, "date": "1937-06-04", "origin": { "name": "Paramaribo, Surinam", "lat": 5.4528, "lon": -55.1878 }, "destination": { "name": "Fortaleza, Brazil", "lat": -3.7763, "lon": -38.5326 }, "distance_mi": 1200, "distance_km": 1931, "caption": "A long equatorial run down the Brazilian bulge to Fortaleza.", "status": "completed" },
  { "seq": 9, "date": "1937-06-06", "origin": { "name": "Fortaleza, Brazil", "lat": -3.7763, "lon": -38.5326 }, "destination": { "name": "Natal, Brazil", "lat": -5.9111, "lon": -35.2477 }, "distance_mi": 268, "distance_km": 431, "caption": "A short hop to Natal, last land before the great South Atlantic crossing.", "status": "completed" },
  { "seq": 10, "date": "1937-06-07", "origin": { "name": "Natal, Brazil", "lat": -5.9111, "lon": -35.2477 }, "destination": { "name": "Saint-Louis, Senegal, French West Africa", "lat": 16.0510, "lon": -16.4630 }, "distance_mi": 1961, "distance_km": 3156, "caption": "The ocean crossing to Africa, made by night and landfall north of intended Dakar.", "status": "completed" },
  { "seq": 11, "date": "1937-06-08", "origin": { "name": "Saint-Louis, Senegal, French West Africa", "lat": 16.0510, "lon": -16.4630 }, "destination": { "name": "Dakar, Senegal, French West Africa", "lat": 14.6708, "lon": -17.0731 }, "distance_mi": 103, "distance_km": 166, "caption": "A brief southward correction down the Senegal coast to Dakar proper.", "status": "completed" },
  { "seq": 12, "date": "1937-06-10", "origin": { "name": "Dakar, Senegal, French West Africa", "lat": 14.6708, "lon": -17.0731 }, "destination": { "name": "Gao, French Sudan", "lat": 16.2484, "lon": -0.0055 }, "distance_mi": 1130, "distance_km": 1819, "caption": "Inland over the Sahel to the Niger River town of Gao.", "status": "completed" },
  { "seq": 13, "date": "1937-06-11", "origin": { "name": "Gao, French Sudan", "lat": 16.2484, "lon": -0.0055 }, "destination": { "name": "Fort-Lamy, French Equatorial Africa", "lat": 12.1337, "lon": 15.0340 }, "distance_mi": 989, "distance_km": 1592, "caption": "Across the desert frontier to Fort-Lamy on the edge of Lake Chad.", "status": "completed" },
  { "seq": 14, "date": "1937-06-12", "origin": { "name": "Fort-Lamy, French Equatorial Africa", "lat": 12.1337, "lon": 15.0340 }, "destination": { "name": "El Fasher, Anglo-Egyptian Sudan", "lat": 13.6147, "lon": 25.3246 }, "distance_mi": 700, "distance_km": 1127, "caption": "Eastward over Darfur scrub to the garrison town of El Fasher.", "status": "completed" },
  { "seq": 15, "date": "1937-06-13", "origin": { "name": "El Fasher, Anglo-Egyptian Sudan", "lat": 13.6147, "lon": 25.3246 }, "destination": { "name": "Khartoum, Anglo-Egyptian Sudan", "lat": 15.5895, "lon": 32.5532 }, "distance_mi": 501, "distance_km": 806, "caption": "On to Khartoum where the Blue and White Niles meet.", "status": "completed" },
  { "seq": 16, "date": "1937-06-13", "origin": { "name": "Khartoum, Anglo-Egyptian Sudan", "lat": 15.5895, "lon": 32.5532 }, "destination": { "name": "Massawa, Eritrea", "lat": 15.6100, "lon": 39.4500 }, "distance_mi": 450, "distance_km": 724, "caption": "Down to the Red Sea port of Massawa under Italian colonial rule.", "status": "completed" },
  { "seq": 17, "date": "1937-06-14", "origin": { "name": "Massawa, Eritrea", "lat": 15.6100, "lon": 39.4500 }, "destination": { "name": "Assab, Eritrea", "lat": 13.0667, "lon": 42.7333 }, "distance_mi": 300, "distance_km": 483, "caption": "Hugging the Red Sea shore south to Assab near the strait.", "status": "completed" },
  { "seq": 18, "date": "1937-06-15", "origin": { "name": "Assab, Eritrea", "lat": 13.0667, "lon": 42.7333 }, "destination": { "name": "Karachi, India (now Pakistan)", "lat": 24.9008, "lon": 67.1681 }, "distance_mi": 1600, "distance_km": 2575, "caption": "A bold nonstop across the Arabian Sea, a flight never before flown.", "status": "completed" },
  { "seq": 19, "date": "1937-06-17", "origin": { "name": "Karachi, India (now Pakistan)", "lat": 24.9008, "lon": 67.1681 }, "destination": { "name": "Calcutta, India", "lat": 22.6547, "lon": 88.4467 }, "distance_mi": 1390, "distance_km": 2237, "caption": "The length of British India to monsoon-soaked Calcutta.", "status": "completed" },
  { "seq": 20, "date": "1937-06-18", "origin": { "name": "Calcutta, India", "lat": 22.6547, "lon": 88.4467 }, "destination": { "name": "Akyab, Burma", "lat": 20.1327, "lon": 92.8726 }, "distance_mi": 335, "distance_km": 539, "caption": "Across the Bay of Bengal to Akyab through driving rain.", "status": "completed" },
  { "seq": 21, "date": "1937-06-19", "origin": { "name": "Akyab, Burma", "lat": 20.1327, "lon": 92.8726 }, "destination": { "name": "Rangoon, Burma", "lat": 16.9073, "lon": 96.1332 }, "distance_mi": 306, "distance_km": 492, "caption": "Beaten back once by storms, then through to Rangoon along the coast.", "status": "completed" },
  { "seq": 22, "date": "1937-06-20", "origin": { "name": "Rangoon, Burma", "lat": 16.9073, "lon": 96.1332 }, "destination": { "name": "Bangkok, Siam", "lat": 13.9126, "lon": 100.6068 }, "distance_mi": 300, "distance_km": 483, "caption": "Over the Tenasserim hills into the kingdom of Siam.", "status": "completed" },
  { "seq": 23, "date": "1937-06-20", "origin": { "name": "Bangkok, Siam", "lat": 13.9126, "lon": 100.6068 }, "destination": { "name": "Singapore, Straits Settlements", "lat": 1.3644, "lon": 103.9915 }, "distance_mi": 904, "distance_km": 1455, "caption": "Down the Malay Peninsula to the great British port of Singapore.", "status": "completed" },
  { "seq": 24, "date": "1937-06-21", "origin": { "name": "Singapore, Straits Settlements", "lat": 1.3644, "lon": 103.9915 }, "destination": { "name": "Bandoeng, Java, Dutch East Indies", "lat": -6.9006, "lon": 107.5762 }, "distance_mi": 560, "distance_km": 901, "caption": "Across the equator to the cool highland field at Bandoeng.", "status": "completed" },
  { "seq": 25, "date": "1937-06-24", "origin": { "name": "Bandoeng, Java, Dutch East Indies", "lat": -6.9006, "lon": 107.5762 }, "destination": { "name": "Soerabaja, Java, Dutch East Indies", "lat": -7.3798, "lon": 112.7869 }, "distance_mi": 355, "distance_km": 571, "caption": "Eastward along Java toward Australia, but the instruments were failing.", "status": "completed" },
  { "seq": 26, "date": "1937-06-25", "origin": { "name": "Soerabaja, Java, Dutch East Indies", "lat": -7.3798, "lon": 112.7869 }, "destination": { "name": "Bandoeng, Java, Dutch East Indies", "lat": -6.9006, "lon": 107.5762 }, "distance_mi": 355, "distance_km": 571, "caption": "The hardest thing in aviation: turning back to Bandoeng for repairs.", "status": "completed" },
  { "seq": 27, "date": "1937-06-27", "origin": { "name": "Bandoeng, Java, Dutch East Indies", "lat": -6.9006, "lon": 107.5762 }, "destination": { "name": "Koepang, Timor, Dutch East Indies", "lat": -10.1718, "lon": 123.6710 }, "distance_mi": 1165, "distance_km": 1875, "caption": "Over Bali and Sumbawa and the Arafura Sea to Timor's far shore.", "status": "completed" },
  { "seq": 28, "date": "1937-06-28", "origin": { "name": "Koepang, Timor, Dutch East Indies", "lat": -10.1718, "lon": 123.6710 }, "destination": { "name": "Port Darwin, Australia", "lat": -12.4147, "lon": 130.8767 }, "distance_mi": 500, "distance_km": 805, "caption": "The Timor Sea crossing to Darwin, where the parachutes were shipped home.", "status": "completed" },
  { "seq": 29, "date": "1937-06-29", "origin": { "name": "Port Darwin, Australia", "lat": -12.4147, "lon": 130.8767 }, "destination": { "name": "Lae, Territory of New Guinea", "lat": -6.7322, "lon": 146.9964 }, "distance_mi": 1207, "distance_km": 1943, "caption": "Up over the Coral Sea to Lae, the last airfield she would ever land on.", "status": "completed" },
  { "seq": 30, "date": "1937-07-02", "origin": { "name": "Lae, Territory of New Guinea", "lat": -6.7322, "lon": 146.9964 }, "destination": { "name": "Howland Island, USA", "lat": 0.8062, "lon": -176.6175 }, "distance_mi": 2556, "distance_km": 4113, "caption": "Into the Pacific dawn toward a speck of coral she never reached.", "status": "final-vanished" }
];

const THEORIES = {
  intro: "Amelia Earhart and navigator Fred Noonan vanished on July 2, 1937, somewhere over the central Pacific on the leg from Lae to Howland Island. No wreckage has ever been conclusively found. In the decades since, the silence has been filled by a remarkable number of competing explanations — ranging from the soberly mainstream to the openly fringe. Here are the major ones.",
  theories: [
    { id: "crash-and-sank", title: "Crash and Sank", stance: "Mainstream / most widely accepted", summary: "The simplest explanation: unable to find the tiny speck of Howland Island, the Electra ran out of fuel and ditched into the deep Pacific, sinking within sight of nowhere. This is the official position of the U.S. government and most historians, supported by the final radio transmissions in which Earhart reported running low on fuel and searching along a navigational line.", hook: "Sometimes the ocean is answer enough." },
    { id: "nikumaroro-castaway", title: "The Castaway of Nikumaroro", stance: "Actively researched / contested", summary: "Championed by TIGHAR, this hypothesis holds that Earhart turned south along her navigational line and landed on the uninhabited reef of Gardner Island — now Nikumaroro — surviving for a time as a castaway before dying there. Decades of expeditions have surfaced suggestive artifacts, a partial skeleton recorded in 1940, and a re-analysis arguing the bones' proportions match Earhart. None of it is conclusive, and the debate continues.", hook: "A reef, a campfire, and bones that may or may not be hers." },
    { id: "japanese-capture", title: "Captured by the Japanese", stance: "Fringe / unsupported by hard evidence", summary: "A persistent strand of theories claims Earhart drifted into Japanese-controlled waters in the Marshall Islands, was taken prisoner, and died — or was executed — in captivity on Saipan. Proponents cite secondhand island testimony and a disputed photograph; mainstream historians regard the evidence as anecdotal and circumstantial.", hook: "Whispers of a prisoner who never came home." },
    { id: "secret-spy-mission", title: "The Secret Spy Mission", stance: "Speculative / often paired with capture theory", summary: "Some accounts cast the world flight as cover for covert aerial reconnaissance of Japanese-held Pacific islands on behalf of the U.S. government, with the disappearance a consequence of that mission. It is a compelling story with little documentary support, and it usually travels alongside the capture theories.", hook: "Was the flight ever really just a flight?" },
    { id: "assumed-identity", title: "The Woman Who Came Back", stance: "Debunked / culturally persistent", summary: "The most romantic and least credible theory: that Earhart survived, returned quietly to the United States, and lived out her life under an assumed name — most famously identified as a New Jersey woman named Irene Bolam, who sued over the claim. It has been thoroughly debunked, yet it endures as a testament to how badly people wanted her to have lived.", hook: "A hope so strong it invented a happy ending." }
  ],
  closing: "Five explanations, one disappearance. That the list keeps growing — and that serious people still mount expeditions nearly a century later — is itself part of Amelia Earhart's legacy: a mystery vast enough to hold all of our questions."
};

## Final reminders
- Make it genuinely beautiful and polished — this is a portfolio centerpiece.
- The Vanishing is the emotional climax: get the dashed final leg, fading plane, unreached Howland,
  halted rotation, and lone last-transmission quote right.
- Keep the tribute tone dignified and restrained throughout.
````
