import type { CSSProperties } from 'react'
import type { CardData } from '../lib/cards'
import FramedPhoto from './FramedPhoto'

const section: CSSProperties = {
  minHeight: '92vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '0 clamp(20px,5vw,76px)',
  gap: 16,
}
const colWidth = 'min(448px,88vw)'
const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }

export default function StepCard({ card }: { card: CardData }) {
  return (
    <div data-step={card.seq} style={section}>
      {card.chapterTitle && (
        <div style={{ width: colWidth, pointerEvents: 'auto', marginBottom: 4 }}>
          <div
            style={{
              ...mono,
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B23A33',
              marginBottom: 8,
            }}
          >
            {card.chapterKicker}
          </div>
          <h2
            style={{
              fontFamily: "'Newsreader',serif",
              fontWeight: 400,
              fontSize: 'clamp(30px,4.2vw,50px)',
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              margin: '0 0 7px',
            }}
          >
            {card.chapterTitle}
          </h2>
          <div style={{ ...mono, fontSize: 11, letterSpacing: '0.08em', color: '#756f64' }}>
            {card.chapterRange}
          </div>
        </div>
      )}

      {card.isHero && (
        <div style={{ width: colWidth, pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 34, height: 1.5, background: '#B23A33', display: 'inline-block' }} />
          <span
            style={{
              fontFamily: "'Newsreader',serif",
              fontStyle: 'italic',
              fontSize: 'clamp(18px,2.2vw,24px)',
              color: '#B23A33',
            }}
          >
            {card.heroTitle}
          </span>
        </div>
      )}

      <div
        style={{
          width: colWidth,
          pointerEvents: 'auto',
          background: 'rgba(247,245,241,0.82)',
          backdropFilter: 'blur(9px)',
          WebkitBackdropFilter: 'blur(9px)',
          border: '1px solid rgba(28,27,24,0.09)',
          borderRadius: 5,
          padding: '22px 24px',
          boxShadow: '0 14px 40px -28px rgba(28,27,24,0.4)',
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 10.5,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#756f64',
            marginBottom: 13,
          }}
        >
          {card.legLabel}
        </div>
        <div
          style={{
            fontFamily: "'Newsreader',serif",
            fontSize: 'clamp(20px,2.4vw,26px)',
            lineHeight: 1.22,
            marginBottom: 12,
          }}
        >
          {card.fromShort} <span style={{ color: '#B23A33' }}>→</span> {card.toShort}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: '#3a372f' }}>{card.caption}</p>
        <div style={{ ...mono, fontSize: 11, color: '#B23A33', marginTop: 14, letterSpacing: '0.04em' }}>
          {card.distLabel}
        </div>
        {card.imageCaption && (
          <FramedPhoto photo={card.image} placeholderCaption={card.imageCaption} aspect="3 / 2" marginTop={16} />
        )}
      </div>
    </div>
  )
}
