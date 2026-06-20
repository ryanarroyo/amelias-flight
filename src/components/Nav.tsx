import type { CSSProperties } from 'react'
import type { View } from '../App'

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

function NavButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={btnBase}>
      {label}
      {active && <span style={underline} />}
    </button>
  )
}

export default function Nav({ view, setView }: { view: View; setView: (v: View) => void }) {
  return (
    <nav style={navStyle}>
      <div
        onClick={() => setView('flight')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9 }}
      >
        <span
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#B23A33', display: 'inline-block' }}
        />
        <span style={{ fontFamily: "'Newsreader',serif", fontSize: 17, letterSpacing: '0.01em' }}>
          Amelia's Flight
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '8px 16px' }}>
        <NavButton label="The Flight" active={view === 'flight'} onClick={() => setView('flight')} />
        <NavButton label="The Records" active={view === 'records'} onClick={() => setView('records')} />
        <NavButton label="The Pilots" active={view === 'pilots'} onClick={() => setView('pilots')} />
        <NavButton label="The Electra" active={view === 'electra'} onClick={() => setView('electra')} />
        <NavButton label="The Island" active={view === 'island'} onClick={() => setView('island')} />
        <NavButton label="The Last Hours" active={view === 'lasthours'} onClick={() => setView('lasthours')} />
        <NavButton label="Theories" active={view === 'theories'} onClick={() => setView('theories')} />
      </div>
    </nav>
  )
}
