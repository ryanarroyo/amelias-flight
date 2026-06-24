import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  ISLAND,
  ISLAND_INTRO,
  ISLAND_STAGES,
  ISLAND_CLOSING,
  ISLAND_SOURCES,
  RADIO_POINTS,
  crossTrackNm,
  nmToSm,
} from '../data/island'
import IslandDiagram, { type DiagramLayers } from './IslandDiagram'
import FramedPhoto from './FramedPhoto'
import type { PhotoData } from '../lib/photo'
import { RecordsGlobe } from '../lib/recordsGlobe'
import type { FlightRecord } from '../data/records'

const AERIAL_PHOTO: PhotoData = {
  src: '/photos/howland-aerial-usfws.jpg',
  alt: 'Low aerial view of Howland Island, a flat coral sandbar ringed by a reef and breaking surf',
  caption: 'Howland Island — a flat coral sandbar barely twenty feet high, ringed by reef',
  credit: 'U.S. Fish & Wildlife Service',
}
const CAMP_PHOTO: PhotoData = {
  src: '/photos/archives/arch-10-front.jpg',
  alt: 'A U.S. flag on a central flagpole flanked by two wood-frame shacks and a tent at the Howland colonists’ camp, 1937',
  caption: 'The colonists’ camp, Howland, 1937 — they graded the runways and waited',
  credit: 'Smithsonian Institution Archives',
}
const LIGHT_PHOTO: PhotoData = {
  src: '/photos/archives/arch-01-front.jpg',
  alt: 'The white masonry day-beacon known as the Earhart Light on Howland, a Coast Guard cutter offshore, November 1937',
  caption: 'The “Earhart Light” on Howland, November 1937 — a beacon named for the aviator who never arrived',
  credit: 'Smithsonian Institution Archives',
}
const ORBIT_PHOTO: PhotoData = {
  src: '/photos/howland-iss-nasa.jpg',
  alt: 'Howland Island photographed from the International Space Station — a tiny pale speck in the open ocean',
  caption: 'Howland from orbit — a pale speck in the open Pacific',
  credit: 'NASA / Johnson Space Center',
  objectPosition: 'center 45%',
}

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }
const ACCENT = '#B23A33'
const DIAGRAM_PX = 460

// The final leg, for the globe intro beat (reusing the records globe).
const LAST_LEG: FlightRecord = {
  id: 'lae-howland',
  year: '1937',
  title: 'Lae → Howland',
  date: 'July 2, 1937',
  origin: { name: 'Lae', lat: -6.7322, lon: 146.9964 },
  destination: { name: 'Howland', lat: 0.8062, lon: -176.6175 },
  distance_mi: ISLAND.distanceSm,
  duration: ISLAND.flightTime,
  firstLine: '',
  caption: '',
}

const reducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

function targetsFor(stageId: string, headingErr: number) {
  const R = nmToSm(crossTrackNm(headingErr))
  const perShot = nmToSm(ISLAND.perShotFixNm)
  switch (stageId) {
    case 'speck':
      return { span: 26, along: 0, perp: 0 }
    case 'dr':
      return { span: 440, along: R, perp: R }
    default: // sunline | radio | search
      return { span: 440, along: R, perp: perShot }
  }
}

function layersFor(stageId: string, showSecondLop: boolean): DiagramLayers {
  switch (stageId) {
    case 'speck':
      return { island: true, visibility: true, uncertainty: false, lop: false, secondLop: false, plane: false }
    case 'dr':
      return { island: true, visibility: true, uncertainty: true, lop: false, secondLop: false, plane: false }
    case 'sunline':
      return { island: true, visibility: true, uncertainty: true, lop: true, secondLop: showSecondLop, plane: false }
    case 'radio':
      return { island: true, visibility: false, uncertainty: true, lop: true, secondLop: false, plane: false }
    case 'search':
      return { island: true, visibility: false, uncertainty: false, lop: true, secondLop: false, plane: true }
    default:
      return { island: true, visibility: false, uncertainty: false, lop: false, secondLop: false, plane: false }
  }
}

