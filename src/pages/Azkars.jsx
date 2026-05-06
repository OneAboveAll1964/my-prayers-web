import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { PageLoader } from '../components/ui/PageLoader'
import { CategoryTile } from '../components/Azkars/CategoryTile'
import { ChapterRow } from '../components/AzkarChapters/ChapterRow'
import {
  getAzkarCategories,
  getAzkarCategoriesCached,
  getAzkarChapters,
  getAzkarChaptersCached,
} from '../lib/repositories/hisnulMuslimRepository'
import { useFavorites } from '../store/favorites'

export default function Azkars() {
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState(() => getAzkarCategoriesCached(i18n.language) || [])
  const [favoriteChapters, setFavoriteChapters] = useState([])
  const [loading, setLoading] = useState(() => !getAzkarCategoriesCached(i18n.language))
  const fav = useFavorites()

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      const cached = getAzkarCategoriesCached(i18n.language)
      if (cached) {
        setItems(cached)
        setLoading(false)
      } else {
        setLoading(true)
      }
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

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      if (!fav.chapters.length) {
        setFavoriteChapters([])
        return
      }
      const cached = getAzkarChaptersCached({ language: i18n.language })
      if (cached) {
        const set = new Set(fav.chapters)
        setFavoriteChapters(cached.filter((c) => set.has(c.id)))
      }
      getAzkarChapters({ language: i18n.language }).then((all) => {
        if (cancelled) return
        const set = new Set(fav.chapters)
        setFavoriteChapters(all.filter((c) => set.has(c.id)))
      })
    })
    return () => {
      cancelled = true
    }
  }, [i18n.language, fav.chapters])

  return (
    <section className="page">
      <PageHeader title={t('azkars.title')} />
      <div className="page-body">
        {favoriteChapters.length > 0 ? (
          <div className="stack-sm">
            <span className="muted small">{t('favorites.starred')}</span>
            <div className="surface" style={{ overflow: 'hidden' }}>
              {favoriteChapters.map((c) => (
                <ChapterRow key={`fav-${c.id}`} chapter={c} />
              ))}
            </div>
          </div>
        ) : null}

        {loading ? (
          <PageLoader />
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
