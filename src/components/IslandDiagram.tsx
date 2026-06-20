// To-scale top-down SVG diagram for "The Island". Everything is drawn in statute miles from
// Howland at the center; `spanMiles` sets the zoom. Honest scale is the whole point: the 5-mile
// sight ring is a speck inside the tens-of-miles uncertainty.

import { ISLAND } from '../data/island'

const ACCENT = '#B23A33'
const INK = '#1c1b18'
const MUTE = '#756f64'

export interface DiagramLayers {
  island: boolean
  visibility: boolean
  uncertainty: boolean
  lop: boolean
  secondLop: boolean
  plane: boolean
}

export interface IslandDiagramProps {
  size: number
  spanMiles: number
  layers: DiagramLayers
  uncertaintyAlongMi: number
  uncertaintyPerpMi: number
  planeT: number // -1..1 along the line
  planeOffsetMi: number // perpendicular offset of the flown track
}

const D2R = Math.PI / 180

export default function IslandDiagram({
  size,
  spanMiles,
  layers,
  uncertaintyAlongMi,
  uncertaintyPerpMi,
  planeT,
  planeOffsetMi,
}: IslandDiagramProps) {
  const cx = size / 2
  const cy = size / 2
  const ppm = size / spanMiles

  // LOP direction (157°) and its perpendicular, in (east, north).
  const a = ISLAND.lopAzimuthDeg * D2R
  const dir = { e: Math.sin(a), n: Math.cos(a) }
  const perp = { e: -dir.n, n: dir.e }

  const toPx = (eMi: number, nMi: number): [number, number] => [cx + eMi * ppm, cy - nMi * ppm]
  // screen-space angle of the LOP, for rotating the ellipse
  const lopDeg = (Math.atan2(-dir.n, dir.e) * 180) / Math.PI

  // a full-width line through center along a unit direction
  const lineThrough = (d: { e: number; n: number }) => {
    const L = spanMiles // overshoot the viewport
    const [x1, y1] = toPx(-d.e * L, -d.n * L)
    const [x2, y2] = toPx(d.e * L, d.n * L)
    return { x1, y1, x2, y2 }
  }

  const visR = ISLAND.visibilityMi * ppm
  const islandR = Math.max(2.2, (ISLAND.islandLenMi / 2) * ppm)

  const planeE = dir.e * planeT * uncertaintyAlongMi + perp.e * planeOffsetMi
  const planeN = dir.n * planeT * uncertaintyAlongMi + perp.n * planeOffsetMi
  const [planeX, planeY] = toPx(planeE, planeN)

  const lop = lineThrough(dir)
  const lop2 = lineThrough(perp)
  const [labelTopX, labelTopY] = toPx(dir.e * spanMiles * 0.42, dir.n * spanMiles * 0.42)

  const fade = (on: boolean) => ({ opacity: on ? 1 : 0, transition: 'opacity 0.6s ease' })
  const mono = "'IBM Plex Mono', monospace"

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', width: '100%', height: 'auto', maxWidth: size }}
      role="img"
      aria-label="To-scale diagram of the search for Howland Island"
    >
      {/* ocean */}
      <rect x={0} y={0} width={size} height={size} fill="#E7ECEE" rx={14} />

      {/* compass N */}
      <text x={cx} y={20} fill={MUTE} fontFamily={mono} fontSize={11} textAnchor="middle">
        N
      </text>

      {/* uncertainty ellipse */}
      <g style={fade(layers.uncertainty && !layers.secondLop)}>
        <ellipse
          cx={cx}
          cy={cy}
          rx={uncertaintyAlongMi * ppm}
          ry={uncertaintyPerpMi * ppm}
          transform={`rotate(${lopDeg} ${cx} ${cy})`}
          fill="rgba(178,58,51,0.06)"
          stroke="rgba(178,58,51,0.4)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
      </g>

      {/* sun line of position */}
      <g style={fade(layers.lop)}>
        <line x1={lop.x1} y1={lop.y1} x2={lop.x2} y2={lop.y2} stroke={ACCENT} strokeWidth={1.4} />
        <text x={labelTopX + 8} y={labelTopY} fill={ACCENT} fontFamily={mono} fontSize={11}>
          sun line 157° / 337°
        </text>
      </g>

      {/* second (crossing) line + fix point */}
      <g style={fade(layers.secondLop)}>
        <line x1={lop2.x1} y1={lop2.y1} x2={lop2.x2} y2={lop2.y2} stroke={ACCENT} strokeWidth={1.4} strokeDasharray="6 4" />
        <circle cx={cx} cy={cy} r={4.5} fill={ACCENT} />
        <text x={cx + 10} y={cy - 10} fill={ACCENT} fontFamily={mono} fontSize={11}>
          a fix
        </text>
      </g>

      {/* the plane's search ring */}
      <g style={fade(layers.plane)}>
        <circle cx={planeX} cy={planeY} r={visR} fill="rgba(178,58,51,0.10)" stroke="rgba(178,58,51,0.5)" strokeWidth={1} />
        <circle cx={planeX} cy={planeY} r={3.2} fill={ACCENT} />
      </g>

      {/* the visibility ring around Howland (used when not flying) */}
      <g style={fade(layers.visibility && !layers.plane)}>
        <circle cx={cx} cy={cy} r={visR} fill="none" stroke="rgba(28,27,24,0.4)" strokeWidth={1} strokeDasharray="3 3" />
        {visR > 26 && (
          <text x={cx} y={cy - visR - 8} fill={MUTE} fontFamily={mono} fontSize={11} textAnchor="middle">
            {ISLAND.visibilityMi} mi — all you can see
          </text>
        )}
      </g>

      {/* Howland */}
      <g style={fade(layers.island)}>
        <circle cx={cx} cy={cy} r={islandR} fill={INK} />
        <text x={cx + islandR + 6} y={cy + 4} fill={INK} fontFamily={mono} fontSize={11}>
          Howland
        </text>
      </g>
    </svg>
  )
}
