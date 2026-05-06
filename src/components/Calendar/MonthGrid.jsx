import { useTranslation } from 'react-i18next'
import { PRAYER_KEYS } from '../../lib/prayer-times/prayerTime'
import { hijriDayMonth } from '../../lib/hijri'
import './MonthGrid.css'

function fmt(d, lang, timeFormat) {
  if (!d) return '—'
  const hour12 = timeFormat === '12h'
  return new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit', hour12 }).format(d)
}

export function MonthGrid({ days, language, timeFormat }) {
  const { t } = useTranslation()
  const lang = language || 'en'
  const hijriLang = lang.startsWith('ar') ? 'ar' : 'en'
  return (
    <div className="mp-cal surface">
      <div className="mp-cal-head">
        <span>{t('calendar.title')}</span>
        {PRAYER_KEYS.map((k) => (
          <span key={k} className="mp-cal-head-cell">{t(`prayers.${k}`)}</span>
        ))}
      </div>
      <div className="mp-cal-body">
        {days.map(({ date, prayer }) => (
          <div key={date.toISOString()} className="mp-cal-row">
            <div className="mp-cal-day">
              <span className="mp-cal-day-num tabular">{date.getDate()}</span>
              <span className="mp-cal-day-hijri small subtle">{hijriDayMonth(date, hijriLang)}</span>
            </div>
            {PRAYER_KEYS.map((k) => (
              <span key={k} className="mp-cal-cell tabular">{prayer ? fmt(prayer[k], lang, timeFormat) : '—'}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
