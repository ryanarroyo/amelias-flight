// Framework-agnostic globe + scroll-sequencing engine.
// Ported from the approved design's DCLogic class. Renders a d3-geo orthographic
// globe to <canvas>, draws the route leg-by-leg, and drives the Vanishing climax.
//
// World geometry is bundled (world-atlas) — no CDN fetch, per ADR-0001.

import {
  geoOrthographic,
  geoPath,
  geoGraticule10,
  geoInterpolate,
  geoDistance,
  type GeoProjection,
  type GeoPath,
} from 'd3-geo'
import { feature } from 'topojson-client'
import land110m from 'world-atlas/land-110m.json'
import { LEGS, type Leg } from '../data/amelia'

type LonLat = [number, number]

interface PreparedLeg extends Leg {
  O: LonLat
  D: LonLat
  interp: (t: number) => LonLat
  mid: LonLat
}

type ActiveKind = 'hero' | 'leg' | 'vanish' | 'coda'
interface Active {
  kind: ActiveKind
  seq?: number
}

export interface StatEls {
  miles: HTMLElement | null
  days: HTMLElement | null
  legs: HTMLElement | null
  pct: HTMLElement | null
}
export interface ReadoutEls {
  date: HTMLElement | null
  route: HTMLElement | null
  dist: HTMLElement | null
}

export interface EngineOpts {
  reduced: boolean
  onShowTransmission: (v: boolean) => void
}

const ACCENT = '#B23A33'
const TOTAL_MILES = 24285

export class GlobeEngine {
  private reduced: boolean
  private onShowTransmission: (v: boolean) => void

  private canvas: HTMLCanvasElement | null = null
  private story: HTMLElement | null = null
  private statEls: StatEls = { miles: null, days: null, legs: null, pct: null }
  private readoutEls: ReadoutEls = { date: null, route: null, dist: null }

  private ctx: CanvasRenderingContext2D | null = null
  private projection!: GeoProjection
  private path!: GeoPath
  private graticule = geoGraticule10()
  private landFeature: any = null

  private legs: PreparedLeg[] = []
  private cum: number[] = [0]
  private startDate = 0

  private active: Active = { kind: 'hero' }
  private _activeTok: string | null = null
  private cur = { rot: [125, -18] as LonLat, drawn: 0, final: 0, planeOp: 1 }
  private target = { rot: [125, -18] as LonLat, drawn: 0 }
  private dirty = true
  private _raf: number | null = null

  private w = 1
  private h = 1
  private scale = 1

  private _stepNodes: Element[] = []
  private _onScroll: (() => void) | null = null
  private _scrollPending = false
  private _onResize: (() => void) | null = null
  private _transTimer: ReturnType<typeof setTimeout> | null = null

  constructor(opts: EngineOpts) {
    this.reduced = opts.reduced
    this.onShowTransmission = opts.onShowTransmission
  }

  attach(els: {
    canvas: HTMLCanvasElement | null
    story: HTMLElement | null
    stats: StatEls
    readout: ReadoutEls
  }) {
    this.canvas = els.canvas
    this.story = els.story
    this.statEls = els.stats
    this.readoutEls = els.readout
  }

  init() {
    this.prep()
    try {
      this.landFeature = feature(land110m as any, (land110m as any).objects.land)
    } catch {
      this.landFeature = null
    }
    this.projection = geoOrthographic().clipAngle(90).precision(0.4)
    if (this.canvas) this.setupCanvas()
    this.setupScroll()
    this.activate('hero')
    this.ensureLoop()
    this._onResize = () => {
      if (this.canvas) {
        this.setupCanvas()
        this.dirty = true
        this.ensureLoop()
      }
    }
    window.addEventListener('resize', this._onResize)
  }

  destroy() {
    if (this._raf) cancelAnimationFrame(this._raf)
    if (this._onScroll) window.removeEventListener('scroll', this._onScroll)
    if (this._onResize) window.removeEventListener('resize', this._onResize)
    if (this._transTimer) clearTimeout(this._transTimer)
  }

