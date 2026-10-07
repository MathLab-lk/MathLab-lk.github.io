/**
 * ─────────────────────────────────────────────────────────────
 *  COMPANION CONTENT LOADER
 *  Every game in src/content/games/*.json is auto-discovered
 *  here at build time. To add a new game to the Rulebook, drop
 *  a new .json file in that folder — no code changes needed.
 *
 *  Files starting with "_" (like _template.json) are skipped.
 *  "draft" entries are loaded but hidden from the directory.
 * ─────────────────────────────────────────────────────────────
 */
import { SITE } from '../config.js'

const modules = import.meta.glob('../content/games/*.json', { eager: true })

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const KEBAB_FIX = (s) => s
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

/** Normalise one raw JSON entry into the runtime shape. */
function normalise(raw) {
  const slug = raw.slug || KEBAB_FIX(raw.name || 'untitled')
  return {
    slug,
    name: raw.name || slug,
    tagline: raw.tagline || '',
    status: raw.status === 'draft' ? 'draft' : 'published',
    featured: Boolean(raw.featured),
    grades: (raw.grades || []).map(Number).filter((g) => g >= 1 && g <= 13),
    curriculumTags: raw.curriculumTags || [],
    concepts: raw.concepts || [],
    players: raw.players || '—',
    duration: raw.duration || '—',
    difficulty: Math.min(3, Math.max(1, Number(raw.difficulty) || 1)),
    cover: raw.cover || '/images/logo-hex.png',
    howToPlay: {
      video: raw.howToPlay?.video || null,
      steps: raw.howToPlay?.steps || [],
      pdf: raw.howToPlay?.pdf || null,
    },
    challenges: raw.challenges || [],
    scorecard: raw.scorecard || { rounds: [], scoring: '' },
    updated: raw.updated || '',
  }
}

/** All entries (drafts included) keyed by slug — for "not found" hints. */
export const ALL_GAMES = Object.entries(modules)
  .filter(([file]) => !file.split('/').pop().startsWith('_'))
  .map(([file, mod]) => {
    const game = normalise(mod.default ?? mod)
    // Trust the filename as the canonical slug.
    const fileSlug = file.split('/').pop().replace(/\.json$/, '')
    if (SLUG_RE.test(fileSlug) && fileSlug !== game.slug) game.slug = fileSlug
    return game
  })

/** Public directory: published entries, featured first, then A→Z. */
export const GAMES = ALL_GAMES
  .filter((g) => g.status === 'published')
  .sort((a, b) => (b.featured - a.featured) || a.name.localeCompare(b.name))

export const DRAFTS = ALL_GAMES.filter((g) => g.status === 'draft')

export function getGame(slug) {
  return ALL_GAMES.find((g) => g.slug === slug) || null
}

export function isPublished(slug) {
  const g = getGame(slug)
  return Boolean(g && g.status === 'published')
}

/** Distinct sorted grade numbers across the catalogue. */
export const ALL_GRADES = [...new Set(GAMES.flatMap((g) => g.grades))].sort((a, b) => a - b)

/** Concept chips: unique concepts sorted by how many games carry them. */
export const ALL_CONCEPTS = (() => {
  const count = new Map()
  for (const g of GAMES) for (const c of g.concepts) count.set(c, (count.get(c) || 0) + 1)
  return [...count.keys()].sort((a, b) => (count.get(b) - count.get(a)) || a.localeCompare(b))
})()

/**
 * Search + filter. All terms are optional.
 *   query:  free text — matches name, tagline, concepts, curriculum tags
 *   grade:  number or null
 *   concept: exact concept string or null
 */
export function searchGames({ query = '', grade = null, concept = null } = {}) {
  const q = query.trim().toLowerCase()
  const terms = q.split(/\s+/).filter(Boolean)

  return GAMES.filter((g) => {
    if (grade && !g.grades.includes(grade)) return false
    if (concept && !g.concepts.includes(concept)) return false
    if (!terms.length) return true

    const haystack = [
      g.name, g.tagline, ...g.concepts, ...g.curriculumTags,
    ].join(' ').toLowerCase()

    return terms.every((t) => haystack.includes(t))
  })
}

/** Deep-link URL encoded in the box QR code. */
export function companionUrl(slug) {
  return `${SITE.url}/#/companion/${slug}`
}

/** "Grade 8 – Fractions" style chip for a game's lowest grade. */
export function gradeRange(grades) {
  if (!grades?.length) return 'All grades'
  if (grades.length === 1) return `Grade ${grades[0]}`
  return `Grades ${grades[0]}–${grades[grades.length - 1]}`
}

export const DIFFICULTY_LABELS = { 1: 'Gentle', 2: 'Medium', 3: 'Fiery' }
