/**
 * Post-build SEO generator.
 *
 * Vite emits a single dist/index.html for this client-rendered app. Search
 * engines need (a) a distinct, crawlable URL per section, each with its own
 * title/description/canonical, and (b) a sitemap + robots.txt. This script
 * takes the built index.html and stamps out one static HTML shell per route
 * with route-specific <head> tags, JSON-LD structured data, and a <noscript>
 * fallback carrying real text content. It also writes sitemap.xml and
 * robots.txt. Run automatically after `vite build` (see package.json).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

const config = JSON.parse(readFileSync(join(root, 'seo.config.json'), 'utf8'))
const { siteUrl, siteName, defaultOgImage, routes } = config
const SITE = siteUrl.replace(/\/+$/, '')
const OG_IMAGE = defaultOgImage.startsWith('http') ? defaultOgImage : SITE + defaultOgImage

const escAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const urlFor = (route) => (route.path === '/' ? SITE + '/' : SITE + route.path)

/** Replace the first match of `re` in `html` with `to` (no-op if absent). */
const swap = (html, re, to) => (re.test(html) ? html.replace(re, to) : html)

function jsonLd(route) {
  const url = urlFor(route)
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: siteName,
    description: routes.find((r) => r.path === '/')?.description,
    inLanguage: 'en',
    about: { '@id': `${SITE}/#amelia-earhart` },
  }
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#amelia-earhart`,
    name: 'Amelia Earhart',
    description: 'American aviation pioneer who disappeared over the Pacific during a 1937 attempt to fly around the world.',
    sameAs: ['https://en.wikipedia.org/wiki/Amelia_Earhart'],
  }
  const webpage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#amelia-earhart` },
    primaryImageOfPage: OG_IMAGE,
    inLanguage: 'en',
  }
  if (route.keywords) webpage.keywords = route.keywords

  const graph = [website, person, webpage]

  if (route.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: route.heading, item: url },
      ],
    })
  }

  const data = { '@context': 'https://schema.org', '@graph': graph }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}

function noscript(route) {
  const links = routes
    .map((r) => `<li><a href="${escAttr(r.path)}">${escHtml(r.heading)}</a></li>`)
    .join('')
  return (
    `<noscript>` +
    `<main style="max-width:42rem;margin:6rem auto;padding:0 1.25rem;font-family:Georgia,serif;line-height:1.6;color:#1c1b18">` +
    `<h1>${escHtml(route.heading)}</h1>` +
    `<p>${escHtml(route.summary)}</p>` +
    `<p>This is an interactive site; please enable JavaScript for the full experience. Explore the sections:</p>` +
    `<ul>${links}</ul>` +
    `</main>` +
    `</noscript>`
  )
}

function renderRoute(template, route) {
  const url = urlFor(route)
  let html = template

  // Drop any leftover marker comments (Vite may or may not strip them).
  html = html
    .replace(/<!-- seo:jsonld -->[\s\S]*?<!-- \/seo:jsonld -->/g, '')
    .replace(/<!-- seo:noscript -->[\s\S]*?<!-- \/seo:noscript -->/g, '')

  // Per-route head tags.
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${escHtml(route.title)}</title>`)
  html = swap(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escAttr(route.description)}" />`,
  )
  html = swap(
    html,
    /<link\s+rel="canonical"[\s\S]*?\/>/,
    `<link rel="canonical" href="${escAttr(url)}" />`,
  )
  html = swap(
    html,
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${escAttr(route.title)}" />`,
  )
  html = swap(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escAttr(route.description)}" />`,
  )
  html = swap(
    html,
    /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${escAttr(url)}" />`,
  )
  html = swap(
    html,
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${escAttr(route.title)}" />`,
  )
  html = swap(
    html,
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
  )

  // Inject structured data before </head> and the noscript fallback after the
  // root mount node — anchors that survive HTML minification.
  html = html.replace(/<\/head>/, `${jsonLd(route)}</head>`)
  html = html.replace(/(<div id="root"><\/div>)/, `$1${noscript(route)}`)

  return html
}

const templatePath = join(dist, 'index.html')
const template = readFileSync(templatePath, 'utf8')

let count = 0
for (const route of routes) {
  const out = route.path === '/' ? 'index.html' : `${route.slug}.html`
  writeFileSync(join(dist, out), renderRoute(template, route), 'utf8')
  count++
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (r) =>
        `  <url>\n    <loc>${urlFor(r)}</loc>\n    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>monthly</changefreq>\n    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8')

// robots.txt
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
writeFileSync(join(dist, 'robots.txt'), robots, 'utf8')

console.log(`[seo] generated ${count} route pages + sitemap.xml + robots.txt`)
