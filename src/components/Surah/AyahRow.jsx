import { Bookmark } from 'lucide-react'
import { isBookmarkedAyah, toggleBookmarkAyah, useFavorites } from '../../store/favorites'
import './AyahRow.css'

export function AyahRow({ ayah, surah }) {
  useFavorites()
  const marked = surah ? isBookmarkedAyah(surah.number, ayah.numberInSurah) : false
  return (
    <article id={`ayah-${ayah.numberInSurah}`} className="mp-ayah fade-in">
      <header className="mp-ayah-head">
        <span className="mp-ayah-num tabular">{ayah.numberInSurah}</span>
        <span className="row" style={{ gap: 10 }}>
          <span className="mp-ayah-meta subtle small">Juz {ayah.juz}</span>
          {surah ? (
            <button
              type="button"
              className={`mp-ayah-bm tap t-press ${marked ? 'is-on' : ''}`}
              aria-pressed={marked}
              aria-label="Bookmark ayah"
              onClick={() =>
                toggleBookmarkAyah(surah.number, ayah.numberInSurah, {
                  surahName: surah.englishName,
                  arabicName: surah.name,
                  preview: ayah.translation || ayah.arabic.slice(0, 80),
                })
              }
            >
              <Bookmark size={16} fill={marked ? 'currentColor' : 'none'} aria-hidden="true" />
            </button>
          ) : null}
        </span>
      </header>
      <p className="mp-ayah-arabic" lang="ar">
        {ayah.arabic}
      </p>
      {ayah.translation ? <p className="mp-ayah-translation">{ayah.translation}</p> : null}
    </article>
  )
}
