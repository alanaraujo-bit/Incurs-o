import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { DESTINATION, OPTIONAL_TITLES, statusOf, type PhaseProgress } from '../lib/selectors'
import { daysUntilRelease, formatDuration, formatDurationCompact } from '../lib/format'
import { accentColor, tint } from '../lib/palette'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { RouteStrip } from '../components/domain/RouteStrip'
import { StatusControl } from '../components/domain/StatusControl'
import { ImportanceMark } from '../components/domain/badges'
import { IconCheck, IconChevron, IconDoom, IconFilm, IconSeries } from '../components/ui/Icon'
import { Meter, cx } from '../components/ui/primitives'
import type { Title } from '../data'

/**
 * A rota — visualização assinatura.
 *
 * Uma espinha vertical contínua, colorida por fase, que se acende até o
 * ponto onde o usuário chegou e segue apagada dali em diante, terminando
 * no nó do destino. Funciona igualmente bem em coluna única (mobile) e em
 * duas colunas com índice fixo (desktop).
 */
export default function Journey() {
  const { progress } = useProgress()
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <Page width="wide" className="flex flex-col gap-8">
      <header>
        <p className="eyebrow mb-3">a jornada completa</p>
        <h1 className="display mb-4 text-[32px] sm:text-[44px]">
          Do primeiro Homem de Ferro
          <br className="hidden sm:block" /> até o Doutor Destino.
        </h1>
        <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-2">
          Seis blocos, {progress.total} produções, {formatDuration(progress.minutesTotal)} de duração
          total. A linha se acende conforme você avança.
        </p>
      </header>

      <RouteStrip className="border-y border-line py-5" />

      <div className="grid gap-10 xl:grid-cols-[220px_1fr] xl:gap-14">
        <PhaseIndex phases={progress.phases} />

        <div className="min-w-0">
          {progress.phases.map((phaseProgress) => (
            <PhaseSection key={phaseProgress.phase.id} data={phaseProgress} />
          ))}

          <OptionalSection />
          <DestinationNode complete={progress.complete} />
        </div>
      </div>
    </Page>
  )
}

function PhaseIndex({ phases }: { phases: PhaseProgress[] }) {
  return (
    <nav className="hidden xl:block" aria-label="Índice de fases">
      <div className="sticky top-10 flex flex-col gap-1">
        <p className="eyebrow mb-3">índice</p>
        {phases.map((p) => {
          const color = accentColor(p.phase.accent)
          return (
            <a
              key={p.phase.id}
              href={`#fase-${p.phase.id}`}
              className="group rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2"
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-[13px] font-medium text-ink-2 group-hover:text-ink">
                  {p.phase.name}
                </span>
                <span className="numeric text-[11px] text-ink-3">
                  {p.done}/{p.total}
                </span>
              </div>
              <Meter value={p.ratio} color={color} height={3} />
            </a>
          )
        })}
        <a
          href="#destino"
          className="mt-2 rounded-md border border-line px-3 py-2.5 text-[13px] font-medium text-doom transition-colors hover:bg-surface-2"
        >
          Avengers: Doomsday
        </a>
      </div>
    </nav>
  )
}

function PhaseSection({ data }: { data: PhaseProgress }) {
  const { phase, titles } = data
  const color = accentColor(phase.accent)

  return (
    <section id={`fase-${phase.id}`} className="scroll-mt-24 pb-2">
      <div className="relative pl-8 sm:pl-11">
        {/* cabeçalho da fase */}
        <div className="relative pt-8 pb-6">
          <span
            className="absolute top-[42px] -left-8 size-3 rounded-full sm:-left-11"
            style={{ background: color, boxShadow: `0 0 0 4px var(--bg)` }}
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="eyebrow" style={{ color }}>
              fase {String(phase.index).padStart(2, '0')}
            </span>
            {data.complete && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color }}>
                <IconCheck size={11} /> concluída
              </span>
            )}
          </div>
          <h2 className="display mt-2 mb-3 text-[24px] sm:text-[30px]">{phase.fullName}</h2>
          <p className="mb-4 max-w-[64ch] text-[13.5px] leading-relaxed text-ink-2">{phase.objective}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-[160px]">
              <Meter value={data.ratio} color={color} label={`Progresso de ${phase.name}`} />
            </div>
            <span className="numeric text-[11.5px] text-ink-3">
              {data.done}/{data.total} ·{' '}
              {data.complete
                ? `${formatDurationCompact(data.minutesTotal)} concluídas`
                : `${formatDurationCompact(data.minutesLeft)} restantes`}
            </span>
          </div>
        </div>

        {titles.map((title) => (
          <RouteNode key={title.slug} title={title} color={color} />
        ))}
      </div>
    </section>
  )
}

