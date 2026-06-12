import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { GlobeEngine } from '../lib/GlobeEngine'
import { CARDS } from '../lib/cards'
import StepCard from './StepCard'

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono',monospace" }
const serif: CSSProperties = { fontFamily: "'Newsreader',serif" }

const statValue: CSSProperties = {
  ...mono,
  fontSize: 'clamp(14px,1.6vw,18px)',
  fontWeight: 500,
}
const statLabel: CSSProperties = {
  ...mono,
  fontSize: 9,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#756f64',
}
const statGroup: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }
const divider: CSSProperties = { width: 1, background: 'rgba(28,27,24,0.1)' }

export default function FlightPage() {
  const [showTransmission, setShowTransmission] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const milesRef = useRef<HTMLSpanElement>(null)
  const daysRef = useRef<HTMLSpanElement>(null)
  const legsRef = useRef<HTMLSpanElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)
  const distRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let reduced = false
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      /* noop */
    }
    const engine = new GlobeEngine({ reduced, onShowTransmission: setShowTransmission })
    engine.attach({
      canvas: canvasRef.current,
      story: storyRef.current,
      stats: { miles: milesRef.current, days: daysRef.current, legs: legsRef.current, pct: pctRef.current },
      readout: { date: dateRef.current, route: routeRef.current, dist: distRef.current },
    })
    engine.init()
    return () => engine.destroy()
  }, [])

  return (
    <div ref={storyRef} style={{ position: 'relative' }}>
      {/* sticky globe stage */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', zIndex: 0 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* running stats */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(72px,9vh,98px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'stretch',
            gap: 'clamp(14px,2.6vw,34px)',
            background: 'rgba(246,244,239,0.66)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(28,27,24,0.08)',
            borderRadius: 999,
            padding: '9px clamp(16px,2.4vw,26px)',
            whiteSpace: 'nowrap',
            maxWidth: '92vw',
            overflow: 'hidden',
          }}
        >
          <div style={statGroup}>
            <span ref={milesRef} style={{ ...statValue, color: '#B23A33' }}>
              0
            </span>
            <span style={statLabel}>miles</span>
          </div>
          <div style={divider} />
          <div style={statGroup}>
            <span ref={daysRef} style={statValue}>
              0
            </span>
            <span style={statLabel}>days</span>
          </div>
          <div style={divider} />
          <div style={statGroup}>
            <span ref={legsRef} style={statValue}>
              0
            </span>
            <span style={statLabel}>legs / 29</span>
          </div>
          <div style={divider} />
          <div style={statGroup}>
            <span ref={pctRef} style={{ ...statValue, color: '#B23A33' }}>
              0%
            </span>
            <span style={statLabel}>of the world</span>
          </div>
        </div>

        {/* leg readout */}
        <div
          style={{
            position: 'absolute',
            left: 'clamp(16px,3vw,40px)',
            bottom: 'clamp(20px,4vh,40px)',
            background: 'rgba(246,244,239,0.72)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(28,27,24,0.08)',
            borderRadius: 4,
            padding: '13px 17px',
            maxWidth: 'min(320px,80vw)',
          }}
        >
          <div
            ref={dateRef}
            style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B23A33', marginBottom: 6 }}
          >
            —
          </div>
          <div ref={routeRef} style={{ ...serif, fontSize: 16, lineHeight: 1.3 }}>
            Awaiting departure
          </div>
          <div ref={distRef} style={{ ...mono, fontSize: 11, color: '#756f64', marginTop: 5 }}>
            {' '}
          </div>
        </div>

        {/* last-transmission overlay (Vanishing) */}
        {showTransmission && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 24,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse at center,rgba(246,244,239,0.55),rgba(246,244,239,0.2))',
              animation: 'amFade 1.6s ease both',
            }}
          >
            <div
              style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#756f64', marginBottom: 26 }}
            >
              Last transmission · 8:43 a.m.
            </div>
            <div
              style={{
                ...serif,
                fontStyle: 'italic',
                fontSize: 'clamp(28px,4.4vw,54px)',
                lineHeight: 1.25,
                maxWidth: 760,
                color: '#1c1b18',
              }}
            >
              “We are running on line
              <br />
              north and south.”
            </div>
          </div>
        )}
      </div>

      {/* scrolling narrative (overlaps the sticky globe) */}
      <div style={{ position: 'relative', marginTop: '-100vh', zIndex: 1, pointerEvents: 'none' }}>
        {/* hero */}
        <section
          data-step="hero"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(24px,6vw,86px)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: 660, pointerEvents: 'auto' }}>
            <div
              style={{ ...mono, fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#B23A33', marginBottom: 22 }}
            >
              The 1937 World Flight
            </div>
            <h1
              style={{
                ...serif,
                fontWeight: 400,
                fontSize: 'clamp(52px,9.5vw,128px)',
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
                margin: '0 0 26px',
              }}
            >
              Amelia
              <br />
              Earhart
            </h1>
            <p
              style={{
                ...serif,
                fontSize: 'clamp(19px,2.3vw,27px)',
                lineHeight: 1.45,
                maxWidth: 540,
                margin: '0 0 22px',
                color: '#2b2924',
              }}
            >
              Twenty-nine thousand miles of ocean and desert, flown leg by leg — and a final dawn she
              never crossed.
            </p>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, maxWidth: 480, margin: 0, color: '#756f64' }}>
              A first attempt had ended in March 1937 with a takeoff crash at Luke Field, Hawaii.
              Undeterred, she reversed her course around the world and began again.
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 34,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 7,
              animation: 'amCue 2.4s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          >
            <span style={{ ...mono, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#756f64' }}>
              Scroll
            </span>
            <span style={{ fontSize: 15, color: '#756f64' }}>↓</span>
          </div>
        </section>

        {/* the journey */}
        {CARDS.map((card) => (
          <StepCard key={card.seq} card={card} />
        ))}

        {/* the vanishing */}
        <section
          data-step="vanish"
          style={{
            minHeight: '128vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '0 clamp(20px,5vw,76px)',
          }}
        >
          <div style={{ width: 'min(468px,88vw)', pointerEvents: 'auto' }}>
            <div
              style={{ ...mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B23A33', marginBottom: 9 }}
            >
              Leg 30 · July 2, 1937
            </div>
            <h2
              style={{ ...serif, fontWeight: 400, fontSize: 'clamp(30px,4.2vw,50px)', lineHeight: 1.04, margin: '0 0 14px' }}
            >
              The Vanishing
            </h2>
            <div style={{ ...serif, fontSize: 'clamp(19px,2.3vw,25px)', lineHeight: 1.3, marginBottom: 14 }}>
              Lae <span style={{ color: '#B23A33' }}>→</span> Howland Island
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: '#3a372f' }}>
              Into the Pacific dawn toward a speck of coral she never reached. Twenty hours out, low on
              fuel and unable to find the island, her voice came over Itasca's radio one last time — then
              nothing.
            </p>
            <div style={{ ...mono, fontSize: 11, color: '#756f64', marginTop: 14 }}>
              2,556 miles planned · never completed
            </div>
          </div>
        </section>

        <section style={{ minHeight: '78vh' }} />

        {/* legacy coda */}
        <section
          data-step="coda"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(24px,6vw,86px)',
          }}
        >
          <div style={{ maxWidth: 600, pointerEvents: 'auto' }}>
            <p
              style={{
                ...serif,
                fontSize: 'clamp(24px,3.2vw,38px)',
                lineHeight: 1.28,
                letterSpacing: '-0.01em',
                margin: '0 0 26px',
                color: '#1c1b18',
              }}
            >
              The search that followed was the largest in U.S. naval history. It found nothing.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, margin: 0, color: '#4a473f', maxWidth: 500 }}>
              Amelia Earhart was thirty-nine. In the silence she left behind she became something larger
              than a pilot — a measure of how far daring can carry us, and of how stubbornly the world
              keeps looking for what it cannot bear to lose.
            </p>
          </div>
        </section>

        {/* footer */}
        <footer
          style={{ background: '#F6F4EF', borderTop: '1px solid rgba(28,27,24,0.1)', padding: 'clamp(40px,6vw,72px)', pointerEvents: 'auto' }}
        >
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div
              style={{ ...mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#756f64', marginBottom: 18 }}
            >
              Sources &amp; Credits
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: '#4a473f', margin: '0 0 14px', maxWidth: 620 }}>
              Flight data: TIGHAR (tighar.org). Maps: Natural Earth via Wikimedia Commons. Imagery:
              Smithsonian National Air and Space Museum / Library of Congress.
            </p>
            <p style={{ fontSize: 12.5, lineHeight: 1.7, color: '#756f64', margin: '0 0 22px', maxWidth: 620 }}>
              Routes are drawn as great-circle approximations between recorded stops; distances and dates
              follow the published log and may vary slightly across sources.
            </p>
            <div style={{ ...serif, fontStyle: 'italic', fontSize: 16, color: '#1c1b18' }}>
              Built as a tribute.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
