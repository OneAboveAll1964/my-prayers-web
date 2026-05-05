import { Compass as CompassIcon } from 'lucide-react'
import './Compass.css'

export function Compass({ qiblaBearing, heading, hasCompass }) {
  const rotation = hasCompass ? qiblaBearing - heading : qiblaBearing
  const aligned = hasCompass && Math.abs(((rotation + 540) % 360) - 180) < 3
  return (
    <div className={`mp-compass ${aligned ? 'is-aligned' : ''}`}>
      <div className="mp-compass-ring" style={{ transform: `rotate(${-heading}deg)` }}>
        <span className="mp-compass-mark" data-dir="N">N</span>
        <span className="mp-compass-mark" data-dir="E">E</span>
        <span className="mp-compass-mark" data-dir="S">S</span>
        <span className="mp-compass-mark" data-dir="W">W</span>
      </div>
      <div className="mp-compass-needle" style={{ transform: `rotate(${rotation}deg)` }}>
        <span className="mp-compass-pointer" />
      </div>
      <div className="mp-compass-center">
        <CompassIcon size={20} aria-hidden="true" />
      </div>
    </div>
  )
}
