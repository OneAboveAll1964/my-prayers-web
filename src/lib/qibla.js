const KAABA = { lat: 21.4225, lng: 39.8262 }

const toRad = (d) => (d * Math.PI) / 180
const toDeg = (r) => (r * 180) / Math.PI

export function qiblaBearing(lat, lng) {
  const phi1 = toRad(lat)
  const phi2 = toRad(KAABA.lat)
  const dLng = toRad(KAABA.lng - lng)
  const y = Math.sin(dLng) * Math.cos(phi2)
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLng)
  return (toDeg(Math.atan2(y, x)) + 360) % 360
}

export function distanceToKaabaKm(lat, lng) {
  const R = 6371
  const dLat = toRad(KAABA.lat - lat)
  const dLng = toRad(KAABA.lng - lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat)) * Math.cos(toRad(KAABA.lat)) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}
