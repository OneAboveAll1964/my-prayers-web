import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { PageHeader } from '../components/Layout/PageHeader'
import { Spinner } from '../components/ui/Spinner'
import { TextInput } from '../components/ui/Field'
import { SurahRow } from '../components/Quran/SurahRow'
import { getSurahList } from '../lib/quran'

export default function Quran() {
  const { t } = useTranslation()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

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

  return (
    <section className="page">
      <PageHeader title={t('quran.title')} />
      <div className="page-body">
        <label className="mp-search">
          <Search size={16} aria-hidden="true" />
          <TextInput
            placeholder={t('quran.search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ height: 40, border: 'none', background: 'transparent', padding: 0 }}
          />
        </label>
        {loading ? (
          <div className="surface" style={{ padding: 22, display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        ) : (
          <div className="surface" style={{ overflow: 'hidden' }}>
            {filtered.map((s) => (
              <SurahRow key={s.number} surah={s} />
            ))}
            {!filtered.length ? <p className="muted" style={{ padding: 16 }}>{t('common.noResults')}</p> : null}
          </div>
        )}
      </div>
    </section>
  )
}
