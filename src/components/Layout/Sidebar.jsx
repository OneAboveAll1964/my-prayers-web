import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Home,
  CalendarDays,
  Compass,
  BookHeart,
  BookMarked,
  Sparkles,
  CircleDot,
  Settings as SettingsIcon,
} from 'lucide-react'
import './Sidebar.css'

const ITEMS = [
  { to: '/', label: 'home', Icon: Home, end: true },
  { to: '/calendar', label: 'calendar', Icon: CalendarDays },
  { to: '/qibla', label: 'qibla', Icon: Compass },
  { to: '/azkars', label: 'azkars', Icon: BookHeart },
  { to: '/names', label: 'names', Icon: Sparkles },
  { to: '/quran', label: 'quran', Icon: BookMarked },
  { to: '/tasbih', label: 'tasbih', Icon: CircleDot },
  { to: '/settings', label: 'settings', Icon: SettingsIcon },
]

export function Sidebar() {
  const { t } = useTranslation()
  return (
    <aside className="mp-side" aria-label="Primary">
      <div className="mp-side-brand">
        <span className="mp-side-mark" aria-hidden="true" />
        <span className="mp-side-title">{t('appName')}</span>
      </div>
      <nav className="mp-side-nav">
        {ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="mp-side-link">
            {({ isActive }) => (
              <span className={`mp-side-row t-press ${isActive ? 'is-active' : ''}`}>
                <Icon size={18} strokeWidth={isActive ? 2.4 : 1.9} aria-hidden="true" />
                <span>{t(`nav.${label}`)}</span>
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