  // ---- data prep ----
  private prep() {
    this.legs = LEGS.map((l) => {
      const O: LonLat = [l.origin.lon, l.origin.lat]
      const D: LonLat = [l.destination.lon, l.destination.lat]
      const interp = geoInterpolate(O, D) as (t: number) => LonLat
      return { ...l, O, D, interp, mid: interp(0.5) }
    })
    this.cum = [0]
    for (let i = 0; i < this.legs.length; i++) this.cum[i + 1] = this.cum[i] + this.legs[i].distance_mi
    this.startDate = this.parseDate(this.legs[0].date)
  }

  private parseDate(s: string) {
    const p = s.split('-').map(Number)
    return Date.UTC(p[0], p[1] - 1, p[2])
  }
  private fmtDate(s: string) {
    const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const p = s.split('-').map(Number)
    return M[p[1] - 1] + ' ' + p[2] + ', ' + p[0]
  }
  private daysFrom(s: string) {
    return Math.round((this.parseDate(s) - this.startDate) / 86400000)
  }

  // ---- canvas ----
  private setupCanvas() {
    const c = this.canvas
    if (!c) return
    const r = c.getBoundingClientRect()
    this.w = Math.max(1, r.width)
    this.h = Math.max(1, r.height)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = Math.round(this.w * dpr)
    c.height = Math.round(this.h * dpr)
    this.ctx = c.getContext('2d')
    if (!this.ctx) return
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.scale = Math.min(this.w, this.h) * 0.46
    this.projection.scale(this.scale).translate([this.w / 2, this.h * 0.5])
    this.path = geoPath(this.projection, this.ctx)
  }

  // ---- scroll-driven sequencing (IntersectionObserver is unreliable in sandboxed iframes) ----
  private setupScroll() {
    if (!this.story) return
    this._stepNodes = [...this.story.querySelectorAll('[data-step]')]
    if (!this._onScroll) {
      this._onScroll = () => {
        if (this._scrollPending) return
        this._scrollPending = true
        requestAnimationFrame(() => {
          this._scrollPending = false
          this.pickStep()
        })
      }
      window.addEventListener('scroll', this._onScroll, { passive: true })
    }
    this.pickStep()
  }
  private pickStep() {
    const nodes = this._stepNodes
    if (!nodes || !nodes.length) return
    const vh = window.innerHeight
    const mid = vh / 2
    let best: Element | null = null
    let bestDist = Infinity
    for (const n of nodes) {
      const r = n.getBoundingClientRect()
      if (r.bottom < 0 || r.top > vh) continue
      const d = Math.abs((r.top + r.bottom) / 2 - mid)
      if (d < bestDist) {
        bestDist = d
        best = n
      }
    }
    if (best) this.activate(best.getAttribute('data-step') || '')
  }

  private legRot(idx: number): LonLat {
    const m = this.legs[idx].mid
    let phi = -m[1]
    phi = Math.max(-58, Math.min(58, phi))
    return [-m[0], phi]
  }

  private setReadout(leg: PreparedLeg | null) {
    const e = this.readoutEls
    if (!leg) {
      if (e.date) e.date.textContent = '—'
      if (e.route) e.route.textContent = 'Awaiting departure'
      if (e.dist) e.dist.textContent = ' '
      return
    }
    if (e.date) e.date.textContent = this.fmtDate(leg.date)
    if (e.route)
      e.route.textContent = leg.origin.name.split(',')[0] + '  →  ' + leg.destination.name.split(',')[0]
    if (e.dist) e.dist.textContent = leg.distance_mi.toLocaleString() + ' mi'
  }

  private activate(tok: string) {
    if (this._activeTok === tok) return
    this._activeTok = tok
    if (this._transTimer) clearTimeout(this._transTimer)
    if (tok === 'hero') {
      this.active = { kind: 'hero' }
      this.target.drawn = 0
      this.target.rot = [125, -18]
      this.cur.final = 0
      this.cur.planeOp = 1
      this.setReadout(null)
      this.onShowTransmission(false)
    } else if (tok === 'vanish') {
      this.active = { kind: 'vanish' }
      this.target.drawn = 29
      this.target.rot = this.legRot(29)
      this.setReadout(this.legs[29])
      this.onShowTransmission(false)
      this._transTimer = setTimeout(() => this.onShowTransmission(true), this.reduced ? 400 : 2400)
    } else if (tok === 'coda') {
      this.active = { kind: 'coda' }
      this.target.drawn = 29
      this.target.rot = this.legRot(29)
      this.cur.final = 0.62
      this.cur.planeOp = 0
      this.setReadout(this.legs[29])
      this.onShowTransmission(false)
    } else {
      const seq = +tok
      this.active = { kind: 'leg', seq }
      this.target.drawn = seq
      this.target.rot = this.legRot(seq - 1)
      this.cur.final = 0
      this.cur.planeOp = 1
      this.setReadout(this.legs[seq - 1])
      this.onShowTransmission(false)
    }
    this.dirty = true
    this.ensureLoop()
  }

