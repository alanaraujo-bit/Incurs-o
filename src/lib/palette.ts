import { PHASE_BY_ID, TITLE_BY_SLUG } from '../data'

/** Resolve o token CSS de cor de uma fase. */
export function phaseColor(phaseId: string): string {
  const accent = PHASE_BY_ID[phaseId]?.accent ?? 'ember'
  return `var(--phase-${accent})`
}

export function accentColor(accent: string): string {
  return `var(--phase-${accent})`
}

/** Cor associada a um título — a da sua fase, exceto o destino. */
export function titleColor(slug: string): string {
  const title = TITLE_BY_SLUG[slug]
  if (!title) return 'var(--accent)'
  if (title.destination) return 'var(--doom)'
  return phaseColor(title.phase)
}

/** Mistura uma cor com o fundo, para preenchimentos suaves. */
export function tint(color: string, percent: number): string {
  return `color-mix(in oklab, ${color} ${percent}%, transparent)`
}
