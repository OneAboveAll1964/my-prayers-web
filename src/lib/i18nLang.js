export const LANGS = ['en', 'ar', 'ckb', 'ckb_Badini']

export const RTL_LANGS = new Set(['ar', 'ckb', 'ckb_Badini'])

export function isRtl(lang) {
  return RTL_LANGS.has(lang)
}

export function resolveDbLanguage(lang) {
  if (!lang) return 'en'
  if (LANGS.includes(lang)) return lang
  const base = lang.split('-')[0].split('_')[0]
  return LANGS.find((l) => l.split('_')[0] === base) ?? 'en'
}
