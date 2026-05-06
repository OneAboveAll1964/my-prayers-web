import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { Compass } from '../components/Qibla/Compass'
import { Button } from '../components/ui/Button'
import { useSettings } from '../store/settings'
import { qiblaBearing, distanceToKaabaKm } from '../lib/qibla'

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export default function Qibla() {
  const { t } = useTranslation()
  const settings = useSettings()
  const [heading, setHeading] = useState(0)
  const [hasCompass, setHasCompass] = useState(false)
  const [needsPermission, setNeedsPermission] = useState(false)

  useEffect(() => {
    if (typeof DeviceOrientationEvent === 'undefined') return
    let cleanup
    queueMicrotask(() => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function' && isIOS()) {
        setNeedsPermission(true)
        return
      }
      const handler = (e) => {
        const a = e.webkitCompassHeading != null ? e.webkitCompassHeading : 360 - (e.alpha || 0)
        setHeading(a)
        setHasCompass(true)
      }
      window.addEventListener('deviceorientationabsolute', handler, true)
      window.addEventListener('deviceorientation', handler, true)
      cleanup = () => {
        window.removeEventListener('deviceorientationabsolute', handler, true)
        window.removeEventListener('deviceorientation', handler, true)
      }
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
        const handler = (e) => {
          const a = e.webkitCompassHeading != null ? e.webkitCompassHeading : 360 - (e.alpha || 0)
          setHeading(a)
          setHasCompass(true)
        }
        window.addEventListener('deviceorientation', handler, true)
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
            <span className="tabular" style={{ fontWeight: 700 }}>{distance.toLocaleString()} km</span>
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
