import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CalendarDays, CircleDot, Settings as SettingsIcon } from 'lucide-react'
import { IconNinetyNine } from '../ui/IconNinetyNine'
import { Sheet } from './Sheet'
import './MoreSheet.css'

const ITEMS = [
  { to: '/calendar', label: 'calendar', Icon: CalendarDays },
  { to: '/names', label: 'names', Icon: IconNinetyNine },
  { to: '/tasbih', label: 'tasbih', Icon: CircleDot },
  { to: '/settings', label: 'settings', Icon: SettingsIcon },
]

export function MoreSheet({ open, onClose }) {
  const { t } = useTranslation()
  return (
    <Sheet open={open} onClose={onClose} title={t('nav.more')}>
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
    </Sheet>
  )
}
