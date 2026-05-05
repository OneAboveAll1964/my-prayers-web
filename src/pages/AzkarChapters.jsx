import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { PageHeader } from '../components/Layout/PageHeader'
import { Spinner } from '../components/ui/Spinner'
import { TextInput } from '../components/ui/Field'
import { ChapterRow } from '../components/AzkarChapters/ChapterRow'
import { getAzkarCategories, getAzkarChapters, searchAzkarChapters } from '../lib/repositories/hisnulMuslimRepository'

export default function AzkarChapters() {
  const { t, i18n } = useTranslation()
  const { categoryId } = useParams()
  const id = Number(categoryId)
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setLoading(true)
      Promise.all([
        getAzkarChapters({ language: i18n.language, categoryId: id }),
        getAzkarCategories(i18n.language),
      ]).then(([list, cats]) => {
        if (cancelled) return
        setChapters(list)
        setCategoryName(cats.find((c) => c.id === id)?.name || '')
        setLoading(false)
      })
    })
    return () => {
      cancelled = true
    }
  }, [i18n.language, id])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return chapters
    return chapters.filter((c) => c.name.toLowerCase().includes(q))
  }, [chapters, query])

  useEffect(() => {
    let cancelled = false
    if (query.trim().length < 2) return
    searchAzkarChapters({ language: i18n.language, query }).then((list) => {
      if (!cancelled) setChapters(list)
    })
    return () => {
      cancelled = true
    }
  }, [query, i18n.language])

  return (
    <section className="page">
      <PageHeader title={categoryName || t('azkars.title')} subtitle={`${chapters.length} ${t('azkars.chapters')}`} back />
      <div className="page-body">
        <div className="mp-sticky">
          <label className="mp-search">
            <Search size={16} aria-hidden="true" />
            <TextInput
              placeholder={t('azkars.search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ height: 40, border: 'none', background: 'transparent', padding: 0 }}
            />
          </label>
        </div>
        {loading ? (
          <div className="surface" style={{ padding: 22, display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        ) : (
          <div className="surface" style={{ overflow: 'hidden' }}>
            {filtered.map((c) => (
              <ChapterRow key={c.id} chapter={c} />
            ))}
            {!filtered.length ? <p className="muted" style={{ padding: 16 }}>{t('common.noResults')}</p> : null}
          </div>
        )}
      </div>
    </section>
  )
}
