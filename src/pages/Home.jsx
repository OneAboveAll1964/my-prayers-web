import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Layout/PageHeader'
import { PrayerCard } from '../components/Home/PrayerCard'
import { NextPrayerCountdown } from '../components/Home/NextPrayerCountdown'
import { DateBar } from '../components/Home/DateBar'
import { LocationBar } from '../components/Home/LocationBar'
import { PrayerCardSkeleton } from '../components/Home/PrayerCardSkeleton'
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

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const settings = useSettings()
  const fav = useFavorites()
  const [prayer, setPrayer] = useState(null)
  const [tomorrow, setTomorrow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(startOfToday)

  useEffect(() => {
    const id = setInterval(() => {
      const today = startOfToday()
      setDate((d) => (d.getTime() === today.getTime() ? d : today))
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  const attribute = useMemo(() => buildAttribute(settings), [settings])

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!settings.location) return
      setLoading(true)
      const next = new Date(date.getTime() + 86_400_000)
      const [todayResult, tomorrowResult] = await Promise.all([
        getPrayerTimes({ location: settings.location, date, attribute, useFixedPrayer: settings.useFixedTimes }),
        getPrayerTimes({ location: settings.location, date: next, attribute, useFixedPrayer: settings.useFixedTimes }),
      ])
      if (!cancelled) {
        setPrayer(todayResult)
        setTomorrow(tomorrowResult)
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
      <PageHeader title={t('appName')} action={<LocationBar location={settings.location} />} />
      <div className="page-body">
        <DateBar date={date} />
        {!settings.location ? (
          <div className="surface fade-in" style={{ padding: 18 }}>
            <p className="muted small" style={{ marginTop: 0 }}>{t('home.noLocation')}</p>
            <Link to="/settings/location">
              <Button variant="solid">{t('home.searchCity')}</Button>
            </Link>
          </div>
        ) : null}
        {settings.location ? (
          loading && !prayer ? (
            <PrayerCardSkeleton />
          ) : (
            <>
              <NextPrayerCountdown prayer={prayer} tomorrow={tomorrow} language={i18n.language} timeFormat={settings.timeFormat} />
              <PrayerCard prayer={prayer} currentIndex={idx} language={i18n.language} timeFormat={settings.timeFormat} />
            </>
          )
        ) : null}
        {fav.lastSurah ? <LastReadCard entry={fav.lastSurah} /> : null}
      </div>
    </section>
  )
}
