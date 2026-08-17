import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {
  CHARACTER_BY_SLUG,
  IMPORTANCE_META,
  PHASE_BY_ID,
  TITLE_BY_SLUG,
  UNIVERSE_META,
} from '../data'
import { neighborsOf, statusOf } from '../lib/selectors'
import { formatDurationCompact, releaseDateLabel } from '../lib/format'
import { titleColor, tint } from '../lib/palette'
import { share, titleShare } from '../lib/share'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { Sigil } from '../components/ui/Sigil'
import { Spoiler } from '../components/ui/Spoiler'
import { StatusControl } from '../components/domain/StatusControl'
import { ImportanceMark, PhaseChip } from '../components/domain/badges'
import { IconArrowLeft, IconChevron, IconFilm, IconSeries, IconShare } from '../components/ui/Icon'
import { Button, Chip, cx } from '../components/ui/primitives'
import { useToast } from '../components/ui/Toast'
import NotFound from './NotFound'

export default function TitleDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { state } = useProgress()
  const { toast } = useToast()
  const title = TITLE_BY_SLUG[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!title) return <NotFound />

  const color = titleColor(title.slug)
  const phase = PHASE_BY_ID[title.phase]
  const { prev, next } = neighborsOf(title.slug)
  const status = statusOf(state, title.slug)

  const onShare = async () => {
    const result = await share(titleShare(title.name, title.slug, title.whyDoomsday))
    if (result === 'copied') toast('Link copiado.', { tone: 'accent' })
    if (result === 'failed') toast('Não foi possível compartilhar.', { tone: 'danger' })
  }

  const characters = title.characters.map((s) => CHARACTER_BY_SLUG[s]).filter(Boolean)

  return (
    <div>
      {/* Cabeçalho cinematográfico */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0" aria-hidden="true">
          <Sigil seed={title.slug} color={color} className="size-full opacity-45" variant="hero" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${tint('var(--bg)', 62)} 0%, ${tint('var(--bg)', 88)} 45%, var(--bg) 92%)`,
            }}
          />
        </div>

        <Page width="default" className="relative pt-4 pb-8 lg:pt-6 lg:pb-10">
          <button
            type="button"
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/rota'))}
            className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 transition-colors hover:text-ink"
          >
            <IconArrowLeft size={15} />
            Voltar
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {title.order !== null && !title.destination && (
              <Chip color={color}>Parada {String(title.order).padStart(2, '0')} de 30</Chip>
            )}
            {title.order === null && <Chip tone="muted">Complementar</Chip>}
            <PhaseChip phaseId={title.phase} />
          </div>

          <h1 className="display mt-4 mb-3 max-w-[18ch] text-[34px] sm:text-[46px] lg:text-[58px]">
            {title.name}
          </h1>

          {title.originalName && (
            <p className="mb-3 text-[13px] text-ink-3 italic">{title.originalName}</p>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-2">
            <span className="numeric inline-flex items-center gap-1.5 text-[13px]">
              {title.type === 'series' ? <IconSeries size={14} /> : <IconFilm size={14} />}
              {title.type === 'series' ? 'Série' : 'Filme'} · {title.year}
            </span>
            {title.runtimeMinutes > 0 && (
              <span className="numeric text-[13px]">
                {formatDurationCompact(title.runtimeMinutes)}
                {title.type === 'series' &&
                  ` · ${title.episodes} episódios de ~${title.episodeMinutes} min`}
              </span>
            )}
            <ImportanceMark importance={title.importance} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusControl title={title} />
            <Button variant="ghost" size="sm" onClick={onShare}>
              <IconShare size={15} />
              Compartilhar
            </Button>
          </div>

          {!title.markable && (
            <p className="mt-4 max-w-[52ch] text-[13px] text-ink-3">
              Estreia em {releaseDateLabel()}. Este título só poderá ser marcado depois do lançamento —
              é o destino da rota, não uma etapa dela.
            </p>
          )}
        </Page>
      </header>

      <Page width="default" className="flex flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          <div className="flex flex-col gap-9">
            <Section title="Do que se trata">
              <p className="text-[15px] leading-relaxed text-ink">{title.logline}</p>
            </Section>

            <Section title="O papel disso na sua preparação">
              <p className="text-[14.5px] leading-relaxed text-ink-2">{title.role}</p>
            </Section>

            <Section
              title="Por que isso importa para Doomsday"
              accent={color}
              highlight
            >
              <p className="text-[14.5px] leading-relaxed text-ink">{title.whyDoomsday}</p>
            </Section>

            <Section title="Antes de apertar play">
              <p className="text-[14.5px] leading-relaxed text-ink-2">{title.context}</p>
              {title.shortcut && (
                <p
                  className="mt-4 rounded-md border-l-2 py-2.5 pr-3 pl-4 text-[13.5px] leading-relaxed text-ink-2"
                  style={{ borderColor: color, background: tint(color, 7) }}
                >
                  {title.shortcut}
                </p>
              )}
            </Section>

            {title.concepts && title.concepts.length > 0 && (
              <Section title="Conceitos que aparecem aqui">
                <dl className="flex flex-col divide-y divide-[var(--line)]">
                  {title.concepts.map((concept) => (
                    <div key={concept.name} className="py-3 first:pt-0 last:pb-0">
                      <dt className="display mb-1 text-[14px]">{concept.name}</dt>
                      <dd className="text-[13.5px] leading-relaxed text-ink-2">{concept.body}</dd>
                    </div>
                  ))}
                </dl>
              </Section>
            )}

            {title.spoilers && title.spoilers.length > 0 && (
              <Section title="Contexto com spoiler">
                <p className="mb-3 text-[13px] text-ink-3">
                  Fica escondido por padrão. Se você já assistiu, o app abre sozinho.
                </p>
                <div className="flex flex-col gap-2">
                  {title.spoilers.map((note, index) => (
                    <Spoiler
                      key={note.label}
                      id={`${title.slug}#${index}`}
                      label={note.label}
                      guards={note.guards}
                    >
                      {note.body}
                    </Spoiler>
                  ))}
                </div>
              </Section>
            )}
          </div>

          <aside className="flex flex-col gap-8">
            <div className="rounded-lg border border-line bg-surface-1 p-5">
              <p className="eyebrow mb-3">peso editorial</p>
              <p className="display mb-1.5 text-[16px]">{IMPORTANCE_META[title.importance].label}</p>
              <p className="text-[12.5px] leading-relaxed text-ink-3">
                {IMPORTANCE_META[title.importance].description}
              </p>
            </div>

            {phase && (
              <div>
                <p className="eyebrow mb-3">fase da rota</p>
                <Link
                  to={`/rota#fase-${phase.id}`}
                  className="block rounded-lg border border-line bg-surface-1 p-5 transition-colors hover:border-line-strong"
                >
                  <p className="display mb-1.5 text-[15px]">{phase.fullName}</p>
                  <p className="text-[12.5px] leading-relaxed text-ink-3">{phase.promise}</p>
                </Link>
              </div>
            )}

            {characters.length > 0 && (
              <div>
                <p className="eyebrow mb-3">quem importa aqui</p>
                <ul className="flex flex-col gap-1">
                  {characters.map((character) => (
                    <li key={character.slug}>
                      <Link
                        to={`/elenco/${character.slug}`}
                        className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[13.5px] font-medium text-ink">
                            {character.name}
                          </span>
                          <span className="block truncate text-[11.5px] text-ink-3">
                            {character.actor}
                          </span>
                        </span>
                        <IconChevron size={14} className="shrink-0 text-ink-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {title.connections && title.connections.length > 0 && (
              <div>
                <p className="eyebrow mb-3">conecta com</p>
                <ul className="flex flex-col gap-1">
                  {title.connections.map((connection) => {
                    const target = TITLE_BY_SLUG[connection.to]
                    if (!target) return null
                    return (
                      <li key={connection.to}>
                        <Link
                          to={target.destination ? '/destino' : `/titulo/${target.slug}`}
                          className="block rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2"
                        >
                          <span className="block text-[13.5px] font-medium text-ink">{target.name}</span>
                          <span className="block text-[11.5px] text-ink-3">{connection.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div>
              <p className="eyebrow mb-3">núcleos</p>
              <div className="flex flex-wrap gap-1.5">
                {title.universes.map((universe) => (
                  <Chip key={universe} tone="neutral">
                    {UNIVERSE_META[universe].label}
                  </Chip>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <nav className="grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Navegação da rota">
          <NeighborLink title={prev} direction="prev" />
          <NeighborLink title={next} direction="next" />
        </nav>

        {status === 'done' && next && (
          <div className="rounded-lg border border-line bg-surface-2/60 p-5 text-center">
            <p className="mb-3 text-[13.5px] text-ink-2">
              Concluído. O próximo passo da rota é <strong className="text-ink">{next.name}</strong>.
            </p>
            <Link to={`/titulo/${next.slug}`}>
              <Button variant="primary" size="sm">
                Ir para {next.name}
              </Button>
            </Link>
          </div>
        )}
      </Page>
    </div>
  )
}

function Section({
  title,
  children,
  accent,
  highlight,
}: {
  title: string
  children: React.ReactNode
  accent?: string
  highlight?: boolean
}) {
  return (
    <section
      className={cx(
        highlight && 'rounded-lg border p-5 sm:p-6',
      )}
      style={
        highlight && accent
          ? { borderColor: tint(accent, 32), background: tint(accent, 6) }
          : undefined
      }
    >
      <h2
        className="eyebrow mb-3"
        style={highlight && accent ? { color: accent } : undefined}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function NeighborLink({
  title,
  direction,
}: {
  title: ReturnType<typeof neighborsOf>['prev']
  direction: 'prev' | 'next'
}) {
  if (!title) {
    return (
      <div className="rounded-lg border border-dashed border-line p-4">
        <p className="eyebrow mb-1">{direction === 'prev' ? 'antes' : 'depois'}</p>
        <p className="text-[13.5px] text-ink-3">
          {direction === 'prev' ? 'Começo da rota.' : 'Fim da rota — só resta Doomsday.'}
        </p>
      </div>
    )
  }
  return (
    <Link
      to={`/titulo/${title.slug}`}
      className={cx(
        'rounded-lg border border-line bg-surface-1 p-4 transition-colors hover:border-line-strong',
        direction === 'next' && 'sm:text-right',
      )}
    >
      <p className="eyebrow mb-1">{direction === 'prev' ? 'recomendado antes' : 'recomendado depois'}</p>
      <p className="display text-[15px]">{title.name}</p>
    </Link>
  )
}
