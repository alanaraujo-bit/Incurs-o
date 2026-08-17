import { Link } from 'react-router-dom'
import { PHASE_BY_ID } from '../../data'
import { formatDurationCompact } from '../../lib/format'
import { phaseProgressOf, resolveFocus, type Progress } from '../../lib/selectors'
import { titleColor, tint } from '../../lib/palette'
import { Sigil } from '../ui/Sigil'
import { IconChevron } from '../ui/Icon'
import { Meter } from '../ui/primitives'
import { ImportanceMark } from './badges'
import { StatusControl } from './StatusControl'

/**
 * "Continuar maratona".
 * Responde, sem clique nenhum: onde parei, o que assisto agora, por quê,
 * quanto tempo leva e quanto falta desta fase.
 */
export function ContinueCard({ progress }: { progress: Progress }) {
  const focus = resolveFocus(progress)
  if (!focus) return null

  const { title, reason } = focus
  const phase = PHASE_BY_ID[title.phase]
  const phaseProgress = phaseProgressOf(progress, title.phase)
  const color = titleColor(title.slug)

  return (
    <section
      className="relative overflow-hidden rounded-xl border border-line bg-surface-1 shadow-e2"
      aria-labelledby="continuar-titulo"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{ background: `radial-gradient(120% 100% at 8% 0%, ${tint(color, 16)}, transparent 62%)` }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:gap-9">
        <Link
          to={`/titulo/${title.slug}`}
          className="relative hidden h-[168px] w-[240px] shrink-0 overflow-hidden rounded-lg border border-line bg-surface-2 lg:block"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Sigil seed={title.slug} color={color} className="absolute inset-0 size-full" variant="hero" />
          {title.order !== null && (
            <span className="numeric absolute bottom-3 left-4 text-[28px] leading-none font-semibold text-ink-3 opacity-70">
              {String(title.order).padStart(2, '0')}
            </span>
          )}
        </Link>

        <div className="min-w-0 flex-1">
          <p className="eyebrow mb-2.5 flex items-center gap-2">
            <span className="inline-block size-1.5 animate-[incursao-pulse_2.4s_ease-in-out_infinite] rounded-full bg-accent" />
            {reason === 'watching' ? 'você está assistindo' : 'próximo da rota'}
          </p>

          <h2 id="continuar-titulo" className="display mb-2 text-[26px] sm:text-[32px]">
            <Link to={`/titulo/${title.slug}`} className="rounded-sm hover:text-accent">
              {title.name}
            </Link>
          </h2>

          <p className="mb-4 max-w-[62ch] text-[14px] leading-relaxed text-ink-2">{title.role}</p>

          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="numeric text-[12.5px] text-ink-3">
              {title.year} · {formatDurationCompact(title.runtimeMinutes)}
              {title.type === 'series' && ` · ${title.episodes} episódios`}
            </span>
            <ImportanceMark importance={title.importance} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <StatusControl title={title} />
            <Link
              to={`/titulo/${title.slug}`}
              className="inline-flex h-9 items-center gap-1 rounded-md px-3 text-[13px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              Por que isso importa
              <IconChevron size={14} />
            </Link>
          </div>
        </div>

        {phase && phaseProgress && (
          <div className="w-full shrink-0 rounded-lg border border-line bg-surface-2/60 p-4 lg:w-[212px]">
            <p className="eyebrow mb-1.5">fase {String(phase.index).padStart(2, '0')}</p>
            <p className="display mb-3 text-[15px]">{phase.fullName}</p>
            <Meter value={phaseProgress.ratio} color={color} label={`Progresso de ${phase.name}`} />
            <p className="numeric mt-2.5 text-[11.5px] text-ink-3">
              {phaseProgress.done}/{phaseProgress.total} concluídos
            </p>
            <p className="mt-1 text-[11.5px] text-ink-3">
              {phaseProgress.minutesLeft > 0
                ? `Faltam ${formatDurationCompact(phaseProgress.minutesLeft)} nesta fase`
                : 'Fase concluída'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