function RouteNode({ title, color }: { title: Title; color: string }) {
  const { state } = useProgress()
  const reduce = useReducedMotion()
  const status = statusOf(state, title.slug)
  const done = status === 'done'
  const active = status === 'watching'

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative pb-3"
    >
      {/* segmento da espinha */}
      <span
        className="absolute top-0 -left-8 h-full w-[2px] sm:-left-[42px]"
        style={{
          background: done ? color : 'var(--line-strong)',
          opacity: done ? 0.85 : 0.4,
        }}
        aria-hidden="true"
      />
      <span
        className="absolute top-[26px] -left-[35px] size-2.5 rounded-full border-2 transition-all duration-300 sm:-left-[46px]"
        style={{
          background: done ? color : active ? 'var(--bg)' : 'var(--surface-3)',
          borderColor: done || active ? color : 'var(--line-strong)',
          boxShadow: active ? `0 0 0 4px ${tint(color, 18)}` : 'none',
        }}
        aria-hidden="true"
      />

      <div
        className={cx(
          'flex items-center gap-3 rounded-lg border p-3.5 transition-all duration-200 sm:gap-4 sm:p-4',
          done ? 'border-line bg-surface-1/60' : 'border-line bg-surface-1 hover:border-line-strong',
        )}
      >
        <Link to={`/titulo/${title.slug}`} className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2.5">
            <span className="numeric text-[11px] font-medium" style={{ color: done ? color : 'var(--ink-3)' }}>
              {String(title.order).padStart(2, '0')}
            </span>
            <span className="text-ink-3">
              {title.type === 'series' ? <IconSeries size={12} /> : <IconFilm size={12} />}
            </span>
            <span className="numeric text-[11px] text-ink-3">
              {title.year} · {formatDurationCompact(title.runtimeMinutes)}
            </span>
            <ImportanceMark importance={title.importance} withLabel={false} />
          </div>
          <h3 className={cx('display text-[16px] sm:text-[18px]', done && 'opacity-55')}>{title.name}</h3>
          <p className="mt-1 line-clamp-2 max-w-[64ch] text-[12.5px] leading-snug text-ink-3">
            {title.role}
          </p>
        </Link>
        <StatusControl title={title} variant="compact" />
      </div>
    </motion.article>
  )
}

function OptionalSection() {
  const { state } = useProgress()
  return (
    <section className="relative mt-6 pl-8 sm:pl-11">
      <span
        className="absolute top-0 -left-0 h-full w-[2px] border-l-2 border-dashed border-line-strong opacity-40 sm:left-1"
        aria-hidden="true"
      />
      <p className="eyebrow mb-2">fora da rota principal</p>
      <h2 className="display mb-2 text-[19px]">Complementares</h2>
      <p className="mb-4 max-w-[58ch] text-[13px] leading-relaxed text-ink-3">
        Não entram na sua porcentagem e não são necessários. Ficam aqui para quem quiser chegar em
        Deadpool &amp; Wolverine com o contexto completo.
      </p>
      <div className="flex flex-col gap-2">
        {OPTIONAL_TITLES.map((title) => (
          <div
            key={title.slug}
            className="flex items-center gap-3 rounded-lg border border-dashed border-line bg-surface-1/50 p-3"
          >
            <Link to={`/titulo/${title.slug}`} className="min-w-0 flex-1">
              <h3 className={cx('display text-[14.5px]', statusOf(state, title.slug) === 'done' && 'opacity-55')}>
                {title.name}
              </h3>
              <p className="numeric text-[11px] text-ink-3">
                {title.year} · {formatDurationCompact(title.runtimeMinutes)}
              </p>
            </Link>
            <StatusControl title={title} variant="compact" />
          </div>
        ))}
      </div>
    </section>
  )
}

function DestinationNode({ complete }: { complete: boolean }) {
  return (
    <section id="destino" className="relative mt-10 scroll-mt-24 pl-8 sm:pl-11">
      <span
        className="absolute top-0 -left-8 h-[46px] w-[2px] sm:-left-[42px]"
        style={{ background: complete ? 'var(--doom)' : 'var(--line-strong)', opacity: complete ? 0.9 : 0.4 }}
        aria-hidden="true"
      />
      <Link
        to="/destino"
        className="group relative block overflow-hidden rounded-xl border p-6 transition-all sm:p-8"
        style={{
          borderColor: complete
            ? 'color-mix(in oklab, var(--doom) 45%, transparent)'
            : 'var(--line)',
          background: complete
            ? 'radial-gradient(120% 120% at 20% 0%, color-mix(in oklab, var(--doom) 20%, transparent), transparent 60%), var(--surface-1)'
            : 'var(--surface-1)',
        }}
      >
        <span
          className="absolute top-[34px] -left-[35px] size-4 rounded-full border-2 sm:-left-[46px]"
          style={{
            background: complete ? 'var(--doom)' : 'var(--surface-3)',
            borderColor: complete ? 'var(--doom)' : 'var(--line-strong)',
            boxShadow: complete ? '0 0 20px -2px var(--doom)' : 'none',
          }}
          aria-hidden="true"
        />
        <p className="eyebrow mb-3 flex items-center gap-2 text-doom">
          <IconDoom size={14} /> destino
        </p>
        <h2 className="display mb-2 text-[28px] sm:text-[38px]">{DESTINATION.name}</h2>
        <p className="mb-5 max-w-[52ch] text-[13.5px] leading-relaxed text-ink-2">{DESTINATION.logline}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div>
            <p className="numeric text-[20px] leading-none font-semibold text-doom">{daysUntilRelease()}</p>
            <p className="eyebrow mt-1">dias restantes</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-2 group-hover:text-ink">
            Ver a página do filme <IconChevron size={14} />
          </span>
        </div>
      </Link>
    </section>
  )
}
