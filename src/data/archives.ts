// The Archives — curated primary-source scans from the Smithsonian Institution
// Archives folder on Howland Island (the 1935–37 U.S. colonization that graded the
// runways for Amelia Earhart's planned landing). Each plate keeps BOTH the photo
// front and its annotated back — the typed Navy / Department of the Interior
// captions, handwritten expedition notes, and stamps — for provenance and
// authenticity. Back text is transcribed verbatim from the original scans.

export interface ArchivePlate {
  id: string
  /** Short descriptive title written for the gallery. */
  title: string
  /** Era / date as documented on the print. */
  date: string
  frontSrc: string
  backSrc: string
  /** Front aspect ratio (most are landscape ~5/4; the aerial is portrait). */
  frontAspect: string
  alt: string
  /** One-line context written for the site. */
  blurb: string
  /** Verbatim transcription of the markings on the back of the print. */
  backText: string
  /** Original photographic source noted on the print. */
  source: string
  /** Archival catalogue reference. */
  catalog: string
}

export const ARCHIVES_INTRO =
  'Before Amelia Earhart could land on Howland, someone had to build a runway on a coral ' +
  'sandbar two feet above the sea. Between 1935 and 1937 a rotation of young colonists, ' +
  'ferried out by Coast Guard cutters, cleared and graded three landing strips and waited. ' +
  'These are their photographs — held today by the Smithsonian Institution Archives. Each is ' +
  'shown front and back: the image as it was printed, and the reverse, with its typed captions, ' +
  'penciled expedition notes, and government stamps left exactly as the archive holds them.'

export const ARCHIVES_CREDIT = 'Smithsonian Institution Archives'

/**
 * Curated lead set (10 plates) drawn from a 23-print Howland folder, ranked for
 * both Earhart relevance and legibility. The day-beacon — the "Earhart Light" —
 * leads.
 */
