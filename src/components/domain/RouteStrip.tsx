import { Link } from 'react-router-dom'
import { DESTINATION, ROUTE_TITLES, statusOf } from '../../lib/selectors'
import { accentColor, tint } from '../../lib/palette'
import { useProgress } from '../../store/ProgressContext'
import { cx } from '../ui/primitives'

/**
 * Panorama da rota inteira em uma faixa.
 * 30 nós + destino, agrupados por fase. Densidade alta de propósito:
 * é o único lugar onde a jornada cabe inteira em um olhar.
 */
export function RouteStrip({ className }: { className?: string }) {
  const { state, progress } = useProgress()

  return (
    <div className={cx('w-full', className)}>
      <div className="rail -mx-4 flex gap-4 px-4 pb-3 sm:mx-0 sm:px-0" role="list" aria-label="Panorama da rota">
        {progress.phases.map((phaseProgress) => {
          const { phase } = phaseProgress
          const color = accentColor(phase.accent)
          const titles = ROUTE_TITLES.filter((t) => t.phase === phase.id)
          return (
            <div key={phase.id} className="shrink-0" role="listitem">
              <div className="mb-2 flex items-baseline gap-2">
                <span
                  className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase"
                  style={{ color }}
                >
                  {String(phase.index).padStart(2, '0')}
                </span>
                <span className="truncate text-[11.5px] font-medium text-ink-2">{phase.name}</span>
                <span className="numeric text-[10.5px] text-ink-3">
                  {phaseProgress.done}/{phaseProgress.total}
                </span>
              </div>
              <div className="flex items-end gap-[3px]">
                {titles.map((title) => {
                  const status = statusOf(state, title.slug)
                  return (
                    <Link
                      key={title.slug}
                      to={`/titulo/${title.slug}`}
                      title={`${title.order}. ${title.name}`}
                      aria-label={`${title.name} — ${
                        status === 'done' ? 'assistido' : status === 'watching' ? 'assistindo' : 'pendente'
                      }`}
                      className="group relative block h-9 w-[9px] rounded-[2px] transition-all duration-200 hover:h-11"
                      style={{
                        background:
                          status === 'done'
                            ? color
                            : status === 'watching'
                              ? tint(color, 55)
                              : 'var(--surface-3)',
                        border: status === 'watching' ? `1px solid ${color}` : '1px solid transparent',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}

        <div className="shrink-0" role="listitem">
          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-mono text-[10px] font-medium tracking-[0.14em] text-doom uppercase">
              fim
            </span>
          </div>
          <Link
            to="/destino"
            aria-label={DESTINATION.name}
            className="relative block h-9 w-[26px] rounded-[2px] border transition-all duration-300"
            style={{
              borderColor: 'color-mix(in oklab, var(--doom) 45%, transparent)',
              background: progress.complete ? 'var(--doom)' : tint('var(--doom)', 14),
              boxShadow: progress.complete ? '0 0 18px -4px var(--doom)' : 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}
