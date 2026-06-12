import type { CSSProperties } from 'react'
import { PILOTS, PILOTS_INTRO } from '../data/pilots'
import FramedPhoto from './FramedPhoto'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }

export default function PilotsPage() {
  return (
    <div
      style={{
        maxWidth: 920,
        margin: '0 auto',
        padding: 'clamp(92px,12vh,132px) clamp(22px,5vw,40px) clamp(70px,10vh,110px)',
      }}
    >
      <div
        style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B23A33', marginBottom: 18 }}
      >
        The Crew
      </div>
      <h1
        style={{
          ...serif,
          fontWeight: 400,
          fontSize: 'clamp(38px,6.5vw,76px)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          margin: '0 0 26px',
        }}
      >
        The Pilots
      </h1>
      <p
        style={{
          ...serif,
          fontSize: 'clamp(18px,2.1vw,24px)',
          lineHeight: 1.5,
          color: '#2b2924',
          margin: 0,
          maxWidth: 680,
        }}
      >
        {PILOTS_INTRO}
      </p>

      {PILOTS.map((p, i) => (
        <section
          key={p.id}
          style={{
            marginTop: i === 0 ? 56 : 52,
            paddingTop: i === 0 ? 0 : 52,
            borderTop: i === 0 ? 'none' : '1px solid rgba(28,27,24,0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 'clamp(26px,4vw,52px)',
            alignItems: 'start',
          }}
        >
          <div>
            <FramedPhoto
              photo={p.photo}
              placeholderCaption={p.placeholderCaption}
              aspect="4 / 5"
              marginTop={0}
            />
          </div>

          <div>
            <div
              style={{ ...mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B23A33', marginBottom: 12 }}
            >
              {p.role}
            </div>
            <h2
              style={{ ...serif, fontWeight: 400, fontSize: 'clamp(30px,4.4vw,52px)', lineHeight: 1.0, letterSpacing: '-0.01em', margin: '0 0 6px' }}
            >
              {p.name}
            </h2>
            <div style={{ ...mono, fontSize: 11, color: '#756f64', letterSpacing: '0.04em', marginBottom: 22 }}>
              {p.lifespan}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 22 }}>
              {p.facts.map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '9px 0',
                    borderBottom: '1px solid rgba(28,27,24,0.1)',
                  }}
                >
                  <span style={{ color: '#756f64', fontSize: 13 }}>{f.label}</span>
                  <span style={{ ...mono, fontSize: 12, textAlign: 'right' }}>{f.value}</span>
                </div>
              ))}
            </div>

            {p.bio.map((para, idx) => (
              <p key={idx} style={{ fontSize: 15, lineHeight: 1.7, color: '#3a372f', margin: '0 0 14px' }}>
                {para}
              </p>
            ))}

            {p.quote && (
              <blockquote
                style={{
                  margin: '20px 0 0',
                  ...serif,
                  fontStyle: 'italic',
                  fontSize: 'clamp(20px,2.6vw,28px)',
                  lineHeight: 1.3,
                  color: '#B23A33',
                  borderLeft: '2px solid #B23A33',
                  paddingLeft: 18,
                }}
              >
                “{p.quote}”
              </blockquote>
            )}
          </div>
        </section>
      ))}

      <div style={{ ...serif, fontStyle: 'italic', fontSize: 15, color: '#756f64', marginTop: 54 }}>
        Built as a tribute.
      </div>
    </div>
  )
}
