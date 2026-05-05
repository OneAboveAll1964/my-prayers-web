import { useTranslation } from 'react-i18next'
import './Bead.css'

export function Bead({ count, target, onTap }) {
  const { t } = useTranslation()
  return (
    <button type="button" className="mp-bead t-press" onClick={onTap} aria-label={t('tasbih.tap')}>
      <span className="mp-bead-count tabular">{count}</span>
      {target > 0 ? <span className="mp-bead-target tabular">/ {target}</span> : null}
    </button>
  )
}
