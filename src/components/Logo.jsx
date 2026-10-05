import React from 'react'
import { SITE } from '../config.js'

/**
 * MathLab brand mark — a flask (the "Lab") with rising bubbles and a plus sign.
 * Same artwork as /favicon.svg.
 */
export function LogoMark({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="MathLab logo"
    >
      <rect width="64" height="64" rx="14" fill="#0B2447" />
      <path
        d="M27 13 h10 v9 l9.2 19.5 a5 5 0 0 1 -4.4 7.5 H22.2 a5 5 0 0 1 -4.4 -7.5 L27 22 z"
        fill="none" stroke="#F5A623" strokeWidth="3" strokeLinejoin="round"
      />
      <path
        d="M25.5 35.5 L17.8 41.5 a5 5 0 0 0 4.4 7.5 h19.6 a5 5 0 0 0 4.4 -7.5 L38.5 35.5 z"
        fill="#F5A623"
      />
      <circle cx="31" cy="9" r="2" fill="#3EC9A7" />
      <circle cx="35.5" cy="6.5" r="1.4" fill="#F5A623" />
      <path d="M32 40 v6 M29 43 h6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

/** Full lockup: mark + wordmark. `dark` renders light text for dark backgrounds. */
export function Logo({ dark = false, size = 42 }) {
  return (
    <a href="#top" className={`logo ${dark ? 'logo--dark' : ''}`} aria-label={`${SITE.name} — home`}>
      <LogoMark size={size} />
      <span className="logo-text">
        <span className="logo-name">MathLab</span>
        <span className="logo-sub">Sri Lanka</span>
      </span>
    </a>
  )
}
