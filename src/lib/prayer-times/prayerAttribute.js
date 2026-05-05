import { AsrMethod } from './asrMethod'
import { CalculationMethod } from './calculationMethod'
import { HigherLatitudeMethod } from './higherLatitudeMethod'

export function createCustomMethod(fajrAngle = 18.0, ishaAngle = 17.0) {
  return { fajrAngle, ishaAngle }
}

export function createPrayerAttribute(overrides = {}) {
  return {
    calculationMethod: overrides.calculationMethod ?? CalculationMethod.makkah,
    customMethod: overrides.customMethod ?? createCustomMethod(),
    asrMethod: overrides.asrMethod ?? AsrMethod.shafii,
    higherLatitudeMethod: overrides.higherLatitudeMethod ?? HigherLatitudeMethod.angleBased,
    offset: overrides.offset ?? [0, 0, 0, 0, 0, 0],
  }
}
