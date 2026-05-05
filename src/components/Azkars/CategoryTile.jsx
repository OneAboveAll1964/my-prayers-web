import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { isRtl } from '../../lib/i18nLang'
import './CategoryTile.css'

export function CategoryTile({ category }) {
  const { i18n } = useTranslation()
  const Chevron = isRtl(i18n.language) ? ChevronLeft : ChevronRight
  return (
    <Link to={`/azkars/${category.id}`} className="mp-cat t-press">
      <span className="mp-cat-name">{category.name}</span>
      <Chevron size={18} className="muted" aria-hidden="true" />
    </Link>
  )
}
