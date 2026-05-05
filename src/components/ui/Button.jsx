import './Button.css'

export function Button({ as: Tag = 'button', variant = 'solid', size = 'md', className = '', ...props }) {
  return (
    <Tag
      className={`mp-btn mp-btn-${variant} mp-btn-${size} t-press ${className}`}
      {...props}
    />
  )
}
