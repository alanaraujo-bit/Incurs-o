import { Link } from 'react-router-dom'
import { formatDurationCompact } from '../../lib/format'
import type { PhaseProgress } from '../../lib/selectors'
import { accentColor, tint } from '../../lib/palette'
import { IconCheck } from '../ui/Icon'
import { Meter, cx } from '../ui/primitives'

export function PhaseCard({ data, compact }: { data: PhaseProgress; compact?: boolean }) {
  const { phase } = data
  const color = accentColor(phase.accent)

  return (
    <Link
      to={`/rota#fase-${phase.id}`}
      className={cx(
        'group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface-1 p-4 transition-all duration-200',
        'hover:border-line-strong hover:shadow-e1',
        // No trilho horizontal a largura é fixa; dentro da grade do desktop
        // o card volta a ser fluido para não estourar as colunas.
        compact ? 'w-[220px] shrink-0 snap-start lg:w-auto lg:shrink' : '',
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-70 transition-opacity group-hover:opacity-100"
        style={{ background: `linear-gradient(180deg, ${tint(color, 13)}, transparent)` }}
        aria-hidden="true"
      />

      <div className="relative mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow mb-1" style={{ color }}>
            fase {String(phase.index).padStart(2, '0')}
          </p>
          <h3 className="display text-[15.5px] leading-tight">{phase.name}</h3>
        </div>
        {data.complete ? (
          <span
            className="grid size-6 shrink-0 place-items-center rounded-full"
            style={{ background: tint(color, 20), color }}
            aria-label="Fase concluída"
          >
            <IconCheck size={13} />
          </span>
        ) : (
          <span className="numeric shrink-0 text-[12px] text-ink-3">
            {data.done}/{data.total}
          </span>
        )}
      </div>

      <p className="relative mb-4 line-clamp-2 min-h-[34px] text-[12.5px] leading-snug text-ink-3">
        {phase.promise}
      </p>

      <div className="relative mt-auto">
        <Meter value={data.ratio} color={color} label={`Progresso da fase ${phase.name}`} />
        <p className="numeric mt-2 text-[11px] text-ink-3">
          {data.complete
            ? `${formatDurationCompact(data.minutesTotal)} concluídas`
            : `falta ${formatDurationCompact(data.minutesLeft)}`}
        </p>
      </div>
    </Link>
  )
}
