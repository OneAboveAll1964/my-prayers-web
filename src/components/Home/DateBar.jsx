import { useTranslation } from 'react-i18next'
import { hijriDateParts } from '../../lib/hijri'
import './DateBar.css'

export function DateBar({ date }) {
  const { i18n } = useTranslation()
  const lang = i18n.language || 'en'
  const gregorian = new Intl.DateTimeFormat(lang, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
  const hijri = hijriDateParts(date, lang.startsWith('ar') ? 'ar' : 'en')
  return (
    <div className="mp-datebar">
      <span className="mp-datebar-greg">{gregorian}</span>
      <span className="mp-datebar-dot" aria-hidden="true">·</span>
      <span className="mp-datebar-hijri">{hijri}</span>
    </div>
  )
}
