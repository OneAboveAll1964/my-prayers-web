import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { Spinner } from '../components/ui/Spinner'
import { CategoryTile } from '../components/Azkars/CategoryTile'
import { getAzkarCategories } from '../lib/repositories/hisnulMuslimRepository'

export default function Azkars() {
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setLoading(true)
      getAzkarCategories(i18n.language).then((data) => {
        if (!cancelled) {
          setItems(data)
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
      <PageHeader title={t('azkars.title')} />
      <div className="page-body">
        {loading ? (
          <div className="surface" style={{ padding: 22, display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        ) : (
          <div className="stack">
            {items.map((c) => (
              <CategoryTile key={c.id} category={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
