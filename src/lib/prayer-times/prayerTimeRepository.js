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

function rowToPrayer(row, date) {
  return {
    fajr: timeStringToDate(row.fajr, date),
    sunrise: timeStringToDate(row.sunrise, date),
    dhuhr: timeStringToDate(row.dhuhr, date),
    asr: timeStringToDate(row.asr, date),
    maghrib: timeStringToDate(row.maghrib, date),
    isha: timeStringToDate(row.isha, date),
  }
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
    if (data) prayer = adjustDst(rowToPrayer(data, date))
  }

  if (!prayer) {
    prayer = new CalculatedPrayerTime(attribute).getPrayerTimes(location, date)
  }
  if (!prayer) return null
  return applyOffset(prayer, attribute.offset)
}

export async function getMonthPrayerTimes({ location, year, month, attribute, useFixedPrayer = true }) {
  if (!location) return []
  const dayCount = new Date(year, month + 1, 0).getDate()
  const dates = []
  for (let d = 1; d <= dayCount; d++) dates.push(new Date(year, month, d))

  const useFixed = location.has_fixed_prayer_time && useFixedPrayer
  if (!useFixed) {
    const calc = new CalculatedPrayerTime(attribute)
    return dates.map((date) => {
      const raw = calc.getPrayerTimes(location, date)
      return { date, prayer: raw ? applyOffset(raw, attribute.offset) : null }
    })
  }

  const id = location.prayer_dependent_id ?? location.id
  const dbDates = dates.map(toDbDate)
  const { data } = await supabase
    .from('prayer_time')
    .select('date, fajr, sunrise, dhuhr, asr, maghrib, isha')
    .eq('location_id', id)
    .in('date', dbDates)
  const byDate = new Map()
  for (const row of data || []) byDate.set(row.date, row)

  const calc = new CalculatedPrayerTime(attribute)
  return dates.map((date) => {
    const row = byDate.get(toDbDate(date))
    let prayer = row ? adjustDst(rowToPrayer(row, date)) : calc.getPrayerTimes(location, date)
    return { date, prayer: prayer ? applyOffset(prayer, attribute.offset) : null }
  })
}