  // ---- animation loop ----
  private ensureLoop() {
    if (!this._raf) this._raf = requestAnimationFrame(this.loop)
  }

  private loop = () => {
    this._raf = null
    if (!this.canvas || !this.ctx) return
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const cur = this.cur
    const tgt = this.target
    const k = this.active.kind
    let moving = false

    // rotation
    if (k === 'hero' && !this.reduced) {
      cur.rot[0] -= 0.12
      cur.rot[1] = lerp(cur.rot[1], tgt.rot[1], 0.05)
      moving = true
    } else {
      let d0 = ((tgt.rot[0] - cur.rot[0] + 540) % 360) - 180
      const d1 = tgt.rot[1] - cur.rot[1]
      if (Math.abs(d0) > 0.02 || Math.abs(d1) > 0.02) {
        const f = this.reduced ? 1 : 0.07
        cur.rot[0] += d0 * f
        cur.rot[1] += d1 * f
        moving = true
      }
    }
    // route draw
    if (Math.abs(cur.drawn - tgt.drawn) > 0.002) {
      cur.drawn = lerp(cur.drawn, tgt.drawn, this.reduced ? 1 : 0.06)
      moving = true
    } else cur.drawn = tgt.drawn
    // final dashed leg + plane fade
    if (k === 'vanish' || k === 'coda') {
      if (cur.final < 0.62 - 0.002) {
        cur.final = lerp(cur.final, 0.62, this.reduced ? 1 : 0.035)
        moving = true
      }
      if (this.reduced) {
        cur.planeOp = 0
      } else if (cur.final > 0.42 && cur.planeOp > 0) {
        cur.planeOp = Math.max(0, cur.planeOp - 0.016)
        moving = true
      }
    }

    if (this.dirty || moving) {
      this.draw()
      this.updateStats()
      this.dirty = false
    }

    if (moving || k === 'hero') this._raf = requestAnimationFrame(this.loop)
  }

  private visible(p: LonLat) {
    const c: LonLat = [-this.cur.rot[0], -this.cur.rot[1]]
    return geoDistance(p, c) < 1.5707
  }
  private sliceArc(leg: PreparedLeg, frac: number): LonLat[] {
    const n = Math.max(2, Math.round(frac * 70))
    const out: LonLat[] = []
    for (let j = 0; j <= n; j++) out.push(leg.interp((frac * j) / n))
    return out
  }

  private draw() {
    const ctx = this.ctx
    const path = this.path
    if (!ctx || !path) return
    this.projection.rotate(this.cur.rot)
    const w = this.w
    const h = this.h
    ctx.clearRect(0, 0, w, h)

    // ocean sphere
    ctx.beginPath()
    path({ type: 'Sphere' } as any)
    ctx.fillStyle = '#E7ECEE'
    ctx.fill()

    // graticule
    ctx.beginPath()
    path(this.graticule)
    ctx.lineWidth = 0.6
    ctx.strokeStyle = 'rgba(40,45,50,0.05)'
    ctx.stroke()

    // land
    if (this.landFeature) {
      ctx.beginPath()
      path(this.landFeature)
      ctx.fillStyle = '#D8D2C6'
      ctx.fill()
      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(40,36,28,0.10)'
      ctx.stroke()
    }

    // soft depth highlight
    const cx = this.w / 2
    const cy = this.h * 0.5
    const R = this.scale
    const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R * 1.05)
    g.addColorStop(0, 'rgba(255,255,255,0.22)')
    g.addColorStop(0.55, 'rgba(255,255,255,0)')
    g.addColorStop(1, 'rgba(40,36,28,0.10)')
    ctx.save()
    ctx.beginPath()
    path({ type: 'Sphere' } as any)
    ctx.clip()
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.restore()

    // sphere outline
    ctx.beginPath()
    path({ type: 'Sphere' } as any)
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(28,27,24,0.12)'
    ctx.stroke()

