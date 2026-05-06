import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { setSettings, useSettings } from '../../store/settings'
import { LANGS } from '../../lib/i18nLang'

const LABELS = {
  en: 'English',
  ar: 'العربية',
  ckb: 'کوردی (سۆرانی)',
  ckb_Badini: 'کوردی (بادینی)',
}

export function LanguagePicker({ onPick }) {
  const { i18n } = useTranslation()
  const { language } = useSettings()
  const current = language || i18n.language
  return (
    <div className="surface" style={{ overflow: 'hidden' }}>
      {LANGS.map((code) => {
        const active = code === current
        return (
          <button
            key={code}
            type="button"
            className="mp-set-row t-press"
            style={{ width: '100%', textAlign: 'start' }}
            onClick={() => {
              setSettings({ language: code })
              i18n.changeLanguage(code)
              if (onPick) onPick()
            }}
          >
            <span className="mp-set-label">{LABELS[code]}</span>
            {active ? <Check size={18} style={{ color: 'var(--accent)' }} /> : <span />}
          </button>
        )
      })}
    </div>
  )
}
