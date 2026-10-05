import React from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { IconBank, IconSchool, IconBook, IconMic } from './Icons.jsx'
import { PARTNERS } from '../config.js'

const ICONS = {
  'Commercial Bank': IconBank,
  'Zonal Education': IconSchool,
  'Imashi': IconBook,
  'Neth FM': IconMic,
}

export default function TrustBar() {
  return (
    <section className="trust" aria-label="Trusted and supported by">
      <div className="container">
        <Reveal>
          <p className="trust-label">Trusted &amp; Supported By</p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="trust-row">
            {PARTNERS.map((p) => {
              const Icon = ICONS[p.name] || IconBank
              return (
                <li key={p.name} className="trust-item">
                  <span className="trust-icon"><Icon width={22} height={22} /></span>
                  <span className="trust-name">{p.name}</span>
                  <span className="trust-sub">{p.sub}</span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
