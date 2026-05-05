import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LocateFixed, Search } from 'lucide-react'
import { TextInput } from '../ui/Field'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'
import { searchLocations, reverseGeocoder } from '../../lib/repositories/locationRepository'
import { setSettings } from '../../store/settings'

export function LocationPicker() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    const q = query.trim()
    let cancelled = false
    let timeoutId
    queueMicrotask(() => {
      if (cancelled) return
      if (q.length < 2) {
        setResults([])
        return
      }
      setLoading(true)
      timeoutId = setTimeout(() => {
        searchLocations(q, 25)
          .then((list) => !cancelled && setResults(list))
          .finally(() => !cancelled && setLoading(false))
      }, 220)
    })
    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [query])

  function pick(loc) {
    setSettings({ location: loc })
    navigate('/')
  }

  function useDevice() {
    if (!('geolocation' in navigator)) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const loc = await reverseGeocoder(pos.coords.latitude, pos.coords.longitude)
        if (loc) pick(loc)
        setLocating(false)
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60_000 },
    )
  }

  return (
    <div className="stack">
      <Button onClick={useDevice} variant="soft" disabled={locating}>
        {locating ? <Spinner /> : <LocateFixed size={16} aria-hidden="true" />}
        {t('home.useMyLocation')}
      </Button>
      <label className="mp-search">
        <Search size={16} aria-hidden="true" />
        <TextInput
          placeholder={t('home.searchCity')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ height: 40, border: 'none', background: 'transparent', padding: 0 }}
          autoFocus
        />
      </label>
      {loading ? (
        <div className="surface" style={{ padding: 18, display: 'flex', justifyContent: 'center' }}>
          <Spinner />
        </div>
      ) : (
        <div className="surface" style={{ overflow: 'hidden' }}>
          {results.map((loc) => (
            <button
              key={loc.id}
              type="button"
              className="mp-set-row t-press"
              style={{ width: '100%', textAlign: 'start' }}
              onClick={() => pick(loc)}
            >
              <span className="mp-set-label">{loc.name}</span>
              <span className="subtle small">{loc.countryName || loc.countryCode}</span>
            </button>
          ))}
          {!results.length && query.length >= 2 ? (
            <p className="muted" style={{ padding: 16 }}>{t('common.noResults')}</p>
          ) : null}
        </div>
      )}
    </div>
  )
}
