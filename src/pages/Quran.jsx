import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Type } from 'lucide-react'
import { PageHeader } from '../components/Layout/PageHeader'
import { PageLoader } from '../components/ui/PageLoader'
import { TextInput } from '../components/ui/Field'
import { SurahRow } from '../components/Quran/SurahRow'
import { LastReadCard } from '../components/Quran/LastReadCard'
import { AyahBookmark } from '../components/Quran/AyahBookmark'
import { Sheet } from '../components/Layout/Sheet'
import { ArabicFontPicker } from '../components/Settings/ArabicFontPicker'
import { getSurahList, getSurahListCached } from '../lib/quran'
import { useFavorites } from '../store/favorites'

export default function Quran() {
  const { t } = useTranslation()
  const cached = getSurahListCached()
  const [list, setList] = useState(cached || [])
  const [loading, setLoading] = useState(!cached)
  const [query, setQuery] = useState('')
  const [fontOpen, setFontOpen] = useState(false)
  const fav = useFavorites()

  useEffect(() => {
    let cancelled = false
    getSurahList()
      .then((data) => !cancelled && setList(data))
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter(
      (s) =>
        s.englishName.toLowerCase().includes(q) ||
        s.name.includes(q) ||
        String(s.number).includes(q),
    )
  }, [list, query])

  const bookmarked = useMemo(
    () => list.filter((s) => fav.surahs.includes(s.number)),
    [list, fav.surahs],
  )

  const showSections =
    !query && (fav.lastSurah || bookmarked.length > 0 || fav.ayahs.length > 0)

  const searchSlot = (
    <label className="mp-search">
      <Search size={16} aria-hidden="true" />
      <TextInput
        placeholder={t('quran.search')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ height: 40, border: 'none', background: 'transparent', padding: 0 }}
      />
    </label>
  )

  const fontAction = (
    <button
      type="button"
      className="tap t-press"
      aria-label={t('settings.arabicFont')}
      onClick={() => setFontOpen(true)}
      style={{ color: 'var(--text-muted)' }}
    >
      <Type size={20} aria-hidden="true" />
    </button>
  )

  return (
    <section className="page">
      <PageHeader title={t('quran.title')} search={searchSlot} action={fontAction} />
      <div className="page-body">
        {loading ? (
          <PageLoader />
        ) : (
          <>
            {showSections && fav.lastSurah ? <LastReadCard entry={fav.lastSurah} /> : null}
            {showSections && bookmarked.length > 0 ? (
              <div className="stack-sm">
                <span className="muted small">{t('favorites.bookmarked')}</span>
                <div className="surface" style={{ overflow: 'hidden' }}>
                  {bookmarked.map((s) => (
                    <SurahRow key={`bm-${s.number}`} surah={s} />
                  ))}
                </div>
              </div>
            ) : null}
            {showSections && fav.ayahs.length > 0 ? (
              <div className="stack-sm">
                <span className="muted small">{t('favorites.bookmarkedAyahs')}</span>
                <div className="surface" style={{ overflow: 'hidden' }}>
                  {fav.ayahs.map((a) => (
                    <AyahBookmark key={a.k} entry={a} />
                  ))}
                </div>
              </div>
            ) : null}
            <div className="surface" style={{ overflow: 'hidden' }}>
              {filtered.map((s) => (
                <SurahRow key={s.number} surah={s} />
              ))}
              {!filtered.length ? (
                <p className="muted" style={{ padding: 16 }}>{t('common.noResults')}</p>
              ) : null}
            </div>
          </>
        )}
      </div>
      <Sheet open={fontOpen} onClose={() => setFontOpen(false)} title={t('settings.arabicFont')}>
        <ArabicFontPicker />
      </Sheet>
    </section>
  )
}
