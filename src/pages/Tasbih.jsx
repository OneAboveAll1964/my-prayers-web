import { useTranslation } from 'react-i18next'
import { RotateCcw, Eraser } from 'lucide-react'
import { PageHeader } from '../components/Layout/PageHeader'
import { Bead } from '../components/Tasbih/Bead'
import { Button } from '../components/ui/Button'
import { SegmentedControl } from '../components/ui/SegmentedControl'
import { resetTasbih, resetTasbihAll, setTasbih, useFavorites } from '../store/favorites'
import './Tasbih.css'

export default function Tasbih() {
  const { t } = useTranslation()
  const fav = useFavorites()
  const tasbih = fav.tasbih

  function tap() {
    const next = tasbih.count + 1
    if (tasbih.target > 0 && next > tasbih.target) {
      setTasbih({ count: 1, total: tasbih.total + 1 })
    } else {
      setTasbih({ count: next, total: tasbih.total + 1 })
    }
  }

  return (
    <section className="page">
      <PageHeader title={t('tasbih.title')} />
      <div className="page-body mp-tasbih">
        <Bead count={tasbih.count} target={tasbih.target} onTap={tap} />
        <div className="mp-tasbih-meta">
          <span className="muted small">{t('tasbih.total')}</span>
          <span className="tabular" style={{ fontSize: 18, fontWeight: 700 }}>
            {tasbih.total}
          </span>
        </div>
        <div className="mp-tasbih-target stack-sm">
          <span className="muted small">{t('tasbih.target')}</span>
          <SegmentedControl
            value={tasbih.target}
            onChange={(v) => setTasbih({ target: Number(v) })}
            options={[
              { value: 0, label: '∞' },
              { value: 33, label: '33' },
              { value: 99, label: '99' },
              { value: 100, label: '100' },
            ]}
          />
        </div>
        <div className="mp-tasbih-actions">
          <Button variant="outline" onClick={resetTasbih}>
            <RotateCcw size={16} aria-hidden="true" />
            {t('tasbih.reset')}
          </Button>
          <Button variant="outline" onClick={resetTasbihAll}>
            <Eraser size={16} aria-hidden="true" />
            {t('tasbih.resetAll')}
          </Button>
        </div>
      </div>
    </section>
  )
}
