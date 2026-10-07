import React, { useEffect, useState } from 'react'
import { Logo } from './Logo.jsx'
import { IconMenu, IconClose, IconArrowRight } from './Icons.jsx'
import { NAV_LINKS } from '../config.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      // Highlight the section currently in view (skip hash-route links)
      let current = ''
      for (const { href } of NAV_LINKS) {
        if (href.startsWith('#/')) continue
        const sec = document.querySelector(href)
        if (sec && sec.getBoundingClientRect().top <= 120) current = href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <div className="container nav-inner">
        <Logo />

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${
                active === l.href || (l.route && window.location.hash.startsWith('#/companion'))
                  ? 'is-active'
                  : ''
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn--primary btn--sm">
            Request a Workshop
            <IconArrowRight width={16} height={16} />
          </a>
          <button
            className="nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div className={`nav-mobile ${open ? 'is-open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-mobile-link" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn btn--primary nav-mobile-cta" onClick={() => setOpen(false)}>
          Request a Workshop
          <IconArrowRight width={16} height={16} />
        </a>
      </div>
    </header>
  )
}
