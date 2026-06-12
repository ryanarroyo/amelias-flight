import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import FlightPage from './components/FlightPage'
import ElectraPage from './components/ElectraPage'
import TheoriesPage from './components/TheoriesPage'

export type View = 'flight' | 'electra' | 'theories'

const rootStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Sans',system-ui,sans-serif",
  color: '#1c1b18',
  background: '#F6F4EF',
  minHeight: '100vh',
  WebkitFontSmoothing: 'antialiased',
}

export default function App() {
  const [view, setViewState] = useState<View>('flight')

  const setView = (v: View) => {
    if (v === view) return
    setViewState(v)
    try {
      window.scrollTo(0, 0)
    } catch {
      /* noop */
    }
  }

  // Always start each view at the top.
  useEffect(() => {
    try {
      window.scrollTo(0, 0)
    } catch {
      /* noop */
    }
  }, [view])

  return (
    <div style={rootStyle}>
      <Nav view={view} setView={setView} />
      {view === 'flight' && <FlightPage />}
      {view === 'electra' && <ElectraPage />}
      {view === 'theories' && <TheoriesPage />}
    </div>
  )
}
