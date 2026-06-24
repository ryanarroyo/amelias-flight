import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import FlightPage from './components/FlightPage'
import RecordsPage from './components/RecordsPage'
import PilotsPage from './components/PilotsPage'
import ElectraPage from './components/ElectraPage'
import IslandPage from './components/IslandPage'
import RadioLogPage from './components/RadioLogPage'
import TheoriesPage from './components/TheoriesPage'
import ArchivesPage from './components/ArchivesPage'

export type View = 'flight' | 'records' | 'pilots' | 'electra' | 'island' | 'lasthours' | 'theories' | 'archives'

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
      {view === 'records' && <RecordsPage />}
      {view === 'pilots' && <PilotsPage />}
      {view === 'electra' && <ElectraPage />}
      {view === 'island' && <IslandPage />}
      {view === 'lasthours' && <RadioLogPage />}
      {view === 'theories' && <TheoriesPage />}
      {view === 'archives' && <ArchivesPage />}
    </div>
  )
}
