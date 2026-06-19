// Amelia's Flight — "The Last Hours" radio-log data.
//
// The morning of July 2, 1937 (Itasca time), as the Electra approached Howland Island.
// Compiled from the USCGC Itasca radio logs. The cutter kept time 11½ hours BEHIND GMT,
// so the famous "0742"/"0843" figures are Itasca local time; both are shown.
//
// Several operators kept separate logs (Chief Radioman Leo Bellarts' contemporaneous watch
// log, the smoothed "Position-1" log, and Commander Thompson's later report), so the marquee
// lines survive in slightly different wordings. We show the radioman's log as canonical and
// expose the documented differences as "variants."
//
// Sources: NARA, Bellarts radio log scan (https://www.archives.gov/college-park/highlights/earhart-log);
// TIGHAR Itasca log transcriptions
// (https://tighar.org/Projects/Earhart/Archives/Research/Bulletins/37_ItascaLogs/Itascalog.html).

export type Speaker = 'earhart' | 'itasca' | 'event'

export interface LogVariant {
  source: string
  text: string
}

export interface LogEntry {
  id: string
  gmt: string // 24h GMT, e.g. "19:12"
  local: string // Itasca local (GMT − 11½h), e.g. "07:42"
  speaker: Speaker
  /** Canonical wording (Bellarts radio log), or a description for `event` rows. */
  text: string
  /** Logged signal strength S1–S5 where recorded; null when unreadable/not logged. */
  strength: number | null
  /** Context for the moment — kept brief and factual. */
  note?: string
  variants?: LogVariant[]
  /** The final confirmed transmission — styled as the climax. */
  final?: boolean
}

export const RADIO_INTRO =
  'For three hours before dawn on July 2, 1937, the Coast Guard cutter Itasca sat off Howland Island and listened. Amelia Earhart was inbound from Lae, 2,556 miles back, and the cutter was her one radio anchor in an empty ocean. Her voice came through in fragments — growing stronger, then desperate, then gone. This is that morning, kept in the radioman’s own log.'

// Itasca kept time 11½ hours behind GMT.
export const RADIO_ENTRIES: LogEntry[] = [
  {
    id: 'first-heard',
    gmt: '14:15',
    local: '02:45',
    speaker: 'earhart',
    text: 'Cloudy and overcast.',
    strength: 1,
    note: 'First reception. Her voice broke through the static for only a moment, barely readable.',
  },
  {
    id: 'will-listen',
    gmt: '15:15',
    local: '03:45',
    speaker: 'earhart',
    text: 'Will listen on the hour and half hour on 3105.',
    strength: 1,
    note: 'She announced her listening schedule — but never confirmed she could hear the Itasca answering.',
  },
  {
    id: 'partly-cloudy',
    gmt: '16:23',
    local: '04:53',
    speaker: 'earhart',
    text: 'Partly cloudy.',
    strength: 1,
    note: 'A weather word, and little else. The cutter poured back calls and weather she gave no sign of receiving.',
  },
  {
    id: 'itasca-calls',
    gmt: '17:00',
    local: '05:30',
    speaker: 'itasca',
    text: 'Itasca to KHAQQ — what is your position? Itasca has heard your phone. Please go ahead on key.',
    strength: null,
    note: 'The cutter asked, again and again, for a position. None ever came.',
  },
  {
    id: 'two-hundred',
    gmt: '17:42',
    local: '06:13',
    speaker: 'earhart',
    text: 'About two hundred miles out. Please take a bearing on us and report in half an hour. I will make noise in microphone — about a hundred miles out.',
    strength: 3,
    note: 'Stronger now, and closing. But her transmissions were too brief for the cutter to fix a bearing.',
  },
  {
    id: 'hundred-out',
    gmt: '18:15',
    local: '06:45',
    speaker: 'earhart',
    text: 'Please take bearing on us and answer on 3105 with voice.',
    strength: 4,
    note: 'Loud and near. Howland should have been minutes away — yet she could not see it, and still could not hear the ship.',
  },
  {
    id: 'must-be-on-you',
    gmt: '19:12',
    local: '07:42',
    speaker: 'earhart',
    text: 'KHAQQ calling Itasca. We must be on you but cannot see you, but gas is running low. Been unable to reach you by radio. We are flying at one thousand feet.',
    strength: 5,
    note: 'The loudest she had ever come in — as if directly overhead. And the first word of trouble: the fuel.',
    variants: [
      {
        source: 'Radio log (Bellarts)',
        text: 'KHAQQ to Itasca we must be on you but cannot see u but gas is running low been unable reach you by radio we are flying at 1000 feet',
      },
      {
        source: 'Itasca smooth log',
        text: 'KHAQQ calling Itasca. We must be on you but cannot see you but gas is running low. Have been unable to reach you by radio. We are flying at altitude 1,000 feet.',
      },
    ],
  },
  {
    id: 'circling',
    gmt: '19:28',
    local: '07:58',
    speaker: 'earhart',
    text: 'We are circling but cannot hear you. Go ahead on 7500 either now or on the scheduled time on half hour.',
    strength: 5,
    note: 'In the original log the word "circling" is typed over "drifting" — a small, haunting correction made in real time.',
    variants: [
      {
        source: 'Radio log (Bellarts)',
        text: 'KHAQQ to Itasca we are circling but cannot hear u go ahead on 7500 either now or on the scheduled time on half hour',
      },
      {
        source: 'Note on the original',
        text: '"circling" is overtyped on "drifting" — the radioman caught her word as it changed.',
      },
    ],
  },
  {
    id: 'received-sigs',
    gmt: '19:30',
    local: '08:00',
    speaker: 'earhart',
    text: 'We received your signals but unable to get a minimum. Please take bearing on us and answer on 3105 with voice.',
    strength: 4,
    note: 'At her request the Itasca had been keying the Morse letter “A” on 7500 kHz as a homing signal. She heard it — the one moment she confirmed hearing the ship — but it would not hold steady long enough to swing a direction-finder onto her.',
  },
  {
    id: 'line-157-337',
    gmt: '20:13',
    local: '08:43',
    speaker: 'earhart',
    text: 'We are on the line 157 337. We will repeat this message. We will repeat this on 6210 kilocycles. Wait. We are running on line north and south.',
    strength: 5,
    note: 'A sun line through Howland — but it told her position along the line, never where on it she was. These were the last words anyone is confirmed to have heard from her.',
    final: true,
    variants: [
      {
        source: 'Radio log (Bellarts)',
        text: 'KHAQQ to Itasca we are on the line 157 337 will repeat this msg will repeat this on 6210 kcs wait we are running on line north and south',
      },
      {
        source: 'Thompson report',
        text: 'We are on the line of position 157–337 … running north and south.',
      },
    ],
  },
  {
    id: 'silence',
    gmt: '—',
    local: '—',
    speaker: 'event',
    text: 'Then, silence. The Itasca called for hours on every frequency she had named. Nothing answered. By 10:30 that morning the cutter was steaming north at full speed to begin the search.',
    strength: null,
  },
]
