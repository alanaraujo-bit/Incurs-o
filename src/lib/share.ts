import type { Progress } from './selectors'
import { formatDurationCompact } from './format'

/**
 * Compartilhamento sem backend: Web Share API quando existe,
 * cópia para a área de transferência como alternativa universal.
 */

export interface SharePayload {
  title: string
  text: string
  url: string
}

export function progressShare(progress: Progress): SharePayload {
  const text = progress.complete
    ? `Terminei a maratona: 100% preparado para Avengers: Doomsday. ${progress.total} produções, ${formatDurationCompact(progress.minutesWatched)} de filme e série.`
    : `Estou ${progress.percent}% preparado para Avengers: Doomsday — ${progress.done} de ${progress.total} produções, faltam ${formatDurationCompact(progress.minutesLeft)}.`
  return {
    title: 'Incursão — rota até Avengers: Doomsday',
    text,
    url: `${location.origin}/`,
  }
}

export function titleShare(name: string, slug: string, why: string): SharePayload {
  return {
    title: `${name} — Incursão`,
    text: `${name} está na rota até Avengers: Doomsday. ${why}`,
    url: `${location.origin}/titulo/${slug}`,
  }
}

export function phaseShare(phaseName: string, index: number): SharePayload {
  return {
    title: 'Incursão',
    text: `Fase ${index} concluída: ${phaseName}. Seguindo a rota até Avengers: Doomsday.`,
    url: `${location.origin}/rota`,
  }
}

export type ShareOutcome = 'shared' | 'copied' | 'failed'

export async function share(payload: SharePayload): Promise<ShareOutcome> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(payload)
      return 'shared'
    } catch (error) {
      // Cancelamento do usuário não é erro e não deve virar aviso.
      if (error instanceof DOMException && error.name === 'AbortError') return 'shared'
    }
  }
  return copy(`${payload.text}\n${payload.url}`)
}

export async function copy(text: string): Promise<ShareOutcome> {
  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(area)
      return ok ? 'copied' : 'failed'
    } catch {
      return 'failed'
    }
  }
}

export function downloadFile(filename: string, contents: string, type = 'application/json') {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
