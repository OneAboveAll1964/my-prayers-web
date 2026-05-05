import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { CalculationMethod } from '../../lib/prayer-times/calculationMethod'
import { setSettings, useSettings } from '../../store/settings'

const ORDER = [
  CalculationMethod.makkah,
  CalculationMethod.mwl,
  CalculationMethod.isna,
  CalculationMethod.karachi,
  CalculationMethod.egypt,
  CalculationMethod.jafari,
  CalculationMethod.tehran,
  CalculationMethod.custom,
]

export function CalculationMethodPicker() {
  const { t } = useTranslation()
  const { calculationMethod } = useSettings()
  return (
    <div className="surface" style={{ overflow: 'hidden' }}>
      {ORDER.map((m) => {
        const active = m === calculationMethod
        return (
          <button
            key={m}
            type="button"
            className="mp-set-row t-press"
            style={{ width: '100%', textAlign: 'start' }}
            onClick={() => setSettings({ calculationMethod: m })}
          >
            <span className="mp-set-label">{t(`calc.${m}`)}</span>
            {active ? <Check size={18} style={{ color: 'var(--accent)' }} /> : <span />}
          </button>
        )
      })}
    </div>
  )
}
