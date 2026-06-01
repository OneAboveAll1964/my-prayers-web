import { LegalLayout } from './legal/LegalLayout'
import { LAST_UPDATED, APP_NAME } from './legal/legalContent'

function formatDate(iso, lang) {
  try {
    return new Intl.DateTimeFormat(lang === 'ckb_Badini' ? 'ckb' : lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default function Privacy() {
  return (
    <LegalLayout
      page="privacy"
      render={(L, lang) => (
        <>
          <div className="legal-hero">
            <div className="legal-hero-inner">
              <div className="legal-eyebrow">{APP_NAME}</div>
              <h1>{L.privacy.title}</h1>
              <div className="legal-updated">
                {L.lastUpdated}: {formatDate(LAST_UPDATED, lang)}
              </div>
            </div>
          </div>

          <main className="legal-main">
            <p className="legal-intro">{L.privacy.intro}</p>
            {L.privacy.sections.map((s, i) => (
              <section className="legal-section" key={i}>
                <h2>{s.h}</h2>
                {s.p ? <p>{s.p}</p> : null}
                {s.list ? (
                  <ul>
                    {s.list.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </main>
        </>
      )}
    />
  )
}
