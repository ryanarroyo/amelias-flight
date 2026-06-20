// Amelia's Flight — "The Island" (Finding Howland).
//
// The navigation problem made tangible: why a ~1.5-mile speck was nearly impossible to find after
// 2,556 miles. Numbers are research-locked and cited in docs; copy flags estimated/contested values.
//
// Key facts (sourced): Howland ~1.5 mi × 0.5 mi, ~10–20 ft high. Geometric visibility of an ~18 ft
// island from 1,000 ft ≈ 48 statute mi; PRACTICAL detection that morning ≈ 5 mi or less (sun
// glare ~15–20° blind arc, cloud shadows mimic islands; a Navy ship passed within 5 mi unseen).
// Lae→Howland ≈ 2,243 nmi / 2,556 sm. 1° heading error ≈ 37 nmi off track (1-in-60 rule).
// Probable arrival miss ≈ 50–62 nmi (Long); contested ~150 nmi south (TIGHAR). Dawn sun shot →
// a single line of position oriented 157°/337° (⟂ to the sun's ~67° true azimuth).

export const ISLAND = {
  // physical
  islandLenMi: 1.5,
  islandWidMi: 0.5,
  // sight radii (statute miles)
  visibilityMi: 5, // practical detection that morning
  geometricMi: 48, // theoretical horizon ceiling, 18 ft seen from 1,000 ft
  glareArcDeg: 18, // sun-glitter blind arc (15–20°)
  // the leg
  distanceNm: 2243,
  distanceSm: 2556,
  flightTime: '20 hr 14 min',
  // celestial
  lopAzimuthDeg: 157, // line of position; 337 the other way
  sunAzimuthDeg: 67, // sunrise sun bearing, true
  perShotFixNm: 8, // typical airborne celestial fix error (5–10 nm)
  // expert probable-miss estimates (nm)
  probableMissNm: 62, // Elgen Long, ~90% probability
  // radio
  voiceKc: '3105 / 6210',
  homingKc: 7500,
  marineDfKc: 500,
} as const

const NM_TO_SM = 1.15078

/** Cross-track error from a constant heading bias, via the 1-in-60 rule. */
export function crossTrackNm(headingErrorDeg: number): number {
  return (ISLAND.distanceNm * headingErrorDeg) / 60
}
export function nmToSm(nm: number): number {
  return nm * NM_TO_SM
}

export const ISLAND_INTRO =
  'Two thousand five hundred miles of open ocean, most of it flown in darkness, to find a sandbar a mile and a half long and barely twenty feet high. They arrived near dawn, where Howland should have been — and could not see it. Not from bad flying, but because the mathematics of navigation left them uncertain by far more than the distance from which the island could ever be seen.'

export interface IslandStage {
  id: string
  kicker: string
  title: string
  body: string
  control?: 'heading' | 'secondLop'
}

export const ISLAND_STAGES: IslandStage[] = [
  {
    id: 'speck',
    kicker: 'The target',
    title: 'All you can see is five miles',
    body: 'Howland is about a mile and a half long and ten to twenty feet high — flat, pale coral on an empty sea. In theory a pilot at 1,000 feet could see it from nearly fifty miles. In practice, that morning, the figure was five miles or less: a low sun threw a blinding glare arc across the search, and scattered cloud shadows on the water looked exactly like islands. A Navy ship later passed within five miles and never saw it.',
  },
  {
    id: 'dr',
    kicker: 'Dead reckoning',
    title: 'The error fans out',
    body: 'Without a fix, you fly by dead reckoning — heading, airspeed, and a guess at the wind. The errors compound. By the one-in-sixty rule, a single degree of heading bias over 2,243 nautical miles puts you about thirty-seven miles off track; an unestimated crosswind adds more. Experts put their probable arrival miss near fifty to sixty miles. Drag the heading error and watch where you might actually be — against the five miles you can see.',
    control: 'heading',
  },
  {
    id: 'sunline',
    kicker: 'The sun line',
    title: 'A line, not a point',
    body: 'At first light, after a cloudy night, Noonan could shoot the sun. A sextant shot gives a line of position — perpendicular to the sun, here oriented 157° to 337° — and he ran it through Howland. It collapses the uncertainty in one direction only: you know you are on the line, not where along it. A second body would cross the first into a single point — a fix. At dawn there was only the sun. Toggle the second line to see the fix they did not have.',
    control: 'secondLop',
  },
  {
    id: 'radio',
    kicker: 'The radio',
    title: 'Nothing could collapse the line',
    body: 'Radio bearings should have closed the gap. None did. The Itasca came through at full strength — yet not one of three direction-finders could turn that into a heading.',
  },
  {
    id: 'search',
    kicker: 'The search',
    title: 'Running on the line, north and south',
    body: 'So they did the only thing left: fly up and down the 157/337 line, sweeping the five miles of ocean they could see, hoping the island would slide into view. But the line itself carried a few miles of error — enough that the sweep could pass forever just to the side of Howland — and the fuel was running low. "We are running on line north and south" is the last thing anyone is confirmed to have heard.',
  },
]

export interface RadioPoint {
  label: string
  text: string
}

export const RADIO_POINTS: RadioPoint[] = [
  {
    label: 'The ship’s finder — wrong band',
    text: 'The Itasca’s direction-finder worked only at low frequencies (~270–550 kHz). It physically could not take a bearing on her 3105 kHz voice.',
  },
  {
    label: 'The shore finder — dead batteries',
    text: 'A borrowed high-frequency finder set up on Howland was the one unit that could read her frequency — but it ran off storage batteries that were drained by the time she arrived.',
  },
  {
    label: 'Her loop — no minimum',
    text: 'Homing on the Itasca’s 7500 kHz signal, she heard it but reported “unable to get a minimum”: the frequency was far too high for her loop antenna to find a null. Her low-frequency trailing antenna had been removed in Miami.',
  },
]

export const ISLAND_CLOSING =
  'She was almost certainly close — within an hour’s flying of a place she had crossed half the planet to reach. The ocean is vast, the island is small, and the tools of 1937 could not bridge the last few miles.'

export const ISLAND_SOURCES =
  'Figures research-locked from primary and expert sources: NARA (Itasca radio logs), TIGHAR research bulletins, Almon Gray (“Amelia Didn’t Know Radio,” Naval History, 1993), P. Hancock’s human-factors analysis (visibility/glare), Bowditch (horizon distance), and Elgen Long (probable-miss estimate). Island elevation, the probable-miss radius, and the exact wording of the final message are given as ranges or paraphrase where sources genuinely differ. Aerial photograph courtesy U.S. Fish & Wildlife Service; 1937 camp photograph U.S. National Archives (RG 80, 80-CF-79868-5); orbital photograph NASA / Johnson Space Center (ISS010-E-9287) — all public domain.'
