import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Layout/PageHeader'
import { PrayerCard } from '../components/Home/PrayerCard'
import { NextPrayerCountdown } from '../components/Home/NextPrayerCountdown'
import { DateBar } from '../components/Home/DateBar'
import { LocationBar } from '../components/Home/LocationBar'
import { Spinner } from '../components/ui/Spinner'
import { Button } from '../components/ui/Button'
import { useSettings } from '../store/settings'
import { useFavorites } from '../store/favorites'
import { LastReadCard } from '../components/Quran/LastReadCard'
import { getPrayerTimes } from '../lib/prayer-times/prayerTimeRepository'
import { createPrayerAttribute, createCustomMethod } from '../lib/prayer-times/prayerAttribute'
import { PRAYER_KEYS } from '../lib/prayer-times/prayerTime'

function buildAttribute(s) {
  return createPrayerAttribute({
    calculationMethod: s.calculationMethod,
    asrMethod: s.asrMethod,
    higherLatitudeMethod: s.higherLatitudeMethod,
    offset: s.offsets,
    customMethod: createCustomMethod(s.fajrAngle, s.ishaAngle),
  })
}

function findCurrentIndex(prayer, now) {
  if (!prayer) return -1
  const arr = PRAYER_KEYS.map((k) => prayer[k])
  let i = -1
  for (let j = 0; j < arr.length; j++) {
    if (arr[j].getTime() <= now.getTime()) i = j
  }
  return i
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const settings = useSettings()
  const fav = useFavorites()
  const [prayer, setPrayer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [date] = useState(() => new Date())

  const attribute = useMemo(() => buildAttribute(settings), [settings])

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!settings.location) return
      setLoading(true)
      const result = await getPrayerTimes({
        location: settings.location,
        date,
        attribute,
        useFixedPrayer: settings.useFixedTimes,
      })
      if (!cancelled) {
        setPrayer(result)
        setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [settings.location, settings.useFixedTimes, attribute, date])

  const idx = findCurrentIndex(prayer, new Date())

  return (
    <section className="page">
      <PageHeader title={t('appName')} subtitle={null} />
      <div className="page-body">
        <DateBar date={date} />
        <LocationBar location={settings.location} />
        {!settings.location ? (
          <div className="surface fade-in" style={{ padding: 18 }}>
            <p className="muted small" style={{ marginTop: 0 }}>{t('home.noLocation')}</p>
            <Link to="/settings/location"><Button variant="solid">{t('home.searchCity')}</Button></Link>
          </div>
        ) : null}
        {settings.location ? <NextPrayerCountdown prayer={prayer} language={i18n.language} /> : null}
        {settings.location ? (
          loading && !prayer ? (
            <div className="surface" style={{ padding: 22, display: 'flex', justifyContent: 'center' }}>
              <Spinner />
            </div>
          ) : (
            <PrayerCard prayer={prayer} currentIndex={idx} language={i18n.language} />
          )
        ) : null}
        {fav.lastSurah ? <LastReadCard entry={fav.lastSurah} /> : null}
      </div>
    </section>
  )
}
