import { useTranslation } from 'react-i18next'
import { PRAYER_KEYS } from '../../lib/prayer-times/prayerTime'
import './PrayerCardSkeleton.css'

export function PrayerCardSkeleton() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mp-next surface" aria-hidden="true">
        <div className="mp-next-row">
          <span className="mp-next-label">{t('home.next')}</span>
          <span className="mp-next-name mp-skel-on-accent">Fajr</span>
        </div>
        <div className="mp-next-row mp-next-time">
          <span className="mp-next-remain tabular mp-skel-on-accent">00:00</span>
          <span className="mp-next-at tabular mp-skel-on-accent">00:00</span>
        </div>
      </div>

      <div className="mp-prayer-card surface" aria-hidden="true">
        <ul className="mp-prayer-list">
          {PRAYER_KEYS.map((key) => (
            <li key={key} className="mp-prayer-row">
              <span className="mp-prayer-name">{t(`prayers.${key}`)}</span>
              <span className="mp-prayer-time tabular mp-skel-on-surface">00:00</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
