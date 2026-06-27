import seoConfig from '../../seo.config.json'
import type { View } from '../App'

export interface RouteMeta {
  view: View
  path: string
  slug: string
  title: string
  description: string
  heading: string
  summary: string
  keywords?: string
}

export const SITE_URL: string = seoConfig.siteUrl
export const SITE_NAME: string = seoConfig.siteName
export const DEFAULT_OG_IMAGE: string = seoConfig.defaultOgImage

export const ROUTES = seoConfig.routes as RouteMeta[]

const HOME: RouteMeta = ROUTES.find((r) => r.path === '/') ?? ROUTES[0]

/** Resolve a browser pathname to one of the known views (falls back to home). */
export function viewFromPath(pathname: string): View {
  // Normalise: strip trailing slash (except root) so "/records/" === "/records".
  const clean = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
  const match = ROUTES.find((r) => r.path === clean)
  return (match ?? HOME).view
}

/** The canonical path for a given view. */
export function pathForView(view: View): string {
  const match = ROUTES.find((r) => r.view === view)
  return (match ?? HOME).path
}

function routeForView(view: View): RouteMeta {
  return ROUTES.find((r) => r.view === view) ?? HOME
}

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Update the document title and SEO meta tags for the active view. Pre-rendered
 * HTML already carries the correct tags on first paint; this keeps them in sync
 * during client-side (SPA) navigation between views.
 */
export function applyMeta(view: View) {
  const r = routeForView(view)
  const url = SITE_URL + r.path

  document.title = r.title
  setMeta('meta[name="description"]', 'content', r.description)
  setMeta('link[rel="canonical"]', 'href', url)
  setMeta('meta[property="og:title"]', 'content', r.title)
  setMeta('meta[property="og:description"]', 'content', r.description)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[name="twitter:title"]', 'content', r.title)
  setMeta('meta[name="twitter:description"]', 'content', r.description)
}
