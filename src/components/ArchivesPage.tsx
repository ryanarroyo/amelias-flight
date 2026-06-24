import { useEffect, useState, type CSSProperties } from 'react'
import SiteFooter from './SiteFooter'
import {
  ARCHIVE_PLATES,
  ARCHIVES_INTRO,
  ARCHIVES_CREDIT,
  type ArchivePlate,
} from '../data/archives'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }
const ACCENT = '#B23A33'

/** Track a media query so the front/back pair can stack on narrow screens. */
function useMatch(query: string) {
  const get = () => {
    try {
      return window.matchMedia(query).matches
    } catch {
      return false
    }
  }
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    let mq: MediaQueryList
    try {
      mq = window.matchMedia(query)
    } catch {
      return
    }
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

function Scan({
  src,
  alt,
  aspect,
  label,
}: {
  src: string
  alt: string
  aspect: string
  label: string
}) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div
        style={{
          aspectRatio: aspect,
          background: '#ece8e0',
          border: '1px solid rgba(28,27,24,0.14)',
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          boxShadow: '0 1px 0 rgba(28,27,24,0.04)',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>
      <figcaption
        style={{
          ...mono,
          fontSize: 9.5,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#9a9486',
        }}
      >
        {label}
      </figcaption>
    </figure>
  )
}

function Plate({ plate, wide }: { plate: ArchivePlate; wide: boolean }) {
  // The front carries the image; the back is shown smaller beside it (or under it).
  const pair: CSSProperties = wide
    ? { display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 22, alignItems: 'start' }
    : { display: 'flex', flexDirection: 'column', gap: 18 }

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 22,
        paddingTop: 'clamp(40px,6vh,64px)',
        marginTop: 'clamp(40px,6vh,64px)',
        borderTop: '1px solid rgba(28,27,24,0.1)',
      }}
    >
      <div style={pair}>
        <Scan src={plate.frontSrc} alt={plate.alt} aspect={plate.frontAspect} label="Front · the photograph" />
        <Scan
          src={plate.backSrc}
          alt={`Reverse of the print: ${plate.title} — archival markings and stamps`}
          aspect="4 / 5"
          label="Back · markings & stamps"
        />
      </div>

      <div style={{ maxWidth: 760 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
          <h2
            style={{
              ...serif,
              fontWeight: 400,
              fontSize: 'clamp(24px,3.2vw,34px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            {plate.title}
          </h2>
          <span style={{ ...mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT }}>
            {plate.date}
          </span>
        </div>

        <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#3a372f', margin: '0 0 16px' }}>{plate.blurb}</p>

        {/* Verbatim transcription of the reverse — the provenance. */}
        <div
          style={{
            borderLeft: `2px solid ${ACCENT}`,
            background: 'rgba(28,27,24,0.025)',
            borderRadius: '0 4px 4px 0',
            padding: '11px 16px',
            marginBottom: 14,
          }}
        >
          <div
            style={{ ...mono, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9a9486', marginBottom: 6 }}
          >
            Transcribed from the back
          </div>
          <p style={{ ...mono, fontSize: 12, lineHeight: 1.65, color: '#5a554b', margin: 0 }}>{plate.backText}</p>
        </div>

        <div style={{ ...mono, fontSize: 11, lineHeight: 1.6, color: '#756f64' }}>
          {plate.source} · {plate.catalog}
        </div>
      </div>
    </section>
  )
}

export default function ArchivesPage() {
  const wide = useMatch('(min-width: 760px)')

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: 'clamp(96px,12vh,140px) clamp(22px,5vw,40px) clamp(70px,10vh,110px)',
      }}
    >
      <div style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, marginBottom: 18 }}>
        Primary Sources
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
        The Archives
      </h1>
      <p
        style={{
          fontSize: 'clamp(16px,1.9vw,19px)',
          lineHeight: 1.7,
          color: '#3a372f',
          margin: '0 0 8px',
          borderLeft: `2px solid ${ACCENT}`,
          paddingLeft: 20,
          maxWidth: 720,
        }}
      >
        {ARCHIVES_INTRO}
      </p>
      <div style={{ ...mono, fontSize: 11, letterSpacing: '0.06em', color: '#756f64', paddingLeft: 22, marginBottom: 6 }}>
        {ARCHIVE_PLATES.length} plates · courtesy {ARCHIVES_CREDIT}
      </div>

      {ARCHIVE_PLATES.map((plate) => (
        <Plate key={plate.id} plate={plate} wide={wide} />
      ))}

      <p style={{ ...mono, fontSize: 11.5, lineHeight: 1.7, color: '#756f64', margin: '48px 0 0', maxWidth: 760 }}>
        Images courtesy of the {ARCHIVES_CREDIT} (Record Unit 245). Reproduced with the archive’s
        markings intact. Several prints originated as U.S. Navy (Fleet Air Base, Pearl Harbor) and
        U.S. Department of the Interior photographs.
      </p>
      <SiteFooter marginTop={28} />
    </div>
  )
}
