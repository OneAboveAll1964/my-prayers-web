import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, BookHeart, Compass, BookMarked, Settings as SettingsIcon } from 'lucide-react'
import './BottomTabBar.css'

const TABS = [
  { to: '/', label: 'home', Icon: Home, end: true },
  { to: '/azkars', label: 'azkars', Icon: BookHeart },
  { to: '/qibla', label: 'qibla', Icon: Compass },
  { to: '/quran', label: 'quran', Icon: BookMarked },
  { to: '/settings', label: 'settings', Icon: SettingsIcon },
]

export function BottomTabBar() {
  const { t } = useTranslation()
  return (
    <nav className="mp-tabbar" aria-label="Primary">
      {TABS.map(({ to, label, Icon, end }) => (
        <NavLink key={to} to={to} end={end} className="mp-tab">
          {({ isActive }) => (
            <span className={`mp-tab-inner ${isActive ? 'is-active' : ''}`}>
              <Icon size={22} strokeWidth={isActive ? 2.4 : 1.9} aria-hidden="true" />
              <span className="mp-tab-label">{t(`nav.${label}`)}</span>
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
