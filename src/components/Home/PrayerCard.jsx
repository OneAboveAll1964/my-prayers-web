import { useTranslation } from 'react-i18next'
import { PRAYER_KEYS } from '../../lib/prayer-times/prayerTime'
import './PrayerCard.css'

function fmtTime(date, lang) {
  if (!(date instanceof Date)) return '—'
  return new Intl.DateTimeFormat(lang || 'en', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)
}

export function PrayerCard({ prayer, currentIndex, language }) {
  const { t } = useTranslation()
  return (
    <div className="mp-prayer-card surface fade-in">
      <ul className="mp-prayer-list">
        {PRAYER_KEYS.map((key, i) => {
          const time = prayer ? prayer[key] : null
          const active = i === currentIndex
          return (
            <li key={key} className={`mp-prayer-row ${active ? 'is-active' : ''}`}>
              <span className="mp-prayer-name">{t(`prayers.${key}`)}</span>
              <span className="mp-prayer-time tabular">{fmtTime(time, language)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
