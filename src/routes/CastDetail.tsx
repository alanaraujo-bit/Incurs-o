import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CHARACTER_BY_SLUG, TITLE_BY_SLUG, UNIVERSE_META } from '../data'
import { statusOf } from '../lib/selectors'
import { titleColor } from '../lib/palette'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { CertaintyTag } from '../components/domain/badges'
import { IconArrowLeft, IconCheck } from '../components/ui/Icon'
import { Chip, cx } from '../components/ui/primitives'
import NotFound from './NotFound'

export default function CastDetail() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { state } = useProgress()
  const character = CHARACTER_BY_SLUG[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!character) return <NotFound />

  const seen = character.appearances.filter(
    (a) => statusOf(state, a.title) === 'done',
  ).length

  return (
    <Page width="narrow" className="flex flex-col gap-8">
      <button
        type="button"
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/elenco'))}
        className="inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-ink-3 transition-colors hover:text-ink"
      >
        <IconArrowLeft size={15} />
        Voltar
      </button>

      <header>
        <p className="eyebrow mb-3">{character.actor}</p>
        <h1 className="display mb-3 text-[34px] sm:text-[46px]">{character.name}</h1>
        <p className="mb-5 text-[15px] leading-relaxed text-ink-2">{character.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {character.universes.map((universe) => (
            <Chip key={universe}>{UNIVERSE_META[universe].label}</Chip>
          ))}
        </div>
      </header>

      <section>
        <h2 className="eyebrow mb-3">o que você precisa saber</h2>
        <p className="text-[14.5px] leading-relaxed text-ink">{character.primer}</p>
      </section>

      <section className="rounded-lg border border-line bg-surface-1 p-5">
        <div className="mb-3 flex items-center gap-3">
          <h2 className="eyebrow">em doomsday</h2>
          <CertaintyTag certainty={character.doomsday.certainty} />
        </div>
        <p className="text-[14px] leading-relaxed text-ink-2">{character.doomsday.note}</p>
      </section>

      {character.appearances.length > 0 && (
        <section>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 className="eyebrow">onde aparece na rota</h2>
            <span className="numeric text-[11.5px] text-ink-3">
              {seen}/{character.appearances.length} vistos
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {character.appearances.map((appearance) => {
              const title = TITLE_BY_SLUG[appearance.title]
              if (!title) return null
              const done = statusOf(state, title.slug) === 'done'
              const color = titleColor(title.slug)
              return (
                <li key={appearance.title}>
                  <Link
                    to={title.destination ? '/destino' : `/titulo/${title.slug}`}
                    className="flex items-center gap-3.5 rounded-lg border border-line bg-surface-1 p-3.5 transition-colors hover:border-line-strong"
                  >
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full border"
                      style={{
                        borderColor: done ? color : 'var(--line)',
                        background: done ? color : 'transparent',
                        color: done ? 'var(--ink-inverse)' : 'var(--ink-3)',
                      }}
                    >
                      {done ? <IconCheck size={14} /> : <span className="numeric text-[10px]">{title.order ?? '—'}</span>}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cx('display block text-[15px]', done && 'opacity-60')}>
                        {title.name}
                      </span>
                      <span className="block text-[12.5px] text-ink-3">{appearance.note}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </Page>
  )
}
