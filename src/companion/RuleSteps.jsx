import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IconPlay, IconPause, IconReplay, IconChevronLeft, IconChevronRight } from '../components/Icons.jsx'

const TICK = 80 // ms between progress updates

/**
 * Animated "how to play" player.
 * Rules auto-play like a story: one step at a time, with a progress
 * bar per step, play/pause, jump controls and keyboard arrows.
 */
export default function RuleSteps({ steps }) {
  const [idx, setIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [ended, setEnded] = useState(false)
  const rootRef = useRef(null)

  const total = steps.length
  const duration = (steps[idx]?.seconds || 8) * 1000
  const single = total <= 1

  const goTo = useCallback((i) => {
    setEnded(false)
    setElapsed(0)
    setIdx(Math.min(total - 1, Math.max(0, i)))
  }, [total])

  const replay = useCallback(() => {
    setIdx(0)
    setElapsed(0)
    setEnded(false)
    setPlaying(true)
  }, [])

  // Auto-advance ticker
  useEffect(() => {
    if (!playing || ended || single) return
    if (document.hidden) return // don't burn the timer on hidden tabs
    const t = window.setInterval(() => {
      setElapsed((e) => e + TICK)
    }, TICK)
    return () => window.clearInterval(t)
  }, [playing, ended, single, idx])

  // Elapsed overflow → advance or finish
  useEffect(() => {
    if (elapsed < duration) return
    if (idx + 1 < total) {
      setIdx(idx + 1)
      setElapsed(0)
    } else {
      setElapsed(duration)
      setPlaying(false)
      setEnded(true)
    }
  }, [elapsed, duration, idx, total])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(idx - 1) }
    else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault()
      if (ended) replay(); else setPlaying((p) => !p)
    }
  }

  const step = steps[idx] || {}
  const pct = single ? 1 : Math.min(1, elapsed / duration)

  return (
    <div
      className={`rule-player ${ended ? 'rule-player--ended' : ''}`}
      ref={rootRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="group"
      aria-label="How to play — animated rules. Use left and right arrow keys to move between steps."
    >
      {/* story-style progress segments */}
      {!single && (
        <div className="rule-progress" role="tablist" aria-label={`Step ${idx + 1} of ${total}`}>
          {steps.map((s, i) => (
            <button
              key={i}
              className={`rule-seg ${i === idx ? 'is-current' : ''} ${i < idx || (i === idx && pct >= 1) ? 'is-done' : ''}`}
              style={i === idx ? { '--fill': pct } : undefined}
              onClick={() => { setPlaying(true); goTo(i) }}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Step ${i + 1}: ${s.title}`}
              title={`Step ${i + 1}: ${s.title}`}
            />
          ))}
        </div>
      )}

      {/* step stage */}
      <div className="rule-stage" aria-live="polite">
        {step.image && (
          <div className="rule-stage-media">
            <img src={step.image} alt={`${step.title} illustration`} loading="lazy" />
          </div>
        )}

        <div className="rule-stage-body">
          <span className="rule-step-count">
            {ended ? 'Replay?' : `Step ${idx + 1} / ${total}`}
          </span>
          <span className="rule-step-number" aria-hidden="true">{idx + 1}</span>
          <h3 className="rule-step-title">{ended ? 'That’s how to play!' : step.title}</h3>
          <p className="rule-step-text">{ended
            ? 'Replay the steps, print the challenge sheet, or dive back into the game — the rulebook stays in your pocket.'
            : step.text}</p>
        </div>
      </div>

      {/* controls */}
      <div className="rule-controls">
        <button
          className="rule-btn"
          onClick={() => goTo(idx - 1)}
          disabled={idx === 0}
          aria-label="Previous step"
        >
          <IconChevronLeft width={18} height={18} />
        </button>

        <button
          className="rule-btn rule-btn--main"
          onClick={() => (ended ? replay() : setPlaying((p) => !p))}
          aria-label={ended ? 'Replay rules' : playing ? 'Pause rules' : 'Play rules'}
        >
          {ended
            ? <IconReplay width={18} height={18} />
            : playing
              ? <IconPause width={18} height={18} />
              : <IconPlay width={18} height={18} />}
          <span>{ended ? 'Replay' : playing ? 'Pause' : 'Play'}</span>
        </button>

        <button
          className="rule-btn"
          onClick={() => { setPlaying(true); goTo(idx + 1) }}
          disabled={idx === total - 1}
          aria-label="Next step"
        >
          <IconChevronRight width={18} height={18} />
        </button>
      </div>
    </div>
  )
}
