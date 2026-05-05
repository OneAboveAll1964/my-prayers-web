import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { Spinner } from '../components/ui/Spinner'
import { AyahRow } from '../components/Surah/AyahRow'
import { getSurah } from '../lib/quran'

export default function Surah() {
  const { t, i18n } = useTranslation()
  const { number } = useParams()
  const [surah, setSurah] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      setLoading(true)
      getSurah(Number(number), i18n.language)
        .then((data) => !cancelled && setSurah(data))
        .catch(() => {})
        .finally(() => !cancelled && setLoading(false))
    })
    return () => {
      cancelled = true
    }
  }, [number, i18n.language])

  return (
    <section className="page">
      <PageHeader
        title={surah ? surah.englishName : t('quran.title')}
        subtitle={surah ? `${surah.ayahs.length} ${t('quran.ayahs')}` : null}
        back
        action={surah ? <span className="mp-ayah-arabic" lang="ar" style={{ fontSize: 20 }}>{surah.name}</span> : null}
      />
      <div className="page-body">
        {loading ? (
          <div className="surface" style={{ padding: 22, display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        ) : !surah ? (
          <p className="muted">{t('common.error')}</p>
        ) : (
          <div className="stack">
            {surah.ayahs.map((a) => (
              <AyahRow key={a.number} ayah={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
