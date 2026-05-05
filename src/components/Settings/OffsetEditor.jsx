import { useTranslation } from 'react-i18next'
import { Minus, Plus } from 'lucide-react'
import { setSettings, useSettings } from '../../store/settings'
import { PRAYER_KEYS } from '../../lib/prayer-times/prayerTime'
import './OffsetEditor.css'

export function OffsetEditor() {
  const { t } = useTranslation()
  const { offsets } = useSettings()

  const update = (i, delta) => {
    const next = offsets.slice()
    next[i] = Math.max(-30, Math.min(30, (next[i] || 0) + delta))
    setSettings({ offsets: next })
  }

  return (
    <div className="surface mp-offsets">
      {PRAYER_KEYS.map((k, i) => (
        <div key={k} className="mp-offset-row">
          <span className="mp-offset-name">{t(`prayers.${k}`)}</span>
          <div className="mp-offset-controls">
            <button type="button" className="mp-offset-btn t-press" onClick={() => update(i, -1)} aria-label="-">
              <Minus size={14} />
            </button>
            <span className="mp-offset-value tabular">
              {(offsets[i] ?? 0) > 0 ? `+${offsets[i]}` : (offsets[i] ?? 0)} {t('settings.minutes')}
            </span>
            <button type="button" className="mp-offset-btn t-press" onClick={() => update(i, 1)} aria-label="+">
              <Plus size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
