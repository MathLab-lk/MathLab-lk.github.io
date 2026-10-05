import React from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { IconShield, IconMic, IconHeart } from './Icons.jsx'

const GALLERY = [
  {
    img: '/images/classroom-cards.jpg',
    alt: 'Students playing an educational card game during a MathLab camp',
    caption: 'MathLab Camp — activity session',
  },
  {
    img: '/images/carrom-group.jpg',
    alt: 'A group playing modified carrom — MathLab flagship game',
    caption: 'Modified carrom in play',
  },
]

const BADGES = [
  { Icon: IconShield, title: 'Endorsed', text: 'Zonal Education Authorities' },
  { Icon: IconMic, title: 'Featured', text: 'Neth FM radio' },
  { Icon: IconHeart, title: 'Backed', text: 'Commercial Bank CSR Trust' },
]

export default function Testimonials() {
  return (
    <section className="voices section section--dark" id="voices">
      <div className="voices-grid-bg" aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow eyebrow--light">Proof &amp; Voices</span></Reveal>
          <Reveal delay={80}>
            <h2 className="section-title section-title--light">
              Results you can hear <span className="text-accent-light">in the classroom</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <figure className="quote-card">
            <span className="quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote>
              Students who used to fear getting 50 marks are now building natural speed
              and logic. They don&rsquo;t even realize they are doing complex arithmetic —
              because they are so focused on winning the game.
            </blockquote>
            <figcaption>
              <span className="quote-avatar" aria-hidden="true">T</span>
              <span>
                <strong>Teacher Testimonial</strong>
                <em>Kuliyapitiya MathLab Camp</em>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={160}>
          <p className="voices-impact">
            Across every camp and workshop, teachers report the same pattern: students
            previously scoring <strong>under 50 marks</strong> become rapid, eager
            participants in arithmetic and logic once the MathLab games begin.
          </p>
        </Reveal>

        <div className="voices-gallery">
          {GALLERY.map((g, i) => (
            <Reveal key={g.img} delay={i * 120} className="voices-photo">
              <img src={g.img} alt={g.alt} loading="lazy" width="480" height="320" />
              <span className="voices-photo-caption">{g.caption}</span>
            </Reveal>
          ))}
          <Reveal delay={240} className="voices-photo voices-photo--placeholder">
            <div className="voices-more">
              <strong>Kuliyapitiya Holy Angels Girls&rsquo; College</strong>
              <em>Workshop gallery — coming soon</em>
              <span className="voices-more-cta">Photos &amp; camp video</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ul className="voices-badges">
            {BADGES.map(({ Icon, title, text }) => (
              <li key={title + text}>
                <span className="voices-badge-icon"><Icon width={20} height={20} /></span>
                <span>
                  <strong>{title}</strong>
                  <em>{text}</em>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
