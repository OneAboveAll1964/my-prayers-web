import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { isRtl } from '../../lib/i18nLang'
import './SettingRow.css'

export function SettingRow({ to, label, value, trailing, as: Tag = Link }) {
  const { i18n } = useTranslation()
  const Chev = isRtl(i18n.language) ? ChevronLeft : ChevronRight
  const Element = to ? Tag : 'div'
  return (
    <Element to={to} className="mp-set-row t-press">
      <span className="mp-set-label">{label}</span>
      <span className="mp-set-trail">
        {value ? <span className="mp-set-value subtle">{value}</span> : null}
        {trailing ?? (to ? <Chev size={16} className="muted" /> : null)}
      </span>
    </Element>
  )
}