export default function IslandPage() {
  const [stageIdx, setStageIdx] = useState(0)
  const [headingErr, setHeadingErr] = useState(1.5)
  const [showSecondLop, setShowSecondLop] = useState(false)
  const [, forceRender] = useState(0)

  const stage = ISLAND_STAGES[stageIdx]
  const cur = useRef({ span: 26, along: 0, perp: 0, phase: 0 })
  const raf = useRef<number | null>(null)

  // Globe intro beat.
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const globe = new RecordsGlobe(reducedMotion())
    globe.attach(canvasRef.current)
    globe.init()
    globe.setActive(LAST_LEG)
    return () => globe.destroy()
  }, [])

  // Animate span + uncertainty axes toward the active stage's targets; sweep the plane in 'search'.
  useEffect(() => {
    const reduced = reducedMotion()
    const t = targetsFor(stage.id, headingErr)
    const planePerp = nmToSm(ISLAND.perShotFixNm)

    if (reduced) {
      cur.current.span = t.span
      cur.current.along = t.along
      cur.current.perp = t.perp
      cur.current.phase = stage.id === 'search' ? 0.6 : 0
      forceRender((n) => n + 1)
      return
    }

    const lerp = (a: number, b: number) => a + (b - a) * 0.12
    const step = () => {
      const c = cur.current
      c.span = lerp(c.span, t.span)
      c.along = lerp(c.along, t.along)
      c.perp = lerp(c.perp, t.perp)
      if (stage.id === 'search') c.phase += 0.018
      const settled =
        Math.abs(c.span - t.span) < 0.3 && Math.abs(c.along - t.along) < 0.05 && Math.abs(c.perp - t.perp) < 0.05
      forceRender((n) => n + 1)
      if (!settled || stage.id === 'search') raf.current = requestAnimationFrame(step)
      else raf.current = null
    }
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = null
    }
    // planePerp is constant; deps cover what changes the targets/animation.
    void planePerp
  }, [stage.id, headingErr])

  const layers = layersFor(stage.id, showSecondLop)
  const planeT = Math.sin(cur.current.phase)
  const planePerp = nmToSm(ISLAND.perShotFixNm)

  const offTrackNm = crossTrackNm(headingErr)

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 'clamp(96px,12vh,140px) clamp(22px,5vw,40px) clamp(70px,10vh,110px)',
      }}
    >
      <div style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 18 }}>
        Finding Howland
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
        The Island
      </h1>
      <p
        style={{
          fontSize: 'clamp(16px,1.9vw,19px)',
          lineHeight: 1.7,
          color: '#3a372f',
          margin: '0 0 36px',
          borderLeft: `2px solid ${ACCENT}`,
          paddingLeft: 20,
          maxWidth: 720,
        }}
      >
        {ISLAND_INTRO}
      </p>

      <div style={{ maxWidth: 720, marginBottom: 'clamp(40px,6vh,72px)' }}>
        <FramedPhoto photo={AERIAL_PHOTO} aspect="3 / 2" marginTop={0} />
      </div>

      {/* Globe intro beat */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(40px,6vh,72px)' }}>
        <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 340 }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
        <div style={{ ...mono, fontSize: 11.5, color: '#756f64', marginTop: 6, textAlign: 'center' }}>
          {ISLAND.distanceSm.toLocaleString()} miles from Lae · {ISLAND.flightTime} aloft · the last leg
        </div>
      </div>

      {/* Interactive */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: 'clamp(26px,4vw,52px)',
          alignItems: 'start',
        }}
      >
        {/* Sticky diagram */}
        <div style={{ position: 'sticky', top: 84 }}>
          <IslandDiagram
            size={DIAGRAM_PX}
            spanMiles={cur.current.span}
            layers={layers}
            uncertaintyAlongMi={cur.current.along}
            uncertaintyPerpMi={cur.current.perp}
            planeT={planeT}
            planeOffsetMi={planePerp}
          />
          <div style={{ ...mono, fontSize: 11, color: '#9a9486', textAlign: 'center', marginTop: 6 }}>
            view ≈ {Math.round(cur.current.span).toLocaleString()} miles across · drawn to scale
          </div>
        </div>

        {/* Stage rail */}
        <div>
          {/* step chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
            {ISLAND_STAGES.map((s, i) => {
              const on = i === stageIdx
              return (
                <button
                  key={s.id}
                  onClick={() => setStageIdx(i)}
                  style={{
                    appearance: 'none',
                    cursor: 'pointer',
                    font: 'inherit',
                    ...mono,
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: on ? '#fff' : '#756f64',
                    background: on ? ACCENT : 'transparent',
                    border: `1px solid ${on ? ACCENT : 'rgba(28,27,24,0.18)'}`,
                    borderRadius: 999,
                    padding: '6px 12px',
                  }}
                >
                  {i + 1}. {s.kicker}
                </button>
              )
            })}
          </div>

          <div style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, marginBottom: 10 }}>
            {stage.kicker}
          </div>
          <h2 style={{ ...serif, fontWeight: 400, fontSize: 'clamp(24px,3.4vw,38px)', lineHeight: 1.08, margin: '0 0 16px' }}>
            {stage.title}
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.72, color: '#3a372f', margin: '0 0 20px' }}>{stage.body}</p>

          {/* Controls */}
          {stage.control === 'heading' && (
            <div style={{ border: '1px solid rgba(28,27,24,0.12)', borderRadius: 12, padding: '16px 18px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ ...mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#756f64' }}>
                  Heading error
                </span>
                <span style={{ ...mono, fontSize: 14, color: ACCENT }}>{headingErr.toFixed(1)}°</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.1}
                value={headingErr}
                onChange={(e) => setHeadingErr(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: ACCENT }}
                aria-label="Heading error in degrees"
              />
              <div style={{ ...mono, fontSize: 12, color: '#5a554b', marginTop: 12, lineHeight: 1.6 }}>
                {headingErr.toFixed(1)}° over {ISLAND.distanceNm.toLocaleString()} nmi ≈{' '}
                <span style={{ color: ACCENT }}>{Math.round(offTrackNm)} nmi off track</span> (
                {Math.round(nmToSm(offTrackNm))} mi). You can see {ISLAND.visibilityMi}.
              </div>
            </div>
          )}

          {stage.control === 'secondLop' && (
            <button
              onClick={() => setShowSecondLop((v) => !v)}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                font: 'inherit',
                ...mono,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: showSecondLop ? '#fff' : ACCENT,
                background: showSecondLop ? ACCENT : 'transparent',
                border: `1px solid ${ACCENT}`,
                borderRadius: 999,
                padding: '10px 18px',
                marginBottom: 20,
              }}
            >
              {showSecondLop ? '● A second sun line — a fix' : '○ Add a second sun line'}
            </button>
          )}

          {/* Radio breakdown */}
          {stage.id === 'radio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {RADIO_POINTS.map((r) => (
                <div key={r.label} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: 14 }}>
                  <div style={{ ...mono, fontSize: 11.5, color: ACCENT, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: '#3a372f' }}>{r.text}</div>
                </div>
              ))}
            </div>
          )}

          {/* Prev / Next */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setStageIdx((i) => Math.max(0, i - 1))}
              disabled={stageIdx === 0}
              style={navBtn(stageIdx === 0)}
            >
              ← Back
            </button>
            <button
              onClick={() => setStageIdx((i) => Math.min(ISLAND_STAGES.length - 1, i + 1))}
              disabled={stageIdx === ISLAND_STAGES.length - 1}
              style={navBtn(stageIdx === ISLAND_STAGES.length - 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 'clamp(16px,1.9vw,19px)', lineHeight: 1.7, color: '#3a372f', margin: '54px 0 0', maxWidth: 720 }}>
        {ISLAND_CLOSING}
      </p>
      <p style={{ fontSize: 'clamp(16px,1.9vw,19px)', lineHeight: 1.7, color: '#3a372f', margin: '16px 0 0', maxWidth: 720 }}>
        Howland was not even empty. A handful of young colonists had cleared the runways and were on
        the island that dawn — flags flying, watching a sky that stayed empty.
      </p>

      <div style={{ maxWidth: 720, marginTop: 28 }}>
        <FramedPhoto photo={CAMP_PHOTO} aspect="4 / 3" marginTop={0} />
      </div>

      <div style={{ maxWidth: 720, marginTop: 22 }}>
        <FramedPhoto photo={ORBIT_PHOTO} aspect="16 / 9" marginTop={0} />
      </div>

      <p style={{ fontSize: 'clamp(16px,1.9vw,19px)', lineHeight: 1.7, color: '#3a372f', margin: '40px 0 0', maxWidth: 720 }}>
        Months later a day-beacon went up on the island, named the “Earhart Light.” It marked a
        landfall for a flight that never came — and still stands. The full folder of the colonists’
        own photographs, fronts and annotated backs, is gathered in{' '}
        <span style={{ color: ACCENT }}>The Archives</span>.
      </p>

      <div style={{ maxWidth: 720, marginTop: 22 }}>
        <FramedPhoto photo={LIGHT_PHOTO} aspect="5 / 4" marginTop={0} />
      </div>

      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: '#756f64', margin: '36px 0 0' }}>{ISLAND_SOURCES}</p>
      <div style={{ ...serif, fontStyle: 'italic', fontSize: 15, color: '#756f64', marginTop: 30 }}>Built as a tribute.</div>
    </div>
  )
}

function navBtn(disabled: boolean): CSSProperties {
  return {
    appearance: 'none',
    cursor: disabled ? 'default' : 'pointer',
    font: 'inherit',
    fontFamily: "'IBM Plex Mono',monospace",
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: disabled ? '#bdb8ac' : '#1c1b18',
    background: 'none',
    border: '1px solid rgba(28,27,24,0.18)',
    borderRadius: 999,
    padding: '9px 16px',
  }
}
