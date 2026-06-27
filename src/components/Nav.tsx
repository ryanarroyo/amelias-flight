import type { CSSProperties, MouseEvent } from 'react'
import type { View } from '../App'
import { pathForView } from '../lib/seo'

/** Intercept plain left-clicks for client-side nav; let modified clicks
 *  (new tab, etc.) and the canonical href behave normally for crawlers. */
function handleNav(e: MouseEvent<HTMLAnchorElement>, go: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  go()
}

const navStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 60,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px clamp(18px,4vw,40px)',
  background: 'rgba(246,244,239,0.72)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(28,27,24,0.08)',
}

const btnBase: CSSProperties = {
  appearance: 'none',
  border: 0,
  background: 'none',
  font: 'inherit',
  cursor: 'pointer',
  fontFamily: "'IBM Plex Mono',monospace",
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#1c1b18',
  textDecoration: 'none',
  padding: '6px 2px',
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

function NavButton({
  label,
  view,
  active,
  onSelect,
}: {
  label: string
  view: View
  active: boolean
  onSelect: (v: View) => void
}) {
  return (
    <a
      href={pathForView(view)}
      onClick={(e) => handleNav(e, () => onSelect(view))}
      aria-current={active ? 'page' : undefined}
      style={btnBase}
    >
      {label}
      {active && <span style={underline} />}
    </a>
  )
}

export default function Nav({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <nav style={navStyle}>
      <a
        href={pathForView('flight')}
        onClick={(e) => handleNav(e, () => setView('flight'))}
        aria-label="Amelia's Flight — home"
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <img
          src="/logo.png"
          alt="Amelia's Flight logo"
          style={{ height: 44, width: 'auto', display: 'block' }}
        />
        <span style={{ fontFamily: "'Newsreader',serif", fontSize: 17, letterSpacing: '0.01em' }}>
          Amelia's Flight
        </span>
      </a>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '8px 16px' }}>
        <NavButton label="The Flight" view="flight" active={view === 'flight'} onSelect={setView} />
        <NavButton label="The Records" view="records" active={view === 'records'} onSelect={setView} />
        <NavButton label="The Pilots" view="pilots" active={view === 'pilots'} onSelect={setView} />
        <NavButton label="The Plane" view="electra" active={view === 'electra'} onSelect={setView} />
        <NavButton label="The Island" view="island" active={view === 'island'} onSelect={setView} />
        <NavButton label="The Last Hours" view="lasthours" active={view === 'lasthours'} onSelect={setView} />
        <NavButton label="The Archives" view="archives" active={view === 'archives'} onSelect={setView} />
        <NavButton label="The Theories" view="theories" active={view === 'theories'} onSelect={setView} />
      </div>
    </nav>
  )
}
