import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/Layout/PageHeader'
import './Settings.css'
import { SettingRow } from '../components/Settings/SettingRow'
import { ThemePicker } from '../components/Settings/ThemePicker'
import { OffsetEditor } from '../components/Settings/OffsetEditor'
import { ArabicFontPicker } from '../components/Settings/ArabicFontPicker'
import { Toggle } from '../components/ui/Toggle'
import { Field, TextInput } from '../components/ui/Field'
import { useSettings, setSettings } from '../store/settings'
import { CalculationMethod } from '../lib/prayer-times/calculationMethod'
import { AsrMethod } from '../lib/prayer-times/asrMethod'
import { HigherLatitudeMethod } from '../lib/prayer-times/higherLatitudeMethod'
import { SegmentedControl } from '../components/ui/SegmentedControl'

const LANG_LABELS = {
  en: 'English',
  ar: 'العربية',
  ckb: 'کوردی (سۆرانی)',
  ckb_Badini: 'کوردی (بادینی)',
}

export default function Settings() {
  const { t, i18n } = useTranslation()
  const settings = useSettings()
  const lang = settings.language || i18n.language

  return (
    <section className="page">
      <PageHeader title={t('settings.title')} />
      <div className="page-body">
        <div className="stack-sm">
          <span className="muted small">{t('settings.theme')}</span>
          <ThemePicker />
        </div>

        <div className="stack-sm">
          <span className="muted small">{t('settings.arabicFont')}</span>
          <ArabicFontPicker />
        </div>

        <div className="surface" style={{ overflow: 'hidden' }}>
          <SettingRow to="/settings/language" label={t('settings.language')} value={LANG_LABELS[lang]} />
          <SettingRow to="/settings/location" label={t('settings.location')} value={settings.location ? settings.location.name : '—'} />
          <SettingRow to="/settings/method" label={t('settings.calculationMethod')} value={t(`calc.${settings.calculationMethod}`)} />
        </div>

        <div className="stack-sm">
          <span className="muted small">{t('settings.asrMethod')}</span>
          <SegmentedControl
            value={settings.asrMethod}
            onChange={(v) => setSettings({ asrMethod: v })}
            options={[
              { value: AsrMethod.shafii, label: t('settings.asrShafii') },
              { value: AsrMethod.hanafi, label: t('settings.asrHanafi') },
            ]}
          />
        </div>

        <div className="stack-sm">
          <span className="muted small">{t('settings.higherLatitude')}</span>
          <SegmentedControl
            layout="grid"
            value={settings.higherLatitudeMethod}
            onChange={(v) => setSettings({ higherLatitudeMethod: v })}
            options={[
              { value: HigherLatitudeMethod.angleBased, label: t('settings.highLatAngleBased') },
              { value: HigherLatitudeMethod.midNight, label: t('settings.highLatMidNight') },
              { value: HigherLatitudeMethod.oneSeven, label: t('settings.highLatOneSeven') },
              { value: HigherLatitudeMethod.none, label: t('settings.highLatNone') },
            ]}
          />
        </div>

        <div className="stack-sm">
          <span className="muted small">{t('settings.offsets')}</span>
          <OffsetEditor />
        </div>

        <div className="surface" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span className="mp-set-label">{t('settings.useFixedTimes')}</span>
          <Toggle checked={settings.useFixedTimes} onChange={(v) => setSettings({ useFixedTimes: v })} />
        </div>

        {settings.calculationMethod === CalculationMethod.custom ? (
          <div className="surface" style={{ padding: 16, display: 'grid', gap: 12 }}>
            <span className="muted small">{t('settings.customAngles')}</span>
            <Field label={t('settings.fajrAngle')}>
              <TextInput
                type="number"
                step="0.1"
                value={settings.fajrAngle}
                onChange={(e) => setSettings({ fajrAngle: Number(e.target.value) })}
              />
            </Field>
            <Field label={t('settings.ishaAngle')}>
              <TextInput
                type="number"
                step="0.1"
                value={settings.ishaAngle}
                onChange={(e) => setSettings({ ishaAngle: Number(e.target.value) })}
              />
            </Field>
          </div>
        ) : null}

        <div className="mp-credit">
          <span className="subtle small">{t('settings.version')} 0.1.0</span>
          <a
            className="mp-credit-link t-press"
            href="https://github.com/OneAboveAll1964"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('settings.madeBy')} OneAboveAll1964
          </a>
        </div>
      </div>
    </section>
  )
}
