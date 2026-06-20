import type { PhotoData } from '../lib/photo'

export interface PilotFact {
  label: string
  value: string
}

export interface Pilot {
  id: string
  name: string
  role: string
  lifespan: string
  facts: PilotFact[]
  bio: string[]
  quote?: string
  photo?: PhotoData
  placeholderCaption: string
}

export const PILOTS_INTRO =
  'Two people climbed into the Electra at Lae on the morning of July 2, 1937. One was the most famous aviator in the world; the other, one of the finest navigators alive. Their fates were bound together over the Pacific.'

export const PILOTS: Pilot[] = [
  {
    id: 'earhart',
    name: 'Amelia Earhart',
    role: 'Pilot & Commander',
    lifespan: '1897 — disappeared 1937',
    facts: [
      { label: 'Born', value: 'July 24, 1897 · Atchison, Kansas' },
      { label: 'Role', value: 'Pilot in command' },
      { label: 'Known for', value: 'First woman to fly the Atlantic solo' },
      { label: 'Age in 1937', value: '39' },
    ],
    bio: [
      'Amelia Mary Earhart fell for flight at a stunt-flying exhibition in her early twenties, paid for lessons by working odd jobs, and within a few years was setting records. In 1928 she became the first woman to cross the Atlantic by air — as a passenger — and resolved to do it on her own terms.',
      'She did, in 1932, flying solo and nonstop from Newfoundland to Ireland and becoming an international figure overnight. More records followed: the first solo flight from Hawaii to the U.S. mainland, the first solo from Los Angeles to Mexico City. She wrote bestselling books, helped found The Ninety-Nines — an organization of women pilots — and used her fame to argue, relentlessly, that the sky belonged to women too.',
      'The 1937 world flight was to be her last great record: the longest possible circumnavigation, hugging the equator. She was thirty-nine when the Electra lifted off from Lae for Howland Island and the ocean swallowed her radio.',
    ],
    quote:
      'Women must try to do things as men have tried. When they fail, their failure must be but a challenge to others.',
    photo: {
      src: '/photos/earhart-pilots.jpg',
      alt: 'Studio portrait of Amelia Earhart',
      caption: 'Amelia Earhart',
      credit: 'Library of Congress',
      objectPosition: 'center 30%',
    },
    placeholderCaption: 'Amelia Earhart, 1937 — portrait to be added',
  },
  {
    id: 'noonan',
    name: 'Fred Noonan',
    role: 'Navigator',
    lifespan: '1893 — disappeared 1937',
    facts: [
      { label: 'Born', value: 'April 4, 1893 · Cook County, Illinois' },
      { label: 'Role', value: 'Navigator' },
      { label: 'Known for', value: "Charting Pan Am's Pacific Clipper routes" },
      { label: 'Age in 1937', value: '44' },
    ],
    bio: [
      'Frederick Joseph Noonan went to sea as a boy and spent two decades as a mariner — rounding Cape Horn under sail, surviving torpedoed ships in the First World War, earning his master’s license. The sea taught him celestial navigation, the art of fixing a position from the stars, which he would carry into the air.',
      'In the 1930s he joined Pan American Airways and helped pioneer its transpacific Clipper service, surveying and charting the long over-water routes to Midway, Wake, Guam, and Manila. Few people alive knew the empty central Pacific from the cockpit as well as he did — which is precisely why Earhart wanted him beside her for the hardest legs of the world flight.',
      'On the final leg his task was to find Howland Island: a flat speck barely a mile and a half long, two thousand miles out. He never got the chance to prove the fix. He vanished with Earhart, and with far less of the world’s attention.',
    ],
    photo: {
      src: '/photos/noonan-portrait.jpg',
      alt: 'Portrait of Fred Noonan, navigator',
      caption: 'Fred Noonan',
      credit: 'San Diego Air & Space Museum',
      objectPosition: 'center 20%',
    },
    placeholderCaption: 'Fred Noonan, c. 1937 — portrait to be added',
  },
]
