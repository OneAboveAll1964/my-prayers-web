import './Toggle.css'

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`mp-toggle ${checked ? 'is-on' : ''}`}
    >
      <span className="mp-toggle-thumb" />
    </button>
  )
}
