import './Field.css'

export function Field({ label, hint, children }) {
  return (
    <label className="mp-field">
      <span className="mp-field-label">{label}</span>
      {children}
      {hint ? <span className="mp-field-hint">{hint}</span> : null}
    </label>
  )
}

export function TextInput({ className = '', ...props }) {
  return <input className={`mp-input ${className}`} {...props} />
}

export function Select({ className = '', children, ...props }) {
  return (
    <div className={`mp-select-wrap ${className}`}>
      <select className="mp-select" {...props}>
        {children}
      </select>
    </div>
  )
}
