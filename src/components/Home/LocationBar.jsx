import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './LocationBar.css'

export function LocationBar({ location }) {
  const { t } = useTranslation()
  return (
    <Link
      to="/settings/location"
      className="mp-locbar t-press"
      aria-label={location ? `${location.name}, ${location.countryName || location.countryCode}` : t('home.noLocation')}
    >
      <MapPin size={15} aria-hidden="true" />
      <span className="mp-locbar-text">
        {location ? location.name : t('home.searchCity')}
      </span>
    </Link>
  )
}
