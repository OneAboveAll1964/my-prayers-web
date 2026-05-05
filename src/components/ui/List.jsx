import './List.css'

export function List({ children }) {
  return <ul className="mp-list">{children}</ul>
}

export function ListItem({ children, onClick, as: Tag = 'li' }) {
  return (
    <Tag className="mp-list-item">
      <button type="button" className="mp-list-button t-press" onClick={onClick}>
        {children}
      </button>
    </Tag>
  )
}

export function ListRow({ leading, title, subtitle, trailing }) {
  return (
    <span className="mp-list-row">
      {leading ? <span className="mp-list-leading">{leading}</span> : null}
      <span className="mp-list-text">
        <span className="mp-list-title">{title}</span>
        {subtitle ? <span className="mp-list-subtitle">{subtitle}</span> : null}
      </span>
      {trailing ? <span className="mp-list-trailing">{trailing}</span> : null}
    </span>
  )
}
