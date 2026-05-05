import { useTranslation } from 'react-i18next'
import { SegmentedControl } from '../ui/SegmentedControl'
import { setSettings, useSettings } from '../../store/settings'

export function ThemePicker() {
  const { t } = useTranslation()
  const { theme } = useSettings()
  return (
    <SegmentedControl
      value={theme}
      onChange={(v) => setSettings({ theme: v })}
      options={[
        { value: 'auto', label: t('settings.themeAuto') },
        { value: 'light', label: t('settings.themeLight') },
        { value: 'dark', label: t('settings.themeDark') },
      ]}
    />
  )
}
