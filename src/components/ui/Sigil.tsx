import { useId, useMemo } from 'react'
import { hashUnit } from '../../lib/format'

/**
 * Arte gerada por título — substitui pôster.
 *
 * O produto não distribui material licenciado. Em vez de deixar um buraco
 * cinza onde estaria a imagem, cada obra recebe um "sigilo": duas órbitas em
 * colisão (o motivo da marca), posicionadas por um hash estável do slug.
 * Mesmo título ⇒ mesma arte, sempre, sem rede e sem bytes de imagem.
 */
export function Sigil({
  seed,
  color,
  className,
  variant = 'card',
}: {
  seed: string
  color: string
  className?: string
  variant?: 'card' | 'hero' | 'chip'
}) {
  const id = useId().replace(/:/g, '')
  const g = useMemo(() => {
    const a = hashUnit(seed)
    const b = hashUnit(seed + '·orbit')
    const c = hashUnit(seed + '·tilt')
    return {
      cx1: 34 + a * 16,
      cx2: 62 + b * 14,
      cy: 42 + c * 16,
      r1: 24 + a * 12,
      r2: 20 + b * 14,
      tilt: -28 + c * 56,
      rays: 3 + Math.floor(b * 4),
    }
  }, [seed])

  const strokeWidth = variant === 'hero' ? 0.7 : 1
  const opacity = variant === 'chip' ? 0.9 : 1

  return (
    <svg
      viewBox="0 0 120 90"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ opacity }}
    >
      <defs>
        <radialGradient id={`g${id}`} cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor={color} stopOpacity="0.34" />
          <stop offset="55%" stopColor={color} stopOpacity="0.08" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.75" />
          <stop offset="100%" stopColor={color} stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={`c${id}`}>
          <circle cx={g.cx1} cy={g.cy} r={g.r1} />
        </clipPath>
      </defs>

      <rect width="120" height="90" fill={`url(#g${id})`} />

      <g transform={`rotate(${g.tilt} 60 45)`} stroke={color} fill="none">
        {/* linhas de tempo ao fundo */}
        {Array.from({ length: g.rays }).map((_, i) => (
          <line
            key={i}
            x1={-10}
            x2={130}
            y1={18 + i * (54 / g.rays)}
            y2={18 + i * (54 / g.rays)}
            strokeWidth={0.4}
            opacity={0.28}
          />
        ))}
      </g>

      {/* as duas realidades */}
      <circle cx={g.cx1} cy={g.cy} r={g.r1} stroke={color} strokeWidth={strokeWidth} fill="none" opacity="0.85" />
      <circle cx={g.cx2} cy={g.cy} r={g.r2} stroke={color} strokeWidth={strokeWidth} fill="none" opacity="0.45" />
      {/* a interseção: a incursão */}
      <circle cx={g.cx2} cy={g.cy} r={g.r2} fill={`url(#l${id})`} clipPath={`url(#c${id})`} opacity="0.7" />
    </svg>
  )
}
