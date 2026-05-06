import { useEffect, useSyncExternalStore } from 'react'
import { CalculationMethod } from '../lib/prayer-times/calculationMethod'
import { AsrMethod } from '../lib/prayer-times/asrMethod'
import { HigherLatitudeMethod } from '../lib/prayer-times/higherLatitudeMethod'

const KEY = 'mp.settings.v1'

const DEFAULTS = {
  theme: 'auto',
  language: null,
  arabicFont: 'amiri-quran',
  location: null,
  calculationMethod: CalculationMethod.makkah,
  asrMethod: AsrMethod.shafii,
  higherLatitudeMethod: HigherLatitudeMethod.angleBased,
  fajrAngle: 18,
  ishaAngle: 17,
  offsets: [0, 0, 0, 0, 0, 0],
  useFixedTimes: true,
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

function emit() {
  for (const fn of listeners) fn()
}

export function getSettings() {
  return state
}

export function setSettings(patch) {
  state = { ...state, ...patch }
  save()
  emit()
}

export function resetSettings() {
  state = { ...DEFAULTS }
  save()
  emit()
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useSettings() {
  return useSyncExternalStore(subscribe, getSettings, getSettings)
}

export const ARABIC_FONTS = [
  { id: 'amiri-quran', label: 'Amiri Quran', family: 'Amiri Quran' },
  { id: 'alyamama', label: 'Alyamama', family: 'Alyamama' },
  { id: 'scheherazade', label: 'Scheherazade', family: 'Scheherazade New' },
  { id: 'naskh', label: 'Naskh', family: 'Noto Naskh Arabic' },
]

export function fontFamilyFor(id) {
  return ARABIC_FONTS.find((f) => f.id === id)?.family ?? 'Amiri Quran'
}

export function useArabicFontSync() {
  const { arabicFont } = useSettings()
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-arabic-active',
      `'${fontFamilyFor(arabicFont)}'`,
    )
  }, [arabicFont])
}

export function useThemeSync() {
  const { theme } = useSettings()
  useEffect(() => {
    const apply = () => {
      const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const resolved = theme === 'auto' ? sys : theme
      document.documentElement.dataset.theme = resolved
      const bg = resolved === 'dark' ? '#0e1013' : '#fbfbfa'
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((m) => m.setAttribute('content', bg))
    }
    apply()
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])
}
