import { useTranslation } from 'react-i18next'
import { PRAYER_KEYS } from '../../lib/prayer-times/prayerTime'
import './PrayerCardSkeleton.css'

export function PrayerCardSkeleton() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mp-next-skeleton" aria-hidden="true">
        <span className="mp-skeleton-line w-32" />
        <span className="mp-skeleton-line big" />
        <span className="mp-skeleton-line w-24" />
      </div>
      <div className="mp-prayer-card surface" aria-hidden="true">
        <ul className="mp-prayer-list">
          {PRAYER_KEYS.map((key) => (
            <li key={key} className="mp-prayer-row">
              <span className="mp-prayer-name">{t(`prayers.${key}`)}</span>
              <span className="mp-skeleton-pill" />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
