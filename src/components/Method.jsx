import React from 'react'
import { Reveal } from '../hooks/useReveal.jsx'
import { IconX, IconCheck, IconArrowRight, IconTarget, IconCards, IconShapes } from './Icons.jsx'

const OLD = [
  { title: 'Rote memorisation', text: 'Formulas recited without meaning or context.' },
  { title: 'Fear of numbers', text: 'Anxiety that compounds year after year.' },
  { title: 'High O/L failure rates', text: 'Bright students written off as “not math people”.' },
  { title: 'Blackboard lectures', text: 'One-way teaching with zero engagement.' },
]

const NEW = [
  { title: 'Tactile engagement', text: 'Concepts children can touch, move and feel.' },
  { title: 'Speed-based logic', text: 'Rapid arithmetic sharpened through play.' },
  { title: 'Competitive games', text: 'Winning drives learning — not fear.' },
  { title: 'Natural retention', text: 'Understanding that lasts long after the bell.' },
]

const TOOLS = [
  {
    Icon: IconTarget,
    name: 'Modified Carrom',
    text: 'The national favourite, re-engineered for arithmetic and strategy.',
  },
  {
    Icon: IconCards,
    name: 'Rule-Based Card Games',
    text: 'Logic, speed and healthy competition in every round.',
  },
  {
    Icon: IconShapes,
    name: 'Geometric Kits',
    text: 'Shapes and spatial reasoning children can hold in their hands.',
  },
]

export default function Method() {
  return (
    <section className="method section" id="method">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">The Method</span></Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">
              The Old Way vs. <span className="text-accent">The MathLab Way</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="section-lede">
              Math anxiety is not a talent problem — it is a teaching-method problem.
              MathLab replaces memorisation with movement, competition and tactile
              discovery, and the classroom transforms within a single session.
            </p>
          </Reveal>
        </div>

        <div className="method-grid">
          <Reveal className="method-card method-card--old">
            <div className="method-card-head">
              <h3>The Old Way</h3>
              <p>Memorisation-first teaching</p>
            </div>
            <ul>
              {OLD.map((item) => (
                <li key={item.title}>
                  <span className="method-dot method-dot--x"><IconX width={14} height={14} /></span>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.text}</em>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="method-shift" aria-hidden="true">
            <span className="method-shift-badge"><IconArrowRight width={22} height={22} /></span>
          </div>

          <Reveal delay={120} className="method-card method-card--new">
            <div className="method-card-head">
              <h3>The MathLab Way</h3>
              <p>Play-first learning</p>
            </div>
            <ul>
              {NEW.map((item) => (
                <li key={item.title}>
                  <span className="method-dot method-dot--check"><IconCheck width={14} height={14} /></span>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.text}</em>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="tools-band" id="tools">
            <div className="tools-band-head">
              <h3>Inside the MathLab</h3>
              <p>Every tool is <strong>100% physical</strong> and completely <strong>screen-free</strong>.</p>
            </div>
            <div className="tools-band-grid">
              {TOOLS.map(({ Icon, name, text }) => (
                <div key={name} className="tool-tile">
                  <span className="tool-tile-icon"><Icon width={26} height={26} /></span>
                  <div>
                    <h4>{name}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
