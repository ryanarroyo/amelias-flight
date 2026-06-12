import { useState, type CSSProperties } from 'react'
import { PLAN_SVG, BLUEPRINT_SVG, PERSPECTIVE_SVG } from '../lib/electraSvgs'
import { ELECTRA_HEADER, ELECTRA_BODY } from '../lib/electraStatic'
import type { PhotoData } from '../lib/photo'
import FramedPhoto from './FramedPhoto'

type Schematic = 'plan' | 'blueprint' | 'persp'

// A real archival photo of the Lockheed Model 10 Electra (same model as NR16020).
const ELECTRA_PHOTO: PhotoData = {
  src: '/photos/electra-aircraft.jpg',
  alt: 'A Lockheed Model 10A Electra airliner, registration NC233Y, on the ground in the 1930s',
  caption: "A Lockheed Model 10A Electra (NC233Y) — sister to Earhart's 10-E",
  credit: 'San Diego Air & Space Museum',
  objectPosition: 'center 48%',
}

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }

const toggleBtn: CSSProperties = {
  appearance: 'none',
  border: 0,
  background: 'none',
  font: 'inherit',
  cursor: 'pointer',
  ...mono,
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#1c1b18',
  padding: '4px 2px',
  position: 'relative',
}
const underline: CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -2,
  height: 1.5,
  background: '#B23A33',
}

function ToggleBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={toggleBtn}>
      {label}
      {active && <span style={underline} />}
    </button>
  )
}

export default function ElectraPage() {
  const [schematic, setSchematic] = useState<Schematic>('plan')

  return (
    <div
      style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: 'clamp(92px,12vh,132px) clamp(20px,4vw,40px) clamp(70px,10vh,110px)',
      }}
    >
      {/* header + intro (verbatim) */}
      <div dangerouslySetInnerHTML={{ __html: ELECTRA_HEADER }} />

      {/* archival photo of the aircraft type */}
      <FramedPhoto
        photo={ELECTRA_PHOTO}
        placeholderCaption="A Lockheed Model 10 Electra — archival photo to be added"
        aspect="16 / 9"
        marginTop={32}
      />

      {/* schematic figure */}
      <div
        style={{
          marginTop: 42,
          border: '1px solid rgba(28,27,24,0.18)',
          borderRadius: 5,
          background: '#F3F1EB',
          padding: 'clamp(12px,2vw,22px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span style={{ ...mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#756f64' }}>
            Lockheed 10-E — General Arrangement
          </span>
          <div style={{ display: 'flex', gap: 18 }}>
            <ToggleBtn label="Plan" active={schematic === 'plan'} onClick={() => setSchematic('plan')} />
            <ToggleBtn label="Blueprint" active={schematic === 'blueprint'} onClick={() => setSchematic('blueprint')} />
            <ToggleBtn label="Perspective" active={schematic === 'persp'} onClick={() => setSchematic('persp')} />
          </div>
        </div>

        {schematic === 'plan' && <div dangerouslySetInnerHTML={{ __html: PLAN_SVG }} />}
        {schematic === 'blueprint' && <div dangerouslySetInnerHTML={{ __html: BLUEPRINT_SVG }} />}
        {schematic === 'persp' && <div dangerouslySetInnerHTML={{ __html: PERSPECTIVE_SVG }} />}
      </div>

      {/* gauges + spec table + features + note (verbatim) */}
      <div dangerouslySetInnerHTML={{ __html: ELECTRA_BODY }} />
    </div>
  )
}
