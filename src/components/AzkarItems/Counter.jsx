import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getDhikrCount, setDhikrCount } from '../../store/favorites'
import './Counter.css'

export function Counter({ target, itemId }) {
  const { t } = useTranslation()
  const [count, setCount] = useState(() => (itemId ? getDhikrCount(itemId) : 0))
  const max = target > 0 ? target : Infinity
  const done = target > 0 && count >= target

  function bump() {
    setCount((c) => {
      const next = Math.min(max, c + 1)
      if (itemId) setDhikrCount(itemId, next)
      return next
    })
  }
  function reset() {
    setCount(0)
    if (itemId) setDhikrCount(itemId, 0)
  }

  return (
    <div className="mp-counter">
      <button
        type="button"
        className={`mp-counter-btn t-press ${done ? 'is-done' : ''}`}
        onClick={bump}
        aria-label={t('azkars.tap')}
      >
        <span className="tabular">{count}</span>
        {target > 0 ? (
          <>
            <span className="mp-counter-sep">/</span>
            <span className="tabular">{target}</span>
          </>
        ) : null}
      </button>
      <button
        type="button"
        className="mp-counter-reset tap t-press"
        onClick={reset}
        aria-label={t('azkars.reset')}
      >
        <RotateCcw size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
