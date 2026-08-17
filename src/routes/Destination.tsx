import { Link } from 'react-router-dom'
import { CHARACTERS, DESTINATION_SLUG, DOOMSDAY_FACTS, LAST_VERIFIED, TITLE_BY_SLUG } from '../data'
import { daysUntilRelease, formatDurationCompact, releaseDateLabel } from '../lib/format'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { ProgressArc } from '../components/ui/ProgressArc'
import { CertaintyTag, ClaimRow } from '../components/domain/badges'
import { IconChevron, IconDoom } from '../components/ui/Icon'
import { Button } from '../components/ui/primitives'

export default function Destination() {
  const { progress } = useProgress()
  const film = TITLE_BY_SLUG[DESTINATION_SLUG]
  const days = daysUntilRelease()

  const confirmedCast = CHARACTERS.filter((c) => c.doomsday.certainty === 'confirmed')
  const others = CHARACTERS.filter((c) => c.doomsday.certainty !== 'confirmed')

  return (
    <div>
      <header
        className="relative overflow-hidden border-b border-line"
        style={{
          background:
            'radial-gradient(90% 120% at 80% 0%, color-mix(in oklab, var(--doom) 16%, transparent), transparent 62%)',
        }}
      >
        <Page width="default" className="relative py-10 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <p className="eyebrow mb-4 flex items-center gap-2 text-doom">
                <IconDoom size={14} /> destino da jornada
              </p>
              <h1 className="display mb-5 text-[38px] sm:text-[54px] lg:text-[64px]">
                Avengers:
                <br />
                Doomsday
              </h1>
              <p className="mb-7 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">{film.logline}</p>

              <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
                <div>
                  <p className="numeric text-[34px] leading-none font-semibold text-doom">{days}</p>
                  <p className="eyebrow mt-1.5">dias para a estreia</p>
                </div>
                <div>
                  <p className="numeric text-[17px] leading-none font-medium text-ink">
                    {releaseDateLabel()}
                  </p>
                  <p className="eyebrow mt-1.5">data confirmada</p>
                </div>
                <div>
                  <p className="numeric text-[17px] leading-none font-medium text-ink">Russo</p>
                  <p className="eyebrow mt-1.5">direção</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ProgressArc
                value={progress.ratio}
                size={188}
                stroke={8}
                color="var(--doom)"
                endColor="var(--doom)"
              >
                <p className="numeric text-[40px] leading-none font-semibold">{progress.percent}%</p>
                <p className="eyebrow mt-1.5">preparado</p>
              </ProgressArc>
            </div>
          </div>
        </Page>
      </header>

      <Page width="default" className="flex flex-col gap-12">
        <section className="rounded-lg border border-line bg-surface-1 p-5 sm:p-6">
          <h2 className="eyebrow mb-3">sua preparação</h2>
          {progress.complete ? (
            <p className="text-[15px] leading-relaxed text-ink">
              Rota concluída. As {progress.total} produções foram assistidas —{' '}
              {formatDurationCompact(progress.minutesWatched)} no total. Você chega ao filme com todo o
              contexto que ele assume que você tem.
            </p>
          ) : (
            <>
              <p className="mb-4 text-[15px] leading-relaxed text-ink-2">
                Faltam <strong className="text-ink">{progress.remaining}</strong>{' '}
                {progress.remaining === 1 ? 'produção' : 'produções'} —{' '}
                {formatDurationCompact(progress.minutesLeft)} de conteúdo. Com {days} dias até a
                estreia, isso dá cerca de{' '}
                <strong className="text-ink">
                  {Math.max(1, Math.round(progress.minutesLeft / Math.max(days, 1)))} minutos por dia
                </strong>
                .
              </p>
              <Link to="/">
                <Button variant="primary" size="sm">
                  Continuar de onde parei
                </Button>
              </Link>
            </>
          )}
        </section>

        <section>
          <h2 className="display mb-2 text-[23px] sm:text-[28px]">O que se sabe</h2>
          <p className="mb-5 max-w-[58ch] text-[13.5px] leading-relaxed text-ink-3">
            Somente o que foi divulgado por canais oficiais, com o grau de certeza declarado em cada
            linha. Nada de "fontes próximas à produção".
          </p>
          <ul className="rounded-lg border border-line bg-surface-1 px-5 py-1">
            {DOOMSDAY_FACTS.map((fact) => (
              <ClaimRow key={fact.text} {...fact} />
            ))}
          </ul>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <h2 className="display text-[23px] sm:text-[28px]">Elenco anunciado</h2>
            <CertaintyTag certainty="confirmed" />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {confirmedCast.map((character) => (
              <Link
                key={character.slug}
                to={`/elenco/${character.slug}`}
                className="flex items-center justify-between gap-3 rounded-md border border-line bg-surface-1 px-4 py-3 transition-colors hover:border-line-strong"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium text-ink">
                    {character.name}
                  </span>
                  <span className="block truncate text-[12px] text-ink-3">{character.actor}</span>
                </span>
                <IconChevron size={14} className="shrink-0 text-ink-3" />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-3">
            Esta lista cobre os personagens relevantes para a rota desta maratona. O elenco completo
            anunciado é maior — a Marvel revelou dezenas de nomes de uma vez, em março de 2025.
          </p>
        </section>

        {others.length > 0 && (
          <section>
            <h2 className="display mb-4 text-[20px]">Fora do elenco anunciado</h2>
            <p className="mb-4 max-w-[58ch] text-[13.5px] leading-relaxed text-ink-3">
              Personagens importantes para entender o filme, mas cuja presença não foi confirmada.
              Estão aqui pelo contexto que carregam, não por anúncio.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((character) => (
                <Link
                  key={character.slug}
                  to={`/elenco/${character.slug}`}
                  className="flex items-center gap-3 rounded-md border border-dashed border-line px-4 py-3 transition-colors hover:border-line-strong"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium text-ink-2">
                      {character.name}
                    </span>
                    <span className="block truncate text-[12px] text-ink-3">{character.actor}</span>
                  </span>
                  <CertaintyTag certainty={character.doomsday.certainty} />
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-line pt-6">
          <p className="text-[12.5px] leading-relaxed text-ink-3">
            Última verificação editorial: {LAST_VERIFIED}. Projeto independente de fãs, sem vínculo com
            a Marvel Studios ou com a Disney.
          </p>
        </footer>
      </Page>
    </div>
  )
}
