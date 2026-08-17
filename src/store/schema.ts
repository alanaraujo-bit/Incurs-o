import type { TitleStatus } from '../data/types'

export const STORAGE_KEY = 'incursao.progress'
export const CURRENT_SCHEMA = 1

export type SavedStatus = Exclude<TitleStatus, 'idle'>

export interface StatusEntry {
  status: SavedStatus
  /** ISO. Usado para descobrir "onde parei" e para ordenar o histórico. */
  at: string
}

export interface ProgressState {
  schema: number
  createdAt: string
  updatedAt: string
  /** slug -> status. Ausência significa "não iniciado". */
  entries: Record<string, StatusEntry>
  /** Notas de spoiler reveladas manualmente. Chave: `${slug}#${index}`. */
  revealed: string[]
  /** `guard` protege spoilers; `open` mostra tudo (escolha consciente do usuário). */
  spoilerPolicy: 'guard' | 'open'
  onboarded: boolean
}

export const EMPTY_STATE: ProgressState = {
  schema: CURRENT_SCHEMA,
  createdAt: '',
  updatedAt: '',
  entries: {},
  revealed: [],
  spoilerPolicy: 'guard',
  onboarded: false,
}

export function createInitialState(): ProgressState {
  const now = new Date().toISOString()
  return { ...EMPTY_STATE, createdAt: now, updatedAt: now }
}

/**
 * Normaliza qualquer payload (localStorage antigo, arquivo importado) para o
 * schema atual. Nunca lança: dados corrompidos viram estado inicial.
 * Novas versões de schema entram como passos adicionais aqui.
 */
export function migrate(raw: unknown): ProgressState {
  if (!raw || typeof raw !== 'object') return createInitialState()
  const input = raw as Partial<ProgressState> & Record<string, unknown>

  const entries: Record<string, StatusEntry> = {}
  const source = input.entries
  if (source && typeof source === 'object') {
    for (const [slug, value] of Object.entries(source as Record<string, unknown>)) {
      if (typeof slug !== 'string' || !slug) continue
      if (typeof value === 'string') {
        // Formato hipotético anterior: slug -> status simples.
        if (value === 'done' || value === 'watching') {
          entries[slug] = { status: value, at: new Date(0).toISOString() }
        }
        continue
      }
      if (value && typeof value === 'object') {
        const entry = value as Partial<StatusEntry>
        if (entry.status === 'done' || entry.status === 'watching') {
          entries[slug] = {
            status: entry.status,
            at: typeof entry.at === 'string' ? entry.at : new Date(0).toISOString(),
          }
        }
      }
    }
  }

  const now = new Date().toISOString()
  return {
    schema: CURRENT_SCHEMA,
    createdAt: typeof input.createdAt === 'string' && input.createdAt ? input.createdAt : now,
    updatedAt: typeof input.updatedAt === 'string' && input.updatedAt ? input.updatedAt : now,
    entries,
    revealed: Array.isArray(input.revealed) ? input.revealed.filter((v) => typeof v === 'string') : [],
    spoilerPolicy: input.spoilerPolicy === 'open' ? 'open' : 'guard',
    onboarded: input.onboarded === true,
  }
}