export const ARCHIVE_PLATES: ArchivePlate[] = [
  {
    id: 'earhart-light',
    title: 'The Earhart Light',
    date: 'November 1937',
    frontSrc: '/photos/archives/arch-01-front.jpg',
    backSrc: '/photos/archives/arch-01-back.jpg',
    frontAspect: '5 / 4',
    alt: 'A white masonry day-beacon standing on flat Howland Island scrub, a Coast Guard cutter on the horizon offshore',
    blurb:
      'The day-beacon erected on Howland and named the "Earhart Light" — a navigation marker for ' +
      'the aviator who never arrived. The cutter Roger B. Taney rides offshore.',
    backText:
      'Equatorial Islands / Roger B. Taney and / Earhart Light / Howland Island / Nov. 1937 / #4 ' +
      '— stamped: RETURN TO · UNITED STATES DEPARTMENT OF THE INTERIOR · OFFICE OF THE SECRETARY · ' +
      'DIVISION OF TERRITORIES AND ISLAND POSSESSIONS · WASHINGTON',
    source: 'U.S. Department of the Interior',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'aerial-1942',
    title: 'Howland from 17,000 feet',
    date: 'March 15, 1942',
    frontSrc: '/photos/archives/aerial-island.jpg',
    backSrc: '/photos/archives/aerial-back.jpg',
    frontAspect: '3 / 4',
    alt: 'High-altitude vertical aerial of the entire oval of Howland Island ringed by reef and surf in dark ocean',
    blurb:
      'A vertical aerial of the whole island, reef and graded interior visible. Taken March 1942 — ' +
      'five years after the disappearance — it is the clearest single view of how small a target Howland was.',
    backText:
      'Typed label on front: HOWLAND ISLAND · March 15, 1942 / margin: 10 PH4-F/12 · 3/15/42 · ' +
      "17,000' / film edge: EASTMAN TOPOGRAPHIC NITRATE",
    source: 'U.S. military aerial survey',
    catalog: 'SIA Record Unit 245, Box 218',
  },
  {
    id: 'beacon-birds',
    title: 'Day-beacon and seabirds',
    date: 'November 1937',
    frontSrc: '/photos/archives/arch-22-front.jpg',
    backSrc: '/photos/archives/arch-22-back.jpg',
    frontAspect: '5 / 4',
    alt: 'The tapered masonry day-beacon tower on the flat coral plain with a low building at left and birds in the sky',
    blurb:
      'A second view of the beacon tower across the open coral flat, seabirds wheeling overhead — ' +
      'the frigatebirds and boobies that nested on the cleared strips.',
    backText:
      'neg. no. 225 / "Taney" / Howland / Nov. 37 / Dept. of Int. — stamped: THE SMITHSONIAN ' +
      'INSTITUTION NEGATIVE # · IF REPRODUCED OR RESOLD CREDIT SHOULD BE GIVEN',
    source: 'U.S. Department of the Interior',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'supply-transfer',
    title: 'Supplies transferred ship to shore',
    date: 'January 23, 1937',
    frontSrc: '/photos/archives/arch-07-front.jpg',
    backSrc: '/photos/archives/arch-07-back.jpg',
    frontAspect: '5 / 4',
    alt: 'A coral beach with crates and a signal staff, men unloading, the cutter Duane at anchor offshore under tall clouds',
    blurb:
      'Crates and gear coming ashore through the reef, the cutter Duane anchored beyond the surf line. ' +
      'Everything the colony used had to be landed by boat.',
    backText:
      'P.H. No. 210278 · JAN 23 1937 · Subject: Supplies Transferred From Ship To Howland Island · ' +
      'FLEET AIR BASE, PEARL HARBOR, T.H. · Official Photograph · NOT TO BE USED FOR PUBLICATION / ' +
      'note: Communication during unloading by semaphore, telephone line beach to radio shack, ship ' +
      'radiophone, and boats directed by megaphone from bridge of Duane.',
    source: 'Fleet Air Base, Pearl Harbor (U.S. Navy)',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'mess-hall',
    title: 'Mess hall and galley',
    date: 'January 23, 1937',
    frontSrc: '/photos/archives/arch-09-front.jpg',
    backSrc: '/photos/archives/arch-09-back.jpg',
    frontAspect: '5 / 4',
    alt: 'A low single-story building with an anemometer mast and open shed bays on the flat coral ground, a tent at far left',
    blurb:
      'The camp mess hall and galley, an anemometer turning on the roof. Inside, the note on the back ' +
      'records, stood an 800-gallon fresh-water tank — the colony’s entire reserve.',
    backText:
      'P.H. No. 210280 · JAN 23 1937 · Subject: Mess Hall and Galley At Howland Island · FLEET AIR ' +
      'BASE, PEARL HARBOR, T.H. · Official Photograph / note: Note 800 gallon fresh water tank inside ' +
      '— stamped: DEPARTMENT OF THE INTERIOR · DIVISION OF TERRITORIES AND ISLAND POSSESSIONS',
    source: 'Fleet Air Base, Pearl Harbor (U.S. Navy)',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'camp-flagpole',
    title: 'The colony, flag flying',
    date: '1937',
    frontSrc: '/photos/archives/arch-10-front.jpg',
    backSrc: '/photos/archives/arch-10-back.jpg',
    frontAspect: '5 / 4',
    alt: 'A large U.S. flag on a central flagpole flanked by two wood-frame shacks and a tent, a coral-lined path leading up the middle',
    blurb:
      'The heart of the camp: a flag on a central pole, two frame shacks, a coral-lined path. A handful ' +
      'of young men lived here, watching an empty sky on the morning of July 2, 1937.',
    backText:
      'neg. no. 184 / Howland / 6th Exp. — stamped: IF REPRODUCED OR RESOLD CREDIT SHOULD BE GIVEN · ' +
      'THE SMITHSONIAN INSTITUTION NEGATIVE #',
    source: 'U.S. Department of the Interior',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'camp-wide',
    title: 'View of Howland Island camp',
    date: 'January 23, 1937',
    frontSrc: '/photos/archives/arch-21-front.jpg',
    backSrc: '/photos/archives/arch-21-back.jpg',
    frontAspect: '5 / 4',
    alt: 'A wide view of the camp with a central flagpole, frame buildings on both sides, equipment, and graded paths through coral scrub',
    blurb:
      'A wider survey of the settlement — buildings to either side, equipment parked, paths graded ' +
      'through the coral. The print carries its own caption strip: "View of Howland Island Camp."',
    backText:
      'P.B. No. 210270 · JAN 23 1937 · Subject: View of Howland Island Camp · FLEET AIR BASE, PEARL ' +
      'HARBOR, T.H. — stamped: RETURN TO · UNITED STATES DEPARTMENT OF THE INTERIOR · DIVISION OF ' +
      'TERRITORIES AND ISLAND POSSESSIONS · WASHINGTON',
    source: 'Fleet Air Base, Pearl Harbor (U.S. Navy)',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'camp-telephoto',
    title: 'General view of camp, with birds',
    date: 'January 23, 1937',
    frontSrc: '/photos/archives/arch-17-front.jpg',
    backSrc: '/photos/archives/arch-17-back.jpg',
    frontAspect: '5 / 4',
    alt: 'A telephoto view across the water of low tents and huts along the white beach, seabirds over the camp under a cloudy sky',
    blurb:
      'Shot with a long lens from the crow’s nest of the cutter Duane: the camp strung along the ' +
      'beach, seabirds thick above it — the island as a ship’s lookout would have first seen it.',
    backText:
      'P.H. No. 210277 · JAN 23 1937 · Subject: General View Of Camp at Howland Island · FLEET AIR ' +
      'BASE, PEARL HARBOR, T.H. / note: Telephoto from crows nest of "Duane" — Note Birds',
    source: 'Fleet Air Base, Pearl Harbor (U.S. Navy)',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'weather-station',
    title: 'Balloon shelter and theodolite',
    date: 'January 23, 1937',
    frontSrc: '/photos/archives/arch-15-front.jpg',
    backSrc: '/photos/archives/arch-15-back.jpg',
    frontAspect: '5 / 4',
    alt: 'Two small instrument shelters on the open coral flat with a tripod-mounted theodolite between them, a tall antenna mast behind',
    blurb:
      'Not only a runway: a weather station. A theodolite stands between two instrument shelters, used ' +
      'to track pilot balloons and measure the winds aloft — the upper-air data that flights crossing ' +
      'the Pacific depended on.',
    backText:
      'P.H. No. 210274 · JAN 23 1937 · Subject: Balloon Shelter and Theodolite at Howland Island. Test ' +
      'House in center back. · FLEET AIR BASE, PEARL HARBOR, T.H. · Official Photograph · NOT TO BE ' +
      'USED FOR PUBLICATION',
    source: 'Fleet Air Base, Pearl Harbor (U.S. Navy)',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
  {
    id: 'camp-stores',
    title: 'Station building and stores',
    date: '1937',
    frontSrc: '/photos/archives/arch-08-front.jpg',
    backSrc: '/photos/archives/arch-08-back.jpg',
    frontAspect: '5 / 4',
    alt: 'A low building with a wind-vane mast and open-sided shed, a vehicle, barrels and stacked stores on the coral ground',
    blurb:
      'An anemometer mast, an open shed with a vehicle, barrels and stores stacked on the coral. The ' +
      'unglamorous logistics of keeping a few men alive a thousand miles from anywhere.',
    backText:
      'Howland / 1937 — stamped: THE SMITHSONIAN INSTITUTION NEGATIVE # · IF REPRODUCED OR RESOLD ' +
      'CREDIT SHOULD BE GIVEN',
    source: 'U.S. Department of the Interior',
    catalog: 'SIA Record Unit 245, Box 220, Folder 22',
  },
]
