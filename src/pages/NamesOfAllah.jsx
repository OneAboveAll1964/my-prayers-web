import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { Spinner } from '../components/ui/Spinner'
import { NameCard } from '../components/NamesOfAllah/NameCard'
import {
  getNamesOfAllah,
  getNamesOfAllahCached,
} from '../lib/repositories/nameOfAllahRepository'
import './NamesOfAllah.css'

export default function NamesOfAllah() {
  const { t, i18n } = useTranslation()
  const cached = getNamesOfAllahCached(i18n.language)
  const [items, setItems] = useState(cached || [])
  const [loading, setLoading] = useState(!cached)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      const c = getNamesOfAllahCached(i18n.language)
      if (c) {
        setItems(c)
        setLoading(false)
      } else {
        setLoading(true)
      }
      getNamesOfAllah(i18n.language).then((list) => {
        if (!cancelled) {
          setItems(list)
          setLoading(false)
        }
      })
    })
    return () => {
      cancelled = true
    }
  }, [i18n.language])

  return (
    <section className="page">
      <PageHeader title={t('names.title')} />
      <div className="page-body">
        {loading ? (
          <div className="surface" style={{ padding: 22, display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        ) : (
          <div className="mp-names-grid">
            {items.map((n, i) => (
              <NameCard key={n.id} entry={n} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
