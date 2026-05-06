import './Compass.css'

const TICKS = []
for (let i = 0; i < 72; i++) TICKS.push(i * 5)

const CARDINALS = [
  { angle: 0, label: 'N', primary: true },
  { angle: 90, label: 'E' },
  { angle: 180, label: 'S' },
  { angle: 270, label: 'W' },
]

function polar(angleDeg, radius, cx = 100, cy = 100) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius]
}

export function Compass({ qiblaBearing, heading, hasCompass }) {
  const rotation = hasCompass ? qiblaBearing - heading : qiblaBearing
  const aligned =
    hasCompass && Math.abs(((rotation + 540) % 360) - 180) < 4
  const liveHeading = hasCompass ? Math.round((heading + 360) % 360) : null

  return (
    <div className={`mp-compass ${aligned ? 'is-aligned' : ''}`}>
      <span className="mp-compass-marker" aria-hidden="true" />

      <svg className="mp-compass-svg" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="96" className="mp-c-edge" />
        <circle cx="100" cy="100" r="78" className="mp-c-edge-inner" />

        <g className="mp-c-dial" style={{ transform: `rotate(${-heading}deg)` }}>
          {TICKS.map((angle) => {
            const isCard = angle % 90 === 0
            const isMaj = angle % 30 === 0
            const len = isCard ? 12 : isMaj ? 8 : 4
            const cls = isCard ? 'mp-c-tick mp-c-tick-card' : isMaj ? 'mp-c-tick mp-c-tick-maj' : 'mp-c-tick'
            return (
              <line
                key={angle}
                x1="100"
                y1="6"
                x2="100"
                y2={6 + len}
                className={cls}
                transform={`rotate(${angle} 100 100)`}
              />
            )
          })}

          {CARDINALS.map(({ angle, label, primary }) => {
            const [x, y] = polar(angle, 64)
            return (
              <text
                key={label}
                x={x}
                y={y}
                className={`mp-c-card ${primary ? 'mp-c-card-n' : ''}`}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${heading} ${x} ${y})`}
              >
                {label}
              </text>
            )
          })}

          <g transform={`rotate(${qiblaBearing} 100 100)`}>
            <rect x="93" y="9" width="14" height="14" rx="1.5" className="mp-c-kaaba" />
            <rect x="95" y="11" width="10" height="2" className="mp-c-kaaba-band" />
          </g>
        </g>

        <g
          className="mp-c-needle"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <polygon points="100,30 109,100 91,100" className="mp-c-needle-tip" />
          <polygon points="100,170 109,100 91,100" className="mp-c-needle-tail" />
        </g>

        <circle cx="100" cy="100" r="28" className="mp-c-hub" />
      </svg>

      <div className="mp-compass-readout">
        <span className="mp-compass-degree tabular">
          {liveHeading != null ? `${liveHeading}°` : `${Math.round(qiblaBearing)}°`}
        </span>
      </div>
    </div>
  )
}
