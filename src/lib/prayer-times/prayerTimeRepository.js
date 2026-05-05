import { supabase } from '../supabase'
import { addMinutes, toDbDate, timeStringToDate } from '../utils/dateUtils'
import { CalculatedPrayerTime } from './calculatedPrayerTime'
import { copyPrayerTime } from './prayerTime'

function isDst(date = new Date()) {
  const jan = new Date(date.getFullYear(), 0, 15).getTimezoneOffset()
  const jul = new Date(date.getFullYear(), 6, 15).getTimezoneOffset()
  const standard = Math.max(jan, jul)
  return date.getTimezoneOffset() < standard
}

function applyOffset(prayer, offsets) {
  return copyPrayerTime(prayer, {
    fajr: addMinutes(prayer.fajr, offsets[0]),
    sunrise: addMinutes(prayer.sunrise, offsets[1]),
    dhuhr: addMinutes(prayer.dhuhr, offsets[2]),
    asr: addMinutes(prayer.asr, offsets[3]),
    maghrib: addMinutes(prayer.maghrib, offsets[4]),
    isha: addMinutes(prayer.isha, offsets[5]),
  })
}

function adjustDst(prayer) {
  if (!isDst()) return prayer
  return copyPrayerTime(prayer, {
    fajr: addMinutes(prayer.fajr, 60),
    sunrise: addMinutes(prayer.sunrise, 60),
    dhuhr: addMinutes(prayer.dhuhr, 60),
    asr: addMinutes(prayer.asr, 60),
    maghrib: addMinutes(prayer.maghrib, 60),
    isha: addMinutes(prayer.isha, 60),
  })
}

export async function getPrayerTimes({ location, date, attribute, useFixedPrayer = true }) {
  if (!location) return null
  let prayer = null

  if (location.has_fixed_prayer_time && useFixedPrayer) {
    const id = location.prayer_dependent_id ?? location.id
    const { data } = await supabase
      .from('prayer_time')
      .select('fajr, sunrise, dhuhr, asr, maghrib, isha')
      .eq('location_id', id)
      .eq('date', toDbDate(date))
      .maybeSingle()
    if (data) {
      prayer = adjustDst({
        fajr: timeStringToDate(data.fajr, date),
        sunrise: timeStringToDate(data.sunrise, date),
        dhuhr: timeStringToDate(data.dhuhr, date),
        asr: timeStringToDate(data.asr, date),
        maghrib: timeStringToDate(data.maghrib, date),
        isha: timeStringToDate(data.isha, date),
      })
    }
  }

  if (!prayer) {
    prayer = new CalculatedPrayerTime(attribute).getPrayerTimes(location, date)
  }
  if (!prayer) return null
  return applyOffset(prayer, attribute.offset)
}

export async function getMonthPrayerTimes({ location, year, month, attribute }) {
  const days = new Date(year, month + 1, 0).getDate()
  const out = []
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d)
    out.push({ date, prayer: await getPrayerTimes({ location, date, attribute }) })
  }
  return out
}
