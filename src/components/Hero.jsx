import React from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { IconArrowRight, IconTarget, IconCheck, IconSpark } from './Icons.jsx'
import { STATS } from '../config.js'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-glow hero-glow--amber" aria-hidden="true" />
      <div className="hero-glow hero-glow--teal" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <Reveal>
            <span className="hero-badge">
              <span className="pulse-dot" aria-hidden="true" />
              A National Mathematics Initiative — Sri Lanka
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="hero-title">
              Eradicating the fear of math
              <span className="hero-accent"> through play.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="hero-sub">
              Sri Lanka&rsquo;s flagship activity-based mathematics ecosystem. We transform
              classrooms with over <strong>100 proven physical learning tools</strong> —
              endorsed by educators and backed by national CSR trusts.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="hero-cta">
              <a href="#contact" className="btn btn--primary">
                Request a Workshop
                <IconArrowRight width={18} height={18} />
              </a>
              <a href="#tools" className="btn btn--ghost">
                <IconTarget width={18} height={18} />
                Explore Our Tools
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="hero-stats">
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <dt className="hero-stat-value">{s.value}</dt>
                  <dd className="hero-stat-label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="hero-media-wrap">
          <span className="hero-symbol hero-symbol--pi" aria-hidden="true">π</span>
          <span className="hero-symbol hero-symbol--sqrt" aria-hidden="true">√</span>
          <span className="hero-symbol hero-symbol--plus" aria-hidden="true">+</span>
          <span className="hero-symbol hero-symbol--divide" aria-hidden="true">÷</span>

          <Reveal delay={150} className="hero-media">
            <div className="hero-frame" aria-hidden="true" />
            <img
              src="/images/hero-carrom.jpg"
              alt="Students playing a modified carrom math game — MathLab's flagship tactile learning tool"
              width="1000"
              height="1000"
              fetchpriority="high"
            />
            <div className="hero-chip hero-chip--a">
              <span className="hero-chip-icon hero-chip-icon--amber"><IconTarget width={18} height={18} /></span>
              <span>
                <strong>Modified Carrom</strong>
                <em>Play · Strategise · Calculate</em>
              </span>
            </div>
            <div className="hero-chip hero-chip--b">
              <span className="hero-chip-icon hero-chip-icon--teal"><IconSpark width={18} height={18} /></span>
              <span>
                <strong>Rapid Mental Arithmetic</strong>
                <em>Speed built through competition</em>
              </span>
            </div>
            <div className="hero-chip hero-chip--c">
              <span className="hero-chip-icon hero-chip-icon--green"><IconCheck width={18} height={18} /></span>
              <span>
                <strong>100% Screen-Free</strong>
                <em>Physical, tactile, social</em>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
