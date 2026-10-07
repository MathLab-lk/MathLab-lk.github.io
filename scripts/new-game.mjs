#!/usr/bin/env node
/**
 * Scaffolds a new Rulebook game from the template.
 *
 *   npm run new:game -- "prime-hunt"
 *   npm run new:game -- "prime-hunt" "Prime Hunt"
 *
 * Creates src/content/games/<slug>.json pre-filled from _template.json,
 * then tells you exactly what to edit. Push to main → the site updates.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const gamesDir = join(root, 'src/content/games')

const arg = process.argv[2]
if (!arg) {
  console.error('\nUsage: npm run new:game -- <slug> [ "Display Name" ]\n')
  console.error('  slug:  kebab-case id used in URLs and the box QR code, e.g. "prime-hunt"')
  console.error('  name:  optional display name, e.g. "Prime Hunt"\n')
  process.exit(1)
}

const slug = String(arg).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
if (!slug) {
  console.error('Could not derive a slug from that name.')
  process.exit(1)
}

const target = join(gamesDir, `${slug}.json`)
if (existsSync(target)) {
  console.error(`\nsrc/content/games/${slug}.json already exists — edit it instead.\n`)
  process.exit(1)
}

const displayName =
  process.argv[3] ||
  slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

const template = JSON.parse(readFileSync(join(gamesDir, '_template.json'), 'utf8'))
template.slug = slug
template.name = displayName
template.status = 'draft'

writeFileSync(target, `${JSON.stringify(template, null, 2)}\n`, 'utf8')

console.log(`
Created src/content/games/${slug}.json  (status: "draft" — hidden until you publish)

Next steps:
  1. Edit the file — every field has a descriptive placeholder value.
     (Full reference: docs/companion-guide.md)
  2. Add a cover photo: public/companion/games/${slug}/cover.jpg,
     then set "cover": "/companion/games/${slug}/cover.jpg"
  3. Check it locally:      npm run dev        →  http://localhost:5173/#/companion
  4. Validate + build:      npm run build
  5. When ready, set "status": "published" and push to main — the box QR
     code will point to  https://mathlablk.app/#/companion/${slug}
  6. Print the QR sticker:  npm run qr:generate  →  public/companion/qr/
`)
