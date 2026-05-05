import { supabase } from '../supabase'

const SELECT = 'id, name, latitude, longitude, has_fixed_prayer_time, prayer_dependent_id, country:country_id(code, name)'

function toModel(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    latitude: row.latitude,
    longitude: row.longitude,
    has_fixed_prayer_time: row.has_fixed_prayer_time,
    prayer_dependent_id: row.prayer_dependent_id,
    countryCode: row.country?.code ?? '',
    countryName: row.country?.name ?? '',
  }
}

export async function searchLocations(query, limit = 25) {
  const q = (query || '').trim()
  if (!q) return []
  const { data, error } = await supabase
    .from('location')
    .select(SELECT)
    .ilike('name', `${q}%`)
    .order('name')
    .limit(limit)
  if (error) return []
  return (data || []).map(toModel)
}

export async function geocoder(countryCode, locationName) {
  const { data } = await supabase
    .from('location')
    .select(SELECT)
    .ilike('name', locationName)
    .eq('country.code', countryCode)
    .limit(1)
  return data && data[0] ? toModel(data[0]) : null
}

export async function reverseGeocoder(latitude, longitude) {
  const { data, error } = await supabase.rpc('reverse_geocode', { lat: latitude, lng: longitude })
  if (error || !data || !data.length) return null
  const row = data[0]
  const { data: country } = await supabase
    .from('country')
    .select('code, name')
    .eq('id', row.country_id)
    .maybeSingle()
  return {
    id: row.id,
    name: row.name,
    latitude: row.latitude,
    longitude: row.longitude,
    has_fixed_prayer_time: row.has_fixed_prayer_time,
    prayer_dependent_id: row.prayer_dependent_id,
    countryCode: country?.code ?? '',
    countryName: country?.name ?? '',
  }
}
