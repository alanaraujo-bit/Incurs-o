import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { TITLE_BY_SLUG, type TitleStatus } from '../data'
import { computeProgress, type Progress } from '../lib/selectors'
import { createInitialState, type ProgressState, type SavedStatus } from './schema'
import { canPersist, clearState, loadState, saveState } from './storage'

export interface CompletionEvent {
  slug: string
  /** Fase concluída por este marcador, se foi o caso. */
  phaseCompleted: string | null
  /** Rota inteira concluída neste marcador. */
  routeCompleted: boolean
  at: number
}

interface ProgressApi {
  state: ProgressState
  progress: Progress
  ready: boolean
  persistent: boolean
  /** Última conclusão, para disparar celebração. Consumidor limpa com `ackCompletion`. */
  completion: CompletionEvent | null
  ackCompletion: () => void
  setStatus: (slug: string, status: TitleStatus) => void
  toggleDone: (slug: string) => void
  reveal: (key: string) => void
  isRevealed: (key: string) => boolean
  setSpoilerPolicy: (policy: ProgressState['spoilerPolicy']) => void
  completeOnboarding: () => void
  replaceState: (next: ProgressState) => void
  reset: () => void
}

const ProgressCtx = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(createInitialState)
  const [ready, setReady] = useState(false)
  const [completion, setCompletion] = useState<CompletionEvent | null>(null)
  const persistent = useRef(true)
  /** Último slug marcado como concluído, aguardando avaliação de marco. */
  const lastMarked = useRef<string | null>(null)
  const previousProgress = useRef<Progress | null>(null)

  // Hidratação síncrona no primeiro efeito evita flash de estado vazio.
  useEffect(() => {
    setState(loadState())
    persistent.current = canPersist()
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    saveState(state)
  }, [state, ready])

  // Mantém abas/janelas da mesma origem em sincronia.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key !== 'incursao.progress') return
      setState(loadState())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const progress = useMemo(() => computeProgress(state), [state])

  const setStatus = useCallback((slug: string, status: TitleStatus) => {
    const title = TITLE_BY_SLUG[slug]
    if (!title || !title.markable) return

    // O updater é mantido puro: a detecção de marco acontece no efeito abaixo,
    // comparando o progresso derivado com o anterior.
    if (status === 'done') lastMarked.current = slug

    setState((prev) => {
      const entries = { ...prev.entries }
      if (status === 'idle') delete entries[slug]
      else entries[slug] = { status: status as SavedStatus, at: new Date().toISOString() }
      return { ...prev, entries, updatedAt: new Date().toISOString() }
    })
  }, [])

  /**
   * Detecção de marco (fase fechada / rota concluída).
   * Roda uma única vez por transição real de progresso, independentemente de
   * quantas vezes o React reexecute o updater em StrictMode.
   */
  useEffect(() => {
    const previous = previousProgress.current
    previousProgress.current = progress
    if (!ready || !previous) return

    const slug = lastMarked.current
    if (!slug) return
    lastMarked.current = null

    const title = TITLE_BY_SLUG[slug]
    if (!title || title.order === null || title.destination) return

    const phaseBefore = previous.phases.find((p) => p.phase.id === title.phase)
    const phaseAfter = progress.phases.find((p) => p.phase.id === title.phase)
    const phaseCompleted = !phaseBefore?.complete && phaseAfter?.complete ? title.phase : null
    const routeCompleted = !previous.complete && progress.complete

    if (!phaseCompleted && !routeCompleted) return
    setCompletion({ slug, phaseCompleted, routeCompleted, at: Date.now() })
  }, [progress, ready])

  const toggleDone = useCallback(
    (slug: string) => {
      setStatus(slug, state.entries[slug]?.status === 'done' ? 'idle' : 'done')
    },
    [setStatus, state.entries],
  )

  const reveal = useCallback((key: string) => {
    setState((prev) =>
      prev.revealed.includes(key)
        ? prev
        : { ...prev, revealed: [...prev.revealed, key], updatedAt: new Date().toISOString() },
    )
  }, [])

  const isRevealed = useCallback(
    (key: string) => state.spoilerPolicy === 'open' || state.revealed.includes(key),
    [state.revealed, state.spoilerPolicy],
  )

  const setSpoilerPolicy = useCallback((spoilerPolicy: ProgressState['spoilerPolicy']) => {
    setState((prev) => ({ ...prev, spoilerPolicy, updatedAt: new Date().toISOString() }))
  }, [])

  const completeOnboarding = useCallback(() => {
    setState((prev) => (prev.onboarded ? prev : { ...prev, onboarded: true }))
  }, [])

  const replaceState = useCallback((next: ProgressState) => {
    setState({ ...next, onboarded: true, updatedAt: new Date().toISOString() })
  }, [])

  const reset = useCallback(() => {
    clearState()
    setState({ ...createInitialState(), onboarded: true })
    setCompletion(null)
  }, [])

  const value = useMemo<ProgressApi>(
    () => ({
      state,
      progress,
      ready,
      persistent: persistent.current,
      completion,
      ackCompletion: () => setCompletion(null),
      setStatus,
      toggleDone,
      reveal,
      isRevealed,
      setSpoilerPolicy,
      completeOnboarding,
      replaceState,
      reset,
    }),
    [
      state,
      progress,
      ready,
      completion,
      setStatus,
      toggleDone,
      reveal,
      isRevealed,
      setSpoilerPolicy,
      completeOnboarding,
      replaceState,
      reset,
    ],
  )

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressCtx)
  if (!ctx) throw new Error('useProgress precisa estar dentro de <ProgressProvider>')
  return ctx
}
