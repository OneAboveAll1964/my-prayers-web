import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { isRtl } from '../../lib/i18nLang'
import './LastReadCard.css'

export function LastReadCard({ entry }) {
  const { t, i18n } = useTranslation()
  const Chevron = isRtl(i18n.language) ? ChevronLeft : ChevronRight
  return (
    <Link to={`/quran/${entry.number}`} className="mp-lastread t-press">
      <div className="mp-lastread-text">
        <span className="mp-lastread-label">{t('favorites.lastRead')}</span>
        <span className="mp-lastread-name">{entry.englishName}</span>
      </div>
      <div className="mp-lastread-trail">
        <span className="mp-lastread-arabic" lang="ar">{entry.name}</span>
        <Chevron size={18} aria-hidden="true" />
      </div>
    </Link>
  )
}
