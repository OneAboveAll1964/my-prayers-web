import { Link } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { toggleBookmarkAyah } from '../../store/favorites'
import './AyahBookmark.css'

export function AyahBookmark({ entry }) {
  return (
    <div className="mp-ayah-bm-row">
      <Link
        to={`/quran/${entry.surah}#ayah-${entry.ayah}`}
        className="mp-ayah-bm-link t-press"
      >
        <span className="mp-ayah-bm-num tabular">
          {entry.surah}:{entry.ayah}
        </span>
        <span className="mp-ayah-bm-text">
          <span className="mp-ayah-bm-name">{entry.surahName}</span>
          {entry.preview ? <span className="mp-ayah-bm-preview subtle small">{entry.preview}</span> : null}
        </span>
        {entry.arabicName ? (
          <span className="mp-ayah-bm-arabic" lang="ar">
            {entry.arabicName}
          </span>
        ) : null}
      </Link>
      <button
        type="button"
        className="mp-ayah-bm-remove tap t-press"
        aria-label="Remove"
        onClick={() => toggleBookmarkAyah(entry.surah, entry.ayah)}
      >
        <Bookmark size={16} fill="currentColor" aria-hidden="true" />
      </button>
    </div>
  )
}
