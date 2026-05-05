import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PRAYER_KEYS } from '../../lib/prayer-times/prayerTime'
import './NextPrayerCountdown.css'

function pad(n) {
  return String(n).padStart(2, '0')
}

function findNext(prayer, now) {
  if (!prayer) return null
  for (const k of PRAYER_KEYS) {
    if (prayer[k] && prayer[k].getTime() > now.getTime()) return { key: k, at: prayer[k] }
  }
  return null
}

function fmtRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`
  return `${pad(m)}:${pad(s)}`
}

export function NextPrayerCountdown({ prayer, language }) {
  const { t } = useTranslation()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const next = findNext(prayer, now)
  return (
    <div className="mp-next surface fade-in">
      <div className="mp-next-row">
        <span className="mp-next-label">{t('home.next')}</span>
        <span className="mp-next-name">{next ? t(`prayers.${next.key}`) : '—'}</span>
      </div>
      <div className="mp-next-row mp-next-time">
        <span className="mp-next-remain tabular">
          {next ? fmtRemaining(next.at - now) : '00:00'}
        </span>
        <span className="mp-next-at tabular">
          {next
            ? new Intl.DateTimeFormat(language || 'en', { hour: '2-digit', minute: '2-digit', hour12: false }).format(next.at)
            : ''}
        </span>
      </div>
    </div>
  )
}
