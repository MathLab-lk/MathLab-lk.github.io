import React from 'react'

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const fillBase = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
}

export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="M20 6 9 17l-5-5" /></svg>
)

export const IconX = (p) => (
  <svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
)

export const IconArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

export const IconMenu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)

export const IconClose = (p) => (
  <svg {...base} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
)

export const IconMail = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const IconChat = (p) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.1-.4-4.4-1.1L3 20l1.1-4.9A8.5 8.5 0 1 1 21 11.5z" />
    <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth="2.5" />
  </svg>
)

export const IconFacebook = (p) => (
  <svg {...fillBase} {...p}>
    <path d="M14 8.5h2V5.5h-2.3c-2.2 0-3.7 1.5-3.7 3.8v2.2H8v3h2V21h3v-6.5h2.2l.5-3H13V9.6c0-.6.4-1.1 1-1.1z" />
  </svg>
)

export const IconTarget = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const IconCards = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="13" height="14" rx="2" />
    <path d="M8 4h11a2 2 0 0 1 2 2v11" />
  </svg>
)

export const IconShapes = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <circle cx="17" cy="7" r="4" />
    <path d="M8.5 21 13 12.5 17.5 21z" />
  </svg>
)

export const IconSchool = (p) => (
  <svg {...base} {...p}>
    <path d="M4 21V10l8-6 8 6v11" />
    <path d="M10 21v-6h4v6" />
    <path d="M2 21h20" />
  </svg>
)

export const IconHeart = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21C7 17.2 3 13.7 3 9.3A4.5 4.5 0 0 1 11 6a4.5 4.5 0 1 1 8 3.3c0 4.4-4 7.9-9 11.7z" transform="translate(0 -1)" />
  </svg>
)

export const IconCube = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2.5 20 7v10l-8 4.5L4 17V7z" />
    <path d="M12 21.5V12M4 7l8 5 8-5" />
  </svg>
)

export const IconSpark = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l2.1 4.4 4.8.7-3.5 3.4.8 4.8L12 14l-4.2 2.3.8-4.8-3.5-3.4 4.8-.7z" />
  </svg>
)

export const IconMic = (p) => (
  <svg {...base} {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
)

export const IconBank = (p) => (
  <svg {...base} {...p}>
    <path d="M3 10 12 4l9 6" />
    <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
    <path d="M3 21h18" />
  </svg>
)

export const IconBook = (p) => (
  <svg {...base} {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 19a2 2 0 0 1 2-2h13" />
  </svg>
)

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 20 6v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const IconTrophy = (p) => (
  <svg {...base} {...p}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
    <path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5" />
    <path d="M12 14v3M8 21h8M10 17h4l1 4H9z" />
  </svg>
)

/* ── Companion / Rulebook icons ─────────────────────────── */

export const IconQR = (p) => (
  <svg {...base} {...p}>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
    <path d="M7 7h.01M17 7h.01M7 17h.01M12 12h.01M17 17h.01" strokeWidth="2.4" />
    <path d="M10 7h4v4h-4zM10 13h4v4h-4z" fill="none" />
  </svg>
)

export const IconSearch = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.8-3.8" />
  </svg>
)

export const IconPrinter = (p) => (
  <svg {...base} {...p}>
    <path d="M7 8V3h10v5" />
    <rect x="3" y="8" width="18" height="9" rx="2" />
    <path d="M7 14h10v7H7z" />
  </svg>
)

export const IconPlay = (p) => (
  <svg {...fillBase} {...p}>
    <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5z" />
  </svg>
)

export const IconPause = (p) => (
  <svg {...fillBase} {...p}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
)

export const IconReplay = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 3v5h5" />
  </svg>
)

export const IconChevronLeft = (p) => (
  <svg {...base} {...p}><path d="m14 6-6 6 6 6" /></svg>
)

export const IconChevronRight = (p) => (
  <svg {...base} {...p}><path d="m10 6 6 6-6 6" /></svg>
)

export const IconDownload = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v12" />
    <path d="m7 11 5 5 5-5" />
    <path d="M4 19h16" />
  </svg>
)

export const IconVideo = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="m16 10 5-3v10l-5-3z" />
  </svg>
)

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
)

export const IconUsers = (p) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M15.5 4.6a3.5 3.5 0 0 1 0 6.8M17.5 14.4a5.5 5.5 0 0 1 3 4.6" />
  </svg>
)

export const IconFlame = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-1.5.5-2.8 1.2-3.8" />
    <path d="M12 21a3 3 0 0 1-3-3c0-1.7 1.6-3 3-4.5 1.4 1.5 3 2.8 3 4.5a3 3 0 0 1-3 3z" />
  </svg>
)
