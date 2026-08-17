import { CERTAINTY_META, IMPORTANCE_META, PHASE_BY_ID } from '../../data'
import type { Certainty, Importance } from '../../data'
import { phaseColor } from '../../lib/palette'
import { Chip, cx } from '../ui/primitives'

/** Peso editorial. Três marcas visuais distintas, legíveis num relance. */
export function ImportanceMark({
  importance,
  withLabel = true,
  className,
}: {
  importance: Importance
  withLabel?: boolean
  className?: string
}) {
  const meta = IMPORTANCE_META[importance]
  const bars = meta.weight
  return (
    <span
      className={cx('inline-flex items-center gap-1.5', className)}
      title={meta.description}
      aria-label={`Importância: ${meta.label}`}
    >
      <span className="flex items-end gap-[2px]" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-[1px] transition-colors"
            style={{
              height: 4 + i * 3,
              background: i <= bars ? 'var(--accent)' : 'var(--line-strong)',
              opacity: i <= bars ? 1 : 0.5,
            }}
          />
        ))}
      </span>
      {withLabel && (
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-ink-3 uppercase">
          {meta.short}
        </span>
      )}
    </span>
  )
}

export function PhaseChip({ phaseId, className }: { phaseId: string; className?: string }) {
  const phase = PHASE_BY_ID[phaseId]
  if (!phase) return null
  return (
    <Chip color={phaseColor(phaseId)} className={className}>
      {String(phase.index).padStart(2, '0')} · {phase.name}
    </Chip>
  )
}

const CERTAINTY_STYLE: Record<Certainty, string> = {
  confirmed: 'text-doom border-[color-mix(in_oklab,var(--doom)_32%,transparent)] bg-doom-soft',
  interpretation:
    'text-accent border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-accent-soft',
  theory: 'text-ink-3 border-line bg-surface-2 border-dashed',
}

export function CertaintyTag({ certainty }: { certainty: Certainty }) {
  const meta = CERTAINTY_META[certainty]
  return (
    <span
      title={meta.description}
      className={cx(
        'inline-flex items-center rounded-sm border px-2 py-[2px]',
        'font-mono text-[10px] font-medium tracking-[0.14em] uppercase',
        CERTAINTY_STYLE[certainty],
      )}
    >
      {meta.label}
    </span>
  )
}

/** Linha de afirmação com selo de certeza. Usada nos dossiês. */
export function ClaimRow({ certainty, text, source }: { certainty: Certainty; text: string; source?: string }) {
  return (
    <li className="flex flex-col gap-1.5 border-t border-line py-3 first:border-t-0 sm:flex-row sm:gap-4">
      <div className="sm:w-[104px] sm:shrink-0 sm:pt-[3px]">
        <CertaintyTag certainty={certainty} />
      </div>
      <div className="min-w-0">
        <p className="text-[13.5px] leading-relaxed text-ink-2">{text}</p>
        {source && <p className="mt-1 font-mono text-[10.5px] tracking-[0.08em] text-ink-3 uppercase">{source}</p>}
      </div>
    </li>
  )
}
