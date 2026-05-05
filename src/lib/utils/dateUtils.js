export function toDbDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

export function timeStringToDate(timeStr, date) {
  const [h, m] = timeStr.split(':')
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(h, 10), parseInt(m, 10))
}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60_000)
}

export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function daysInMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}
