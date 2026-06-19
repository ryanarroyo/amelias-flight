import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { RADIO_ENTRIES, RADIO_INTRO } from '../data/radioLog'
import type { LogEntry, Speaker } from '../data/radioLog'
import { createRadioAudio } from '../lib/radioAudio'
import type { RadioAudio } from '../lib/radioAudio'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }

const ACCENT = '#B23A33'
const STEP_MS = 6800 // dwell per transmission when playing — time to read each step

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SPEAKER_LABEL: Record<Speaker, string> = {
  earhart: 'KHAQQ · Earhart',
  itasca: 'Itasca',
  event: '',
}

function SignalMeter({ strength, active }: { strength: number | null; active: boolean }) {
  if (strength == null) {
    return <span style={{ ...mono, fontSize: 11, color: '#a9a395', letterSpacing: '0.1em' }}>NO SIGNAL</span>
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 2 }} aria-label={`Signal strength ${strength} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = n <= strength
        return (
          <span
            key={n}
            style={{
              width: 3.5,
              height: 5 + n * 2.5,
              borderRadius: 1,
              background: on ? ACCENT : 'rgba(28,27,24,0.12)',
              opacity: on && active && strength >= 5 ? 1 : on ? 0.9 : 1,
              animation: on && active && n === strength ? 'amPulse 1.3s ease-in-out infinite' : undefined,
            }}
          />
        )
      })}
    </span>
  )
}

function ClockBlock({ entry, active }: { entry: LogEntry; active: boolean }) {
  if (entry.speaker === 'event') return <div style={{ width: 84 }} />
  return (
    <div style={{ width: 84, flex: '0 0 84px', textAlign: 'right' }}>
      <div
        style={{
          ...mono,
          fontSize: 22,
          lineHeight: 1,
          letterSpacing: '0.01em',
          color: active ? ACCENT : '#1c1b18',
          transition: 'color 0.4s',
        }}
      >
        {entry.local}
      </div>
      <div style={{ ...mono, fontSize: 9.5, color: '#9a9486', letterSpacing: '0.12em', marginTop: 4 }}>ITASCA</div>
      <div style={{ ...mono, fontSize: 11, color: '#756f64', marginTop: 9 }}>{entry.gmt}</div>
      <div style={{ ...mono, fontSize: 9.5, color: '#9a9486', letterSpacing: '0.12em', marginTop: 2 }}>GMT</div>
    </div>
  )
}

function EntryRow({
  entry,
  active,
  showVariants,
  onSelect,
  refCb,
}: {
  entry: LogEntry
  active: boolean
  showVariants: boolean
  onSelect: () => void
  refCb: (el: HTMLDivElement | null) => void
}) {
  const isEvent = entry.speaker === 'event'
  const emphatic = entry.final || active

  if (isEvent) {
    return (
      <div ref={refCb} style={{ padding: '46px 0 8px', textAlign: 'center' }}>
        <p
          style={{
            ...serif,
            fontStyle: 'italic',
            fontSize: 'clamp(19px,2.4vw,26px)',
            lineHeight: 1.5,
            color: '#3a372f',
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          {entry.text}
        </p>
      </div>
    )
  }

  return (
    <div
      ref={refCb}
      onClick={onSelect}
      style={{
        display: 'flex',
        gap: 'clamp(16px,3vw,30px)',
        alignItems: 'flex-start',
        padding: '24px clamp(14px,2.5vw,22px)',
        cursor: 'pointer',
        borderRadius: 10,
        borderLeft: `2px solid ${emphatic ? ACCENT : 'transparent'}`,
        background: active ? 'rgba(178,58,51,0.05)' : 'transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <ClockBlock entry={entry} active={active} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <span
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: entry.speaker === 'earhart' ? ACCENT : '#756f64',
            }}
          >
            {SPEAKER_LABEL[entry.speaker]}
          </span>
          <SignalMeter strength={entry.strength} active={active} />
          {entry.final && (
            <span
              style={{
                ...mono,
                fontSize: 9.5,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                background: ACCENT,
                borderRadius: 999,
                padding: '3px 9px',
              }}
            >
              Last words
            </span>
          )}
        </div>

        <p
          style={{
            ...serif,
            fontSize: entry.final ? 'clamp(22px,2.9vw,32px)' : 'clamp(18px,2.1vw,23px)',
            lineHeight: 1.42,
            letterSpacing: '-0.005em',
            color: entry.speaker === 'itasca' ? '#5a554b' : '#1c1b18',
            fontStyle: entry.speaker === 'itasca' ? 'italic' : 'normal',
            margin: 0,
          }}
        >
          {entry.speaker === 'earhart' ? '“' : ''}
          {entry.text}
          {entry.speaker === 'earhart' ? '”' : ''}
        </p>

        {entry.note && (
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#756f64', margin: '12px 0 0', maxWidth: 600 }}>
            {entry.note}
          </p>
        )}

        {showVariants && entry.variants && entry.variants.length > 0 && (
          <div
            style={{
              marginTop: 16,
              border: '1px solid rgba(28,27,24,0.12)',
              borderRadius: 8,
              padding: '14px 16px',
              background: 'rgba(28,27,24,0.015)',
            }}
          >
            <div
              style={{ ...mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9486', marginBottom: 10 }}
            >
              How the logs differ
            </div>
            {entry.variants.map((v) => (
              <div key={v.source} style={{ marginBottom: 8 }}>
                <span style={{ ...mono, fontSize: 11, color: ACCENT }}>{v.source}</span>
                <p style={{ ...mono, fontSize: 12.5, lineHeight: 1.6, color: '#5a554b', margin: '3px 0 0' }}>{v.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function RadioLogPage() {
  const transmissionCount = RADIO_ENTRIES.filter((e) => e.speaker !== 'event').length
  const [active, setActive] = useState<number>(-1)
  const [playing, setPlaying] = useState(false)
  const [showVariants, setShowVariants] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const audioRef = useRef<RadioAudio | null>(null)

  // Create the radio-atmosphere engine. It defaults on, but browsers won't let an
  // AudioContext make sound until the user interacts — so we resume on the first gesture.
  useEffect(() => {
    const audio = createRadioAudio()
    audioRef.current = audio
    audio.setEnabled(true)
    audio.setLevel(null)

    const resume = () => audio.enable()
    const opts = { once: true, passive: true } as const
    window.addEventListener('pointerdown', resume, opts)
    window.addEventListener('keydown', resume, opts)
    window.addEventListener('scroll', resume, opts)

    return () => {
      window.removeEventListener('pointerdown', resume)
      window.removeEventListener('keydown', resume)
      window.removeEventListener('scroll', resume)
      audio.dispose()
      audioRef.current = null
    }
  }, [])

  // Drive the atmosphere from the active transmission's signal strength.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !soundOn) return
    const entry = active >= 0 ? RADIO_ENTRIES[active] : null
    if (!entry || entry.speaker === 'event') audio.silence()
    else audio.setLevel(entry.strength)
  }, [active, soundOn])

  // Auto-advance through the night while playing.
  useEffect(() => {
    if (!playing) return
    if (active >= RADIO_ENTRIES.length - 1) {
      setPlaying(false)
      return
    }
    const t = window.setTimeout(() => setActive((i) => i + 1), STEP_MS)
    return () => window.clearTimeout(t)
  }, [playing, active])

  // Keep the active transmission in view.
  useEffect(() => {
    if (active < 0) return
    const el = rowRefs.current[active]
    if (el)
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
  }, [active])

  const play = () => {
    if (active >= RADIO_ENTRIES.length - 1) setActive(-1)
    setPlaying(true)
  }

  // The click is the user gesture the AudioContext needs to start.
  const toggleSound = () => {
    const audio = audioRef.current
    if (!audio) return
    const next = !soundOn
    audio.setEnabled(next) // resumes/suspends the context
    if (next) {
      const entry = active >= 0 ? RADIO_ENTRIES[active] : null
      if (!entry || entry.speaker === 'event') audio.setLevel(null)
      else audio.setLevel(entry.strength)
    }
    setSoundOn(next)
  }
  const atEnd = active >= RADIO_ENTRIES.length - 1

  return (
    <div
      style={{
        maxWidth: 880,
        margin: '0 auto',
        padding: 'clamp(96px,12vh,140px) clamp(22px,5vw,40px) clamp(70px,10vh,110px)',
      }}
    >
      <div
        style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 18 }}
      >
        The Last Hours
      </div>
      <h1
        style={{
          ...serif,
          fontWeight: 400,
          fontSize: 'clamp(38px,6.5vw,76px)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          margin: '0 0 28px',
        }}
      >
        We must be on you,
        <br />
        but cannot see you.
      </h1>
      <p
        style={{
          fontSize: 'clamp(16px,1.9vw,19px)',
          lineHeight: 1.7,
          color: '#3a372f',
          margin: '0 0 14px',
          borderLeft: `2px solid ${ACCENT}`,
          paddingLeft: 20,
          maxWidth: 680,
        }}
      >
        {RADIO_INTRO}
      </p>
      <p style={{ ...mono, fontSize: 11.5, color: '#9a9486', letterSpacing: '0.04em', margin: '0 0 30px', paddingLeft: 22 }}>
        The Itasca kept time 11½ hours behind GMT. Both clocks are shown.
      </p>

      {/* Controls */}
      <div
        style={{
          position: 'sticky',
          top: 52,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
          padding: '12px 14px',
          marginBottom: 8,
          background: 'rgba(246,244,239,0.86)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: 10,
          border: '1px solid rgba(28,27,24,0.08)',
        }}
      >
        <button
          onClick={() => (playing ? setPlaying(false) : play())}
          style={{
            appearance: 'none',
            border: 0,
            cursor: 'pointer',
            font: 'inherit',
            ...mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#fff',
            background: ACCENT,
            borderRadius: 999,
            padding: '9px 18px',
          }}
        >
          {playing ? '❚❚ Pause' : atEnd ? '↺ Replay the night' : '▶ Play the night'}
        </button>

        <button
          onClick={() => setShowVariants((v) => !v)}
          style={{
            appearance: 'none',
            cursor: 'pointer',
            font: 'inherit',
            ...mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: showVariants ? ACCENT : '#756f64',
            background: 'none',
            border: `1px solid ${showVariants ? ACCENT : 'rgba(28,27,24,0.18)'}`,
            borderRadius: 999,
            padding: '9px 16px',
          }}
        >
          {showVariants ? '● Log variants' : '○ Log variants'}
        </button>

        <button
          onClick={toggleSound}
          title="Synthesized static, carrier tone, and the Itasca's Morse homing signal — no recording of the transmissions exists"
          style={{
            appearance: 'none',
            cursor: 'pointer',
            font: 'inherit',
            ...mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: soundOn ? ACCENT : '#756f64',
            background: 'none',
            border: `1px solid ${soundOn ? ACCENT : 'rgba(28,27,24,0.18)'}`,
            borderRadius: 999,
            padding: '9px 16px',
          }}
        >
          {soundOn ? '◉ Radio on' : '○ Radio'}
        </button>

        <span style={{ ...mono, fontSize: 11, color: '#9a9486', marginLeft: 'auto' }}>
          {active >= 0 && !atEnd
            ? `${Math.min(active + 1, transmissionCount)} / ${transmissionCount}`
            : `${transmissionCount} transmissions`}
        </span>
      </div>

      {/* Timeline */}
      <div style={{ marginTop: 8 }}>
        {RADIO_ENTRIES.map((entry, i) => (
          <EntryRow
            key={entry.id}
            entry={entry}
            active={i === active}
            showVariants={showVariants}
            onSelect={() => {
              setPlaying(false)
              setActive(i)
            }}
            refCb={(el) => (rowRefs.current[i] = el)}
          />
        ))}
      </div>

      <div style={{ marginTop: 48, paddingTop: 26, borderTop: '1px solid rgba(28,27,24,0.1)' }}>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: '#756f64', margin: 0 }}>
          Transmissions as logged aboard the USCGC Itasca, July 2, 1937. Surviving logs — Chief
          Radioman Leo Bellarts’ contemporaneous watch log, the smoothed “Position-1” log, and
          Commander Thompson’s later report — record the marquee lines in slightly different wording;
          the radioman’s log is shown as canonical, with documented differences under “Log variants.”
          Sources: U.S. National Archives (Bellarts radio log) and TIGHAR transcriptions. Earhart’s
          transmissions were spoken voice, not Morse. The Itasca carried no recording equipment, so
          no audio of them exists; the radio sound here is synthesized static, carrier tone, and the
          cutter’s actual Morse homing signal — the letter “A” keyed on 7500 kHz — never a
          reconstructed voice.
        </p>
        <div style={{ ...serif, fontStyle: 'italic', fontSize: 15, color: '#756f64', marginTop: 30 }}>
          Built as a tribute.
        </div>
      </div>
    </div>
  )
}
