import { useSyncExternalStore } from 'react'

const KEY = 'mp.favorites.v1'

const DEFAULTS = {
  chapters: [],
  surahs: [],
  ayahs: [],
  lastSurah: null,
  dhikr: {},
  recentLocations: [],
  tasbih: { count: 0, total: 0, target: 33 },
}

let state = load()
const listeners = new Set()

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULTS }
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

function update(patch) {
  state = { ...state, ...patch }
  save()
  for (const fn of listeners) fn()
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useFavorites() {
  return useSyncExternalStore(subscribe, () => state, () => state)
}

export function getFavorites() {
  return state
}

export function toggleFavoriteChapter(id) {
  const set = new Set(state.chapters)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  update({ chapters: Array.from(set) })
}

export function isFavoriteChapter(id) {
  return state.chapters.includes(id)
}

export function toggleBookmarkSurah(number) {
  const set = new Set(state.surahs)
  if (set.has(number)) set.delete(number)
  else set.add(number)
  update({ surahs: Array.from(set) })
}

export function isBookmarkedSurah(number) {
  return state.surahs.includes(number)
}

export function setLastSurah(entry) {
  update({ lastSurah: entry })
}

export function ayahKey(surahNumber, ayahNumberInSurah) {
  return `${surahNumber}:${ayahNumberInSurah}`
}

export function toggleBookmarkAyah(surahNumber, ayahNumberInSurah, meta = {}) {
  const k = ayahKey(surahNumber, ayahNumberInSurah)
  const existing = state.ayahs.find((a) => a.k === k)
  let next
  if (existing) {
    next = state.ayahs.filter((a) => a.k !== k)
  } else {
    next = [
      { k, surah: surahNumber, ayah: ayahNumberInSurah, ...meta, addedAt: Date.now() },
      ...state.ayahs,
    ].slice(0, 200)
  }
  update({ ayahs: next })
}

export function isBookmarkedAyah(surahNumber, ayahNumberInSurah) {
  return state.ayahs.some((a) => a.k === ayahKey(surahNumber, ayahNumberInSurah))
}

export function setDhikrCount(itemId, count) {
  update({ dhikr: { ...state.dhikr, [itemId]: count } })
}

export function getDhikrCount(itemId) {
  return state.dhikr[itemId] ?? 0
}

export function pushRecentLocation(loc) {
  if (!loc) return
  const slim = {
    id: loc.id,
    name: loc.name,
    latitude: loc.latitude,
    longitude: loc.longitude,
    has_fixed_prayer_time: loc.has_fixed_prayer_time,
    prayer_dependent_id: loc.prayer_dependent_id,
    countryCode: loc.countryCode,
    countryName: loc.countryName,
  }
  const filtered = state.recentLocations.filter((x) => x.id !== slim.id)
  update({ recentLocations: [slim, ...filtered].slice(0, 6) })
}

export function setTasbih(patch) {
  update({ tasbih: { ...state.tasbih, ...patch } })
}

export function resetTasbih() {
  update({ tasbih: { ...state.tasbih, count: 0 } })
}

export function resetTasbihAll() {
  update({ tasbih: { ...state.tasbih, count: 0, total: 0 } })
}
