import { timeStringToDate } from '../utils/dateUtils'
import { getMethodParams } from './calculationMethod'
import { HigherLatitudeMethod } from './higherLatitudeMethod'

const INVALID_TIME = '-----'
const NUM_ITERATIONS = 1

export class CalculatedPrayerTime {
  constructor(attribute) {
    this.attribute = attribute
    this.methodParams = getMethodParams(attribute.customMethod)
    this.lat = 0
    this.lng = 0
    this.timeZone = 0
    this.jDate = 0
  }

  fixAngle(a) {
    a -= 360 * Math.floor(a / 360)
    return a < 0 ? a + 360 : a
  }
  fixHour(a) {
    a -= 24 * Math.floor(a / 24)
    return a < 0 ? a + 24 : a
  }
  rad(d) {
    return (d * Math.PI) / 180
  }
  deg(r) {
    return (r * 180) / Math.PI
  }
  dSin(d) {
    return Math.sin(this.rad(d))
  }
  dCos(d) {
    return Math.cos(this.rad(d))
  }
  dTan(d) {
    return Math.tan(this.rad(d))
  }
  dArcSin(x) {
    return this.deg(Math.asin(x))
  }
  dArcCos(x) {
    return this.deg(Math.acos(x))
  }
  dArcTan2(y, x) {
    return this.deg(Math.atan2(y, x))
  }
  dArcCot(x) {
    return this.deg(Math.atan2(1, x))
  }

  julianDate(year, month, day) {
    let y = year
    let m = month
    if (m <= 2) {
      y -= 1
      m += 12
    }
    const a = Math.floor(y / 100)
    const b = 2 - a + Math.floor(a / 4)
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5
  }

  sunPosition(jd) {
    const d1 = jd - 2451545
    const g = this.fixAngle(357.529 + 0.98560028 * d1)
    const q = this.fixAngle(280.459 + 0.98564736 * d1)
    const l = this.fixAngle(q + 1.915 * this.dSin(g) + 0.02 * this.dSin(2 * g))
    const e = 23.439 - 0.00000036 * d1
    const d2 = this.dArcSin(this.dSin(e) * this.dSin(l))
    let ra = this.dArcTan2(this.dCos(e) * this.dSin(l), this.dCos(l)) / 15
    ra = this.fixHour(ra)
    return [d2, q / 15 - ra]
  }

  equationOfTime(jd) {
    return this.sunPosition(jd)[1]
  }
  sunDeclination(jd) {
    return this.sunPosition(jd)[0]
  }

  computeMidDay(t) {
    const eqt = this.equationOfTime(this.jDate + t)
    return this.fixHour(12 - eqt)
  }

  computeTime(G, t) {
    const d = this.sunDeclination(this.jDate + t)
    const z = this.computeMidDay(t)
    const beg = -this.dSin(G) - this.dSin(d) * this.dSin(this.lat)
    const mid = this.dCos(d) * this.dCos(this.lat)
    const v = this.dArcCos(beg / mid) / 15
    return z + (G > 90 ? -v : v)
  }

  computeAsr(step, t) {
    const d = this.sunDeclination(this.jDate + t)
    const g = -this.dArcCot(step + this.dTan(Math.abs(this.lat - d)))
    return this.computeTime(g, t)
  }

  timeDiff(t1, t2) {
    return this.fixHour(t2 - t1)
  }

  getPrayerTimes(location, date, timezone) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.timeZone = timezone ?? -date.getTimezoneOffset() / 60
    this.lat = location.latitude
    this.lng = location.longitude
    this.jDate = this.julianDate(year, month, day)
    this.jDate -= location.longitude / (15 * 24)
    try {
      const c = this.computeDayTimes()
      return {
        fajr: timeStringToDate(c[0], date),
        sunrise: timeStringToDate(c[1], date),
        dhuhr: timeStringToDate(c[2], date),
        asr: timeStringToDate(c[3], date),
        maghrib: timeStringToDate(c[4], date),
        isha: timeStringToDate(c[5], date),
      }
    } catch {
      return null
    }
  }

  floatToTime24(time) {
    if (Number.isNaN(time)) return INVALID_TIME
    const fixed = this.fixHour(time + 0.5 / 60)
    const h = Math.floor(fixed)
    const m = Math.floor((fixed - h) * 60)
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  }

  computeTimes(times) {
    const t = times.map((x) => x / 24)
    const params = this.methodParams[this.attribute.calculationMethod]
    const fajr = this.computeTime(180 - params[0], t[0])
    const sunrise = this.computeTime(180 - 0.833, t[1])
    const dhuhr = this.computeMidDay(t[2])
    const asr = this.computeAsr(1 + this.attribute.asrMethod, t[3])
    const sunset = this.computeTime(0.833, t[4])
    const maghrib = this.computeTime(params[2], t[5])
    const isha = this.computeTime(params[4], t[6])
    return [fajr, sunrise, dhuhr, asr, sunset, maghrib, isha]
  }

  computeDayTimes() {
    let times = [5, 6, 12, 13, 18, 18, 18]
    for (let i = 0; i < NUM_ITERATIONS; i++) times = this.computeTimes(times)
    times = this.adjustTimes(times)
    return this.adjustTimesFormat(times)
  }

  adjustTimes(times) {
    const params = this.methodParams[this.attribute.calculationMethod]
    for (let i = 0; i < times.length; i++) times[i] += this.timeZone - this.lng / 15
    if (params[1] === 1) times[5] = times[4] + params[2] / 60
    if (params[3] === 1) times[6] = times[5] + params[4] / 60
    if (this.attribute.higherLatitudeMethod !== HigherLatitudeMethod.none) {
      times = this.adjustHighLatTimes(times)
    }
    return times
  }

  adjustTimesFormat(times) {
    const result = times.map((t) => this.floatToTime24(t))
    result.splice(4, 1)
    return result
  }

  adjustHighLatTimes(times) {
    const params = this.methodParams[this.attribute.calculationMethod]
    const nightTime = this.timeDiff(times[4], times[1])

    const fajrDiff = this.nightPortion(params[0]) * nightTime
    if (Number.isNaN(times[0]) || this.timeDiff(times[0], times[1]) > fajrDiff) {
      times[0] = times[1] - fajrDiff
    }

    const ishaAngle = params[3] === 0 ? params[4] : 18
    const ishaDiff = this.nightPortion(ishaAngle) * nightTime
    if (Number.isNaN(times[6]) || this.timeDiff(times[4], times[6]) > ishaDiff) {
      times[6] = times[4] + ishaDiff
    }

    const maghribAngle = params[1] === 0 ? params[2] : 4
    const maghribDiff = this.nightPortion(maghribAngle) * nightTime
    if (Number.isNaN(times[5]) || this.timeDiff(times[4], times[5]) > maghribDiff) {
      times[5] = times[4] + maghribDiff
    }

    return times
  }

  nightPortion(angle) {
    switch (this.attribute.higherLatitudeMethod) {
      case HigherLatitudeMethod.angleBased:
        return angle / 60
      case HigherLatitudeMethod.midNight:
        return 0.5
      default:
        return 0.14286
    }
  }
}
