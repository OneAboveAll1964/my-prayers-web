import { supabase } from '../supabase'
import { resolveDbLanguage } from '../i18nLang'
import { readCache, writeCache } from '../cache'

const TTL = 1000 * 60 * 60 * 24 * 30 // 30 days

async function fetchNames(lang) {
  const { data, error } = await supabase
    .from('name_translation')
    .select('id:name_id, translation, transliteration, name:name_of_allah(id, name)')
    .eq('language', lang)
    .order('name_id')
  if (error) return null
  return (data || []).map((r) => ({
    id: r.id,
    name: r.name?.name ?? '',
    translation: r.translation,
    transliteration: r.transliteration ?? '',
  }))
}

export function getNamesOfAllahCached(language) {
  return readCache(`names.${resolveDbLanguage(language)}`)
}

export async function getNamesOfAllah(language) {
  const lang = resolveDbLanguage(language)
  const fresh = await fetchNames(lang)
  if (fresh) writeCache(`names.${lang}`, fresh, TTL)
  return fresh ?? readCache(`names.${lang}`) ?? []
}
