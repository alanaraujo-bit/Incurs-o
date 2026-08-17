import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * Arco de preparação — o número protagonista do produto.
 * Anel aberto (não fechado) para não parecer widget de dashboard:
 * é uma trajetória com começo e fim, e o fim é Doomsday.
 */
export function ProgressArc({
  value,
  size = 190,
  stroke = 8,
  children,
  color = 'var(--accent)',
  trackColor = 'var(--surface-3)',
  endColor = 'var(--doom)',
}: {
  /** 0..1 */
  value: number
  size?: number
  stroke?: number
  children?: React.ReactNode
  color?: string
  trackColor?: string
  endColor?: string
}) {
  const reduce = useReducedMotion()
  const r = (size - stroke) / 2 - 6
  const cx = size / 2
  const cy = size / 2
  // Arco de 260°, começando em 140° (embaixo à esquerda) e indo até 40°.
  const START = 140
  const SWEEP = 260
  const rad = (deg: number) => ((deg - 90) * Math.PI) / 180
  const pt = (deg: number) => `${cx + r * Math.cos(rad(deg))} ${cy + r * Math.sin(rad(deg))}`
  const path = `M ${pt(START)} A ${r} ${r} 0 1 1 ${pt(START + SWEEP)}`
  const len = (SWEEP / 360) * 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(1, value))

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const endAngle = START + SWEEP * clamped
  const knobX = cx + r * Math.cos(rad(endAngle))
  const knobY = cy + r * Math.sin(rad(endAngle))

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <path
          d={path}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* marca do destino, sempre visível no fim do arco */}
        <circle
          cx={cx + r * Math.cos(rad(START + SWEEP))}
          cy={cy + r * Math.sin(rad(START + SWEEP))}
          r={stroke * 0.62}
          fill={endColor}
          opacity={clamped >= 1 ? 1 : 0.45}
        />
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={len}
          initial={{ strokeDashoffset: len }}
          animate={{ strokeDashoffset: len * (1 - (mounted ? clamped : 0)) }}
          transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {clamped > 0.005 && (
          <motion.circle
            cx={knobX}
            cy={knobY}
            r={stroke * 0.5}
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={reduce ? { duration: 0 } : { delay: 0.9, duration: 0.4 }}
            style={{ transformOrigin: `${knobX}px ${knobY}px` }}
          />
        )}
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">{children}</div>
    </div>
  )
}

/** Contador que anima do valor anterior até o atual. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)
  const from = useRef(0)

  useEffect(() => {
    if (reduce) {
      setShown(value)
      return
    }
    const start = performance.now()
    const origin = from.current
    const delta = value - origin
    const duration = 1000
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 4)
      setShown(Math.round(origin + delta * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, reduce])

  return (
    <>
      {shown}
      {suffix}
    </>
  )
}
