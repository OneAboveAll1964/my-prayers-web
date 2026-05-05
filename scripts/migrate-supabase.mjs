import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
const SQLITE_DB = process.env.SQLITE_DB ||
  resolve(ROOT, '..', 'react-native-prayer-times', 'assets', 'custom', 'muslim_db_v3.0.0.db')

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars before running.')
  process.exit(1)
}
if (!existsSync(SQLITE_DB)) {
  console.error(`SQLite DB not found at ${SQLITE_DB}`)
  process.exit(1)
}

const blank = (v) => (v == null || v === '' ? null : v)
const numOrNull = (v) => {
  if (v == null || v === '') return null
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : null
}

const CACHE_DIR = resolve(ROOT, 'scripts', '.cache')
mkdirSync(CACHE_DIR, { recursive: true })

function dumpTable(name, mapRow) {
  const cache = resolve(CACHE_DIR, `${name}.json`)
  if (existsSync(cache)) return JSON.parse(readFileSync(cache, 'utf8'))
  const out = execFileSync(
    'sqlite3',
    ['-readonly', '-json', SQLITE_DB, `select * from ${name};`],
    { maxBuffer: 1024 * 1024 * 1024 }
  ).toString('utf8')
  const rows = (out.trim() ? JSON.parse(out) : []).map(mapRow)
  writeFileSync(cache, JSON.stringify(rows))
  return rows
}

async function uploadChunk(table, rows) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`POST ${table} ${res.status}: ${txt.slice(0, 500)}`)
  }
}

async function uploadAll(table, rows, chunkSize) {
  let done = 0
  process.stdout.write(`  ${table}: 0 / ${rows.length}`)
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    await uploadChunk(table, chunk)
    done += chunk.length
    process.stdout.write(`\r  ${table}: ${done} / ${rows.length}        `)
  }
  process.stdout.write('\n')
}

const order = [
  ['country',                    1000, r => ({ id: r._id, code: r.code, name: r.name, continent: r.continent, language: r.language })],
  ['location',                   1000, r => ({ id: r._id, country_id: r.country_id, name: r.name, latitude: r.latitude, longitude: r.longitude, has_fixed_prayer_time: r.has_fixed_prayer_time === 1, prayer_dependent_id: r.prayer_dependent_id ?? null })],
  ['prayer_time',                2000, r => ({ id: r._id, location_id: r.location_id, date: r.date, fajr: r.fajr, sunrise: r.sunrise, dhuhr: r.dhuhr, asr: r.asr, maghrib: r.maghrib, isha: r.isha })],
  ['name_of_allah',              500,  r => ({ id: r._id, name: r.name }), 'name'],
  ['name_translation',           500,  r => ({ id: r._id, name_id: r.name_id, language: r.language, translation: r.translation, transliteration: r.transliteration ?? null })],
  ['azkar_category',             500,  r => ({ id: r._id })],
  ['azkar_category_translation', 500,  r => ({ id: r._id, category_id: r.category_id, language: r.language, category_name: r.category_name })],
  ['azkar_chapter',              500,  r => ({ id: r._id, category_id: r.category_id })],
  ['azkar_chapter_translation',  500,  r => ({ id: r._id, chapter_id: r.chapter_id, language: r.language, chapter_name: r.chapter_name })],
  ['azkar_item',                 500,  r => ({ id: r._id, chapter_id: r.chapter_id, item: blank(r.item), transliteration: blank(r.transliteration), count: numOrNull(r.count) })],
  ['azkar_item_translation',     500,  r => ({ id: r._id, item_id: r.item_id, language: r.language, top_note: blank(r.top_note), item_translation: blank(r.item_translation), bottom_note: r.bottom_note != null && r.bottom_note !== '' ? String(r.bottom_note) : null, reference: r.reference != null ? String(r.reference) : '' })],
]

const only = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null
for (const [table, chunkSize, map, sourceTable] of order) {
  if (only && !only.has(table)) continue
  console.log(`\n→ ${table}`)
  const rows = dumpTable(sourceTable || table, map)
  await uploadAll(table, rows, chunkSize)
}
console.log('\nDone.')
