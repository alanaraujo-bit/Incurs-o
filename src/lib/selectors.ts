import { PHASES, TITLES, type Phase, type Title, type TitleStatus } from '../data'
import type { ProgressState } from '../store/schema'

/**
 * ÚNICA fonte de verdade do cálculo de preparação.
 *
 * Denominador = títulos da rota principal (order 1..30).
 * Excluídos da porcentagem: complementares (order null) e o destino
 * (Avengers: Doomsday), que não pode ser marcado antes da estreia.
 * Isso impede qualquer leitura acima de 100%.
 */

export const ROUTE_TITLES: Title[] = TITLES.filter(
  (t) => t.order !== null && !t.destination,
).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export const OPTIONAL_TITLES: Title[] = TITLES.filter((t) => t.order === null)

export const DESTINATION: Title = TITLES.find((t) => t.destination)!

export const ROUTE_TOTAL = ROUTE_TITLES.length
export const ROUTE_MINUTES = ROUTE_TITLES.reduce((sum, t) => sum + t.runtimeMinutes, 0)

export function statusOf(state: ProgressState, slug: string): TitleStatus {
  return state.entries[slug]?.status ?? 'idle'
}

export interface PhaseProgress {
  phase: Phase
  titles: Title[]
  done: number
  watching: number
  total: number
  ratio: number
  minutesTotal: number
  minutesLeft: number
  complete: boolean
  started: boolean
}

export interface Progress {
  done: number
  watching: number
  total: number
  remaining: number
  /** 0..1 sobre a rota principal. */
  ratio: number
  /** Inteiro 0..100, arredondado, mas nunca 100 antes de terminar de fato. */
  percent: number
  minutesTotal: number
  minutesWatched: number
  minutesLeft: number
  phases: PhaseProgress[]
  optionalDone: number
  optionalTotal: number
  /** Título marcado como "assistindo" mais recentemente, se houver. */
  current: Title | null
  /** Primeiro título não concluído na ordem da rota. */
  next: Title | null
  /** Último título concluído, pela data de marcação. */
  lastCompleted: Title | null
  complete: boolean
  untouched: boolean
}

export function computeProgress(state: ProgressState): Progress {
  let done = 0
  let watching = 0
  let minutesWatched = 0

  for (const title of ROUTE_TITLES) {
    const status = statusOf(state, title.slug)
    if (status === 'done') {
      done += 1
      minutesWatched += title.runtimeMinutes
    } else if (status === 'watching') {
      watching += 1
    }
  }

  const phases: PhaseProgress[] = PHASES.map((phase) => {
    const titles = ROUTE_TITLES.filter((t) => t.phase === phase.id)
    let phaseDone = 0
    let phaseWatching = 0
    let minutesLeft = 0
    let minutesTotal = 0
    for (const t of titles) {
      minutesTotal += t.runtimeMinutes
      const status = statusOf(state, t.slug)
      if (status === 'done') phaseDone += 1
      else {
        minutesLeft += t.runtimeMinutes
        if (status === 'watching') phaseWatching += 1
      }
    }
    return {
      phase,
      titles,
      done: phaseDone,
      watching: phaseWatching,
      total: titles.length,
      ratio: titles.length ? phaseDone / titles.length : 0,
      minutesTotal,
      minutesLeft,
      complete: titles.length > 0 && phaseDone === titles.length,
      started: phaseDone > 0 || phaseWatching > 0,
    }
  })

  const ratio = ROUTE_TOTAL ? done / ROUTE_TOTAL : 0
  // Nunca arredondar para cima até 100: 29/30 deve ler 96%, não 100%.
  const rawPercent = ratio * 100
  const percent = done === ROUTE_TOTAL ? 100 : Math.min(99, Math.round(rawPercent))

  const watchingEntries = ROUTE_TITLES.filter((t) => statusOf(state, t.slug) === 'watching').sort(
    (a, b) => (state.entries[b.slug]?.at ?? '').localeCompare(state.entries[a.slug]?.at ?? ''),
  )

  const doneEntries = ROUTE_TITLES.filter((t) => statusOf(state, t.slug) === 'done').sort((a, b) =>
    (state.entries[b.slug]?.at ?? '').localeCompare(state.entries[a.slug]?.at ?? ''),
  )

  const next = ROUTE_TITLES.find((t) => statusOf(state, t.slug) === 'idle') ?? null

  const optionalDone = OPTIONAL_TITLES.filter((t) => statusOf(state, t.slug) === 'done').length

  return {
    done,
    watching,
    total: ROUTE_TOTAL,
    remaining: ROUTE_TOTAL - done,
    ratio,
    percent,
    minutesTotal: ROUTE_MINUTES,
    minutesWatched,
    minutesLeft: ROUTE_MINUTES - minutesWatched,
    phases,
    optionalDone,
    optionalTotal: OPTIONAL_TITLES.length,
    current: watchingEntries[0] ?? null,
    next,
    lastCompleted: doneEntries[0] ?? null,
    complete: done === ROUTE_TOTAL,
    untouched: done === 0 && watching === 0,
  }
}

/** O título que o app recomenda agora: o que está sendo assistido, senão o próximo da rota. */
export function resolveFocus(progress: Progress): { title: Title; reason: 'watching' | 'next' } | null {
  if (progress.current) return { title: progress.current, reason: 'watching' }
  if (progress.next) return { title: progress.next, reason: 'next' }
  return null
}

export function neighborsOf(slug: string): { prev: Title | null; next: Title | null } {
  const index = ROUTE_TITLES.findIndex((t) => t.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: ROUTE_TITLES[index - 1] ?? null,
    next: ROUTE_TITLES[index + 1] ?? null,
  }
}

export function phaseProgressOf(progress: Progress, phaseId: string): PhaseProgress | undefined {
  return progress.phases.find((p) => p.phase.id === phaseId)
}
