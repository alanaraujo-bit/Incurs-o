import { Link } from 'react-router-dom'
import { DESTINATION, ROUTE_TITLES, statusOf } from '../lib/selectors'
import { daysUntilRelease, formatDurationCompact, releaseDateLabel } from '../lib/format'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { ContinueCard } from '../components/domain/ContinueCard'
import { PhaseCard } from '../components/domain/PhaseCard'
import { TitleCard } from '../components/domain/TitleCard'
import { ProgressArc, CountUp } from '../components/ui/ProgressArc'
import { Button, SectionHeader } from '../components/ui/primitives'
import { IconChevron, IconDoom, IconSpark } from '../components/ui/Icon'
import { ReadyBanner } from '../components/domain/ReadyBanner'

export default function Home() {
  const { progress, state } = useProgress()

  const upNext = ROUTE_TITLES.filter((t) => statusOf(state, t.slug) === 'idle').slice(0, 8)
  const days = daysUntilRelease()

  return (
    <Page width="wide" className="flex flex-col gap-10 lg:gap-14">
      {progress.complete ? <ReadyBanner progress={progress} /> : <Hero />}

      {!progress.complete && <ContinueCard progress={progress} />}

      <section aria-labelledby="fases">
        <SectionHeader
          eyebrow="a maratona em seis blocos"
          title={<span id="fases">Núcleos da preparação</span>}
          action={
            <Link
              to="/rota"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-2 hover:text-ink"
            >
              Ver a rota
              <IconChevron size={14} />
            </Link>
          }
        />
        <div className="rail -mx-4 flex gap-3 px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-0 xl:grid-cols-6">
          {progress.phases.map((phase) => (
            <PhaseCard key={phase.phase.id} data={phase} compact />
          ))}
        </div>
      </section>

      {upNext.length > 0 && (
        <section aria-labelledby="fila">
          <SectionHeader
            eyebrow={`${progress.remaining} restantes · ${formatDurationCompact(progress.minutesLeft)}`}
            title={<span id="fila">A fila daqui pra frente</span>}
            action={
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-2 hover:text-ink"
              >
                Todas as obras
                <IconChevron size={14} />
              </Link>
            }
          />
          <div className="flex flex-col gap-2">
            {upNext.slice(0, 5).map((title) => (
              <TitleCard key={title.slug} title={title} />
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <Link
          to="/destino"
          className="group relative overflow-hidden rounded-xl border border-line bg-surface-1 p-6 transition-all hover:border-line-strong hover:shadow-e2 sm:p-8"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(110% 90% at 90% 10%, color-mix(in oklab, var(--doom) 16%, transparent), transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <p className="eyebrow mb-3 flex items-center gap-2 text-doom">
              <IconDoom size={14} /> destino final
            </p>
            <h3 className="display mb-2 text-[24px] sm:text-[28px]">{DESTINATION.name}</h3>
            <p className="mb-5 max-w-[46ch] text-[13.5px] leading-relaxed text-ink-2">
              {DESTINATION.logline}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div>
                <p className="numeric text-[22px] leading-none font-semibold text-doom">{days}</p>
                <p className="eyebrow mt-1">dias para a estreia</p>
              </div>
              <div>
                <p className="numeric text-[15px] leading-none font-medium text-ink">
                  {releaseDateLabel()}
                </p>
                <p className="eyebrow mt-1.5">data confirmada</p>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/doom"
          className="group relative overflow-hidden rounded-xl border border-line bg-surface-1 p-6 transition-all hover:border-line-strong hover:shadow-e2 sm:p-8"
        >
          <p className="eyebrow mb-3 flex items-center gap-2">
            <IconSpark size={14} /> dossiê editorial
          </p>
          <h3 className="display mb-2 text-[24px] sm:text-[28px]">Victor von Doom</h3>
          <p className="max-w-[46ch] text-[13.5px] leading-relaxed text-ink-2">
            Robert Downey Jr. volta como um personagem novo. O que a Marvel confirmou, o que é leitura
            razoável e o que continua sendo apenas teoria — separados, um por um.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-accent">
            Ler o dossiê <IconChevron size={14} />
          </span>
        </Link>
      </section>
    </Page>
  )
}

function Hero() {
  const { progress } = useProgress()

  const stats = [
    { label: 'concluídos', value: `${progress.done}/${progress.total}` },
    { label: 'tempo restante', value: formatDurationCompact(progress.minutesLeft) },
    { label: 'já assistido', value: formatDurationCompact(progress.minutesWatched) },
    { label: 'fases fechadas', value: `${progress.phases.filter((p) => p.complete).length}/6` },
  ]

  return (
    <section className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
      <div className="flex justify-center lg:justify-start">
        <ProgressArc value={progress.ratio} size={216} stroke={9}>
          <p className="numeric text-[52px] leading-none font-semibold tracking-tight">
            <CountUp value={progress.percent} />
            <span className="text-[22px] text-ink-3">%</span>
          </p>
          <p className="eyebrow mt-2">preparado</p>
        </ProgressArc>
      </div>

      <div className="min-w-0">
        <p className="eyebrow mb-3">sua preparação para avengers: doomsday</p>
        <h1 className="display mb-4 text-[32px] sm:text-[42px] lg:text-[52px]">
          {progress.untouched ? (
            <>
              Trinta produções separam
              <br className="hidden sm:block" /> você do Doomsday.
            </>
          ) : progress.remaining <= 3 ? (
            <>
              Falta pouco.
              <br className="hidden sm:block" /> {progress.remaining}{' '}
              {progress.remaining === 1 ? 'produção' : 'produções'} até o fim.
            </>
          ) : (
            <>
              Faltam {formatDurationCompact(progress.minutesLeft)}
              <br className="hidden sm:block" /> até você estar pronto.
            </>
          )}
        </h1>
        <p className="mb-7 max-w-[54ch] text-[14.5px] leading-relaxed text-ink-2">
          {progress.untouched
            ? 'Uma rota curada em seis blocos, do primeiro Homem de Ferro ao Quarteto Fantástico. Cada obra vem com o motivo pelo qual está aqui — e você pode pular o que não precisa.'
            : 'Seu progresso fica salvo neste aparelho. Volte quando quiser: o app lembra exatamente onde você parou.'}
        </p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:max-w-[520px] sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="numeric text-[19px] leading-none font-semibold text-ink">{stat.value}</dd>
              <dt className="eyebrow mt-1.5">{stat.label}</dt>
            </div>
          ))}
        </dl>

        {progress.untouched && (
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/titulo/homem-de-ferro">
              <Button variant="primary" size="lg">
                Começar pelo início
              </Button>
            </Link>
            <Link to="/rota">
              <Button size="lg">Ver a rota inteira</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
