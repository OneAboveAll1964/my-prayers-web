import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { isRtl } from '../../lib/i18nLang'
import { toggleFavoriteChapter, useFavorites } from '../../store/favorites'
import './ChapterRow.css'

export function ChapterRow({ chapter }) {
  const { i18n } = useTranslation()
  const fav = useFavorites()
  const Chevron = isRtl(i18n.language) ? ChevronLeft : ChevronRight
  const isFav = fav.chapters.includes(chapter.id)
  return (
    <div className="mp-chapter-row">
      <button
        type="button"
        className={`mp-chapter-star tap t-press ${isFav ? 'is-on' : ''}`}
        aria-pressed={isFav}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleFavoriteChapter(chapter.id)
        }}
      >
        <Star size={18} fill={isFav ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>
      <Link to={`/azkars/chapter/${chapter.id}`} className="mp-chapter-link t-press">
        <span className="mp-chapter-name">{chapter.name}</span>
        <Chevron size={18} className="muted" aria-hidden="true" />
      </Link>
    </div>
  )
}
