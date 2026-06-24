import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { RECORDS, RECORDS_INTRO, RECORDS_NOTE } from '../data/records'
import SiteFooter from './SiteFooter'
import { RecordsGlobe } from '../lib/recordsGlobe'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }
const ACCENT = '#B23A33'

const statLabel: CSSProperties = {
  ...mono,
  fontSize: 9,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#756f64',
  marginBottom: 3,
}
const statValue: CSSProperties = { ...mono, fontSize: 13.5, color: '#1c1b18' }

export default function RecordsPage() {
  const [active, setActive] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<RecordsGlobe | null>(null)

  useEffect(() => {
    let reduced = false
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      /* noop */
    }
    const globe = new RecordsGlobe(reduced)
    globe.attach(canvasRef.current)
    globe.init()
    globe.setActive(RECORDS[0])
    globeRef.current = globe
    return () => {
      globe.destroy()
      globeRef.current = null
    }
  }, [])

  useEffect(() => {
    globeRef.current?.setActive(RECORDS[active])
  }, [active])

  const rec = RECORDS[active]

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 'clamp(96px,12vh,140px) clamp(22px,5vw,40px) clamp(70px,10vh,110px)',
      }}
    >
      <div
        style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 18 }}
      >
        Before the World Flight
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
        The Records
      </h1>
      <p
        style={{
          fontSize: 'clamp(16px,1.9vw,19px)',
          lineHeight: 1.7,
          color: '#3a372f',
          margin: '0 0 36px',
          borderLeft: `2px solid ${ACCENT}`,
          paddingLeft: 20,
          maxWidth: 680,
        }}
      >
        {RECORDS_INTRO}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 'clamp(26px,4vw,52px)',
          alignItems: 'start',
        }}
      >
        {/* Sticky globe + active-record stats */}
        <div style={{ position: 'sticky', top: 84 }}>
          <div style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 460, margin: '0 auto' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(18px,4vw,40px)',
              marginTop: 8,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={statLabel}>Distance</div>
              <div style={statValue}>{rec.distance_mi.toLocaleString()} mi</div>
            </div>
            <div>
              <div style={statLabel}>Time aloft</div>
              <div style={statValue}>{rec.duration}</div>
            </div>
            <div>
              <div style={statLabel}>Date</div>
              <div style={statValue}>{rec.date}</div>
            </div>
          </div>
        </div>

        {/* Record list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {RECORDS.map((r, i) => {
            const on = i === active
            return (
              <button
                key={r.id}
                onClick={() => setActive(i)}
                style={{
                  appearance: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  font: 'inherit',
                  color: 'inherit',
                  background: on ? 'rgba(178,58,51,0.05)' : 'transparent',
                  border: '1px solid',
                  borderColor: on ? 'rgba(178,58,51,0.35)' : 'rgba(28,27,24,0.12)',
                  borderRadius: 12,
                  padding: 'clamp(16px,2.4vw,22px)',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                  <span style={{ ...mono, fontSize: 12, color: ACCENT, letterSpacing: '0.06em' }}>{r.year}</span>
                  <span style={{ ...serif, fontSize: 'clamp(20px,2.6vw,27px)', lineHeight: 1.1 }}>{r.title}</span>
                </div>
                <div style={{ ...mono, fontSize: 11.5, color: '#756f64', marginBottom: on ? 14 : 0 }}>
                  {r.origin.name} → {r.destination.name} · {r.distance_mi.toLocaleString()} mi
                </div>

                {on && (
                  <>
                    <div
                      style={{
                        ...serif,
                        fontStyle: 'italic',
                        fontSize: 'clamp(16px,1.9vw,20px)',
                        lineHeight: 1.35,
                        color: ACCENT,
                        margin: '0 0 14px',
                      }}
                    >
                      {r.firstLine}
                    </div>
                    <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#3a372f', margin: 0 }}>{r.caption}</p>
                  </>
                )}
              </button>
            )
          })}

          <p style={{ fontSize: 13, lineHeight: 1.7, color: '#756f64', margin: '14px 4px 0' }}>{RECORDS_NOTE}</p>
        </div>
      </div>

      <SiteFooter marginTop={54} />
    </div>
  )
}
