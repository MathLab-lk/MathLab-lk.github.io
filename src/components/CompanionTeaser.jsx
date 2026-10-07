import React from 'react'
import { IconQR, IconArrowRight, IconPlay, IconPrinter } from './Icons.jsx'
import { GAMES, ALL_GRADES, gradeRange } from '../companion/companionData.js'

export default function CompanionTeaser() {
  const featured = GAMES[0]
  const sheetCount = GAMES.reduce((n, g) => n + (g.challenges.length > 0 ? 2 : 1), 0)

  return (
    <section className="section teaser" id="rulebook">
      <div className="container teaser-inner">
        <div className="teaser-copy">
          <span className="eyebrow">
            <IconQR width={13} height={13} />
            New · Digital Rulebook
          </span>

          <h2 className="section-title">
            There’s a rulebook <span className="text-accent">in every box</span>
          </h2>

          <p className="section-lede">
            Every MathLab game now carries a QR code. One scan with any phone camera
            opens its page here — animated rules that play themselves, printable
            challenge sheets and scorecards for the classroom, and curriculum tags
            so teachers can match the right game to the right lesson.
          </p>

          <ul className="teaser-points">
            <li>
              <IconPlay width={16} height={16} />
              Rules as short animated walkthroughs
            </li>
            <li>
              <IconPrinter width={16} height={16} />
              Challenge sheets & scorecards, print-ready
            </li>
            <li>
              <IconQR width={16} height={16} />
              Tagged to the syllabus, from Grade {ALL_GRADES[0] || 1} to {ALL_GRADES[ALL_GRADES.length - 1] || 13}
            </li>
          </ul>

          <div className="teaser-cta">
            <a className="btn btn--primary" href="#/companion">
              Open the Rulebook
              <IconArrowRight width={17} height={17} />
            </a>
            {featured && (
              <a className="btn btn--ghost" href={`#/companion/${featured.slug}`}>
                Try it — {featured.name}
              </a>
            )}
          </div>

          <p className="teaser-stats">
            <strong>{GAMES.length}</strong> games ·&nbsp;
            <strong>{sheetCount}</strong> printable sheets ·&nbsp;
            <strong>{ALL_GRADES.length}</strong> grade levels
          </p>
        </div>

        {/* phone mockup */}
        <div className="teaser-visual" aria-hidden="true">
          <div className="teaser-qrcard">
            <div className="teaser-qr-grid" />
            <span className="teaser-qrcard-label">Scan me — Fraction Carrom</span>
          </div>

          <div className="teaser-phone">
            <div className="teaser-phone-notch" />
            <div className="teaser-phone-screen">
              <div className="teaser-appbar">
                <span className="teaser-appbar-title">MathLab Rulebook</span>
                <span className="teaser-appbar-chip">animated</span>
              </div>
              {featured && (
                <div className="teaser-gamecard">
                  <div className="teaser-gamecard-cover">
                    <img src={featured.cover} alt="" loading="lazy" />
                    <span className="teaser-gamecard-grade">{gradeRange(featured.grades)}</span>
                  </div>
                  <div className="teaser-gamecard-body">
                    <strong>{featured.name}</strong>
                    <span>{featured.tagline}</span>
                    <div className="teaser-progress">
                      <i /><i className="on" /><i /><i />
                    </div>
                    <span className="teaser-step-tag">Step 2 · Strike and pocket</span>
                  </div>
                </div>
              )}
              <div className="teaser-actions">
                <span className="teaser-action teaser-action--print">
                  <IconPrinter width={13} height={13} /> Print sheet
                </span>
                <span className="teaser-action">
                  <IconQR width={13} height={13} /> 7 concepts
                </span>
              </div>
            </div>
          </div>

          <div className="teaser-chip teaser-chip--a">
            <IconPlay width={14} height={14} />
            Rules auto-play
          </div>
          <div className="teaser-chip teaser-chip--b">
            <IconPrinter width={14} height={14} />
            A4 print-ready
          </div>
        </div>
      </div>
    </section>
  )
}
