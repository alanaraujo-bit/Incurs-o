import type { Importance, Universe } from './types'

export * from './types'
export { PHASES, PHASE_BY_ID } from './phases'
export { TITLES, TITLE_BY_SLUG } from './titles'
export { CHARACTERS, CHARACTER_BY_SLUG } from './characters'
export { THREADS, THREAD_BY_ID } from './threads'
export { DOOM_DOSSIER, DOOMSDAY_FACTS, LAST_VERIFIED } from './dossiers'

export const DESTINATION_SLUG = 'doomsday'

export const IMPORTANCE_META: Record<
  Importance,
  { label: string; short: string; description: string; weight: number }
> = {
  core: {
    label: 'Espinha dorsal',
    short: 'Espinha',
    description: 'Sem isto, Doomsday perde sentido ou perde peso. Não pule.',
    weight: 3,
  },
  key: {
    label: 'Alto retorno',
    short: 'Alto retorno',
    description: 'Não é indispensável, mas cada minuto aqui rende diretamente no filme.',
    weight: 2,
  },
  extra: {
    label: 'Dispensável',
    short: 'Dispensável',
    description: 'Enriquece a experiência. Pode ficar para depois sem prejuízo.',
    weight: 1,
  },
}

export const UNIVERSE_META: Record<Universe, { label: string; description: string }> = {
  avengers: { label: 'Vingadores', description: 'O núcleo original do MCU.' },
  multiverse: { label: 'Multiverso', description: 'Variantes, linhas do tempo e realidades vizinhas.' },
  wakanda: { label: 'Wakanda', description: 'A nação soberana e seus vizinhos.' },
  xmen: { label: 'X-Men', description: 'O legado mutante herdado da Fox.' },
  'fantastic-four': { label: 'Quarteto Fantástico', description: 'A família e seu universo próprio.' },
  thunderbolts: { label: 'Thunderbolts', description: 'Os antiheróis que viraram linha de frente.' },
  cosmic: { label: 'Cósmico', description: 'O que existe fora da Terra.' },
  street: { label: 'Terra firme', description: 'Conflito humano, político e sem capa.' },
}

export const CERTAINTY_META = {
  confirmed: {
    label: 'Confirmado',
    description: 'Anunciado pela Marvel Studios, pela Disney ou em evento oficial.',
  },
  interpretation: {
    label: 'Interpretação',
    description: 'Leitura razoável do material divulgado. Não é declaração oficial.',
  },
  theory: {
    label: 'Teoria',
    description: 'Especulação sem confirmação. Tratada aqui como especulação.',
  },
} as const
