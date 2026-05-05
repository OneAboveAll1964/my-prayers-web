const PREFIX = 'mp.cache.v1.'
const VERSION = 1

export function readCache(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.v !== VERSION) return null
    if (parsed.exp && parsed.exp < Date.now()) {
      localStorage.removeItem(PREFIX + key)
      return null
    }
    return parsed.d
  } catch {
    return null
  }
}

export function writeCache(key, data, ttlMs) {
  try {
    const payload = JSON.stringify({
      v: VERSION,
      d: data,
      exp: ttlMs ? Date.now() + ttlMs : null,
    })
    localStorage.setItem(PREFIX + key, payload)
  } catch {
    // quota or disabled storage — silently ignore
  }
}

export function clearCache(prefix = '') {
  const full = PREFIX + prefix
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i)
    if (k && k.startsWith(full)) localStorage.removeItem(k)
  }
}

/**
 * Cached fetcher with stale-while-revalidate semantics.
 * - Returns the cached value immediately via `onCache` if present.
 * - Always fires the network call and resolves with fresh data via `onFresh`.
 * - Returns the cached value (or null) so callers can show data instantly.
 */
export async function swr({ key, ttlMs, fetcher, onCache, onFresh }) {
  const cached = readCache(key)
  if (cached !== null && onCache) onCache(cached)
  try {
    const fresh = await fetcher()
    if (fresh != null) {
      writeCache(key, fresh, ttlMs)
      if (onFresh) onFresh(fresh)
    }
    return fresh
  } catch {
    return cached
  }
}
