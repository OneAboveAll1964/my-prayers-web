import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, BookHeart, Compass, BookMarked, MoreHorizontal } from 'lucide-react'
import { MoreSheet } from './MoreSheet'
import './BottomTabBar.css'

const TABS = [
  { to: '/', label: 'home', Icon: Home, end: true },
  { to: '/azkars', label: 'azkars', Icon: BookHeart },
  { to: '/qibla', label: 'qibla', Icon: Compass },
  { to: '/quran', label: 'quran', Icon: BookMarked },
]

export function BottomTabBar() {
  const { t } = useTranslation()
  const [moreOpen, setMoreOpen] = useState(false)
  return (
    <>
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
        <button
          type="button"
          className="mp-tab"
          aria-haspopup="dialog"
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen(true)}
        >
          <span className={`mp-tab-inner ${moreOpen ? 'is-active' : ''}`}>
            <MoreHorizontal size={22} strokeWidth={moreOpen ? 2.4 : 1.9} aria-hidden="true" />
            <span className="mp-tab-label">{t('nav.more')}</span>
          </span>
        </button>
      </nav>
      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  )
}
