import { MapPin } from 'lucide-react'
import './LocationRow.css'

export function LocationRow({ location, onPick }) {
  return (
    <button type="button" className="mp-loc-row t-press" onClick={() => onPick(location)}>
      <span className="mp-loc-pin">
        <MapPin size={16} aria-hidden="true" />
      </span>
      <span className="mp-loc-text">
        <span className="mp-loc-name">{location.name}</span>
        <span className="mp-loc-country">{location.countryName || location.countryCode}</span>
      </span>
    </button>
  )
}
