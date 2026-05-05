import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { CalculationMethodPicker } from '../components/Settings/CalculationMethodPicker'

export default function SettingsMethod() {
  const { t } = useTranslation()
  return (
    <section className="page">
      <PageHeader title={t('settings.calculationMethod')} back />
      <div className="page-body">
        <CalculationMethodPicker />
      </div>
    </section>
  )
}
