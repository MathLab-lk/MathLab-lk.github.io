#!/usr/bin/env node
/**
 * Generates print-ready QR assets for every published game:
 *
 *   public/companion/qr/<slug>.svg       — vector QR for box/packaging design
 *   public/companion/qr/qr-sheet.html    — one A4 sheet with all QR codes
 *                                          + names, ready to print & cut
 *
 *   npm run qr:generate
 *
 * The URL encoded in each code comes from SITE.url in src/config.js,
 * so switching domains later only needs one edit + re-run.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const gamesDir = join(root, 'src/content/games')
const outDir = join(root, 'public/companion/qr')
mkdirSync(outDir, { recursive: true })

// Single source of truth: read SITE.url from src/config.js
const configSrc = readFileSync(join(root, 'src/config.js'), 'utf8')
const urlMatch = configSrc.match(/url:\s*'(https?:\/\/[^']+)'/)
const baseUrl = urlMatch ? urlMatch[1] : 'https://mathlablk.app'
console.log(`Base URL: ${baseUrl}`)

const files = readdirSync(gamesDir)
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => JSON.parse(readFileSync(join(gamesDir, f), 'utf8')))
  .filter((g) => g.status !== 'draft')

if (!files.length) {
  console.error('No published games found — nothing to generate.')
  process.exit(1)
}

const entries = []
for (const game of files) {
  const url = `${baseUrl}/#/companion/${game.slug}`
  const svg = await QRCode.toString(url, {
    type: 'svg',
    margin: 2,
    width: 512,
    errorCorrectionLevel: 'M',
    color: { dark: '#0B2447', light: '#FFFFFF' },
  })
  writeFileSync(join(outDir, `${game.slug}.svg`), svg, 'utf8')
  entries.push({ game, url, svg })
  console.log(`  ✓ ${game.slug}.svg  →  ${url}`)
}

// Combined A4 print sheet
const cards = entries.map(({ game, url, svg }) => `
  <figure class="card">
    <div class="qr">${svg.replace('<svg', '<svg width="100%" height="100%"')}</div>
    <figcaption>
      <strong>${escapeHtml(game.name)}</strong>
      <span>${escapeHtml((game.curriculumTags || [])[0] || '')}</span>
      <code>${escapeHtml(url)}</code>
    </figcaption>
  </figure>`).join('\n')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>MathLab — Box QR sheet</title>
<style>
  @page { size: A4; margin: 12mm; }
  * { margin: 0; box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #0F2440; padding: 8px; }
  h1 { font-size: 15pt; border-bottom: 2px solid #0B2447; padding-bottom: 8px; margin-bottom: 4px; }
  p.sub { font-size: 8.5pt; color: #6F8098; margin-bottom: 16px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .card { border: 1px dashed #D9D3C6; border-radius: 8px; padding: 10px; text-align: center; break-inside: avoid; }
  .qr { width: 100%; aspect-ratio: 1; margin-bottom: 8px; }
  .qr svg { display: block; }
  figcaption strong { display: block; font-size: 10.5pt; }
  figcaption span { display: block; font-size: 8pt; color: #0B7A66; margin: 2px 0; }
  figcaption code { display: block; font-size: 6.5pt; color: #6F8098; word-break: break-all; }
</style>
</head>
<body>
  <h1>MathLab — Box QR codes</h1>
  <p class="sub">Print on A4, cut along the dashed lines, and fix one code per box. Each code opens that game's animated rules on any phone camera. Regenerate any time with <code>npm run qr:generate</code>.</p>
  <div class="grid">${cards}
  </div>
</body>
</html>
`
writeFileSync(join(outDir, 'qr-sheet.html'), html, 'utf8')
console.log(`  ✓ qr-sheet.html  (${entries.length} codes, A4 print-ready)`)
console.log(`\nDone — assets live in public/companion/qr/`)

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]))
}
