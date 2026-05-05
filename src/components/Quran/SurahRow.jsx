import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bookmark } from 'lucide-react'
import { toggleBookmarkSurah, useFavorites } from '../../store/favorites'
import './SurahRow.css'

export function SurahRow({ surah }) {
  const { t } = useTranslation()
  const fav = useFavorites()
  const marked = fav.surahs.includes(surah.number)
  return (
    <div className="mp-surah-row">
      <Link to={`/quran/${surah.number}`} className="mp-surah-link t-press">
        <span className="mp-surah-num tabular">{surah.number}</span>
        <span className="mp-surah-info">
          <span className="mp-surah-name">{surah.englishName}</span>
          <span className="mp-surah-meta subtle small">
            {surah.ayahCount} {t('quran.ayahs')} ·{' '}
            {surah.revelationType === 'Meccan' ? t('quran.meccan') : t('quran.medinan')}
          </span>
        </span>
        <span className="mp-surah-arabic" lang="ar">
          {surah.name}
        </span>
      </Link>
      <button
        type="button"
        className={`mp-surah-bm tap t-press ${marked ? 'is-on' : ''}`}
        aria-pressed={marked}
        onClick={() => toggleBookmarkSurah(surah.number)}
      >
        <Bookmark size={18} fill={marked ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>
    </div>
  )
}
