import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { isRtl } from '../../lib/i18nLang'
import './ChapterRow.css'

export function ChapterRow({ chapter }) {
  const { i18n } = useTranslation()
  const Chevron = isRtl(i18n.language) ? ChevronLeft : ChevronRight
  return (
    <Link to={`/azkars/chapter/${chapter.id}`} className="mp-chapter-row t-press">
      <span className="mp-chapter-name">{chapter.name}</span>
      <Chevron size={18} className="muted" aria-hidden="true" />
    </Link>
  )
}
