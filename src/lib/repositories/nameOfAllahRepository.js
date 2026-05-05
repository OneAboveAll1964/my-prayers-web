import { supabase } from '../supabase'
import { resolveDbLanguage } from '../i18nLang'

export async function getNamesOfAllah(language) {
  const lang = resolveDbLanguage(language)
  const { data, error } = await supabase
    .from('name_translation')
    .select('id:name_id, translation, transliteration, name:name_of_allah(id, name)')
    .eq('language', lang)
    .order('name_id')
  if (error) return []
  return (data || []).map((r) => ({
    id: r.id,
    name: r.name?.name ?? '',
    translation: r.translation,
    transliteration: r.transliteration ?? '',
  }))
}
