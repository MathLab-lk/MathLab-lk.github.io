import React, { useEffect } from 'react'
import { IconArrowRight, IconQR } from '../components/Icons.jsx'
import { getGame, GAMES, DRAFTS } from './companionData.js'
import CompanionDirectory from './CompanionDirectory.jsx'
import GameDetail from './GameDetail.jsx'

function GameMissing({ slug }) {
  const game = getGame(slug)
  const isDraft = Boolean(game && game.status === 'draft')
  const suggestions = GAMES.slice(0, 3)

  return (
    <section className="companion companion--missing">
      <div className="container">
        <div className="game-missing">
          <span className="eyebrow">
            <IconQR width={13} height={13} />
            Digital Rulebook
          </span>
          <h1>{isDraft ? 'This game is still in the lab' : 'Game not found'}</h1>
          <p>
            {isDraft
              ? `"${game.name}" is being prepared and will appear in the rulebook soon.`
              : `We couldn't find a rulebook entry for "${slug}". It may have been renamed — the directory below has everything we publish.`}
          </p>
          <a className="btn btn--primary" href="#/companion">
            Browse all games
            <IconArrowRight width={16} height={16} />
          </a>
        </div>

        {suggestions.length > 0 && (
          <div className="game-missing-suggest">
            <h2>Popular right now</h2>
            <div className="missing-links">
              {suggestions.map((g) => (
                <a key={g.slug} href={`#/companion/${g.slug}`}>
                  <strong>{g.name}</strong>
                  <span>{g.tagline}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {DRAFTS.length > 0 && (
          <p className="game-missing-drafts">
            {DRAFTS.length} {DRAFTS.length === 1 ? 'entry is' : 'entries are'} in
            preparation and not published yet.
          </p>
        )}
      </div>
    </section>
  )
}

export default function CompanionApp({ route }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route.view, route.slug])

  if (route.view === 'game') {
    const game = getGame(route.slug)
    if (game && game.status === 'published') return <GameDetail game={game} />
    return <GameMissing slug={route.slug} />
  }

  return <CompanionDirectory route={route} />
}