    // route (solid legs)
    const legs = this.legs
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = ACCENT
    const nFull = Math.min(Math.floor(this.cur.drawn + 1e-6), 29)
    ctx.lineWidth = 1.7
    for (let i = 0; i < nFull; i++) {
      ctx.beginPath()
      path({ type: 'LineString', coordinates: [legs[i].O, legs[i].D] } as any)
      ctx.stroke()
    }
    // leading partial
    const lead = Math.floor(this.cur.drawn + 1e-6)
    const frac = this.cur.drawn - lead
    if (lead < 29 && frac > 0.004) {
      ctx.beginPath()
      path({ type: 'LineString', coordinates: this.sliceArc(legs[lead], frac) } as any)
      ctx.stroke()
    }

    // plane marker on the advancing route (not during vanish/coda)
    if (this.active.kind === 'leg' && this.cur.drawn > 0.02) {
      let p: LonLat | null = null
      if (lead < 29 && frac > 0.004) p = legs[lead].interp(frac)
      else if (lead >= 1) p = legs[Math.min(lead, 29) - 1].D
      if (p && this.visible(p)) this.drawPlane(p, 1)
    }

    // final dashed leg + Howland
    if (this.active.kind === 'vanish' || this.active.kind === 'coda') {
      const fl = legs[29]
      ctx.save()
      ctx.setLineDash([2.5, 5])
      ctx.lineWidth = 1.6
      ctx.strokeStyle = ACCENT
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      path({ type: 'LineString', coordinates: this.sliceArc(fl, this.cur.final) } as any)
      ctx.stroke()
      ctx.restore()
      // fading plane at the tip
      const tip = fl.interp(this.cur.final)
      if (this.cur.planeOp > 0.01 && this.visible(tip)) this.drawPlane(tip, this.cur.planeOp)
      // Howland — marked, never reached (deliberate gap)
      this.drawHowland(fl.D)
    }
  }

  private drawPlane(lonlat: LonLat, op: number) {
    const xy = this.projection(lonlat)
    if (!xy) return
    const ctx = this.ctx!
    ctx.save()
    ctx.globalAlpha = op
    ctx.beginPath()
    ctx.arc(xy[0], xy[1], 6, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgba(246,244,239,0.9)'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(xy[0], xy[1], 3.4, 0, 2 * Math.PI)
    ctx.fillStyle = ACCENT
    ctx.fill()
    ctx.restore()
  }
  private drawHowland(lonlat: LonLat) {
    if (!this.visible(lonlat)) return
    const xy = this.projection(lonlat)
    if (!xy) return
    const ctx = this.ctx!
    ctx.save()
    ctx.beginPath()
    ctx.arc(xy[0], xy[1], 4.5, 0, 2 * Math.PI)
    ctx.lineWidth = 1.4
    ctx.strokeStyle = 'rgba(28,27,24,0.5)'
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(xy[0], xy[1], 1.4, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgba(28,27,24,0.55)'
    ctx.fill()
    ctx.font = "10px 'IBM Plex Mono', monospace"
    ctx.fillStyle = 'rgba(28,27,24,0.6)'
    ctx.textBaseline = 'middle'
    ctx.fillText('Howland', xy[0] + 9, xy[1])
    ctx.restore()
  }

  private updateStats() {
    const e = this.statEls
    if (!e.miles) return
    let miles: number
    let days: number
    let legsDone: number
    const k = this.active.kind
    if (k === 'vanish' || k === 'coda') {
      miles = this.cum[29]
      days = this.daysFrom(this.legs[28].date) // through Lae, June 29
      legsDone = 29
    } else {
      const r = this.cur.drawn
      const i = Math.min(Math.floor(r), 29)
      const fr = Math.min(r - i, 1)
      miles = this.cum[i] + (i < 29 ? this.legs[i].distance_mi * fr : 0)
      const di = Math.min(Math.max(i, 0), 28)
      days = this.daysFrom(this.legs[di].date)
      legsDone = i
    }
    const pct = Math.round((miles / TOTAL_MILES) * 100)
    e.miles.textContent = Math.round(miles).toLocaleString()
    if (e.days) e.days.textContent = String(Math.max(0, days))
    if (e.legs) e.legs.textContent = String(legsDone)
    if (e.pct) e.pct.textContent = pct + '%'
  }
}
