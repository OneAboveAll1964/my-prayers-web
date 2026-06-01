import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isRtl } from '../../lib/i18nLang'
import { LEGAL, APP_NAME } from './legalContent'
import './legal.css'

const LANG_LABELS = {
  en: 'English',
  ar: 'العربية',
  ckb: 'کوردی',
  ckb_Badini: 'بادینی',
}
const LANG_ORDER = ['en', 'ar', 'ckb', 'ckb_Badini']

function pickInitialLang() {
  if (typeof navigator === 'undefined') return 'en'
  const stored =
    typeof localStorage !== 'undefined' ? localStorage.getItem('mp.lang') : null
  if (stored && LEGAL[stored]) return stored
  const nav = (navigator.language || 'en').toLowerCase()
  if (nav.startsWith('ar')) return 'ar'
  if (nav.startsWith('ckb') || nav.startsWith('ku')) return 'ckb'
  return 'en'
}

export function LegalLayout({ page, render }) {
  const [lang, setLang] = useState(pickInitialLang)
  const rtl = isRtl(lang)
  const L = LEGAL[lang] || LEGAL.en

  useEffect(() => {
    const prevLang = document.documentElement.lang
    const prevDir = document.documentElement.dir
    document.documentElement.lang = lang
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
    const titleKey = page === 'privacy' ? 'privacy' : 'contact'
    document.title = `${L[titleKey].title} · ${APP_NAME}`
    return () => {
      document.documentElement.lang = prevLang
      document.documentElement.dir = prevDir
    }
  }, [lang, rtl, page, L])

  return (
    <div className="legal" dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <div className="legal-topbar">
        <div className="legal-topbar-inner">
          <Link to="/" className="legal-brand">
            <img src="/icon-192.png" alt="" />
            {APP_NAME}
          </Link>
          <nav className="legal-langs" aria-label="Language">
            {LANG_ORDER.map((code) => (
              <button
                key={code}
                type="button"
                className={`legal-lang ${code === lang ? 'active' : ''}`}
                onClick={() => setLang(code)}
                lang={code}
              >
                {LANG_LABELS[code]}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {render(L, lang)}

      <footer className="legal-footer">
        <div className="legal-footer-inner">
          <span>
            © {new Date().getFullYear()} {APP_NAME}
          </span>
          <div className="legal-footer-links">
            <Link to="/privacy">{LEGAL[lang].privacy.title}</Link>
            <Link to="/contact">{LEGAL[lang].contact.title}</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
