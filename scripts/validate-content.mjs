#!/usr/bin/env node
/**
 * Validates every game entry in src/content/games/ before the site builds.
 * Run manually:   npm run validate:content
 * Runs automatically before every `npm run build`.
 *
 * Friendly errors point at the exact file + field to fix, so adding a
 * game never requires touching code.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const gamesDir = join(root, 'src/content/games')
const publicDir = join(root, 'public')

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const errors = []
const warnings = []
const files = readdirSync(gamesDir).filter((f) => f.endsWith('.json') && !f.startsWith('_'))

if (files.length === 0) {
  errors.push('No game files found in src/content/games/ — copy _template.json to get started.')
}

const seenSlugs = new Map()
const seenNames = new Map()

for (const file of files) {
  const label = file
  let game
  try {
    game = JSON.parse(readFileSync(join(gamesDir, file), 'utf8'))
  } catch (e) {
    errors.push(`${label}: invalid JSON — ${e.message}`)
    continue
  }

  // slug / file naming
  const fileSlug = file.replace(/\.json$/, '')
  if (!SLUG_RE.test(fileSlug)) {
    errors.push(`${label}: filename must be kebab-case (lowercase letters, digits, hyphens)`)
  }
  if (!game.slug) {
    errors.push(`${label}: missing "slug" (must match the filename: "${fileSlug}")`)
  } else if (game.slug !== fileSlug) {
    errors.push(`${label}: "slug" is "${game.slug}" but the filename says "${fileSlug}" — make them match`)
  }
  if (seenSlugs.has(game.slug)) {
    errors.push(`${label}: duplicate slug "${game.slug}" (also in ${seenSlugs.get(game.slug)})`)
  }
  seenSlugs.set(game.slug, label)

  // identity
  for (const field of ['name', 'tagline']) {
    if (!game[field] || typeof game[field] !== 'string') {
      errors.push(`${label}: missing string "${field}"`)
    }
  }
  if (seenNames.has(game.name)) {
    warnings.push(`${label}: game name "${game.name}" is also used by ${seenNames.get(game.name)}`)
  }
  seenNames.set(game.name, label)

  if (game.status && !['published', 'draft'].includes(game.status)) {
    errors.push(`${label}: "status" must be "published" or "draft", got "${game.status}"`)
  }

  // grades
  if (!Array.isArray(game.grades) || game.grades.length === 0) {
    errors.push(`${label}: "grades" must be a non-empty array, e.g. [6, 7, 8] (Sri Lankan grades 1–13)`)
  } else {
    for (const g of game.grades) {
      if (!Number.isInteger(g) || g < 1 || g > 13) {
        errors.push(`${label}: grade "${g}" is invalid — use integers 1–13`)
      }
    }
  }

  // concepts / curriculum tags
  for (const [field, min] of [['concepts', 1], ['curriculumTags', 1]]) {
    if (!Array.isArray(game[field]) || game[field].length < min) {
      errors.push(`${label}: "${field}" must list at least ${min} entry (e.g. "Grade 8 — Fractions")`)
    } else if (game[field].some((x) => typeof x !== 'string' || !x.trim())) {
      errors.push(`${label}: "${field}" contains an empty value`)
    }
  }

  // meta strings
  for (const field of ['players', 'duration']) {
    if (!game[field]) errors.push(`${label}: missing "${field}" (e.g. "2–6" / "20–40 min")`)
  }
  if (![1, 2, 3].includes(game.difficulty)) {
    errors.push(`${label}: "difficulty" must be 1, 2 or 3`)
  }

  // cover exists
  const checkPublicFile = (path, field) => {
    if (!path) return
    if (typeof path !== 'string' || !path.startsWith('/')) {
      errors.push(`${label}: "${field}" must start with "/" (a path inside public/)`)
    } else if (!existsSync(join(publicDir, path.slice(1)))) {
      errors.push(`${label}: "${field}" → "${path}" not found in public/`)
    }
  }
  checkPublicFile(game.cover, 'cover')

  // how to play
  const htp = game.howToPlay || {}
  if (!Array.isArray(htp.steps) || htp.steps.length < 3) {
    errors.push(`${label}: "howToPlay.steps" needs at least 3 steps (got ${htp.steps?.length ?? 0})`)
  } else {
    htp.steps.forEach((s, i) => {
      if (!s.title || !s.text) errors.push(`${label}: step ${i + 1} needs both "title" and "text"`)
      if (s.image) checkPublicFile(s.image, `steps[${i}].image`)
      if (s.seconds !== undefined && (!Number.isFinite(s.seconds) || s.seconds < 3 || s.seconds > 60)) {
        warnings.push(`${label}: step ${i + 1} "seconds" should be 3–60 (default 8)`)
      }
    })
  }
  if (htp.video) {
    if (htp.video.type === 'youtube' && !/^[A-Za-z0-9_-]{11}$/.test(htp.video.id || '')) {
      errors.push(`${label}: youtube video "id" must be the 11-character code from the watch URL`)
    }
    if (htp.video.type === 'file') checkPublicFile(htp.video.src, 'howToPlay.video.src')
    if (!['youtube', 'file'].includes(htp.video.type)) {
      errors.push(`${label}: video "type" must be "youtube" or "file"`)
    }
  }
  checkPublicFile(htp.pdf, 'howToPlay.pdf')

  // challenges
  if (!Array.isArray(game.challenges) || game.challenges.length === 0) {
    errors.push(`${label}: "challenges" needs at least 1 entry (they feed the printable sheet)`)
  } else {
    game.challenges.forEach((c, i) => {
      if (!c.title || !c.brief) errors.push(`${label}: challenge ${i + 1} needs "title" and "brief"`)
      if (!Number.isFinite(c.points)) errors.push(`${label}: challenge ${i + 1} needs numeric "points"`)
      if (c.level && !['core', 'stretch'].includes(c.level)) {
        errors.push(`${label}: challenge ${i + 1} "level" must be "core" or "stretch"`)
      }
    })
  }

  // scorecard
  const sc = game.scorecard || {}
  if (!Array.isArray(sc.rounds) || sc.rounds.length < 2) {
    errors.push(`${label}: "scorecard.rounds" needs at least 2 column names, e.g. ["Round 1", "Total"]`)
  }
  if (!sc.scoring) errors.push(`${label}: missing "scorecard.scoring" (printed under the table)`)
}

for (const w of warnings) console.warn(`  ⚠ ${w}`)
if (errors.length) {
  console.error('\nContent validation failed — fix these and rebuild:\n')
  for (const e of errors) console.error(`  ✗ ${e}`)
  console.error(`\n${errors.length} error(s), ${files.length} file(s) checked.`)
  console.error('Tip: the fully-commented shape lives in src/content/games/_template.json')
  process.exit(1)
}

const drafts = files.filter((f) => {
  try { return JSON.parse(readFileSync(join(gamesDir, f), 'utf8')).status === 'draft' } catch { return false }
})
console.log(`\nContent OK — ${files.length} game(s) checked${drafts.length ? `, ${drafts.length} draft(s) hidden from the directory` : ''}.\n`)
