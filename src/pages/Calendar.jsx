import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHeader } from '../components/Layout/PageHeader'
import { MonthGrid } from '../components/Calendar/MonthGrid'
import { DayCard } from '../components/Calendar/DayCard'
import { PageLoader } from '../components/ui/PageLoader'
import { useSettings } from '../store/settings'
import { getMonthPrayerTimes } from '../lib/prayer-times/prayerTimeRepository'
import { createPrayerAttribute, createCustomMethod } from '../lib/prayer-times/prayerAttribute'
import { isRtl } from '../lib/i18nLang'

export default function Calendar() {
  const { t, i18n } = useTranslation()
  const settings = useSettings()
  const [cursor, setCursor] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(false)

  const attribute = useMemo(
    () =>
      createPrayerAttribute({
        calculationMethod: settings.calculationMethod,
        asrMethod: settings.asrMethod,
        higherLatitudeMethod: settings.higherLatitudeMethod,
        offset: settings.offsets,
        customMethod: createCustomMethod(settings.fajrAngle, settings.ishaAngle),
      }),
    [settings],
  )

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!settings.location) return
      setLoading(true)
      const data = await getMonthPrayerTimes({
        location: settings.location,
        year: cursor.year,
        month: cursor.month,
        attribute,
      })
      if (!cancelled) {
        setDays(data)
        setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [settings.location, cursor.year, cursor.month, attribute])

  const monthLabel = new Intl.DateTimeFormat(i18n.language, { month: 'long', year: 'numeric' }).format(
    new Date(cursor.year, cursor.month, 1),
  )

  const Prev = isRtl(i18n.language) ? ChevronRight : ChevronLeft
  const Next = isRtl(i18n.language) ? ChevronLeft : ChevronRight

  const shift = (delta) => {
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  return (
    <section className="page">
      <PageHeader
        title={t('calendar.title')}
        action={
          <div className="row" role="group" aria-label="Month">
            <button type="button" className="tap t-press" onClick={() => shift(-1)} aria-label="Prev">
              <Prev size={20} />
            </button>
            <span style={{ minWidth: 140, textAlign: 'center', fontWeight: 600 }}>{monthLabel}</span>
            <button type="button" className="tap t-press" onClick={() => shift(1)} aria-label="Next">
              <Next size={20} />
            </button>
          </div>
        }
      />
      <div className="page-body">
        {!settings.location ? (
          <p className="muted">{t('home.noLocation')}</p>
        ) : loading ? (
          <PageLoader />
        ) : (
          <>
            <div className="mp-cal-mobile">
              {days.map(({ date, prayer }) => (
                <DayCard key={date.toISOString()} date={date} prayer={prayer} language={i18n.language} timeFormat={settings.timeFormat} />
              ))}
            </div>
            <div className="mp-cal-desktop">
              <MonthGrid days={days} language={i18n.language} timeFormat={settings.timeFormat} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
