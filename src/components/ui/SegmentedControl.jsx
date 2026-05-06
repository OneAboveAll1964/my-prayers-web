import './SegmentedControl.css'

export function SegmentedControl({ options, value, onChange, layout = 'row' }) {
  return (
    <div className={`mp-seg mp-seg-${layout}`} role="tablist">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={`mp-seg-item t-press ${active ? 'is-active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
