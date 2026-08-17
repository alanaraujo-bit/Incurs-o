import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/* ───────────────────────────── Button ───────────────────────────── */

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'doom'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink border-transparent hover:brightness-110 active:brightness-95 shadow-e1',
  secondary:
    'bg-surface-2 text-ink border-line hover:border-line-strong hover:bg-surface-3 active:bg-surface-3',
  ghost: 'bg-transparent text-ink-2 border-transparent hover:bg-surface-2 hover:text-ink',
  danger: 'bg-transparent text-[var(--danger)] border-[color-mix(in_oklab,var(--danger)_40%,transparent)] hover:bg-[color-mix(in_oklab,var(--danger)_10%,transparent)]',
  doom: 'bg-doom text-[var(--ink-inverse)] border-transparent hover:brightness-110',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3 text-[13px] gap-1.5 rounded-md',
  md: 'h-11 px-4 text-[14px] gap-2 rounded-md',
  lg: 'h-13 px-6 text-[15px] gap-2.5 rounded-lg',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  block?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', block, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cx(
        'inline-flex items-center justify-center border font-medium select-none',
        'transition-[background-color,border-color,color,filter,transform] duration-150',
        'active:scale-[0.985] disabled:opacity-45 disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        block && 'w-full',
        className,
      )}
      {...rest}
    />
  )
})

/* ───────────────────────────── Chip ───────────────────────────── */

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'doom' | 'muted'
  /** Cor livre (usada para fases). */
  color?: string
}

export function Chip({ tone = 'neutral', color, className, style, ...rest }: ChipProps) {
  const tones = {
    neutral: 'bg-surface-2 text-ink-2 border-line',
    muted: 'bg-transparent text-ink-3 border-line',
    accent: 'bg-accent-soft text-accent border-[color-mix(in_oklab,var(--accent)_28%,transparent)]',
    doom: 'bg-doom-soft text-doom border-[color-mix(in_oklab,var(--doom)_28%,transparent)]',
  }
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-sm border px-2 py-[3px]',
        'font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] whitespace-nowrap',
        !color && tones[tone],
        color && 'border-current/25',
        className,
      )}
      style={
        color
          ? {
              color,
              background: `color-mix(in oklab, ${color} 12%, transparent)`,
              borderColor: `color-mix(in oklab, ${color} 30%, transparent)`,
              ...style,
            }
          : style
      }
      {...rest}
    />
  )
}

/* ───────────────────────────── Section ───────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cx('mb-4 flex items-end justify-between gap-4', className)}>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h2 className="display text-[19px] sm:text-[22px]">{title}</h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/* ───────────────────────────── Surface ───────────────────────────── */

export function Panel({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cx('card rounded-lg', className)} {...rest}>
      {children}
    </div>
  )
}

/* ─────────────────────── Meter (barra de progresso) ─────────────────────── */

export function Meter({
  value,
  color,
  height = 4,
  label,
  className,
}: {
  /** 0..1 */
  value: number
  color?: string
  height?: number
  label?: string
  className?: string
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div
      className={cx('w-full overflow-hidden rounded-full bg-surface-3', className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-[var(--ease-out-quint)]"
        style={{ width: `${pct}%`, background: color ?? 'var(--accent)' }}
      />
    </div>
  )
}

/* ───────────────────────────── Link card ───────────────────────────── */

export function CardLink({
  to,
  className,
  children,
  ...rest
}: { to: string; className?: string; children: ReactNode } & Omit<
  HTMLAttributes<HTMLAnchorElement>,
  'children'
>) {
  return (
    <Link
      to={to}
      className={cx(
        'group block transition-[border-color,box-shadow,transform] duration-200',
        'hover:shadow-e2 focus-visible:shadow-e2',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}

/* ───────────────────────────── Empty state ───────────────────────────── */

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon?: ReactNode
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      {icon && <div className="text-ink-3">{icon}</div>}
      <h3 className="display text-[17px]">{title}</h3>
      <p className="max-w-[38ch] text-[13.5px] leading-relaxed text-ink-3">{body}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
