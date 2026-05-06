import { ARABIC_FONTS, setSettings, useSettings } from '../../store/settings'
import './ArabicFontPicker.css'

const PREVIEW = 'بِسْمِ ٱللَّهِ'

export function ArabicFontPicker() {
  const { arabicFont } = useSettings()
  return (
    <div className="mp-fontpicker">
      {ARABIC_FONTS.map((f) => {
        const active = f.id === arabicFont
        return (
          <button
            key={f.id}
            type="button"
            className={`mp-fontpicker-btn t-press ${active ? 'is-active' : ''}`}
            onClick={() => setSettings({ arabicFont: f.id })}
            aria-pressed={active}
          >
            <span className="mp-fontpicker-preview" style={{ fontFamily: `'${f.family}', serif` }} lang="ar">
              {PREVIEW}
            </span>
            <span className="mp-fontpicker-label">{f.label}</span>
          </button>
        )
      })}
    </div>
  )
}
