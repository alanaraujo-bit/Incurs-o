import { cx } from '../ui/primitives'

/**
 * Marca do produto: duas órbitas em colisão.
 * O mesmo desenho serve como logo, favicon e ícone da PWA.
 */
export function BrandMark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="19" cy="24" r="13" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="29" cy="24" r="13" stroke="currentColor" strokeWidth="2.4" opacity="0.42" />
    </svg>
  )
}

export function BrandLockup({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <BrandMark size={compact ? 20 : 24} className="text-accent" />
      {!compact && (
        <span className="display text-[16px] tracking-[0.02em] uppercase">Incursão</span>
      )}
    </span>
  )
}
