// Lightweight orthographic globe for "The Records" — draws one record flight's great-circle
// arc at a time and eases the globe to center it. Visual style matches GlobeEngine (same colors,
// land rendering, depth highlight) but it is intentionally simple and self-contained: no scroll
// sequencing, no stats, no Vanishing. World geometry is bundled (world-atlas), per ADR-0001.

import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate, geoDistance, type GeoProjection, type GeoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import land110m from 'world-atlas/land-110m.json'
import type { FlightRecord } from '../data/records'

type LonLat = [number, number]
const ACCENT = '#B23A33'

export class RecordsGlobe {
  private reduced: boolean
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private projection!: GeoProjection
  private path!: GeoPath
  private graticule = geoGraticule10()
  private landFeature: any = null

  private w = 1
  private h = 1
  private scale = 1

  private rec: FlightRecord | null = null
  private O: LonLat = [0, 0]
  private D: LonLat = [0, 0]
  private interp: (t: number) => LonLat = () => [0, 0]

  private cur = { rot: [0, 0] as LonLat, drawn: 0 }
  private target = { rot: [0, 0] as LonLat, drawn: 0 }
  private dirty = true
  private _raf: number | null = null
  private _onResize: (() => void) | null = null

  constructor(reduced: boolean) {
    this.reduced = reduced
  }

  attach(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas
  }

  init() {
    try {
      this.landFeature = feature(land110m as any, (land110m as any).objects.land)
    } catch {
      this.landFeature = null
    }
    this.projection = geoOrthographic().clipAngle(90).precision(0.4)
    if (this.canvas) this.setupCanvas()
    this._onResize = () => {
      if (this.canvas) {
        this.setupCanvas()
        this.dirty = true
        this.ensureLoop()
      }
    }
    window.addEventListener('resize', this._onResize)
    this.ensureLoop()
  }

  destroy() {
    if (this._raf) cancelAnimationFrame(this._raf)
    if (this._onResize) window.removeEventListener('resize', this._onResize)
  }

  setActive(rec: FlightRecord) {
    if (this.rec && this.rec.id === rec.id) return
    const first = this.rec === null
    this.rec = rec
    this.O = [rec.origin.lon, rec.origin.lat]
    this.D = [rec.destination.lon, rec.destination.lat]
    this.interp = geoInterpolate(this.O, this.D) as (t: number) => LonLat
    const mid = this.interp(0.5)
    this.target.rot = [-mid[0], Math.max(-58, Math.min(58, -mid[1]))]
    this.target.drawn = 1
    this.cur.drawn = 0 // redraw the arc from scratch each selection
    if (first || this.reduced) this.cur.rot = [...this.target.rot] as LonLat
    this.dirty = true
    this.ensureLoop()
  }

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

  private ensureLoop() {
    if (!this._raf) this._raf = requestAnimationFrame(this.loop)
  }

  private loop = () => {
    this._raf = null
    if (!this.canvas || !this.ctx) return
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const cur = this.cur
    const tgt = this.target
    let moving = false

    let d0 = ((tgt.rot[0] - cur.rot[0] + 540) % 360) - 180
    const d1 = tgt.rot[1] - cur.rot[1]
    if (Math.abs(d0) > 0.02 || Math.abs(d1) > 0.02) {
      const f = this.reduced ? 1 : 0.08
      cur.rot[0] += d0 * f
      cur.rot[1] += d1 * f
      moving = true
    }
    if (Math.abs(cur.drawn - tgt.drawn) > 0.002) {
      cur.drawn = lerp(cur.drawn, tgt.drawn, this.reduced ? 1 : 0.05)
      moving = true
    } else cur.drawn = tgt.drawn

    if (this.dirty || moving) {
      this.draw()
      this.dirty = false
    }
    if (moving) this._raf = requestAnimationFrame(this.loop)
  }

  private visible(p: LonLat) {
    const c: LonLat = [-this.cur.rot[0], -this.cur.rot[1]]
    return geoDistance(p, c) < 1.5707
  }
  private sliceArc(frac: number): LonLat[] {
    const n = Math.max(2, Math.round(frac * 80))
    const out: LonLat[] = []
    for (let j = 0; j <= n; j++) out.push(this.interp((frac * j) / n))
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
    const cx = w / 2
    const cy = h * 0.5
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

    if (!this.rec) return

    // the record's arc
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = ACCENT
    ctx.lineWidth = 1.9
    if (this.cur.drawn > 0.004) {
      ctx.beginPath()
      path({ type: 'LineString', coordinates: this.sliceArc(this.cur.drawn) } as any)
      ctx.stroke()
    }

    // endpoints
    this.drawEndpoint(this.O, this.rec.origin.name, false)
    this.drawEndpoint(this.D, this.rec.destination.name, true)
  }

  private drawEndpoint(p: LonLat, label: string, filled: boolean) {
    if (!this.visible(p)) return
    const xy = this.projection(p)
    if (!xy) return
    const ctx = this.ctx!
    ctx.save()
    if (filled) {
      ctx.beginPath()
      ctx.arc(xy[0], xy[1], 6, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(246,244,239,0.9)'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(xy[0], xy[1], 3.4, 0, 2 * Math.PI)
      ctx.fillStyle = ACCENT
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.arc(xy[0], xy[1], 4.2, 0, 2 * Math.PI)
      ctx.lineWidth = 1.6
      ctx.strokeStyle = ACCENT
      ctx.stroke()
    }
    ctx.font = "11px 'IBM Plex Mono', monospace"
    ctx.fillStyle = 'rgba(28,27,24,0.66)'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, xy[0] + 9, xy[1])
    ctx.restore()
  }
}
