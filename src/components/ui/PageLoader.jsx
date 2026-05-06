import { Spinner } from './Spinner'
import './PageLoader.css'

export function PageLoader({ size = 28 }) {
  return (
    <div className="mp-pageloader">
      <Spinner size={size} />
    </div>
  )
}
