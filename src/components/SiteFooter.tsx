import { useState, type CSSProperties } from 'react'
import ContactDialog from './ContactDialog'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }

/**
 * Shared page footer: the "Built as a tribute." line and the "Send a message"
 * link that opens the contact dialog. Rendered at the bottom of every page so
 * the contact entry point is always reachable.
 */
export default function SiteFooter({ marginTop = 48 }: { marginTop?: number | string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          marginTop,
          paddingTop: 22,
          borderTop: '1px solid rgba(28,27,24,0.1)',
        }}
      >
        <div style={{ ...serif, fontStyle: 'italic', fontSize: 15, color: '#756f64' }}>Built as a tribute.</div>
        <button
          onClick={() => setOpen(true)}
          style={{
            appearance: 'none',
            border: 0,
            background: 'none',
            cursor: 'pointer',
            font: 'inherit',
            ...mono,
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#B23A33',
            padding: '4px 0',
            borderBottom: '1px solid rgba(178,58,51,0.4)',
          }}
        >
          Send a message
        </button>
      </div>
      <ContactDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
