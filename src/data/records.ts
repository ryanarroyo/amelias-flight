// Amelia's Flight — "The Records": Earhart's record flights before the 1937 world flight.
//
// Most people know only the final flight; her reputation was built across the decade before it.
// Distances are statute miles, great-circle between the airfields actually used; durations and
// dates are from the published record. Coordinates are the historic departure/arrival fields.

export interface Place {
  name: string // short label drawn on the globe
  lat: number
  lon: number
}

export interface FlightRecord {
  id: string
  year: string
  title: string
  date: string // human-readable
  origin: Place
  destination: Place
  distance_mi: number
  duration: string
  /** The "first" this flight represents — the headline. */
  firstLine: string
  caption: string
}

export const RECORDS_INTRO =
  'The world flight was meant to be her last great record — but it was only the latest. Across the decade before 1937, Amelia Earhart strung together a series of firsts that made her name long before the Pacific swallowed it. Trace them on the globe.'

export const RECORDS: FlightRecord[] = [
  {
    id: 'friendship-1928',
    year: '1928',
    title: 'The Friendship',
    date: 'June 17–18, 1928',
    origin: { name: 'Trepassey', lat: 46.738, lon: -53.371 },
    destination: { name: 'Burry Port', lat: 51.681, lon: -4.252 },
    distance_mi: 1890,
    duration: '20 hr 40 min',
    firstLine: 'First woman to cross the Atlantic by air',
    caption:
      'She crossed as a passenger aboard a Fokker floatplane, pilot Wilmer Stultz at the controls — "just baggage, like a sack of potatoes," she said. The fame was real; the flying, not yet hers. The 20 hours and 40 minutes gave her first book its title, and she resolved to make the crossing again, alone.',
  },
  {
    id: 'solo-atlantic-1932',
    year: '1932',
    title: 'Solo Across the Atlantic',
    date: 'May 20–21, 1932',
    origin: { name: 'Harbour Grace', lat: 47.705, lon: -53.214 },
    destination: { name: 'Derry', lat: 55.057, lon: -7.32 },
    distance_mi: 2026,
    duration: '14 hr 56 min',
    firstLine: 'First woman to fly the Atlantic solo — and second person ever',
    caption:
      'Five years to the day after Lindbergh, she flew a red Lockheed Vega from Newfoundland through ice, a leaking fuel gauge, and flames licking from a cracked exhaust manifold, setting down in a pasture near Derry. She became the first woman awarded the Distinguished Flying Cross.',
  },
  {
    id: 'pacific-solo-1935',
    year: '1935',
    title: 'Hawaii to California',
    date: 'January 11–12, 1935',
    origin: { name: 'Honolulu', lat: 21.481, lon: -158.038 },
    destination: { name: 'Oakland', lat: 37.721, lon: -122.221 },
    distance_mi: 2408,
    duration: '18 hr 16 min',
    firstLine: 'First person to fly solo from Hawaii to the U.S. mainland',
    caption:
      'More open ocean than Lindbergh had crossed, on a route that had already killed several aviators. She flew it alone, by radio and dead reckoning, and landed at Oakland to a crowd of thousands. This was the flight that settled any argument about whether she belonged among the elite pilots — full stop.',
  },
  {
    id: 'mexico-city-1935',
    year: '1935',
    title: 'Los Angeles to Mexico City',
    date: 'April 19–20, 1935',
    origin: { name: 'Burbank', lat: 34.201, lon: -118.359 },
    destination: { name: 'Mexico City', lat: 19.436, lon: -99.072 },
    distance_mi: 1700,
    duration: '13 hr 23 min',
    firstLine: 'First solo flight from the U.S. to Mexico City',
    caption:
      'Invited by the Mexican government, she flew south overnight, navigating by the stars and a single road across unfamiliar country, and was met in Mexico City as a guest of the nation.',
  },
  {
    id: 'mexico-newark-1935',
    year: '1935',
    title: 'Mexico City to Newark',
    date: 'May 8, 1935',
    origin: { name: 'Mexico City', lat: 19.436, lon: -99.072 },
    destination: { name: 'Newark', lat: 40.692, lon: -74.169 },
    distance_mi: 2125,
    duration: '14 hr 19 min',
    firstLine: 'First nonstop solo flight from Mexico City to the U.S. east coast',
    caption:
      'The return leg, flown nonstop across the Gulf of Mexico to a roaring welcome at Newark. Two more firsts in three weeks — and a reminder that the long over-water solo had become her signature.',
  },
]

// Honest footnote: records that aren't single point-to-point routes, kept off the globe.
export const RECORDS_NOTE =
  'She set more than these: women’s speed records in 1930, transcontinental solo records in 1932 and 1933, and a widely reported autogiro altitude of 18,415 feet in 1931 — though that last mark was never certified by the NAA or FAI, and is best remembered as claimed rather than official.'
