import { supabase } from '../supabase'
import { resolveDbLanguage } from '../i18nLang'
import { readCache, writeCache } from '../cache'

const TTL = 1000 * 60 * 60 * 24 * 30 // 30 days

async function fetchCategories(lang) {
  const { data, error } = await supabase
    .from('azkar_category_translation')
    .select('category_id, category_name')
    .eq('language', lang)
    .order('category_id')
  if (error) return null
  return (data || []).map((r) => ({ id: r.category_id, name: r.category_name }))
}

async function fetchChapters(lang, categoryId) {
  let query = supabase
    .from('azkar_chapter_translation')
    .select('chapter_id, chapter_name, chapter:azkar_chapter!inner(id, category_id)')
    .eq('language', lang)
    .order('chapter_id')
  if (categoryId && categoryId !== 1) query = query.eq('chapter.category_id', categoryId)
  const { data, error } = await query
  if (error) return null
  const ids = (data || []).map((r) => r.chapter?.category_id).filter(Boolean)
  let names = {}
  if (ids.length) {
    const { data: cats } = await supabase
      .from('azkar_category_translation')
      .select('category_id, category_name')
      .eq('language', lang)
      .in('category_id', Array.from(new Set(ids)))
    for (const c of cats || []) names[c.category_id] = c.category_name
  }
  return (data || []).map((r) => ({
    id: r.chapter_id,
    categoryId: r.chapter?.category_id ?? 0,
    categoryName: names[r.chapter?.category_id] ?? '',
    name: r.chapter_name,
  }))
}

async function fetchItems(lang, chapterId) {
  const { data, error } = await supabase
    .from('azkar_item')
    .select(
      'id, chapter_id, item, transliteration, count, translations:azkar_item_translation!inner(item_translation, top_note, bottom_note, reference, language)',
    )
    .eq('chapter_id', chapterId)
    .eq('translations.language', lang)
    .order('id')
  if (error) return null
  return (data || []).map((r) => {
    const tr = r.translations && r.translations[0]
    return {
      id: r.id,
      chapterId: r.chapter_id,
      item: r.item,
      transliteration: r.transliteration,
      count: r.count,
      topNote: tr?.top_note ?? null,
      bottomNote: tr?.bottom_note ?? null,
      translation: tr?.item_translation ?? null,
      reference: tr?.reference ?? '',
    }
  })
}

export function getAzkarCategoriesCached(language) {
  return readCache(`azkar.cat.${resolveDbLanguage(language)}`)
}
export async function getAzkarCategories(language) {
  const lang = resolveDbLanguage(language)
  const fresh = await fetchCategories(lang)
  if (fresh) writeCache(`azkar.cat.${lang}`, fresh, TTL)
  return fresh ?? readCache(`azkar.cat.${lang}`) ?? []
}

export function getAzkarChaptersCached({ language, categoryId } = {}) {
  return readCache(`azkar.ch.${resolveDbLanguage(language)}.${categoryId ?? 1}`)
}
export async function getAzkarChapters({ language, categoryId } = {}) {
  const lang = resolveDbLanguage(language)
  const id = categoryId ?? 1
  const fresh = await fetchChapters(lang, id)
  if (fresh) writeCache(`azkar.ch.${lang}.${id}`, fresh, TTL)
  return fresh ?? readCache(`azkar.ch.${lang}.${id}`) ?? []
}

export async function searchAzkarChapters({ language, query }) {
  const lang = resolveDbLanguage(language)
  const q = (query || '').trim()
  if (!q) return []
  const { data, error } = await supabase
    .from('azkar_chapter_translation')
    .select('chapter_id, chapter_name, chapter:azkar_chapter!inner(category_id)')
    .eq('language', lang)
    .ilike('chapter_name', `%${q}%`)
    .order('chapter_id')
    .limit(50)
  if (error) return []
  return (data || []).map((r) => ({
    id: r.chapter_id,
    categoryId: r.chapter?.category_id ?? 0,
    categoryName: '',
    name: r.chapter_name,
  }))
}

export function getAzkarItemsCached({ language, chapterId }) {
  return readCache(`azkar.it.${resolveDbLanguage(language)}.${chapterId}`)
}
export async function getAzkarItems({ language, chapterId }) {
  const lang = resolveDbLanguage(language)
  const fresh = await fetchItems(lang, chapterId)
  if (fresh) writeCache(`azkar.it.${lang}.${chapterId}`, fresh, TTL)
  return fresh ?? readCache(`azkar.it.${lang}.${chapterId}`) ?? []
}
