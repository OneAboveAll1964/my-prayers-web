import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { LocationPicker } from '../components/Settings/LocationPicker'

export default function SettingsLocation() {
  const { t } = useTranslation()
  return (
    <section className="page">
      <PageHeader title={t('settings.location')} back />
      <div className="page-body">
        <LocationPicker />
      </div>
    </section>
  )
}
