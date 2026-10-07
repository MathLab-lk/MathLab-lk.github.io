# The Rulebook Content Guide

This guide is for **content authors** — anyone adding or editing games in the
MathLab Digital Rulebook. You will not touch any application code. Everything
on this site is generated from small JSON files.

---

## The 4-step workflow

1. **Scaffold** (optional but easy):
   ```bash
   npm run new:game -- "prime-hunt" "Prime Hunt"
   ```
   This creates `src/content/games/prime-hunt.json` from the template, set to
   `draft` status (hidden from the public directory).

2. **Edit the JSON** — replace the placeholder values with your game's real
   rules, challenges and scorecard. The full field reference is below.

3. **Add assets** (photos, GIFs, video, PDF) into `public/companion/games/<slug>/`
   and point the JSON at them.

4. **Publish**:
   ```bash
   npm run validate:content   # catches mistakes before the build does
   npm run qr:generate        # refresh box QR assets
   git add -A && git commit -m "Add <slug> to the Rulebook" && git push
   ```
   Push to `main` deploys automatically (GitHub Actions → GitHub Pages).
   While `"status": "draft"` the entry stays hidden — flip it to
   `"published"` when it is ready for the world.

---

## Where things live

| Path | What it is |
|---|---|
| `src/content/games/<slug>.json` | One game entry — the single source of truth |
| `public/companion/games/<slug>/` | That game's images, GIFs, video, PDFs |
| `public/companion/qr/<slug>.svg` | Print-ready QR code (generated, do not hand-edit) |
| `public/companion/qr/qr-sheet.html` | One A4 sheet with every code, ready to print |
| `src/content/games/_template.json` | The commented starter shape |

The slug (filename) is the public identifier: the game page URL is
`https://mathlablk.app/#/companion/<slug>` and that is exactly what the box
QR code encodes. **Never rename a slug after boxes are printed.**

---

## Field reference

```jsonc
{
  // Identity
  "slug": "fraction-carrom",         // must equal the filename, kebab-case
  "name": "Fraction Carrom",         // display name
  "tagline": "Strike, pocket, …",    // one-line hook for cards & hero
  "status": "published",             // "draft" hides it from the directory
  "featured": true,                  // pins it first + "Start here" badge

  // Curriculum tagging (this powers search & the teacher filters)
  "grades": [6, 7, 8],               // Sri Lankan grades, integers 1–13
  "curriculumTags": ["Grade 6 — Fractions", "Grade 7 — Fractions"],
  "concepts": ["Equivalent fractions", "Simplification"],

  // Play meta (shown as chips on cards and the detail page)
  "players": "2–6",
  "duration": "20–40 min",
  "difficulty": 2,                   // 1 Gentle · 2 Medium · 3 Fiery

  // Cover image (4:3-ish works best). Put files in public/companion/games/<slug>/
  "cover": "/images/carrom-group.jpg",

  // How to play — animated steps and/or video
  "howToPlay": {
    // Video wins over steps when present. Two supported types:
    "video": null,
    // "video": { "type": "youtube", "id": "dQw4w9WgXcQ" }   // 11-char code
    // "video": { "type": "file", "src": "/companion/games/<slug>/rules.mp4" }

    // Steps auto-play like a story. "seconds" = how long each shows (3–60, default 8).
    // Optional "image" per step — a GIF works exactly like a static image.
    "steps": [
      { "title": "Set the board", "text": "…", "image": null, "seconds": 8 }
    ],

    // Optional link to a designed PDF rulebook, if you have one
    "pdf": null
  },

  // Feeds the printable challenge sheet
  "challenges": [
    { "title": "Equivalent Hunt", "brief": "…", "points": 10, "level": "core" }
    // "level": "core" (teal) or "stretch" (coral, for early finishers)
  ],

  // Feeds the printable scorecard — column headers, any number
  "scorecard": {
    "rounds": ["Round 1", "Round 2", "Round 3", "Total"],
    "scoring": "2 points per correctly simplified coin…"
  },

  "updated": "2026-10"               // free-form stamp, shown nowhere critical
}
```

### Notes on media

- **Cover photos**: landscape, ≥ 800px wide. JPG/PNG/WebP.
- **Animated rule explanations, two ways**:
  1. *No video?* The steps player animates your text automatically — each
     step shows for `seconds`, with progress bars, play/pause and arrows.
  2. *Have a clip?* Upload to YouTube and paste the 11-character `id`
     (privacy-enhanced nocookie embed, works on school networks), or drop an
     MP4 into the game folder and use `type: "file"`.
  - **GIFs per step**: export a short loop (≤ 2 MB), put it in the game
    folder, and set it as that step's `"image"` — `<img>` plays GIFs natively.
- **Printables are generated** — challenge sheets and scorecards are built
  from the JSON in the browser's print dialog (A4 portrait). Only add a
  `"pdf"` if you have a professionally designed rulebook PDF.

### Adding video/GIF/cover files

```
public/companion/games/fraction-carrom/
  ├── cover.jpg
  ├── rules.mp4            (optional)
  └── step-2.gif           (optional)
```

Reference them in JSON as `/companion/games/fraction-carrom/cover.jpg`
(leading slash = inside `public/`).

---

## QR codes

- Each published game's code encodes `https://mathlablk.app/#/companion/<slug>`
  — fixed at generation time from `SITE.url` in `src/config.js`.
- Regenerate after adding games or changing the domain:
  `npm run qr:generate`
- Print `public/companion/qr/qr-sheet.html` (A4, background graphics ON) and
  cut the cards for prototyping; use the per-game `.svg` files for final box
  artwork (vector, scales to any size).
- The game's own page also shows the live QR with a PNG download button.

---

## Validation rules (run automatically on every build)

`npm run validate:content` fails the build with a plain-English message if
any entry has: a missing/mismatched slug, missing name/tagline, invalid
grades (must be integers 1–13), empty concepts or curriculum tags, fewer
than 3 rule steps, a step without title/text, zero challenges, a scorecard
with fewer than 2 rounds, a bad YouTube ID, or an image/video/PDF path that
does not exist in `public/`.

---

## FAQ

**I added a game but don't see it.** Is `"status": "published"`? Drafts are
hidden. Also hard-refresh — GitHub Pages caches the edge briefly.

**Can one concept tag live on several games?** Yes — shared concepts become
one chip in the directory filter and one link in each game's sidebar.

**How do I change the order?** `featured: true` entries come first; the rest
sort A–Z. There is no manual ordering — keep it simple.

**What about Sinhala/Tamil names?** Fine in `name`/`tagline` — keep the
*slug* ASCII kebab-case for URLs.

**A game got renamed and old QR codes break.** Keep the old slug, change only
`name`. Slugs are permanent once printed.
