import { readCache, writeCache } from './cache'

const BASE = 'https://api.alquran.cloud/v1'
const TTL = 1000 * 60 * 60 * 24 * 30

export const TRANSLATION_EDITIONS = {
  en: 'en.sahih',
  ar: 'ar.muyassar',
  ckb: 'ku.asan',
  ckb_Badini: 'ku.asan',
}

const memCache = new Map()

async function getJSON(url) {
  if (memCache.has(url)) return memCache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Quran API ${res.status}`)
  const data = await res.json()
  memCache.set(url, data)
  return data
}

export function getSurahListCached() {
  return readCache('quran.list')
}

export async function getSurahList() {
  try {
    const data = await getJSON(`${BASE}/surah`)
    const list = (data?.data ?? []).map((s) => ({
      number: s.number,
      name: s.name,
      englishName: s.englishName,
      englishNameTranslation: s.englishNameTranslation,
      revelationType: s.revelationType,
      ayahCount: s.numberOfAyahs,
    }))
    writeCache('quran.list', list, TTL)
    return list
  } catch {
    return readCache('quran.list') ?? []
  }
}

export function getSurahCached(surahNumber, language) {
  return readCache(`quran.s.${language}.${surahNumber}`)
}

export async function getSurah(surahNumber, language) {
  const arEdition = 'quran-uthmani'
  const trEdition = TRANSLATION_EDITIONS[language] ?? TRANSLATION_EDITIONS.en
  try {
    const url = `${BASE}/surah/${surahNumber}/editions/${arEdition},${trEdition}`
    const data = await getJSON(url)
    const editions = data?.data ?? []
    const ar = editions.find((e) => e.edition?.identifier === arEdition)
    const tr = editions.find((e) => e.edition?.identifier === trEdition) ?? ar
    const ayahs = (ar?.ayahs ?? []).map((a, i) => ({
      number: a.number,
      numberInSurah: a.numberInSurah,
      arabic: a.text,
      translation: tr?.ayahs?.[i]?.text ?? '',
      juz: a.juz,
      page: a.page,
      sajda: !!a.sajda,
    }))
    const surah = {
      number: ar?.number ?? surahNumber,
      name: ar?.name ?? '',
      englishName: ar?.englishName ?? '',
      englishNameTranslation: ar?.englishNameTranslation ?? '',
      revelationType: ar?.revelationType ?? '',
      ayahs,
    }
    writeCache(`quran.s.${language}.${surahNumber}`, surah, TTL)
    return surah
  } catch {
    return readCache(`quran.s.${language}.${surahNumber}`) ?? null
  }
}
