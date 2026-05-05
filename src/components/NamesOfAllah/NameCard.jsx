import './NameCard.css'

export function NameCard({ entry, index }) {
  return (
    <article className="mp-name fade-in">
      <span className="mp-name-num tabular">{index}</span>
      <h2 className="mp-name-arabic" lang="ar">{entry.name}</h2>
      {entry.transliteration ? <p className="mp-name-translit">{entry.transliteration}</p> : null}
      <p className="mp-name-translation">{entry.translation}</p>
    </article>
  )
}
