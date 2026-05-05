const BASE = 'https://api.alquran.cloud/v1'

export const TRANSLATION_EDITIONS = {
  en: 'en.sahih',
  ar: 'ar.muyassar',
  ckb: 'ku.asan',
  ckb_Badini: 'ku.asan',
}

const cache = new Map()

async function getJSON(url) {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Quran API ${res.status}`)
  const data = await res.json()
  cache.set(url, data)
  return data
}

export async function getSurahList() {
  const data = await getJSON(`${BASE}/surah`)
  return (data?.data ?? []).map((s) => ({
    number: s.number,
    name: s.name,
    englishName: s.englishName,
    englishNameTranslation: s.englishNameTranslation,
    revelationType: s.revelationType,
    ayahCount: s.numberOfAyahs,
  }))
}

export async function getSurah(surahNumber, language) {
  const arEdition = 'quran-uthmani'
  const trEdition = TRANSLATION_EDITIONS[language] ?? TRANSLATION_EDITIONS.en
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
  return {
    number: ar?.number ?? surahNumber,
    name: ar?.name ?? '',
    englishName: ar?.englishName ?? '',
    englishNameTranslation: ar?.englishNameTranslation ?? '',
    revelationType: ar?.revelationType ?? '',
    ayahs,
  }
}
