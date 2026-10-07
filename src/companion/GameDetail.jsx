import React, { useState } from 'react'
import {
  IconArrowRight, IconPrinter, IconUsers, IconClock, IconFlame,
  IconVideo, IconQR, IconCheck,
} from '../components/Icons.jsx'
import { gradeRange, DIFFICULTY_LABELS } from './companionData.js'
import RuleSteps from './RuleSteps.jsx'
import { BoxQR } from './QRBox.jsx'
import { PrintOverlay } from './PrintSheets.jsx'

function MetaChip({ icon, children }) {
  return (
    <span className="gmeta-chip">
      {icon}
      {children}
    </span>
  )
}

function HowToPlay({ game }) {
  const v = game.howToPlay.video

  if (v && (v.type === 'youtube' || v.type === 'file')) {
    return (
      <div className="rule-video">
        {v.type === 'youtube' ? (
          <div className="rule-video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
              title={`${game.name} — video rules`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <video controls playsInline preload="metadata" src={v.src}>
            Your browser cannot play this video — the step-by-step rules below still work.
          </video>
        )}
      </div>
    )
  }

  return <RuleSteps steps={game.howToPlay.steps} />
}

export default function GameDetail({ game }) {
  const [sheet, setSheet] = useState(null) // 'challenges' | 'scorecard' | null
  const hasSteps = game.howToPlay.steps.length > 0
  const hasVideo = Boolean(game.howToPlay.video)

  return (
    <article className="game-detail">
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="game-hero">
        <div className="game-hero-media">
          <img src={game.cover} alt={`${game.name} — MathLab game in play`} />
        </div>
        <div className="game-hero-body">
          <a className="game-back" href="#/companion">
            <IconArrowRight width={15} height={15} style={{ transform: 'rotate(180deg)' }} />
            All games
          </a>

          <h1 className="game-title">{game.name}</h1>
          <p className="game-tagline">{game.tagline}</p>

          <div className="gmeta">
            <MetaChip icon={<IconUsers width={15} height={15} />}>{game.players} players</MetaChip>
            <MetaChip icon={<IconClock width={15} height={15} />}>{game.duration}</MetaChip>
            <MetaChip icon={<IconFlame width={15} height={15} />}>
              {DIFFICULTY_LABELS[game.difficulty]}
            </MetaChip>
            <MetaChip icon={<IconQR width={15} height={15} />}>Box QR enabled</MetaChip>
          </div>

          <div className="game-grades">
            <span className="game-grade-badge">{gradeRange(game.grades)}</span>
            {game.curriculumTags.map((t) => (
              <span key={t} className="curriculum-tag">{t}</span>
            ))}
          </div>

          <div className="game-quick-print">
            <button className="btn btn--primary" onClick={() => setSheet('challenges')}>
              <IconPrinter width={17} height={17} />
              Challenge sheet
            </button>
            <button className="btn btn--ghost" onClick={() => setSheet('scorecard')}>
              <IconPrinter width={17} height={17} />
              Scorecard
            </button>
          </div>
        </div>
      </header>

      {/* ── Body: rules + challenges / sidebar ──────────── */}
      <div className="game-body">
        <div className="game-main">
          {game.howToPlay.pdf && (
            <p className="game-pdf-link">
              <a href={game.howToPlay.pdf} target="_blank" rel="noreferrer">
                Download the printed rulebook (PDF)
              </a>
            </p>
          )}

          {hasSteps || hasVideo ? (
            <section className="game-section">
              <h2 className="game-section-title">
                {hasVideo ? 'Watch the rules' : 'How to play'}
                {!hasVideo && hasSteps && <span className="game-section-hint">auto-plays like a story</span>}
              </h2>
              <HowToPlay game={game} />
            </section>
          ) : null}

          {game.challenges.length > 0 && (
            <section className="game-section">
              <h2 className="game-section-title">
                Challenges
                <span className="game-section-hint">on the printable sheet</span>
              </h2>
              <ul className="challenge-list">
                {game.challenges.map((c) => (
                  <li key={c.title} className={`challenge-item challenge-item--${c.level || 'core'}`}>
                    <div className="challenge-points">{c.points}</div>
                    <div className="challenge-body">
                      <h3>{c.title}</h3>
                      <p>{c.brief}</p>
                    </div>
                    <span className="challenge-level">
                      {c.level === 'stretch' ? 'Stretch' : 'Core'}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {game.scorecard.rounds.length > 0 && (
            <section className="game-section">
              <h2 className="game-section-title">Scorecard preview</h2>
              <div className="scorecard-preview">
                <table>
                  <thead>
                    <tr>
                      <th>Player</th>
                      {game.scorecard.rounds.map((r) => <th key={r}>{r}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1].map((i) => (
                      <tr key={i}>
                        <td className="scorecard-blank" />
                        {game.scorecard.rounds.map((r) => <td key={r} />)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {game.scorecard.scoring && (
                  <p className="scorecard-note">
                    <IconCheck width={14} height={14} />
                    {game.scorecard.scoring}
                  </p>
                )}
                <button className="btn btn--ghost btn--sm" onClick={() => setSheet('scorecard')}>
                  <IconPrinter width={15} height={15} />
                  Print the full scorecard
                </button>
              </div>
            </section>
          )}
        </div>

        <aside className="game-aside">
          <BoxQR game={game} />

          <div className="companion-card">
            <h3 className="companion-card-title">Curriculum fit</h3>
            <p className="companion-card-sub">
              Concepts this game drills — tag-filtered in the directory for lesson planning.
            </p>
            <div className="concept-cloud">
              {game.concepts.map((c) => (
                <a key={c} href={`#/companion?concept=${encodeURIComponent(c)}`} className="concept-chip-link">
                  {c}
                </a>
              ))}
            </div>
          </div>

          <div className="companion-card">
            <h3 className="companion-card-title">In the classroom</h3>
            <ul className="classroom-tips">
              <li>Best with {game.players} per set — split the class into parallel tables.</li>
              <li>Runs in {game.duration} — fits a standard period with time to debrief.</li>
              <li>Assign stretch challenges to early finishers.</li>
            </ul>
          </div>
        </aside>
      </div>

      {sheet && <PrintOverlay game={game} sheet={sheet} onClose={() => setSheet(null)} />}
    </article>
  )
}
