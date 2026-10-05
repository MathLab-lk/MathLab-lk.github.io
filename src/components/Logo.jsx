import React from 'react'
import { SITE } from '../config.js'

/**
 * Official Maths Lab Sri Lanka brand assets, sourced from the organisation's
 * Facebook page (public profile picture) and processed to transparent PNGs:
 *   /images/logo-hex.png    — hexagon-“M” mark (nav, favicon, og-cover)
 *   /images/logo-lockup.png — full stacked lockup (footer, light surfaces)
 */
const HEX_AR = 174 / 170   // width / height of the hexagon mark
const LOCK_AR = 291 / 245  // width / height of the full lockup

/** Official hexagon mark. */
export function LogoMark({ size = 40, className = '' }) {
  return (
    <img
      src="/images/logo-hex.png"
      alt=""
      width={Math.round(size * HEX_AR)}
      height={size}
      className={`logo-mark ${className}`}
      draggable={false}
    />
  )
}

/** Nav lockup: official hexagon mark + site wordmark. */
export function Logo({ size = 42 }) {
  return (
    <a href="#top" className="logo" aria-label={`${SITE.name} — home`}>
      <LogoMark size={size} />
      <span className="logo-text">
        <span className="logo-name">MathLab</span>
        <span className="logo-sub">Sri Lanka</span>
      </span>
    </a>
  )
}

/** Full official stacked lockup — use on light surfaces (e.g. footer chip). */
export function LogoLockup({ height = 112, className = '' }) {
  return (
    <img
      src="/images/logo-lockup.png"
      alt="Maths Lab Sri Lanka"
      width={Math.round(height * LOCK_AR)}
      height={height}
      className={className}
      draggable={false}
    />
  )
}
