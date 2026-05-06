import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { Compass } from '../components/Qibla/Compass'
import { Button } from '../components/ui/Button'
import { useSettings } from '../store/settings'
import { qiblaBearing, distanceToKaabaKm } from '../lib/qibla'

const SMOOTH = 0.18 // 0 = locked, 1 = no smoothing

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

function readHeading(e) {
  // iOS: magnetic heading clockwise from north, already calibrated.
  if (typeof e.webkitCompassHeading === 'number') return e.webkitCompassHeading
  // Spec: alpha is rotation around z-axis counter-clockwise from north
  // when the event is absolute; convert to compass (clockwise) heading.
  if (typeof e.alpha === 'number') return (360 - e.alpha + 360) % 360
  return null
}

function isAbsoluteEvent(e) {
  return (
    e.type === 'deviceorientationabsolute' ||
    e.absolute === true ||
    typeof e.webkitCompassHeading === 'number'
  )
}

function smoothCircular(prev, next, alpha) {
  let diff = next - prev
  if (diff > 180) diff -= 360
  if (diff < -180) diff += 360
  return (prev + diff * alpha + 360) % 360
}

function screenOrientationAngle() {
  if (typeof window === 'undefined') return 0
  if (window.screen && window.screen.orientation && typeof window.screen.orientation.angle === 'number') {
    return window.screen.orientation.angle
  }
  if (typeof window.orientation === 'number') return window.orientation
  return 0
}

export default function Qibla() {
  const { t } = useTranslation()
  const settings = useSettings()
  const [heading, setHeading] = useState(0)
  const [hasCompass, setHasCompass] = useState(false)
  const [needsPermission, setNeedsPermission] = useState(false)
  const gotAbsolute = useRef(false)
  const lastHeading = useRef(null)

  function attach() {
    const onOrient = (e) => {
      const abs = isAbsoluteEvent(e)
      // Once an absolute reading has been seen, ignore relative events
      // — they otherwise fight the absolute source and cause the pointer to jump.
      if (gotAbsolute.current && !abs) return
      if (abs) gotAbsolute.current = true

      const raw = readHeading(e)
      if (raw == null) return
      const compensated = (raw + screenOrientationAngle() + 360) % 360

      const prev = lastHeading.current
      const next = prev == null ? compensated : smoothCircular(prev, compensated, SMOOTH)
      lastHeading.current = next
      setHeading(next)
      setHasCompass(true)
    }
    window.addEventListener('deviceorientationabsolute', onOrient, true)
    window.addEventListener('deviceorientation', onOrient, true)
    return () => {
      window.removeEventListener('deviceorientationabsolute', onOrient, true)
      window.removeEventListener('deviceorientation', onOrient, true)
    }
  }

  useEffect(() => {
    if (typeof DeviceOrientationEvent === 'undefined') return
    let cleanup
    queueMicrotask(() => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function' && isIOS()) {
        setNeedsPermission(true)
        return
      }
      cleanup = attach()
    })
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  async function requestPermission() {
    try {
      const res = await DeviceOrientationEvent.requestPermission()
      if (res === 'granted') {
        setNeedsPermission(false)
        attach()
      }
    } catch {
      setNeedsPermission(false)
    }
  }

  if (!settings.location) {
    return (
      <section className="page">
        <PageHeader title={t('qibla.title')} />
        <p className="muted">{t('home.noLocation')}</p>
      </section>
    )
  }

  const bearing = qiblaBearing(settings.location.latitude, settings.location.longitude)
  const distance = distanceToKaabaKm(settings.location.latitude, settings.location.longitude)

  return (
    <section className="page">
      <PageHeader title={t('qibla.title')} />
      <div className="page-body mp-qibla-body">
        <Compass qiblaBearing={bearing} heading={heading} hasCompass={hasCompass} />
        <div className="stack-sm" style={{ alignItems: 'center' }}>
          <div className="row" style={{ gap: 16 }}>
            <span className="muted small">{t('qibla.bearing')}</span>
            <span className="tabular" style={{ fontWeight: 700 }}>{Math.round(bearing)}°</span>
          </div>
          <div className="row" style={{ gap: 16 }}>
            <span className="muted small">{t('qibla.distance')}</span>
            <span className="tabular" style={{ fontWeight: 700 }}>
              {distance.toLocaleString()} km
            </span>
          </div>
        </div>
        {needsPermission ? (
          <Button onClick={requestPermission}>{t('qibla.enable')}</Button>
        ) : !hasCompass ? (
          <p className="muted small">{t('qibla.noCompass')}</p>
        ) : (
          <p className="muted small">{t('qibla.calibrate')}</p>
        )}
      </div>
    </section>
  )
}
