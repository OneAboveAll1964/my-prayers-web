import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import { LanguagePicker } from '../components/Settings/LanguagePicker'

export default function SettingsLanguage() {
  const { t } = useTranslation()
  return (
    <section className="page">
      <PageHeader title={t('settings.language')} back />
      <div className="page-body">
        <LanguagePicker />
      </div>
    </section>
  )
}
