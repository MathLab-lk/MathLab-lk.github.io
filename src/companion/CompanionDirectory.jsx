import React, { useEffect, useMemo, useState } from 'react'
import {
  IconSearch, IconClose, IconQR, IconArrowRight,
  IconUsers, IconClock,
} from '../components/Icons.jsx'
import {
  searchGames, ALL_GRADES, ALL_CONCEPTS, GAMES, gradeRange,
} from './companionData.js'

const CONCEPT_PREVIEW = 6

function DifficultyDots({ level }) {
  return (
    <span className="difficulty-dots" aria-label={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`difficulty-dot ${i <= level ? 'is-on' : ''}`} />
      ))}
    </span>
  )
}

function GameCard({ game }) {
  return (
    <a className="game-card" href={`#/companion/${game.slug}`}>
      <div className="game-card-media">
        <img src={game.cover} alt={`${game.name} — MathLab game`} loading="lazy" />
        <span className="game-card-grade">{gradeRange(game.grades)}</span>
        {game.featured && <span className="game-card-featured">Start here</span>}
      </div>
      <div className="game-card-body">
        <h3>{game.name}</h3>
        <p className="game-card-tagline">{game.tagline}</p>
        {game.concepts.length > 0 && (
          <div className="game-card-concepts">
            {game.concepts.slice(0, 3).map((c) => (
              <span key={c} className="game-card-concept">{c}</span>
            ))}
          </div>
        )}
        <div className="game-card-meta">
          <span><IconUsers width={14} height={14} />{game.players}</span>
          <span><IconClock width={14} height={14} />{game.duration}</span>
          <DifficultyDots level={game.difficulty} />
        </div>
        <span className="game-card-cta">
          Open rulebook
          <IconArrowRight width={15} height={15} />
        </span>
      </div>
    </a>
  )
}

export default function CompanionDirectory({ route }) {
  const [query, setQuery] = useState('')
  const [grade, setGrade] = useState(null)
  const [concept, setConcept] = useState(null)
  const [showAllConcepts, setShowAllConcepts] = useState(false)

  // Sync filters when arriving with a pre-filtered link (e.g. a concept chip
  // on a game page, or a teacher sharing a filtered view).
  const queryKey = route?.queryKey || ''
  useEffect(() => {
    const q = route?.query || {}
    setQuery(q.find || '')
    setGrade(q.grade ? Number(q.grade) : null)
    setConcept(q.concept || null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey])

  // Keep the URL shareable without spamming browser history.
  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('find', query.trim())
    if (grade) params.set('grade', String(grade))
    if (concept) params.set('concept', concept)
    const qs = params.toString()
    const next = qs ? `#/companion?${qs}` : '#/companion'
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, grade, concept])

  const results = useMemo(
    () => searchGames({ query, grade, concept }),
    [query, grade, concept],
  )

  const hasFilters = Boolean(query.trim() || grade || concept)
  const clearFilters = () => { setQuery(''); setGrade(null); setConcept(null) }

  const conceptChips = showAllConcepts ? ALL_CONCEPTS : ALL_CONCEPTS.slice(0, CONCEPT_PREVIEW)
  const moreConcepts = ALL_CONCEPTS.length - CONCEPT_PREVIEW

  return (
    <section className="companion">
      <div className="container">
        <header className="companion-head">
          <span className="eyebrow">
            <IconQR width={13} height={13} />
            Digital Rulebook
          </span>
          <h1 className="companion-title">
            Every MathLab box, <span className="text-accent">one tap away</span>
          </h1>
          <p className="companion-lede">
            Search by game, grade or curriculum concept — or point your phone camera
            at the QR code printed on any MathLab box to land straight on its rules.
            Every entry carries an animated how-to-play, printable challenge sheets
            and scorecards, and its place in the syllabus.
          </p>
        </header>

        <div className="companion-toolbar">
          <div className="companion-search">
            <IconSearch width={18} height={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games, concepts or grades…"
              aria-label="Search the rulebook"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search">
                <IconClose width={16} height={16} />
              </button>
            )}
          </div>

          <div className="companion-filters" role="group" aria-label="Filter by grade">
            <button
              className={`filter-chip ${!grade ? 'is-on' : ''}`}
              onClick={() => setGrade(null)}
            >
              All grades
            </button>
            {ALL_GRADES.map((g) => (
              <button
                key={g}
                className={`filter-chip ${grade === g ? 'is-on' : ''}`}
                onClick={() => setGrade(grade === g ? null : g)}
                aria-pressed={grade === g}
              >
                Grade {g}
              </button>
            ))}
          </div>

          {ALL_CONCEPTS.length > 0 && (
            <div className="companion-filters companion-filters--concepts" role="group" aria-label="Filter by concept">
              {conceptChips.map((c) => (
                <button
                  key={c}
                  className={`filter-chip filter-chip--concept ${concept === c ? 'is-on' : ''}`}
                  onClick={() => setConcept(concept === c ? null : c)}
                  aria-pressed={concept === c}
                >
                  {c}
                </button>
              ))}
              {moreConcepts > 0 && (
                <button
                  className="filter-chip filter-chip--more"
                  onClick={() => setShowAllConcepts((s) => !s)}
                >
                  {showAllConcepts ? 'Show fewer' : `+${moreConcepts} more`}
                </button>
              )}
            </div>
          )}
        </div>

        <p className="companion-count" role="status">
          {results.length} {results.length === 1 ? 'game' : 'games'}
          {hasFilters && (
            <button className="companion-clear" onClick={clearFilters}>
              Clear filters <IconClose width={12} height={12} />
            </button>
          )}
        </p>

        {results.length > 0 ? (
          <div className="game-grid">
            {results.map((g) => <GameCard key={g.slug} game={g} />)}
          </div>
        ) : (
          <div className="companion-empty">
            <h3>No games match that yet</h3>
            <p>
              Try a broader search, or clear the filters. If you scanned a QR code on
              a MathLab box and landed here, the game may be new — check back soon.
            </p>
            <button className="btn btn--primary btn--sm" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}

        <div className="companion-footnote">
          <IconQR width={15} height={15} />
          <p>
            Classroom tip: filter by grade, open a game, and print its challenge
            sheet and scorecard straight from the page — one set per table.
          </p>
        </div>
      </div>
    </section>
  )
}
