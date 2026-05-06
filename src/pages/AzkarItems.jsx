import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { PageLoader } from '../components/ui/PageLoader'
import { AzkarItemCard } from '../components/AzkarItems/AzkarItemCard'
import { getAzkarItems, getAzkarItemsCached } from '../lib/repositories/hisnulMuslimRepository'

export default function AzkarItems() {
  const { t, i18n } = useTranslation()
  const { chapterId } = useParams()
  const cached = getAzkarItemsCached({ language: i18n.language, chapterId: Number(chapterId) })
  const [items, setItems] = useState(cached || [])
  const [loading, setLoading] = useState(!cached)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      const c = getAzkarItemsCached({ language: i18n.language, chapterId: Number(chapterId) })
      if (c) {
        setItems(c)
        setLoading(false)
      } else {
        setLoading(true)
      }
      getAzkarItems({ language: i18n.language, chapterId: Number(chapterId) }).then((list) => {
        if (!cancelled) {
          setItems(list)
          setLoading(false)
        }
      })
    })
    return () => {
      cancelled = true
    }
  }, [chapterId, i18n.language])

  return (
    <section className="page">
      <PageHeader title={t('azkars.title')} subtitle={`${items.length} ${t('azkars.items')}`} back />
      <div className="page-body">
        {loading ? (
          <PageLoader />
        ) : (
          <div className="stack">
            {items.map((item, i) => (
              <AzkarItemCard key={item.id} item={item} index={i + 1} />
            ))}
            {!items.length ? <p className="muted">{t('common.noResults')}</p> : null}
          </div>
        )}
      </div>
    </section>
  )
}
