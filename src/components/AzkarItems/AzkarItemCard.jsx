import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Counter } from './Counter'
import './AzkarItemCard.css'

export function AzkarItemCard({ item, index }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)

  return (
    <article className="mp-azkar surface fade-in">
      <header className="mp-azkar-head">
        <span className="mp-azkar-num">{index}</span>
        {item.count ? <Counter target={item.count} /> : <span />}
      </header>

      {item.topNote ? <p className="mp-azkar-note">{item.topNote}</p> : null}

      {item.item ? (
        <p className="mp-azkar-arabic" lang="ar">
          {item.item}
        </p>
      ) : null}

      {item.translation ? (
        <button type="button" className="mp-azkar-toggle t-press" onClick={() => setOpen((v) => !v)}>
          {open ? t('azkars.translation') : t('azkars.translation')}
        </button>
      ) : null}

      {open && item.translation ? <p className="mp-azkar-translation">{item.translation}</p> : null}
      {open && item.transliteration ? <p className="mp-azkar-translit subtle">{item.transliteration}</p> : null}
      {item.bottomNote ? <p className="mp-azkar-note">{item.bottomNote}</p> : null}

      {item.reference ? (
        <p className="mp-azkar-ref small subtle">
          {t('azkars.reference')}: {item.reference}
        </p>
      ) : null}
    </article>
  )
}
