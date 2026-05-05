export const CalculationMethod = Object.freeze({
  makkah: 'makkah',
  mwl: 'mwl',
  isna: 'isna',
  karachi: 'karachi',
  egypt: 'egypt',
  jafari: 'jafari',
  tehran: 'tehran',
  custom: 'custom',
})

export function customMethodAngles(custom) {
  return [custom.fajrAngle, 1.0, 0.0, 0.0, custom.ishaAngle]
}

export function getMethodParams(custom) {
  return {
    [CalculationMethod.makkah]: [18.5, 1.0, 0.0, 1.0, 90.0],
    [CalculationMethod.mwl]: [18.0, 1.0, 0.0, 0.0, 17.0],
    [CalculationMethod.isna]: [15.0, 1.0, 0.0, 0.0, 15.0],
    [CalculationMethod.karachi]: [18.0, 1.0, 0.0, 0.0, 18.0],
    [CalculationMethod.egypt]: [19.5, 1.0, 0.0, 0.0, 17.5],
    [CalculationMethod.jafari]: [16.0, 0.0, 4.0, 0.0, 14.0],
    [CalculationMethod.tehran]: [17.7, 0.0, 4.5, 0.0, 14.0],
    [CalculationMethod.custom]: customMethodAngles(custom),
  }
}
