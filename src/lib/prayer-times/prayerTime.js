export const PRAYER_KEYS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha']

export function copyPrayerTime(prayer, overrides = {}) {
  return {
    fajr: overrides.fajr ?? prayer.fajr,
    sunrise: overrides.sunrise ?? prayer.sunrise,
    dhuhr: overrides.dhuhr ?? prayer.dhuhr,
    asr: overrides.asr ?? prayer.asr,
    maghrib: overrides.maghrib ?? prayer.maghrib,
    isha: overrides.isha ?? prayer.isha,
  }
}

export function prayerTimeAtIndex(prayer, index) {
  const arr = PRAYER_KEYS.map((k) => prayer[k])
  return index < 0 ? arr[5] : arr[index]
}
