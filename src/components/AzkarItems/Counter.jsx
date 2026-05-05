import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './Counter.css'

export function Counter({ target }) {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)
  const done = target > 0 && count >= target
  return (
    <div className="mp-counter">
      <button
        type="button"
        className={`mp-counter-btn t-press ${done ? 'is-done' : ''}`}
        onClick={() => setCount((c) => Math.min(target, c + 1))}
        aria-label={t('azkars.tap')}
      >
        <span className="tabular">{count}</span>
        <span className="mp-counter-sep">/</span>
        <span className="tabular">{target}</span>
      </button>
      <button type="button" className="mp-counter-reset tap t-press" onClick={() => setCount(0)} aria-label={t('azkars.reset')}>
        <RotateCcw size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
