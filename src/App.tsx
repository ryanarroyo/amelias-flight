import { useEffect, useState } from 'react'
import { applyMeta, pathForView, viewFromPath } from './lib/seo'
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
  // Initialise from the URL so a hard load of e.g. /theories opens that view.
  const [view, setViewState] = useState<View>(() =>
    typeof window === 'undefined' ? 'flight' : viewFromPath(window.location.pathname),
  )

  const setView = (v: View) => {
    if (v === view) return
    setViewState(v)
    const path = pathForView(v)
    try {
      if (window.location.pathname !== path) {
        window.history.pushState({ view: v }, '', path)
      }
      window.scrollTo(0, 0)
    } catch {
      /* noop */
    }
  }

  // Keep the view in sync with browser back/forward navigation.
  useEffect(() => {
    const onPop = () => setViewState(viewFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Always start each view at the top, and keep document title / meta tags in
  // sync with the active view during client-side navigation.
  useEffect(() => {
    applyMeta(view)
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
