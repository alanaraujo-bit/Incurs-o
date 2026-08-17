import { CURRENT_SCHEMA, STORAGE_KEY, createInitialState, migrate, type ProgressState } from './schema'

/**
 * Acesso a localStorage tolerante a falha.
 * Safari em modo privado e navegadores com storage bloqueado não devem quebrar o app;
 * nesses casos a sessão funciona normalmente, apenas sem persistir.
 */

let storageAvailable: boolean | null = null

export function canPersist(): boolean {
  if (storageAvailable !== null) return storageAvailable
  try {
    const probe = '__incursao_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    storageAvailable = true
  } catch {
    storageAvailable = false
  }
  return storageAvailable
}

export function loadState(): ProgressState {
  if (!canPersist()) return createInitialState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    return migrate(JSON.parse(raw))
  } catch {
    return createInitialState()
  }
}

export function saveState(state: ProgressState): boolean {
  if (!canPersist()) return false
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function clearState(): void {
  if (!canPersist()) return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* silencioso por design */
  }
}

export interface ExportPayload {
  app: 'incursao'
  schema: number
  exportedAt: string
  state: ProgressState
}

export function toExportPayload(state: ProgressState): ExportPayload {
  return { app: 'incursao', schema: CURRENT_SCHEMA, exportedAt: new Date().toISOString(), state }
}

export type ImportResult =
  | { ok: true; state: ProgressState; count: number }
  | { ok: false; error: string }

export function parseImport(text: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return { ok: false, error: 'O arquivo não é um JSON válido.' }
  }
  if (!parsed || typeof parsed !== 'object') {
    return { ok: false, error: 'O arquivo não tem o formato esperado.' }
  }
  const payload = parsed as Partial<ExportPayload>
  const candidate = payload.app === 'incursao' && payload.state ? payload.state : parsed
  const state = migrate(candidate)
  const count = Object.keys(state.entries).length
  if (count === 0) {
    return { ok: false, error: 'Nenhum progresso reconhecido dentro do arquivo.' }
  }
  return { ok: true, state, count }
}
