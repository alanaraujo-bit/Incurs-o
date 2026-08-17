import type { Thread } from './types'

/**
 * Fios narrativos: a resposta visual à pergunta "por que estes títulos, juntos?".
 * Cada fio é uma linha que atravessa a rota e desemboca em Doomsday.
 */
export const THREADS: Thread[] = [
  {
    id: 'escudo',
    name: 'O escudo',
    question: 'Quem é o Capitão América hoje?',
    summary:
      'O manto mais simbólico da franquia passa por três homens em quinze anos. Doomsday começa com o terceiro deles no cargo — e com o primeiro de volta.',
    accent: 'ember',
    steps: [
      { ref: 'capitao-america-o-primeiro-vingador', kind: 'title', label: 'Steve recebe o escudo', note: 'Um voluntário improvável vira símbolo nacional.' },
      { ref: 'capitao-america-o-soldado-invernal', kind: 'title', label: 'Sam entra em cena', note: 'O parceiro que voa aparece pela primeira vez.' },
      { ref: 'vingadores-ultimato', kind: 'title', label: 'A passagem', note: 'Steve escolhe seu sucessor.' },
      { ref: 'falcao-e-o-soldado-invernal', kind: 'title', label: 'O cargo é disputado', note: 'O governo nomeia outro homem. Sam precisa decidir se aceita o peso.' },
      { ref: 'capitao-america-admiravel-mundo-novo', kind: 'title', label: 'Sam em serviço', note: 'O Capitão América atual, sem soro e sem rede de apoio.' },
      { ref: 'doomsday', kind: 'title', label: 'Os dois na mesma tela', note: 'Chris Evans e Anthony Mackie estão ambos confirmados no elenco.' },
    ],
  },
  {
    id: 'multiverso',
    name: 'A abertura do Multiverso',
    question: 'Por que existem várias realidades agora?',
    summary:
      'Nenhum outro fio importa tanto. Ele começa como nota de rodapé sobre magia e termina com um Multiverso sem vigilância — o cenário em que Doomsday acontece.',
    accent: 'chronal',
    steps: [
      { ref: 'doutor-estranho', kind: 'title', label: 'A palavra é dita', note: 'O universo admite que pode não ser único.' },
      { ref: 'vingadores-ultimato', kind: 'title', label: 'O acidente', note: 'Viajar ao passado cria ramificações.' },
      { ref: 'loki-t1', kind: 'title', label: 'As regras', note: 'Variantes, ramificações e uma linha do tempo mantida à força.' },
      { ref: 'homem-aranha-sem-volta-para-casa', kind: 'title', label: 'A demonstração', note: 'Gente de outros universos entra neste.' },
      { ref: 'doutor-estranho-no-multiverso-da-loucura', kind: 'title', label: 'A paisagem', note: 'Universos com regras e heróis próprios — e a palavra "incursão".' },
      { ref: 'loki-t2', kind: 'title', label: 'A abertura', note: 'O controle acaba. As realidades passam a coexistir.' },
      { ref: 'doomsday', kind: 'title', label: 'A colisão', note: 'Heróis de três universos em rota de colisão.' },
    ],
  },
  {
    id: 'mutantes',
    name: 'O legado mutante',
    question: 'Como os X-Men da Fox chegaram até aqui?',
    summary:
      'Uma franquia inteira feita por outro estúdio é incorporada à história principal — sem reboot, com os mesmos atores, tratada como um universo vizinho legítimo.',
    accent: 'steel',
    steps: [
      { ref: 'x-men', kind: 'title', label: 'A geração clássica', note: 'Xavier, Magneto, Ciclope e Mística.' },
      { ref: 'x-men-2', kind: 'title', label: 'Noturno entra', note: 'Alan Cumming estreia no papel.' },
      { ref: 'x-men-o-confronto-final', kind: 'title', label: 'Fera entra', note: 'Kelsey Grammer estreia no papel.' },
      { ref: 'x-men-dias-de-um-futuro-esquecido', kind: 'title', label: 'Tempo reescrito', note: 'A franquia usa viagem temporal para se reorganizar.' },
      { ref: 'deadpool-e-wolverine', kind: 'title', label: 'A travessia', note: 'O legado da Fox passa a existir dentro da lógica do MCU.' },
      { ref: 'doomsday', kind: 'title', label: 'De volta em cena', note: 'Stewart, McKellen, Marsden, Romijn, Cumming e Grammer confirmados.' },
    ],
  },
  {
    id: 'wakanda',
    name: 'O trono de Wakanda',
    question: 'Quem representa Wakanda em Doomsday?',
    summary:
      'Uma nação soberana com tecnologia superior à de qualquer potência — e uma crise de sucessão que muda quem fala por ela.',
    accent: 'fracture',
    steps: [
      { ref: 'capitao-america-guerra-civil', kind: 'title', label: 'Wakanda aparece', note: 'A nação entra na política do mundo.' },
      { ref: 'pantera-negra', kind: 'title', label: 'O reino por dentro', note: 'Shuri e M’Baku são apresentados.' },
      { ref: 'pantera-negra-wakanda-para-sempre', kind: 'title', label: 'Nova liderança', note: 'Shuri assume o manto; Namor entra como potência rival.' },
      { ref: 'doomsday', kind: 'title', label: 'Núcleo confirmado', note: 'Letitia Wright, Winston Duke e Tenoch Huerta Mejía no elenco.' },
    ],
  },
  {
    id: 'novos-vingadores',
    name: 'Os Novos Vingadores',
    question: 'Quem atende ao chamado se os originais não estão mais lá?',
    summary:
      'A equipe que ocupa o lugar dos Vingadores não foi escolhida por mérito. Foi o que sobrou — e é a linha de frente de Doomsday.',
    accent: 'alert',
    steps: [
      { ref: 'viuva-negra', kind: 'title', label: 'A família falsa', note: 'Yelena e o Guardião Vermelho entram na história.' },
      { ref: 'falcao-e-o-soldado-invernal', kind: 'title', label: 'O soldado errado', note: 'John Walker recebe um cargo grande demais.' },
      { ref: 'thunderbolts', kind: 'title', label: 'O time se forma', note: 'Seis atores deste filme estão confirmados em Doomsday.' },
      { ref: 'doomsday', kind: 'title', label: 'Em serviço', note: 'Pugh, Harbour, Russell, John-Kamen, Pullman e Stan.' },
    ],
  },
  {
    id: 'quarteto',
    name: 'A família e o inimigo',
    question: 'Por que o Quarteto Fantástico é a última parada?',
    summary:
      'Nos quadrinhos, Victor von Doom e Reed Richards são adversários desde a origem. O filme do Quarteto é o vizinho mais próximo do vilão de Doomsday.',
    accent: 'doom',
    steps: [
      { ref: 'quarteto-fantastico-primeiros-passos', kind: 'title', label: 'Um universo próprio', note: 'Os quatro chegam de uma realidade com regras próprias.' },
      { ref: 'reed-richards', kind: 'character', label: 'Reed Richards', note: 'O rival intelectual histórico do Doutor Destino.' },
      { ref: 'doctor-doom', kind: 'character', label: 'Victor von Doom', note: 'Robert Downey Jr., confirmado desde julho de 2024.' },
      { ref: 'doomsday', kind: 'title', label: 'O encontro', note: 'O Quarteto inteiro está confirmado no elenco.' },
    ],
  },
]

export const THREAD_BY_ID = Object.fromEntries(THREADS.map((t) => [t.id, t])) as Record<string, Thread>
