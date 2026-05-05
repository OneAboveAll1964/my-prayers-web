export function hijriDateParts(date = new Date(), locale = 'en') {
  const fmt = new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return fmt.format(date)
}

export function hijriDayMonth(date = new Date(), locale = 'en') {
  const fmt = new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
    day: 'numeric',
    month: 'long',
  })
  return fmt.format(date)
}
