import { useTranslation } from 'react-i18next'
import { PRAYER_KEYS } from '../../lib/prayer-times/prayerTime'
import { hijriDayMonth } from '../../lib/hijri'
import { isSameDay } from '../../lib/utils/dateUtils'
import './DayCard.css'

function fmt(d, lang) {
  if (!d) return '—'
  return new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
}

export function DayCard({ date, prayer, language }) {
  const { t } = useTranslation()
  const lang = language || 'en'
  const hijriLang = lang.startsWith('ar') ? 'ar' : 'en'
  const isToday = isSameDay(date, new Date())
  const weekday = new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(date)
  return (
    <article className={`mp-daycard surface ${isToday ? 'is-today' : ''}`}>
      <header className="mp-daycard-head">
        <div className="mp-daycard-date">
          <span className="mp-daycard-day tabular">{date.getDate()}</span>
          <div className="mp-daycard-meta">
            <span className="mp-daycard-weekday">{weekday}</span>
            <span className="mp-daycard-hijri small subtle">{hijriDayMonth(date, hijriLang)}</span>
          </div>
        </div>
        {isToday ? <span className="mp-daycard-today-pill">{t('home.today')}</span> : null}
      </header>
      <div className="mp-daycard-grid">
        {PRAYER_KEYS.map((k) => (
          <div key={k} className="mp-daycard-cell">
            <span className="mp-daycard-name muted small">{t(`prayers.${k}`)}</span>
            <span className="mp-daycard-time tabular">{prayer ? fmt(prayer[k], lang) : '—'}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
