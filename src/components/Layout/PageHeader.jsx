import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { isRtl } from '../../lib/i18nLang'
import './PageHeader.css'

export function PageHeader({ title, subtitle, back = false, action = null, search = null }) {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const Back = isRtl(i18n.language) ? ChevronRight : ChevronLeft
  return (
    <header className={`mp-header ${search ? 'has-search' : ''}`}>
      <div className="mp-header-bar">
        <div className="mp-header-left">
          {back ? (
            <button
              type="button"
              className="mp-header-back tap t-press"
              onClick={() => navigate(-1)}
              aria-label="Back"
            >
              <Back size={22} aria-hidden="true" />
            </button>
          ) : null}
          <div className="mp-header-titles">
            <h1 className="mp-header-title">{title}</h1>
            {subtitle ? <p className="mp-header-sub">{subtitle}</p> : null}
          </div>
        </div>
        {action ? <div className="mp-header-action">{action}</div> : null}
      </div>
      {search ? <div className="mp-header-search">{search}</div> : null}
    </header>
  )
}
