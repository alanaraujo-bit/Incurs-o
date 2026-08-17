/**
 * Contratos do catálogo editorial.
 *
 * Regra do projeto: nenhum texto editorial vive dentro de componente.
 * A UI lê estes tipos; o conteúdo evolui em `src/data/*` sem tocar em interface.
 */

/** Peso editorial de cada produção dentro da preparação para Doomsday. */
export type Importance = 'core' | 'key' | 'extra'

/** Grau de certeza de uma afirmação. Usado para separar fato de leitura e de boato. */
export type Certainty = 'confirmed' | 'interpretation' | 'theory'

export type MediaType = 'film' | 'series'

export type TitleStatus = 'idle' | 'watching' | 'done'

/** Núcleos narrativos — usados em filtros, cores e no mapa de conexões. */
export type Universe =
  | 'avengers'
  | 'multiverse'
  | 'wakanda'
  | 'xmen'
  | 'fantastic-four'
  | 'thunderbolts'
  | 'cosmic'
  | 'street'

export interface PhaseId {
  id: string
}

export interface Phase {
  id: string
  index: number
  /** Nome curto, usado em chips e no mapa. */
  name: string
  /** Nome completo, usado em cabeçalhos. */
  fullName: string
  /** Uma linha: o que esta fase entrega ao espectador. */
  promise: string
  /** Parágrafo editorial: por que esta fase existe na rota. */
  objective: string
  /** Chave do token de cor da fase (ver theme.css: --phase-*). */
  accent: string
}

export interface SpoilerNote {
  /** Rótulo visível antes de revelar: diz do que se trata sem entregar o conteúdo. */
  label: string
  /** Qual título é queimado ao revelar. Usado para liberar automaticamente quem já assistiu. */
  guards: string
  body: string
}

export interface Concept {
  name: string
  body: string
}

export interface TitleConnection {
  /** slug de outro título da rota */
  to: string
  label: string
}

export interface Title {
  slug: string
  name: string
  /** Título original, quando o nome em português difere. */
  originalName?: string
  year: number
  type: MediaType
  /** Duração total aproximada em minutos. Para séries: soma estimada da temporada. */
  runtimeMinutes: number
  episodes?: number
  /** Média por episódio, em minutos. Apenas para séries. */
  episodeMinutes?: number
  phase: string
  importance: Importance
  universes: Universe[]
  /**
   * Posição na rota principal (1..30). `null` = complementar fora da contagem.
   * O destino final (Doomsday) usa `order` acima da rota e `destination: true`.
   */
  order: number | null
  /** Verdadeiro apenas para Avengers: Doomsday. */
  destination?: boolean
  /** Se falso, o título não pode ser marcado como assistido (ainda não lançado). */
  markable: boolean
  /** Uma frase que resume a obra sem estragar nada. */
  logline: string
  /** O papel que a obra cumpre DENTRO da maratona — não é sinopse. */
  role: string
  /** Resposta direta a "por que isso importa para Doomsday?". */
  whyDoomsday: string
  /** Contexto de entrada: o que saber antes de apertar play. Livre de spoiler. */
  context: string
  /** Informação que só faz sentido para quem já assistiu. Fica protegida. */
  spoilers?: SpoilerNote[]
  concepts?: Concept[]
  /** slugs de personagens relevantes introduzidos ou desenvolvidos aqui. */
  characters: string[]
  connections?: TitleConnection[]
  /** Nota curta para quem quer economizar tempo. */
  shortcut?: string
}

export interface CharacterAppearance {
  title: string
  note: string
}

export interface Character {
  slug: string
  name: string
  actor: string
  /** Uma linha de identidade, sem spoiler. */
  tagline: string
  universes: Universe[]
  /** O que o usuário precisa ter entendido sobre a pessoa antes de Doomsday. */
  primer: string
  appearances: CharacterAppearance[]
  /** Presença em Doomsday, sempre acompanhada do grau de certeza. */
  doomsday: {
    certainty: Certainty
    note: string
  }
}

export interface ThreadStep {
  /** slug de título OU de personagem, conforme `kind`. */
  ref: string
  kind: 'title' | 'character'
  label: string
  note: string
}

/** Fio narrativo: a forma como o produto mostra que as obras não são ilhas. */
export interface Thread {
  id: string
  name: string
  question: string
  summary: string
  accent: string
  steps: ThreadStep[]
}

export interface Claim {
  certainty: Certainty
  text: string
  source?: string
}

export interface DossierSection {
  id: string
  title: string
  body: string
  claims?: Claim[]
}
