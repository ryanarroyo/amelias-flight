import type { CSSProperties } from 'react'
import type { PhotoData } from '../lib/photo'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }

interface Props {
  photo?: PhotoData
  /** Caption shown when no image is supplied (placeholder mode). */
  placeholderCaption?: string
  aspect?: string
  marginTop?: number | string
}

/**
 * Framed archival photo. Renders the image filling the frame with a small
 * caption/credit chip; falls back to the design's striped placeholder when no
 * image is supplied. The frame geometry matches the original design exactly.
 */
export default function FramedPhoto({ photo, placeholderCaption, aspect = '3 / 2', marginTop = 16 }: Props) {
  const frame: CSSProperties = {
    marginTop,
    aspectRatio: aspect,
    border: '1px solid rgba(28,27,24,0.12)',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'flex-end',
    padding: 11,
    position: 'relative',
    overflow: 'hidden',
    background: photo
      ? '#e8e4dc'
      : 'repeating-linear-gradient(45deg,#efece6,#efece6 9px,#e8e4dc 9px,#e8e4dc 18px)',
  }
  const chip: CSSProperties = {
    ...mono,
    position: 'relative',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#756f64',
    background: 'rgba(246,244,239,0.85)',
    padding: '4px 7px',
    borderRadius: 2,
  }

  const caption = photo ? photo.caption : placeholderCaption ?? ''
  const credit = photo?.credit

  return (
    <div style={frame}>
      {photo && (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: photo.objectPosition ?? 'center',
            display: 'block',
          }}
        />
      )}
      <div style={chip}>
        {caption}
        {credit && <span style={{ color: '#9b958a' }}> · {credit}</span>}
      </div>
    </div>
  )
}
