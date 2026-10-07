/**
 * ─────────────────────────────────────────────────────────────
 *  MATHLAB SRI LANKA — SITE CONFIGURATION
 *  Update contact details, links and stats here once.
 *  Every component reads from this file.
 * ─────────────────────────────────────────────────────────────
 *  ⚠ PLACEHOLDERS: The contact values below are placeholders.
 *  Replace them with the real WhatsApp number, email address
 *  and Facebook page URL before going live on mathlablk.app.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: 'MathLab Sri Lanka',
  domain: 'mathlablk.app',
  url: 'https://mathlablk.app',
  tagline: 'Eradicating the fear of math through play.',
}

export const FOUNDER = {
  name: 'Hengodage Dharmasiri',
  roles: 'Mathematician · Curriculum Innovator · Author',
  initials: 'HD',
}

export const CONTACT = {
  person: 'Hengodage Dharmasiri',
  role: 'Founder — MathLab Sri Lanka',
  whatsapp: '+94 77 123 4567',        // ⚠ placeholder — replace with real number
  whatsappLink: 'https://wa.me/94771234567', // ⚠ placeholder
  email: 'hello@mathlablk.app',       // ⚠ placeholder — replace with real inbox
  facebook: 'MathLab Sri Lanka',      // ⚠ placeholder — replace with real page
  facebookLink: 'https://www.facebook.com/mathlabsrilanka', // ⚠ placeholder
}

export const STATS = [
  { value: '150+', label: 'Schools island-wide' },
  { value: '100+', label: 'Physical learning tools' },
  { value: '100%', label: 'Screen-free & tactile' },
]

export const PARTNERS = [
  { name: 'Commercial Bank', sub: 'CSR Trust' },
  { name: 'Zonal Education', sub: 'Kuliyapitiya Office' },
  { name: 'Imashi', sub: 'Publications' },
  { name: 'Neth FM', sub: 'Radio Feature' },
]

export const NAV_LINKS = [
  { label: 'The Method', href: '#method' },
  { label: 'Our Impact', href: '#impact' },
  { label: 'Rulebook', href: '#/companion', route: true },
  { label: 'Founder', href: '#founder' },
  { label: 'Voices', href: '#voices' },
  { label: 'Contact', href: '#contact' },
]
