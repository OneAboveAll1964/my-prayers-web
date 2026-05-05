import './AyahRow.css'

export function AyahRow({ ayah }) {
  return (
    <article className="mp-ayah fade-in">
      <header className="mp-ayah-head">
        <span className="mp-ayah-num tabular">{ayah.numberInSurah}</span>
        <span className="mp-ayah-meta subtle small">Juz {ayah.juz}</span>
      </header>
      <p className="mp-ayah-arabic" lang="ar">
        {ayah.arabic}
      </p>
      {ayah.translation ? <p className="mp-ayah-translation">{ayah.translation}</p> : null}
    </article>
  )
}
