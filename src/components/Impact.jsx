import React from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { IconArrowRight } from './Icons.jsx'

const CARDS = [
  {
    num: '01',
    tag: '150+ schools',
    img: '/images/workshop-table.jpg',
    alt: 'Students collaborating around a table during a MathLab activity session',
    title: 'School Workshops & Math Camps',
    text: 'Hands-on, one-day training sessions led by founder Hengodage Dharmasiri — introducing students and teachers alike to the power of activity-based learning.',
    cta: 'Book a workshop',
    href: '#contact',
  },
  {
    num: '02',
    tag: 'Island-wide reach',
    img: '/images/workshop-teacher.jpg',
    alt: 'A teacher guiding uniformed students through a MathLab learning activity',
    title: 'Corporate CSR Partnerships',
    text: 'Proudly partnering with organizations such as the Commercial Bank CSR Trust to donate complete MathLab environments to underprivileged schools across Sri Lanka.',
    cta: 'Partner with us',
    href: '#contact',
  },
  {
    num: '03',
    tag: '100+ tools',
    img: '/images/tactile-tools.jpg',
    alt: 'Hands-on math learning aids — tactile counting and number tools',
    title: '100+ Educational Tools',
    text: 'A vast curriculum of physical learning aids, manufactured in partnership with Imashi Publications, designed to make abstract mathematical concepts tangible.',
    cta: 'See them in action',
    href: '#voices',
  },
]

export default function Impact() {
  return (
    <section className="impact section" id="impact">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">Our Impact &amp; Activities</span></Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">
              Three ways we <span className="text-accent">change the equation</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="section-lede">
              From single-day camps to nationwide CSR programmes, every MathLab
              activity is built around one belief — children learn fastest when
              they forget they are learning.
            </p>
          </Reveal>
        </div>

        <div className="impact-grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.num} delay={i * 120} className="impact-card">
              <div className="impact-media">
                <img src={c.img} alt={c.alt} loading="lazy" width="640" height="430" />
                <span className="impact-num">{c.num}</span>
                <span className="impact-tag">{c.tag}</span>
              </div>
              <div className="impact-body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <a href={c.href} className="impact-link">
                  {c.cta}
                  <IconArrowRight width={16} height={16} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
