import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Bookmark, Type } from 'lucide-react'
import { PageHeader } from '../components/Layout/PageHeader'
import { PageLoader } from '../components/ui/PageLoader'
import { AyahRow } from '../components/Surah/AyahRow'
import { Sheet } from '../components/Layout/Sheet'
import { ArabicFontPicker } from '../components/Settings/ArabicFontPicker'
import { getSurah, getSurahCached } from '../lib/quran'
import { setLastSurah, toggleBookmarkSurah, useFavorites } from '../store/favorites'

export default function Surah() {
  const { t, i18n } = useTranslation()
  const { number } = useParams()
  const { hash } = useLocation()
  const num = Number(number)
  const cached = getSurahCached(num, i18n.language)
  const [surah, setSurah] = useState(cached || null)
  const [loading, setLoading] = useState(!cached)
  const fav = useFavorites()
  const marked = fav.surahs.includes(num)
  const [fontOpen, setFontOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      const c = getSurahCached(num, i18n.language)
      if (c) {
        setSurah(c)
        setLoading(false)
      } else {
        setLoading(true)
      }
      getSurah(num, i18n.language)
        .then((data) => {
          if (cancelled) return
          if (data) {
            setSurah(data)
            setLastSurah({
              number: data.number,
              englishName: data.englishName,
              name: data.name,
              ayahCount: data.ayahs.length,
            })
          }
        })
        .catch(() => {})
        .finally(() => !cancelled && setLoading(false))
    })
    return () => {
      cancelled = true
    }
  }, [num, i18n.language])

  useEffect(() => {
    if (!surah || !hash) return
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [surah, hash])

  return (
    <section className="page">
      <PageHeader
        title={surah ? surah.englishName : t('quran.title')}
        subtitle={surah ? `${surah.ayahs.length} ${t('quran.ayahs')}` : null}
        back
        action={
          <span className="row" style={{ gap: 4 }}>
            <button
              type="button"
              className="tap t-press"
              aria-label={t('settings.arabicFont')}
              onClick={() => setFontOpen(true)}
              style={{ color: 'var(--text-muted)' }}
            >
              <Type size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="tap t-press"
              aria-pressed={marked}
              aria-label="Bookmark"
              onClick={() => toggleBookmarkSurah(num)}
              style={{ color: marked ? 'var(--accent)' : 'var(--text-muted)' }}
            >
              <Bookmark size={20} fill={marked ? 'currentColor' : 'none'} aria-hidden="true" />
            </button>
          </span>
        }
      />
      <div className="page-body">
        {loading ? (
          <PageLoader />
        ) : !surah ? (
          <p className="muted">{t('common.error')}</p>
        ) : (
          <div className="stack">
            {surah.ayahs.map((a) => (
              <AyahRow key={a.number} ayah={a} surah={surah} />
            ))}
          </div>
        )}
      </div>
      <Sheet open={fontOpen} onClose={() => setFontOpen(false)} title={t('settings.arabicFont')}>
        <ArabicFontPicker />
      </Sheet>
    </section>
  )
}
