import { Link } from 'react-router-dom'
import type { Title } from '../../data'
import { formatDurationCompact } from '../../lib/format'
import { statusOf } from '../../lib/selectors'
import { titleColor } from '../../lib/palette'
import { useProgress } from '../../store/ProgressContext'
import { Sigil } from '../ui/Sigil'
import { IconFilm, IconSeries } from '../ui/Icon'
import { cx } from '../ui/primitives'
import { ImportanceMark, PhaseChip } from './badges'
import { StatusControl } from './StatusControl'

/**
 * Cartão de produção.
 * `row` no catálogo (denso, muita informação), `tile` em trilhos horizontais.
 */
export function TitleCard({ title, layout = 'row' }: { title: Title; layout?: 'row' | 'tile' }) {
  const { state } = useProgress()
  const status = statusOf(state, title.slug)
  const color = titleColor(title.slug)
  const done = status === 'done'

  const meta = [
    String(title.year),
    title.type === 'series'
      ? `${title.episodes} ep · ${formatDurationCompact(title.runtimeMinutes)}`
      : formatDurationCompact(title.runtimeMinutes),
  ].join(' · ')

  if (layout === 'tile') {
    return (
      <Link
        to={`/titulo/${title.slug}`}
        className={cx(
          'group relative flex w-[210px] shrink-0 snap-start flex-col overflow-hidden rounded-lg border',
          'bg-surface-1 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-e2',
          done ? 'border-line' : 'border-line',
        )}
      >
        <div className="relative h-[104px] overflow-hidden bg-surface-2">
          <Sigil seed={title.slug} color={color} className="absolute inset-0 size-full" />
          {title.order !== null && !title.destination && (
            <span className="numeric absolute top-2.5 left-3 text-[11px] font-medium text-ink-3">
              {String(title.order).padStart(2, '0')}
            </span>
          )}
          <span className="absolute top-2 right-2">
            <StatusControl title={title} variant="compact" />
          </span>
          {done && (
            <span
              className="absolute inset-x-0 bottom-0 h-[3px]"
              style={{ background: 'var(--accent)' }}
            />
          )}
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3.5">
          <h3
            className={cx(
              'display text-[14.5px] leading-tight transition-opacity',
              done && 'opacity-60',
            )}
          >
            {title.name}
          </h3>
          <p className="numeric text-[11px] text-ink-3">{meta}</p>
        </div>
      </Link>
    )
  }

  return (
    <div
      className={cx(
        'group relative flex items-stretch gap-0 overflow-hidden rounded-lg border border-line bg-surface-1',
        'transition-all duration-200 hover:border-line-strong hover:shadow-e1',
      )}
    >
      <span
        className="w-[3px] shrink-0 transition-opacity"
        style={{ background: color, opacity: done ? 1 : 0.35 }}
        aria-hidden="true"
      />

      <Link
        to={`/titulo/${title.slug}`}
        className="flex min-w-0 flex-1 items-center gap-3.5 p-3 sm:gap-4 sm:p-3.5"
      >
        <div className="relative hidden size-[58px] shrink-0 overflow-hidden rounded-md bg-surface-2 sm:block">
          <Sigil seed={title.slug} color={color} className="absolute inset-0 size-full" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            {title.order !== null && !title.destination && (
              <span className="numeric text-[11px] font-medium text-ink-3">
                {String(title.order).padStart(2, '0')}
              </span>
            )}
            <span className="text-ink-3">
              {title.type === 'series' ? <IconSeries size={13} /> : <IconFilm size={13} />}
            </span>
            {title.order === null && (
              <span className="font-mono text-[10px] tracking-[0.12em] text-ink-3 uppercase">
                Fora da rota
              </span>
            )}
          </div>
          <h3
            className={cx(
              'display truncate text-[15.5px] transition-opacity sm:text-[16.5px]',
              done && 'opacity-55',
            )}
          >
            {title.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="numeric text-[11.5px] text-ink-3">{meta}</span>
            <ImportanceMark importance={title.importance} />
            <span className="hidden sm:inline">
              <PhaseChip phaseId={title.phase} />
            </span>
          </div>
        </div>
      </Link>

      <div className="flex shrink-0 items-center pr-3">
        <StatusControl title={title} variant="compact" />
      </div>
    </div>
  )
}
