import type { Phase } from './types'

export const PHASES: Phase[] = [
  {
    id: 'fundacao',
    index: 1,
    name: 'Fundação',
    fullName: 'Fundação dos Vingadores',
    promise: 'De onde vieram os heróis que ainda estão de pé.',
    objective:
      'Tudo em Doomsday depende de você se importar com essas pessoas. Aqui você conhece Tony Stark, Steve Rogers, Thor e Loki, vê a equipe se formar, se quebrar por dentro e enfrentar a maior derrota da sua história. É o único bloco da rota em que a prioridade não é informação: é peso emocional. Sem ele, o resto vira barulho bonito.',
    accent: 'ember',
  },
  {
    id: 'pos-ultimato',
    index: 2,
    name: 'Pós-Ultimato',
    fullName: 'O mundo depois de Ultimato',
    promise: 'Quem herdou o mundo — e a descoberta do Multiverso.',
    objective:
      'Metade do elenco de Doomsday nasce ou muda de lugar neste bloco. Um novo Capitão América assume o escudo, Wakanda troca de trono e, principalmente, a série do Loki explica as regras que sustentam o filme inteiro: variantes, linhas do tempo e o que acontece quando duas realidades ocupam o mesmo espaço.',
    accent: 'chronal',
  },
  {
    id: 'legado-xmen',
    index: 3,
    name: 'Legado X-Men',
    fullName: 'Legado dos X-Men',
    promise: 'A geração clássica de mutantes que volta em Doomsday.',
    objective:
      'Patrick Stewart, Ian McKellen, James Marsden, Rebecca Romijn, Alan Cumming e Kelsey Grammer estão confirmados em Doomsday. Eles não vêm de um reboot: vêm dos filmes da Fox, feitos fora do MCU. Este bloco existe para que esses rostos cheguem com história, e não como surpresa vazia.',
    accent: 'steel',
  },
  {
    id: 'colisao',
    index: 4,
    name: 'Colisão',
    fullName: 'Colisão entre universos',
    promise: 'Quando franquias de estúdios diferentes passam a coexistir.',
    objective:
      'O passo conceitual mais importante da Saga do Multiverso: personagens atravessando universos e um legado inteiro de filmes externos sendo absorvido pela narrativa principal. Depois deste bloco, ver Magneto e o Quarteto Fantástico no mesmo plano deixa de ser estranho e passa a ser a premissa.',
    accent: 'fracture',
  },
  {
    id: 'estado-atual',
    index: 5,
    name: 'Estado atual',
    fullName: 'Estado atual dos heróis',
    promise: 'Quem está de plantão quando o Doom chega.',
    objective:
      'A fotografia mais recente do time. Um Capitão América ainda provando que merece o escudo e um grupo de antiheróis instáveis ocupando um lugar que não era pra ser deles. É daqui que sai boa parte da linha de frente de Doomsday.',
    accent: 'alert',
  },
  {
    id: 'caminho-direto',
    index: 6,
    name: 'Caminho direto',
    fullName: 'Caminho direto para Doomsday',
    promise: 'A última parada antes do fim.',
    objective:
      'O Quarteto Fantástico chega de um universo próprio, com regras próprias. É o elo mais recente e o mais direto: a família que, nos quadrinhos, tem o Doutor Destino como nêmesis histórico. Depois daqui só existe um destino.',
    accent: 'doom',
  },
]

export const PHASE_BY_ID = Object.fromEntries(PHASES.map((p) => [p.id, p])) as Record<string, Phase>
