import { Mail, Github, Star, ChevronRight } from 'lucide-react'
import { LegalLayout } from './legal/LegalLayout'
import {
  APP_NAME,
  CONTACT_EMAIL,
  GITHUB_URL,
  APP_STORE_URL,
  PLAY_STORE_URL,
  PUBLISHER,
} from './legal/legalContent'

export default function Contact() {
  return (
    <LegalLayout
      page="contact"
      render={(L) => {
        const c = L.contact
        return (
          <>
            <div className="legal-hero">
              <div className="legal-hero-inner">
                <div className="legal-eyebrow">{APP_NAME}</div>
                <h1>{c.title}</h1>
              </div>
            </div>

            <main className="legal-main">
              <p className="legal-intro">{c.intro}</p>

              <div className="legal-cards">
                <a className="legal-card" href={`mailto:${CONTACT_EMAIL}`}>
                  <span className="legal-card-icon">
                    <Mail size={22} aria-hidden="true" />
                  </span>
                  <span className="legal-card-body">
                    <span className="legal-card-label">{c.emailLabel}</span>
                    <div className="legal-card-value">{CONTACT_EMAIL}</div>
                    <div className="legal-card-note">{c.emailNote}</div>
                  </span>
                  <ChevronRight className="legal-card-chev" size={20} aria-hidden="true" />
                </a>

                <a
                  className="legal-card"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="legal-card-icon">
                    <Github size={22} aria-hidden="true" />
                  </span>
                  <span className="legal-card-body">
                    <span className="legal-card-label">{c.githubLabel}</span>
                    <div className="legal-card-value">OneAboveAll1964</div>
                    <div className="legal-card-note">{c.githubNote}</div>
                  </span>
                  <ChevronRight className="legal-card-chev" size={20} aria-hidden="true" />
                </a>
              </div>

              <div style={{ height: 22 }} />
              <span className="legal-card-label" style={{ display: 'block', marginBottom: 10 }}>
                {c.storeLabel}
              </span>
              <div className="legal-store-row">
                <a
                  className="legal-card"
                  href={APP_STORE_URL || '#'}
                  target={APP_STORE_URL ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-disabled={APP_STORE_URL ? undefined : 'true'}
                >
                  <span className="legal-card-icon">
                    <Star size={22} aria-hidden="true" />
                  </span>
                  <span className="legal-card-body">
                    <div className="legal-card-value">{c.appStore}</div>
                    <div className="legal-card-note">{c.storeNote}</div>
                  </span>
                </a>
                <a
                  className="legal-card"
                  href={PLAY_STORE_URL || '#'}
                  target={PLAY_STORE_URL ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-disabled={PLAY_STORE_URL ? undefined : 'true'}
                >
                  <span className="legal-card-icon">
                    <Star size={22} aria-hidden="true" />
                  </span>
                  <span className="legal-card-body">
                    <div className="legal-card-value">{c.playStore}</div>
                    <div className="legal-card-note">{c.storeNote}</div>
                  </span>
                </a>
              </div>

              <div className="legal-publisher">
                {c.publisherLabel}: <b>{PUBLISHER}</b>
              </div>
            </main>
          </>
        )
      }}
    />
  )
}
