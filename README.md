# MathLab Sri Lanka — Website

Modern, polished single-page marketing site for **MathLab Sri Lanka** — the national
activity-based mathematics initiative. Built as a **static React site** (Vite), no
backend required. Deploy anywhere static files are served.

- **Live domain (planned):** `mathlablk.app` (current) → `mathlab.lk` (future)
- **Stack:** React 18 + Vite 5, vanilla CSS design system (no UI framework)
- **Bundle:** ~72 KB gzipped JS + ~11 KB gzipped CSS — fast on mobile data
- **Digital Rulebook:** data-driven game directory with QR deep-links, animated
  rules, printable challenge sheets & scorecards (see `docs/companion-guide.md`)

---

## Quick start

```bash
npm install      # once
npm run dev      # local dev server (http://localhost:5173)
npm run build    # validates rulebook content, then production build → dist/
npm run preview  # serve the production build locally
```

### Digital Rulebook (Companion) tooling

```bash
npm run new:game -- "prime-hunt" "Prime Hunt"  # scaffold a new game entry (JSON)
npm run validate:content                       # check every game entry, plain-English errors
npm run qr:generate                            # regenerate box QR SVGs + A4 print sheet
```

Adding a game to the Rulebook is a no-code workflow — drop a JSON file in
`src/content/games/`, add photos in `public/companion/games/<slug>/`, push.
Full field reference: **[docs/companion-guide.md](docs/companion-guide.md)**.

The four starter games shipped in `src/content/games/` are **sample entries**
demonstrating the format — replace them with the real catalogue as boxes are
photographed and rules are written.

## Deploying

**GitHub Pages (primary — automatic):** every push to `main` triggers the
[GitHub Actions workflow](.github/workflows/deploy.yml) — it installs
dependencies, builds `dist/`, and publishes to GitHub Pages. Nothing to do
manually; just push. (Repo: `MathLab-lk/MathLab-lk.github.io`.)

**Custom domain `mathlablk.app`:** the domain is wired via
`public/CNAME` + the repo's Pages settings. DNS records required at the
registrar (apex domain):

| Type | Name   | Value                |
|------|--------|----------------------|
| A    | `@`    | `185.199.108.153`    |
| A    | `@`    | `185.199.109.153`    |
| A    | `@`    | `185.199.110.153`    |
| A    | `@`    | `185.199.111.153`    |
| CNAME| `www`  | `mathlab-lk.github.io` |

HTTPS is enforced; GitHub auto-provisions the certificate once DNS resolves.
When you later buy `mathlab.lk`, add it the same way (update `public/CNAME`
and Pages settings) and update `SITE.url` in `src/config.js`.

**Other hosts (manual):** `dist/` is a fully self-contained static site —
drag-and-drop at Netlify, or Vercel preset "Vite" (build `npm run build`,
output `dist`).

---

## ✅ Done — real brand assets live

Official brand assets sourced from the MathLab Facebook page
(facebook.com/mathslabsl) are now integrated:

- **Logo** — the official teal hexagon-“M” mark (nav, favicon, og-cover) and the
  full stacked lockup (footer) replace the placeholder flask mark.
- **Photos** — Impact section now carries two authentic photos from a Commercial
  Bank CSR workshop (`csr-session.jpg`, `tools-table.jpg`).

## ⚠️ Before going live — replace placeholders

All site content is centralised in **`src/config.js`**:

| Key | What to update |
|-----|----------------|
| `CONTACT.whatsapp` / `whatsappLink` | Real WhatsApp number (+94…, use `https://wa.me/94…`) |
| `CONTACT.email` | Real inbox (also used by the inquiry form) |
| `CONTACT.facebook` / `facebookLink` | Real Facebook page |

The inquiry form opens the visitor's email app with a pre-filled message
(no backend needed). To use a form service instead (e.g. Formspree), replace the
`onSubmit` handler in `src/components/Contact.jsx`.

Also recommended before launch:

1. **Founder portrait** — replace the monogram card in `src/components/Founder.jsx`
   (a styled placeholder marks where the photo of Mr. Hengodage Dharmasiri goes).
2. **Partner logos** — swap the typographic placeholders in
   `src/components/TrustBar.jsx` with official logo images (drop them in
   `public/images/`).
3. **Workshop gallery** — replace the placeholder tile in
   `src/components/Testimonials.jsx` with real photos/video from the
   Kuliyapitiya Holy Angels Girls' College workshop.

> Tip: Facebook post photos are login-walled for scrapers. To hand them over,
   either upload the files directly, or right-click a photo on the page →
   *Copy image address* → paste the `scontent…` link here (those CDN links are
   fetchable without login).

## Where things live

```
├── public/               # static assets copied as-is to dist/
│   ├── images/           # photos + brand assets (logo-hex, logo-lockup, csr-session, tools-table, og-cover)
│   ├── companion/        # Rulebook assets: games/<slug>/ media + generated qr/
│   ├── favicon.png       # official hexagon mark (48px)
│   └── apple-touch-icon.png
├── src/
│   ├── config.js         # ⭐ all editable site data (contact, stats, partners, nav)
│   ├── App.jsx           # section composition + tiny hash router (#/companion/...)
│   ├── content/games/    # ⭐ Rulebook entries — one JSON per game, auto-discovered
│   ├── companion/        # Rulebook UI (directory, detail, rule player, print, QR)
│   ├── styles/           # design system (base.css + sections.css + companion.css)
│   ├── hooks/useReveal.jsx  # scroll-reveal animation
│   └── components/       # Nav, Hero, TrustBar, Method, Impact, CompanionTeaser,
│                         # Founder, Testimonials, Contact, Footer, Icons, Logo
├── scripts/              # content tooling (validate, scaffold, QR generator)
├── docs/companion-guide.md  # ⭐ how to add Rulebook games without code
└── index.html            # SEO meta, Open Graph, fonts, JSON-LD
```

## Design language

- **Palette:** deep navy `#0B2447` (institutional trust) · warm amber `#F5A623`
  (play & energy) · teal `#0FA48A` (growth) on warm paper `#F9F7F1`
- **Type:** Sora (display) · Inter (body) · Lora italic (testimonial quote)
- **Motif:** graph-paper grid, floating math symbols (π √ + ÷), the flask logo mark
- Accessible: skip-link, focus states, reduced-motion support, AA-contrast text
