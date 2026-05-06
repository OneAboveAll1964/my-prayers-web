import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './Sheet.css'

export function Sheet({ open, onClose, title, children }) {
  const { t } = useTranslation()
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div className={`mp-sheet ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="mp-sheet-scrim"
        aria-label={t('common.close')}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <div className="mp-sheet-panel" role="dialog" aria-modal="true" aria-label={title}>
        <div className="mp-sheet-handle" aria-hidden="true" />
        {title ? (
          <div className="mp-sheet-head">
            <h2 className="mp-sheet-title">{title}</h2>
            <button
              type="button"
              className="tap t-press mp-sheet-close"
              aria-label={t('common.close')}
              onClick={onClose}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        ) : null}
        <div className="mp-sheet-content">{children}</div>
      </div>
    </div>
  )
}
