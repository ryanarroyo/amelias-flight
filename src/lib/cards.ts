// Builds the scroll step-card data (legs 1–29) with chapter headers, hero-leg
// markers, and image placeholders — ported from the design's prep().

import { LEGS } from '../data/amelia'

export interface CardData {
  seq: number
  legLabel: string
  fromShort: string
  toShort: string
  caption: string
  distLabel: string
  chapterKicker: string
  chapterTitle: string
  chapterRange: string
  isHero: boolean
  heroTitle: string
  imageCaption: string
}

const CH: Record<number, [string, string, string]> = {
  1: ['Chapter I', 'California to the Caribbean', 'Legs 1–5 · May 1937'],
  6: ['Chapter II', 'Down the Americas', 'Legs 6–9 · June 1937'],
  10: ['Chapter III', 'Across the Atlantic & Africa', 'Legs 10–17 · June 1937'],
  18: ['Chapter IV', 'Arabia & India', 'Legs 18–19 · June 1937'],
  20: ['Chapter V', 'Monsoon Asia & the Indies', 'Legs 20–28 · June 1937'],
  29: ['Chapter VI', 'The Last Airfield', 'Leg 29 · June 29, 1937'],
}

const HERO: Record<number, string> = {
  5: 'The official start',
  10: 'The South Atlantic crossing',
  18: 'The Arabian Sea',
  26: 'Turning back',
}

const IMG: Record<number, string> = {
  5: 'Earhart and the Lockheed Electra 10E, Miami — archival photo to be added',
  29: 'Lae airfield, New Guinea, July 1937 — photo to be added',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function fmtDate(s: string) {
  const p = s.split('-').map(Number)
  return MONTHS[p[1] - 1] + ' ' + p[2] + ', ' + p[0]
}
const short = (n: string) => n.split(',')[0]
const km = (mi: number) => Math.round(mi * 1.60934)

export const CARDS: CardData[] = LEGS.slice(0, 29).map((l) => {
  const ch = CH[l.seq]
  return {
    seq: l.seq,
    legLabel: 'Leg ' + String(l.seq).padStart(2, '0') + ' · ' + fmtDate(l.date),
    fromShort: short(l.origin.name),
    toShort: short(l.destination.name),
    caption: l.caption,
    distLabel: l.distance_mi.toLocaleString() + ' mi · ' + km(l.distance_mi).toLocaleString() + ' km',
    chapterKicker: ch ? ch[0] : '',
    chapterTitle: ch ? ch[1] : '',
    chapterRange: ch ? ch[2] : '',
    isHero: !!HERO[l.seq],
    heroTitle: HERO[l.seq] || '',
    imageCaption: IMG[l.seq] || '',
  }
})
