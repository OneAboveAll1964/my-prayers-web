import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Analytics } from '@vercel/analytics/react'
import { AppShell } from './components/Layout/AppShell'
import { Spinner } from './components/ui/Spinner'
import { useThemeSync, useSettings, useArabicFontSync } from './store/settings'
import { isRtl } from './lib/i18nLang'

const Home = lazy(() => import('./pages/Home'))
const Calendar = lazy(() => import('./pages/Calendar'))
const Qibla = lazy(() => import('./pages/Qibla'))
const Azkars = lazy(() => import('./pages/Azkars'))
const AzkarChapters = lazy(() => import('./pages/AzkarChapters'))
const AzkarItems = lazy(() => import('./pages/AzkarItems'))
const NamesOfAllah = lazy(() => import('./pages/NamesOfAllah'))
const Quran = lazy(() => import('./pages/Quran'))
const Surah = lazy(() => import('./pages/Surah'))
const Tasbih = lazy(() => import('./pages/Tasbih'))
const Settings = lazy(() => import('./pages/Settings'))
const SettingsLanguage = lazy(() => import('./pages/SettingsLanguage'))
const SettingsLocation = lazy(() => import('./pages/SettingsLocation'))
const SettingsMethod = lazy(() => import('./pages/SettingsMethod'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Contact = lazy(() => import('./pages/Contact'))

function Fallback() {
  return (
    <div style={{ minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spinner />
    </div>
  )
}

function HtmlLangSync() {
  const { i18n } = useTranslation()
  const { language } = useSettings()
  useEffect(() => {
    const lang = language || i18n.language
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl(lang) ? 'rtl' : 'ltr'
    if (language && language !== i18n.language) i18n.changeLanguage(language)
  }, [language, i18n])
  return null
}

export default function App() {
  useThemeSync()
  useArabicFontSync()
  return (
    <BrowserRouter>
      <HtmlLangSync />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="privacy" element={<Privacy />} />
          <Route path="contact" element={<Contact />} />
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="qibla" element={<Qibla />} />
            <Route path="azkars" element={<Azkars />} />
            <Route path="azkars/:categoryId" element={<AzkarChapters />} />
            <Route path="azkars/chapter/:chapterId" element={<AzkarItems />} />
            <Route path="names" element={<NamesOfAllah />} />
            <Route path="quran" element={<Quran />} />
            <Route path="quran/:number" element={<Surah />} />
            <Route path="tasbih" element={<Tasbih />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/language" element={<SettingsLanguage />} />
            <Route path="settings/location" element={<SettingsLocation />} />
            <Route path="settings/method" element={<SettingsMethod />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  )
}
