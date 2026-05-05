import { Loader2 } from 'lucide-react'

export function Spinner({ size = 18 }) {
  return <Loader2 className="spin" size={size} aria-hidden="true" />
}
