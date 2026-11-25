const SITE = '325聚合模型'
const ORIGIN = (import.meta.env.VITE_SITE_ORIGIN || 'https://325ai.com').replace(/\/$/, '')

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export function setSeo({ title, description, path = '/', jsonLd, noindex = false }) {
  const fullTitle = title ? `${title} - ${SITE}` : `${SITE} · 模型广场`
  document.title = fullTitle

  setMeta('description', description)
  setMeta('og:title', fullTitle, 'property')
  setMeta('og:description', description, 'property')
  setMeta('og:type', 'website', 'property')
  setMeta('og:url', `${ORIGIN}${path}`, 'property')
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', fullTitle)
  setMeta('twitter:description', description)
  setMeta('robots', noindex ? 'noindex,follow' : 'index,follow')

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = `${ORIGIN}${path}`

  const scriptId = 'seo-jsonld'
  const old = document.getElementById(scriptId)
  if (old) old.remove()
  if (jsonLd) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = scriptId
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
  }
}

export { ORIGIN }
