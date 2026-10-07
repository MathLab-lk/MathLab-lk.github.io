import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IconPrinter, IconClose, IconQR } from '../components/Icons.jsx'
import { gradeRange } from './companionData.js'
import { SITE } from '../config.js'

/**
 * Print sheets are rendered in a portal straight to <body> so the
 * rest of the site can be hidden with print CSS. Content is fully
 * generated from the game JSON — adding a game automatically adds
 * its printable challenge sheet and scorecard.
 */

function SheetHeader({ game }) {
  return (
    <header className="sheet-header">
      <div className="sheet-brand">
        <strong>MATHLAB</strong>
        <span>SRI LANKA · DIGITAL RULEBOOK</span>
      </div>
      <div className="sheet-game">
        <h1>{game.name}</h1>
        <p>{game.tagline}</p>
        <p className="sheet-meta">
          {gradeRange(game.grades)}
          {game.curriculumTags.length > 0 && ` · ${game.curriculumTags.join(' · ')}`}
        </p>
      </div>
      <div className="sheet-fields">
        <label>Player<span className="sheet-line" /></label>
        <label>Class / Group<span className="sheet-line" /></label>
        <label>Date<span className="sheet-line" /></label>
      </div>
    </header>
  )
}

function SheetFooter({ game }) {
  return (
    <footer className="sheet-footer">
      <span>{SITE.domain}/#/companion/{game.slug} — scan the box QR for animated rules</span>
      <span>© {new Date().getFullYear()} {SITE.name}</span>
    </footer>
  )
}

export function ChallengeSheet({ game }) {
  const core = game.challenges.filter((c) => c.level !== 'stretch')
  const stretch = game.challenges.filter((c) => c.level === 'stretch')
  const renderList = (list, label) =>
    list.length > 0 && (
      <section className="sheet-section">
        <h2>{label}</h2>
        <ol className="sheet-challenges">
          {list.map((c, i) => (
            <li key={i}>
              <div className="sheet-challenge-check" aria-hidden="true" />
              <div className="sheet-challenge-body">
                <h3>{c.title}</h3>
                <p>{c.brief}</p>
              </div>
              <span className="sheet-points">{c.points} pts</span>
            </li>
          ))}
        </ol>
      </section>
    )

  return (
    <article className="print-sheet">
      <SheetHeader game={game} />
      {renderList(core, 'Core challenges')}
      {renderList(stretch, 'Stretch challenges')}
      <section className="sheet-section sheet-tally">
        <h2>Total score</h2>
        <div className="sheet-tally-row">
          <span>Core points</span><span className="sheet-box" />
          <span>Stretch points</span><span className="sheet-box" />
          <strong>Grand total</strong><span className="sheet-box sheet-box--total" />
        </div>
        <p className="sheet-note">Tick each challenge as it is completed. Points are awarded once the challenge has been checked by a partner or teacher.</p>
      </section>
      <SheetFooter game={game} />
    </article>
  )
}

export function Scorecard({ game }) {
  const rows = 5
  const cols = game.scorecard.rounds.length
  return (
    <article className="print-sheet">
      <SheetHeader game={game} />
      <section className="sheet-section">
        <h2>Scorecard</h2>
        <table className="sheet-table">
          <thead>
            <tr>
              <th className="sheet-table-player">Player</th>
              {game.scorecard.rounds.map((r) => <th key={r}>{r}</th>)}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                <td className="sheet-table-player"><span className="sheet-line" /></td>
                {game.scorecard.rounds.map((r) => <td key={r}><span className="sheet-line" /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {game.scorecard.scoring && (
          <p className="sheet-note"><strong>Scoring:</strong> {game.scorecard.scoring}</p>
        )}
      </section>
      <section className="sheet-section sheet-signatures">
        <div className="sheet-sig"><span>Player signature</span><span className="sheet-line" /></div>
        <div className="sheet-sig"><span>Teacher / referee</span><span className="sheet-line" /></div>
      </section>
      <SheetFooter game={game} />
      {cols === 0 && <p className="sheet-note">Add “scorecard.rounds” to this game’s JSON to populate the table.</p>}
    </article>
  )
}

/** Full-screen overlay hosting one sheet; auto-calls window.print(). */
export function PrintOverlay({ game, sheet, onClose }) {
  const portalRef = useRef(null)
  if (!portalRef.current) portalRef.current = document.createElement('div')
  const host = portalRef.current

  useEffect(() => {
    host.className = 'print-portal'
    document.body.appendChild(host)
    document.body.classList.add('print-mode')

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    const afterPrint = () => onClose()
    window.addEventListener('keydown', onKey)
    window.addEventListener('afterprint', afterPrint)

    // Give the sheet a paint cycle before the print dialog.
    const t = window.setTimeout(() => window.print(), 420)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('afterprint', afterPrint)
      document.body.classList.remove('print-mode')
      host.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Sheet = sheet === 'scorecard' ? Scorecard : ChallengeSheet

  return createPortal(
    <div className="print-overlay" role="dialog" aria-modal="true" aria-label={`Print ${sheet}`}>
      <div className="print-overlay-bar no-print">
        <strong className="print-overlay-title">
          <IconPrinter width={16} height={16} />
          {sheet === 'scorecard' ? 'Scorecard' : 'Challenge sheet'} — {game.name}
        </strong>
        <div className="print-overlay-actions">
          <button className="btn btn--primary btn--sm" onClick={() => window.print()}>
            <IconPrinter width={16} height={16} />
            Print again
          </button>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>
            <IconClose width={16} height={16} />
            Close
          </button>
        </div>
        <p className="print-overlay-tip">
          <IconQR width={14} height={14} /> Choose A4, portrait, margins “Default”, background graphics <strong>on</strong> for the brand colours.
        </p>
      </div>
      <div className="print-overlay-scroll">
        <Sheet game={game} />
      </div>
    </div>,
    host
  )
}
