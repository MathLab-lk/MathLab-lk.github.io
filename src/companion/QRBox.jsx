import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { IconDownload, IconArrowRight } from '../components/Icons.jsx'
import { companionUrl } from './companionData.js'

/** Renders a crisp QR code onto a canvas (2× device pixels). */
export function QRCanvas({ value, size = 168, label, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    QRCode.toCanvas(canvas, value, {
      width: size * 2,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#0B2447ff', light: '#FFFFFFFF' },
    })
      .then(() => {
        // The library stamps its own inline style (attribute size); restore
        // the intended CSS display size so the QR stays crisp *and* contained.
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`
      })
      .catch(() => {})
  }, [value, size])

  return (
    <canvas
      ref={ref}
      className={`qr-canvas ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label || `QR code for ${value}`}
    />
  )
}

/**
 * The "Box QR" card on a game's page: shows the QR, the short link
 * it encodes, and a download button so the packaging team can drop
 * the code straight into box artwork.
 */
export function BoxQR({ game }) {
  const [hint, setHint] = useState('')
  const url = companionUrl(game.slug)

  const onDownload = () => {
    const canvas = document.querySelector(`#qr-${game.slug} canvas`)
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `mathlab-qr-${game.slug}.png`
    a.click()
    setHint('Saved as PNG — ready for the box artwork.')
    window.setTimeout(() => setHint(''), 2600)
  }

  return (
    <div className="companion-card qr-card" id={`qr-${game.slug}`}>
      <h3 className="companion-card-title">Scan on the box</h3>
      <p className="companion-card-sub">
        This is the exact code printed on the <strong>{game.name}</strong> box —
        it opens this page instantly on any phone camera.
      </p>

      <div className="qr-frame">
        <QRCanvas value={url} size={168} label={`QR code linking to ${game.name}`} />
      </div>

      <p className="qr-url">
        <a href={url}>{url}</a>
      </p>

      <div className="qr-actions">
        <button className="btn btn--ghost btn--sm" onClick={onDownload}>
          <IconDownload width={16} height={16} />
          Download PNG
        </button>
        <a className="btn btn--primary btn--sm" href={url}>
          Open link
          <IconArrowRight width={16} height={16} />
        </a>
      </div>

      {hint && <p className="qr-hint" role="status">{hint}</p>}
    </div>
  )
}
