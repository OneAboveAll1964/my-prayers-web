import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './SurahRow.css'

export function SurahRow({ surah }) {
  const { t } = useTranslation()
  return (
    <Link to={`/quran/${surah.number}`} className="mp-surah-row t-press">
      <span className="mp-surah-num tabular">{surah.number}</span>
      <span className="mp-surah-info">
        <span className="mp-surah-name">{surah.englishName}</span>
        <span className="mp-surah-meta subtle small">
          {surah.ayahCount} {t('quran.ayahs')} · {surah.revelationType === 'Meccan' ? t('quran.meccan') : t('quran.medinan')}
        </span>
      </span>
      <span className="mp-surah-arabic" lang="ar">{surah.name}</span>
    </Link>
  )
}
