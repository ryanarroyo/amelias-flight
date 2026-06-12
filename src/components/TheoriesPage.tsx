import type { CSSProperties } from 'react'
import { THEORIES } from '../data/amelia'
import type { PhotoData } from '../lib/photo'
import FramedPhoto from './FramedPhoto'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }

// Earhart and Noonan before the final leg. Wide banner crop biased toward their faces.
const HEADER_PHOTO: PhotoData = {
  src: '/photos/earhart-noonan.jpg',
  alt: 'Amelia Earhart and navigator Fred Noonan standing together in front of the Electra, 1937',
  caption: 'Amelia Earhart and Fred Noonan, 1937',
  credit: 'San Diego Air & Space Museum',
  objectPosition: 'center 8%',
}

export default function TheoriesPage() {
  return (
    <div
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: 'clamp(96px,12vh,140px) clamp(22px,5vw,40px) clamp(70px,10vh,110px)',
      }}
    >
      <div
        style={{ ...mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B23A33', marginBottom: 18 }}
      >
        The Disappearance
      </div>
      <h1
        style={{
          ...serif,
          fontWeight: 400,
          fontSize: 'clamp(38px,6.5vw,76px)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          margin: '0 0 30px',
        }}
      >
        One disappearance,
        <br />
        many answers.
      </h1>
      <p
        style={{
          fontSize: 'clamp(16px,1.9vw,19px)',
          lineHeight: 1.7,
          color: '#3a372f',
          margin: '0 0 16px',
          borderLeft: '2px solid #B23A33',
          paddingLeft: 20,
        }}
      >
        {THEORIES.intro}
      </p>

      <FramedPhoto
        photo={HEADER_PHOTO}
        placeholderCaption="Earhart and Noonan before the final leg, Lae — photo to be added"
        aspect="16 / 7"
        marginTop={30}
      />

      <div style={{ marginTop: 18 }}>
        {THEORIES.theories.map((t) => (
          <article key={t.id} style={{ padding: '38px 0', borderBottom: '1px solid rgba(28,27,24,0.1)' }}>
            <div
              style={{
                display: 'inline-block',
                ...mono,
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#756f64',
                border: '1px solid rgba(28,27,24,0.16)',
                borderRadius: 999,
                padding: '4px 11px',
                marginBottom: 16,
              }}
            >
              {t.stance}
            </div>
            <h2
              style={{
                ...serif,
                fontWeight: 400,
                fontSize: 'clamp(26px,3.4vw,40px)',
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                margin: '0 0 16px',
              }}
            >
              {t.title}
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.72, color: '#3a372f', margin: '0 0 20px' }}>{t.summary}</p>
            <blockquote
              style={{
                margin: 0,
                ...serif,
                fontStyle: 'italic',
                fontSize: 'clamp(19px,2.3vw,25px)',
                lineHeight: 1.35,
                color: '#B23A33',
              }}
            >
              “{t.hook}”
            </blockquote>
          </article>
        ))}
      </div>

      <p style={{ fontSize: 'clamp(16px,1.9vw,19px)', lineHeight: 1.7, color: '#3a372f', margin: '36px 0 0' }}>
        {THEORIES.closing}
      </p>
      <div style={{ ...serif, fontStyle: 'italic', fontSize: 15, color: '#756f64', marginTop: 46 }}>
        Built as a tribute.
      </div>
    </div>
  )
}
