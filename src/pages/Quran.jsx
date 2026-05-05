import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { PageHeader } from '../components/Layout/PageHeader'
import { Spinner } from '../components/ui/Spinner'
import { TextInput } from '../components/ui/Field'
import { SurahRow } from '../components/Quran/SurahRow'
import { LastReadCard } from '../components/Quran/LastReadCard'
import { getSurahList } from '../lib/quran'
import { useFavorites } from '../store/favorites'

export default function Quran() {
  const { t } = useTranslation()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
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

  const showSections = !query && (fav.lastSurah || bookmarked.length > 0)

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

  return (
    <section className="page">
      <PageHeader title={t('quran.title')} search={searchSlot} />
      <div className="page-body">
        {loading ? (
          <div className="surface" style={{ padding: 22, display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
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
    </section>
  )
}
