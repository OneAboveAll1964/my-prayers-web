import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import ar from './ar.json'
import ckb from './ckb.json'
import ckb_Badini from './ckb_Badini.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      ckb: { translation: ckb },
      ckb_Badini: { translation: ckb_Badini },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'ckb', 'ckb_Badini'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'mp.lang',
      caches: ['localStorage'],
    },
  })

export default i18n
