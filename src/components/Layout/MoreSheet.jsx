import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CalendarDays, CircleDot, Settings as SettingsIcon, X } from 'lucide-react'
import { IconNinetyNine } from '../ui/IconNinetyNine'
import './MoreSheet.css'

const ITEMS = [
  { to: '/calendar', label: 'calendar', Icon: CalendarDays },
  { to: '/names', label: 'names', Icon: IconNinetyNine },
  { to: '/tasbih', label: 'tasbih', Icon: CircleDot },
  { to: '/settings', label: 'settings', Icon: SettingsIcon },
]

export function MoreSheet({ open, onClose }) {
  const { t } = useTranslation()
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div className={`mp-sheet ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="mp-sheet-scrim"
        aria-label={t('common.close')}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <div className="mp-sheet-panel" role="dialog" aria-modal="true" aria-label={t('nav.more')}>
        <div className="mp-sheet-handle" aria-hidden="true" />
        <div className="mp-sheet-head">
          <h2 className="mp-sheet-title">{t('nav.more')}</h2>
          <button
            type="button"
            className="tap t-press mp-sheet-close"
            aria-label={t('common.close')}
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav className="mp-sheet-grid">
          {ITEMS.map(({ to, label, Icon }) => (
            <Link key={to} to={to} className="mp-sheet-tile t-press" onClick={onClose}>
              <span className="mp-sheet-icon">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="mp-sheet-label">{t(`nav.${label}`)}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
