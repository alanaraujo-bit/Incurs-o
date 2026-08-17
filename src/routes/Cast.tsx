import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CERTAINTY_META, CHARACTERS, UNIVERSE_META } from '../data'
import type { Certainty, Universe } from '../data'
import { Page } from '../components/layout/AppShell'
import { CertaintyTag } from '../components/domain/badges'
import { IconSearch } from '../components/ui/Icon'
import { EmptyState, cx } from '../components/ui/primitives'

const CERTAINTY_ORDER: Certainty[] = ['confirmed', 'interpretation', 'theory']

export default function Cast() {
  const [universe, setUniverse] = useState<Universe | 'all'>('all')
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = CHARACTERS.filter((character) => {
      if (universe !== 'all' && !character.universes.includes(universe)) return false
      if (q && !`${character.name} ${character.actor} ${character.tagline}`.toLowerCase().includes(q))
        return false
      return true
    })
    return CERTAINTY_ORDER.map((certainty) => ({
      certainty,
      items: list.filter((c) => c.doomsday.certainty === certainty),
    })).filter((group) => group.items.length > 0)
  }, [universe, query])

  const universes = Object.keys(UNIVERSE_META) as Universe[]
  const empty = groups.length === 0

  return (
    <Page width="wide" className="flex flex-col gap-7">
      <header>
        <p className="eyebrow mb-3">elenco</p>
        <h1 className="display mb-3 text-[30px] sm:text-[38px]">Quem você precisa conhecer</h1>
        <p className="max-w-[60ch] text-[14px] leading-relaxed text-ink-2">
          Agrupados pelo que se sabe sobre a presença em Doomsday. Presença anunciada oficialmente vem
          primeiro; leitura e especulação vêm depois, sempre rotuladas.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <div className="relative max-w-[380px]">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-3">
            <IconSearch size={16} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar personagem ou ator…"
            aria-label="Buscar personagem"
            className="h-11 w-full rounded-md border border-line bg-surface-2 pr-3 pl-10 text-[14px] text-ink placeholder:text-ink-3 focus:border-line-strong focus:outline-none"
          />
        </div>

        <div className="rail -mx-4 flex gap-1.5 px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <Pill active={universe === 'all'} onClick={() => setUniverse('all')}>
            Todos
          </Pill>
          {universes.map((key) => (
            <Pill key={key} active={universe === key} onClick={() => setUniverse(key)}>
              {UNIVERSE_META[key].label}
            </Pill>
          ))}
        </div>
      </div>

      {empty ? (
        <EmptyState
          title="Ninguém aqui"
          body="Nenhum personagem corresponde a esta busca ou a este núcleo."
        />
      ) : (
        groups.map((group) => (
          <section key={group.certainty}>
            <div className="mb-4 flex items-center gap-3">
              <CertaintyTag certainty={group.certainty} />
              <p className="text-[12.5px] text-ink-3">{CERTAINTY_META[group.certainty].description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((character) => (
                <Link
                  key={character.slug}
                  to={`/elenco/${character.slug}`}
                  className="group rounded-lg border border-line bg-surface-1 p-4 transition-all hover:border-line-strong hover:shadow-e1"
                >
                  <h2 className="display mb-1 text-[16.5px]">{character.name}</h2>
                  <p className="mb-2.5 text-[12px] text-ink-3">{character.actor}</p>
                  <p className="text-[13px] leading-relaxed text-ink-2">{character.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </Page>
  )
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'h-8 shrink-0 rounded-full border px-3 text-[12.5px] font-medium whitespace-nowrap transition-all',
        active
          ? 'border-transparent bg-ink text-ink-inverse'
          : 'border-line bg-surface-2 text-ink-2 hover:border-line-strong hover:text-ink',
      )}
    >
      {children}
    </button>
  )
}
