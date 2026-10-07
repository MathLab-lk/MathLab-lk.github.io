import { useEffect, useState } from 'react'

/**
 * Tiny hash router for the static site.
 *
 *  Routes  (app views)  →  hash starting with "#/"
 *    #/companion                      → Rulebook directory
 *    #/companion?grade=8&concept=...  → directory, pre-filtered
 *    #/companion/<slug>               → game detail (QR deep-link target)
 *    #/                               → home
 *
 *  Anchors (page sections) →  plain "#id" hashes keep their native
 *  jump-to-section behaviour and are NOT treated as routes.
 */
export function parseHash(hash = window.location.hash) {
  if (hash.startsWith('#/')) {
    const [pathPart, queryPart = ''] = hash.slice(2).split('?')
    const parts = pathPart.split('/').filter(Boolean).map(decodeURIComponent)
    const query = {}
    for (const [k, v] of new URLSearchParams(queryPart)) query[k] = v

    if (parts[0] === 'companion') {
      if (parts.length === 1) return { view: 'companion', query, queryKey: queryPart }
      if (parts.length === 2) return { view: 'game', slug: parts[1] }
    }
    return { view: 'home' }
  }
  return { view: 'home', anchor: hash.slice(1) || null }
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash())

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

/** Navigate programmatically. */
export function navigate(hash) {
  if (window.location.hash === hash) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = hash
  }
}

/**
 * After switching from a companion view back to home via an anchor link
 * (e.g. footer "#contact"), the browser cannot jump because the home DOM
 * did not exist at hash-change time. This scrolls to the target post-render.
 */
export function useAnchorScrollFix(route) {
  const [prev, setPrev] = useState(route)

  useEffect(() => {
    const wasCompanion = prev.view === 'companion' || prev.view === 'game'
    const isHome = route.view === 'home'
    if (wasCompanion && isHome) {
      if (route.anchor) {
        const el = document.getElementById(route.anchor)
        if (el) requestAnimationFrame(() => el.scrollIntoView())
      } else {
        window.scrollTo(0, 0)
      }
    }
    setPrev(route)
  }, [route]) // eslint-disable-line react-hooks/exhaustive-deps
}
