import React from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { IconTrophy, IconSchool, IconBook, IconShield } from './Icons.jsx'
import { FOUNDER } from '../config.js'

const FACTS = [
  { Icon: IconTrophy, label: '100+ tools designed' },
  { Icon: IconSchool, label: 'Adopted in 150+ schools' },
  { Icon: IconBook, label: 'Published author' },
  { Icon: IconShield, label: 'Zonal-endorsed' },
]

export default function Founder() {
  return (
    <section className="founder section" id="founder">
      <div className="container founder-inner">
        <Reveal className="founder-portrait" delay={80}>
          <div className="founder-portrait-frame" aria-hidden="true" />
          <div className="founder-portrait-card">
            <div className="founder-grid-bg" aria-hidden="true" />
            <span className="founder-symbol" aria-hidden="true">∑</span>
            <span className="founder-symbol founder-symbol--b" aria-hidden="true">π</span>
            <span className="founder-monogram" aria-hidden="true">{FOUNDER.initials}</span>
            <div className="founder-plate">
              <strong>{FOUNDER.name}</strong>
              <em>Founder &amp; Innovator</em>
            </div>
          </div>
        </Reveal>

        <div className="founder-copy">
          <Reveal><span className="eyebrow">Meet the Innovator</span></Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">{FOUNDER.name}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="founder-roles">{FOUNDER.roles}</p>
          </Reveal>

          <Reveal delay={200}>
            <p>
              For decades, Hengodage Dharmasiri has dedicated his life to a single
              conviction: that no child in Sri Lanka should grow up afraid of numbers.
              As a mathematician and curriculum innovator, he has spent his career
              inside classrooms — watching bright, capable students slowly disengage
              from mathematics taught purely through memorisation.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p>
              His answer was to rebuild mathematics education from the ground up — as
              something children can <strong>touch, play and win at</strong>. He has personally
              designed over 100 unique pedagogical tools, from modified carrom boards
              to rule-based card games and geometric kits, each engineered to make
              abstract concepts physical, social and irresistible.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p>
              Today, his method has been adopted in more than 150 schools across the
              island, endorsed by zonal education authorities and championed by national
              CSR partners — turning a lifetime of quiet classroom innovation into a
              national movement to eradicate the fear of math.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <ul className="founder-facts">
              {FACTS.map(({ Icon, label }) => (
                <li key={label}>
                  <Icon width={16} height={16} />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
