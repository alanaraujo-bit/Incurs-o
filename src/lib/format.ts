/** Formatação de tempo e números. Português do Brasil, tom seco. */

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return '0 min'
  const hours = Math.floor(minutes / 60)
  const rest = Math.round(minutes % 60)
  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours} h`
  return `${hours} h ${rest} min`
}

/** Versão compacta para telemetria e cards: "32h", "1h40". */
export function formatDurationCompact(minutes: number): string {
  if (minutes <= 0) return '0h'
  const hours = Math.floor(minutes / 60)
  const rest = Math.round(minutes % 60)
  if (hours === 0) return `${rest}min`
  if (rest === 0) return `${hours}h`
  return `${hours}h${String(rest).padStart(2, '0')}`
}

/** Estimativa de calendário: "cerca de 11 dias a 3h por dia". */
export function estimateDays(minutes: number, minutesPerDay = 180): number {
  return Math.max(0, Math.ceil(minutes / minutesPerDay))
}

export function formatRelativeDate(iso: string): string {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Date.now() - then
  const day = 86_400_000
  if (diff < 60_000) return 'agora'
  if (diff < 3_600_000) return `há ${Math.floor(diff / 60_000)} min`
  if (diff < day) return `há ${Math.floor(diff / 3_600_000)} h`
  if (diff < 2 * day) return 'ontem'
  if (diff < 30 * day) return `há ${Math.floor(diff / day)} dias`
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(then)
}

export function formatDate(iso: string): string {
  const time = new Date(iso).getTime()
  if (Number.isNaN(time)) return ''
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(time)
}

const DOOMSDAY_RELEASE = new Date('2026-12-18T00:00:00-03:00')

export function daysUntilRelease(): number {
  return Math.max(0, Math.ceil((DOOMSDAY_RELEASE.getTime() - Date.now()) / 86_400_000))
}

export function releaseDateLabel(): string {
  return '18 de dezembro de 2026'
}

/** Hash estável de string → 0..1. Usado para gerar sigilos por título sem imagens. */
export function hashUnit(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

export function pluralize(count: number, one: string, many: string): string {
  return count === 1 ? one : many
}
