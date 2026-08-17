import { useDeferredValue, useMemo, useState } from 'react'
import { IMPORTANCE_META, PHASES, TITLES, UNIVERSE_META } from '../data'
import type { Importance, MediaType, Universe } from '../data'
import { statusOf } from '../lib/selectors'
import { formatDurationCompact } from '../lib/format'
import { phaseColor } from '../lib/palette'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { TitleCard } from '../components/domain/TitleCard'
import { IconClose, IconFilter, IconSearch } from '../components/ui/Icon'
import { Button, EmptyState, cx } from '../components/ui/primitives'

type StatusFilter = 'all' | 'idle' | 'watching' | 'done'
type Sort = 'route' | 'year' | 'duration'

interface Filters {
  query: string
  status: StatusFilter
  type: MediaType | 'all'
  importance: Importance | 'all'
  phase: string | 'all'
  universe: Universe | 'all'
  sort: Sort
}

const EMPTY_FILTERS: Filters = {
  query: '',
  status: 'all',
  type: 'all',
  importance: 'all',
  phase: 'all',
  universe: 'all',
  sort: 'route',
}

export default function Catalog() {
  const { state } = useProgress()
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [showFilters, setShowFilters] = useState(false)
  const query = useDeferredValue(filters.query)

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }))

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = TITLES.filter((title) => {
      if (title.destination) return false
      if (filters.status !== 'all' && statusOf(state, title.slug) !== filters.status) return false
      if (filters.type !== 'all' && title.type !== filters.type) return false
      if (filters.importance !== 'all' && title.importance !== filters.importance) return false
      if (filters.phase !== 'all' && title.phase !== filters.phase) return false
      if (filters.universe !== 'all' && !title.universes.includes(filters.universe)) return false
      if (q) {
        const haystack = [
          title.name,
          title.originalName ?? '',
          String(title.year),
          title.logline,
          title.role,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    return list.sort((a, b) => {
      if (filters.sort === 'year') return a.year - b.year
      if (filters.sort === 'duration') return b.runtimeMinutes - a.runtimeMinutes
      return (a.order ?? 99) - (b.order ?? 99)
    })
  }, [filters, query, state])

  const activeCount = (Object.keys(filters) as Array<keyof Filters>).filter(
    (key) => key !== 'query' && key !== 'sort' && filters[key] !== EMPTY_FILTERS[key],
  ).length

  const totalMinutes = results.reduce((sum, t) => sum + t.runtimeMinutes, 0)

  return (
    <Page width="wide" className="flex flex-col gap-6">
      <header>
        <p className="eyebrow mb-3">catálogo</p>
        <h1 className="display mb-3 text-[30px] sm:text-[38px]">Todas as produções</h1>
        <p className="max-w-[58ch] text-[14px] leading-relaxed text-ink-2">
          Trinta na rota principal, três complementares. Filtre por núcleo, tipo, peso editorial ou
          pelo que você ainda não viu.
        </p>
      </header>

      <div className="sticky top-[calc(var(--safe-t)+3.25rem)] z-30 -mx-4 border-y border-line bg-bg/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-0 lg:mx-0 lg:rounded-lg lg:border lg:px-4">
        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-3">
              <IconSearch size={16} />
            </span>
            <input
              type="search"
              value={filters.query}
              onChange={(e) => set('query', e.target.value)}
              placeholder="Buscar produção…"
              aria-label="Buscar produção"
              className="h-11 w-full rounded-md border border-line bg-surface-2 pr-3 pl-10 text-[14px] text-ink placeholder:text-ink-3 focus:border-line-strong focus:outline-none"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => set('query', '')}
                aria-label="Limpar busca"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-ink-3 hover:text-ink"
              >
                <IconClose size={15} />
              </button>
            )}
          </div>
          <Button
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            className={cx(showFilters && 'border-line-strong')}
          >
            <IconFilter size={16} />
            <span className="hidden sm:inline">Filtros</span>
            {activeCount > 0 && (
              <span className="numeric ml-1 rounded-full bg-accent px-1.5 text-[10px] text-accent-ink">
                {activeCount}
              </span>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="mt-3 flex flex-col gap-3 border-t border-line pt-3">
            <FilterRow label="Situação">
              {(
                [
                  ['all', 'Todas'],
                  ['idle', 'Pendentes'],
                  ['watching', 'Assistindo'],
                  ['done', 'Concluídas'],
                ] as Array<[StatusFilter, string]>
              ).map(([value, label]) => (
                <FilterPill
                  key={value}
                  active={filters.status === value}
                  onClick={() => set('status', value)}
                >
                  {label}
                </FilterPill>
              ))}
            </FilterRow>

            <FilterRow label="Formato">
              <FilterPill active={filters.type === 'all'} onClick={() => set('type', 'all')}>
                Tudo
              </FilterPill>
              <FilterPill active={filters.type === 'film'} onClick={() => set('type', 'film')}>
                Filmes
              </FilterPill>
              <FilterPill active={filters.type === 'series'} onClick={() => set('type', 'series')}>
                Séries
              </FilterPill>
            </FilterRow>

            <FilterRow label="Peso">
              <FilterPill
                active={filters.importance === 'all'}
                onClick={() => set('importance', 'all')}
              >
                Todos
              </FilterPill>
              {(Object.keys(IMPORTANCE_META) as Importance[]).map((key) => (
                <FilterPill
                  key={key}
                  active={filters.importance === key}
                  onClick={() => set('importance', key)}
                  title={IMPORTANCE_META[key].description}
                >
                  {IMPORTANCE_META[key].label}
                </FilterPill>
              ))}
            </FilterRow>

            <FilterRow label="Fase">
              <FilterPill active={filters.phase === 'all'} onClick={() => set('phase', 'all')}>
                Todas
              </FilterPill>
              {PHASES.map((phase) => (
                <FilterPill
                  key={phase.id}
                  active={filters.phase === phase.id}
                  onClick={() => set('phase', phase.id)}
                  color={phaseColor(phase.id)}
                >
                  {phase.name}
                </FilterPill>
              ))}
            </FilterRow>

            <FilterRow label="Núcleo">
              <FilterPill active={filters.universe === 'all'} onClick={() => set('universe', 'all')}>
                Todos
              </FilterPill>
              {(Object.keys(UNIVERSE_META) as Universe[]).map((key) => (
                <FilterPill
                  key={key}
                  active={filters.universe === key}
                  onClick={() => set('universe', key)}
                  title={UNIVERSE_META[key].description}
                >
                  {UNIVERSE_META[key].label}
                </FilterPill>
              ))}
            </FilterRow>

            <FilterRow label="Ordem">
              <FilterPill active={filters.sort === 'route'} onClick={() => set('sort', 'route')}>
                Da rota
              </FilterPill>
              <FilterPill active={filters.sort === 'year'} onClick={() => set('sort', 'year')}>
                Ano
              </FilterPill>
              <FilterPill active={filters.sort === 'duration'} onClick={() => set('sort', 'duration')}>
                Duração
              </FilterPill>
            </FilterRow>

            {activeCount > 0 && (
              <div>
                <Button size="sm" variant="ghost" onClick={() => setFilters(EMPTY_FILTERS)}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="numeric text-[12px] text-ink-3">
        {results.length} {results.length === 1 ? 'produção' : 'produções'} ·{' '}
        {formatDurationCompact(totalMinutes)}
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={<IconSearch size={28} />}
          title="Nada encontrado"
          body="Nenhuma produção corresponde a esta combinação de busca e filtros."
          action={
            <Button onClick={() => setFilters(EMPTY_FILTERS)} size="sm">
              Limpar tudo
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-2">
          {results.map((title) => (
            <TitleCard key={title.slug} title={title} />
          ))}
        </div>
      )}
    </Page>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="eyebrow shrink-0 sm:w-[72px]">{label}</span>
      <div className="rail -mx-1 flex gap-1.5 px-1 sm:flex-wrap sm:overflow-visible">{children}</div>
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  children,
  color,
  title,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  color?: string
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={title}
      className={cx(
        'h-8 shrink-0 rounded-full border px-3 text-[12.5px] font-medium whitespace-nowrap transition-all duration-150',
        active
          ? 'border-transparent bg-ink text-ink-inverse'
          : 'border-line bg-surface-2 text-ink-2 hover:border-line-strong hover:text-ink',
      )}
      style={active && color ? { background: color, color: 'var(--ink-inverse)' } : undefined}
    >
      {children}
    </button>
  )
}
