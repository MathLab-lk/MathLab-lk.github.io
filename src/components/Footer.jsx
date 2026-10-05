import React from 'react'
import { Logo } from './Logo.jsx'
import { NAV_LINKS, SITE, CONTACT } from '../config.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo dark size={44} />
            <p>{SITE.tagline}</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <div className="footer-domains">
            <span className="domain-chip domain-chip--live">
              <span className="pulse-dot" aria-hidden="true" />
              mathlablk.app
            </span>
            <span className="domain-chip domain-chip--soon">mathlab.lk — coming soon</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p>
            Manufacturing partner: Imashi Publications · CSR partner: Commercial Bank CSR Trust
          </p>
          <p className="footer-contact-mini">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
