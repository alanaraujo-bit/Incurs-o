import type { Character } from './types'

/**
 * Elenco relevante para a preparação.
 *
 * `doomsday.certainty` separa presença anunciada oficialmente (confirmed) de
 * leitura razoável do material divulgado (interpretation) e de boato (theory).
 * A UI nunca mistura os três.
 */
export const CHARACTERS: Character[] = [
  {
    slug: 'steve-rogers',
    name: 'Steve Rogers',
    actor: 'Chris Evans',
    tagline: 'O primeiro Capitão América.',
    universes: ['avengers'],
    primer:
      'Um homem que foi escolhido por não querer poder. Sua régua não muda: lealdade acima de ordem. É por isso que ele rompe com Tony e nunca abandona Bucky.',
    appearances: [
      { title: 'capitao-america-o-primeiro-vingador', note: 'Origem' },
      { title: 'os-vingadores', note: 'Lidera a equipe' },
      { title: 'capitao-america-o-soldado-invernal', note: 'Perde a fé na instituição' },
      { title: 'capitao-america-guerra-civil', note: 'Rompe com Tony' },
      { title: 'vingadores-ultimato', note: 'Encerramento do arco' },
    ],
    doomsday: {
      certainty: 'confirmed',
      note: 'Chris Evans está confirmado no elenco e subiu ao palco da D23 2026 junto com a equipe do filme. Em que condição Steve aparece não foi divulgado.',
    },
  },
  {
    slug: 'tony-stark',
    name: 'Tony Stark',
    actor: 'Robert Downey Jr.',
    tagline: 'O Homem de Ferro. O primeiro rosto do universo inteiro.',
    universes: ['avengers'],
    primer:
      'Genial, arrogante e movido a culpa. Toda decisão ruim dele nasce da tentativa de blindar o mundo contra a próxima catástrofe.',
    appearances: [
      { title: 'homem-de-ferro', note: 'Origem' },
      { title: 'vingadores-era-de-ultron', note: 'A decisão que racha o time' },
      { title: 'capitao-america-guerra-civil', note: 'Lado oposto ao de Steve' },
      { title: 'vingadores-ultimato', note: 'Encerramento do arco' },
    ],
    doomsday: {
      certainty: 'theory',
      note: 'O que está confirmado é o ator, não o personagem: Robert Downey Jr. volta em Doomsday como Victor von Doom. A presença de Tony Stark em si nunca foi anunciada pela Marvel Studios, e qualquer ligação entre os dois papéis permanece especulação.',
    },
  },
  {
    slug: 'sam-wilson',
    name: 'Sam Wilson',
    actor: 'Anthony Mackie',
    tagline: 'O Capitão América atual.',
    universes: ['avengers', 'street'],
    primer:
      'Recebeu o escudo de Steve e passou uma série inteira decidindo se tinha o direito de usá-lo. Não tem soro de super-soldado: compensa com asas, disciplina e teimosia.',
    appearances: [
      { title: 'capitao-america-o-soldado-invernal', note: 'Estreia' },
      { title: 'vingadores-ultimato', note: 'Recebe o escudo' },
      { title: 'falcao-e-o-soldado-invernal', note: 'Aceita o cargo' },
      { title: 'capitao-america-admiravel-mundo-novo', note: 'Primeiro caso como Capitão' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Anthony Mackie está confirmado no elenco.' },
  },
  {
    slug: 'bucky-barnes',
    name: 'Bucky Barnes',
    actor: 'Sebastian Stan',
    tagline: 'O Soldado Invernal.',
    universes: ['avengers', 'thunderbolts'],
    primer:
      'Amigo de infância de Steve, transformado em arma contra a própria vontade. A rota inteira dele é sobre reparação — e ele termina em Thunderbolts*, não ao lado dos Vingadores clássicos.',
    appearances: [
      { title: 'capitao-america-o-primeiro-vingador', note: 'Origem' },
      { title: 'capitao-america-o-soldado-invernal', note: 'Reaparece' },
      { title: 'capitao-america-guerra-civil', note: 'Estopim do conflito' },
      { title: 'falcao-e-o-soldado-invernal', note: 'Acerto de contas' },
      { title: 'thunderbolts', note: 'Novo posto' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Sebastian Stan está confirmado no elenco.' },
  },
  {
    slug: 'peggy-carter',
    name: 'Peggy Carter',
    actor: 'Hayley Atwell',
    tagline: 'A oficial que acreditou em Steve antes de todo mundo.',
    universes: ['avengers', 'multiverse'],
    primer:
      'Cofundadora da estrutura de inteligência que domina a primeira metade da rota. Sua relação com Steve é o fio afetivo mais antigo da franquia.',
    appearances: [{ title: 'capitao-america-o-primeiro-vingador', note: 'Origem' }],
    doomsday: {
      certainty: 'interpretation',
      note: 'Hayley Atwell participou da apresentação oficial de Doomsday na D23 2026 ao lado do elenco, o que indica envolvimento. O papel específico — se Peggy, se uma variante — não foi confirmado pela Marvel Studios.',
    },
  },
  {
    slug: 'thor',
    name: 'Thor',
    actor: 'Chris Hemsworth',
    tagline: 'O deus do trovão, sem reino e sem família.',
    universes: ['avengers', 'cosmic'],
    primer:
      'Começa arrogante e termina como o Vingador que mais perdeu. Cada filme tira alguma coisa dele: o trono, o martelo, o povo, o irmão.',
    appearances: [
      { title: 'thor', note: 'Origem' },
      { title: 'thor-ragnarok', note: 'Reinvenção' },
      { title: 'vingadores-guerra-infinita', note: 'Perda máxima' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Chris Hemsworth está confirmado no elenco.' },
  },
  {
    slug: 'loki',
    name: 'Loki',
    actor: 'Tom Hiddleston',
    tagline: 'O deus da trapaça — e a chave do Multiverso.',
    universes: ['multiverse', 'avengers'],
    primer:
      'Vilão do primeiro Vingadores, protagonista da série mais importante da Fase 2. Se você entende o Loki, você entende as regras que Doomsday usa.',
    appearances: [
      { title: 'thor', note: 'Origem' },
      { title: 'os-vingadores', note: 'Antagonista' },
      { title: 'thor-ragnarok', note: 'Virada' },
      { title: 'loki-t1', note: 'As regras do tempo' },
      { title: 'loki-t2', note: 'O estado atual do Multiverso' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Tom Hiddleston está confirmado no elenco.' },
  },
  {
    slug: 'wanda-maximoff',
    name: 'Wanda Maximoff',
    actor: 'Elizabeth Olsen',
    tagline: 'A Feiticeira Escarlate.',
    universes: ['multiverse', 'avengers'],
    primer:
      'O poder mais destrutivo da rota, movido inteiramente por luto. É por ela que o público aprende que realidade, no MCU, é negociável.',
    appearances: [
      { title: 'vingadores-era-de-ultron', note: 'Estreia' },
      { title: 'wandavision', note: 'A dobra da realidade' },
      { title: 'doutor-estranho-no-multiverso-da-loucura', note: 'Multiverso' },
    ],
    doomsday: {
      certainty: 'theory',
      note: 'Não há confirmação oficial de participação em Doomsday. Ela permanece nesta lista pela relevância dos conceitos que carrega, não por elenco anunciado.',
    },
  },
  {
    slug: 'doctor-strange',
    name: 'Doutor Estranho',
    actor: 'Benedict Cumberbatch',
    tagline: 'O homem que abriu a porta do Multiverso.',
    universes: ['multiverse'],
    primer:
      'Cirurgião virado feiticeiro. Comete o erro que gera Sem Volta Para Casa e conhece, de primeira mão, o que é uma incursão.',
    appearances: [
      { title: 'doutor-estranho', note: 'Origem' },
      { title: 'homem-aranha-sem-volta-para-casa', note: 'O feitiço' },
      { title: 'doutor-estranho-no-multiverso-da-loucura', note: 'Travessia' },
    ],
    doomsday: {
      certainty: 'theory',
      note: 'Não figura entre os nomes anunciados oficialmente pela Marvel Studios até agora.',
    },
  },
  {
    slug: 'shuri',
    name: 'Shuri',
    actor: 'Letitia Wright',
    tagline: 'Cientista, princesa e a Pantera Negra atual.',
    universes: ['wakanda'],
    primer:
      'Construía a tecnologia que outros usavam até precisar assumir o manto ela mesma. Chega em Doomsday como líder, não como coadjuvante.',
    appearances: [
      { title: 'pantera-negra', note: 'Estreia' },
      { title: 'pantera-negra-wakanda-para-sempre', note: 'Assume o manto' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Letitia Wright está confirmada no elenco.' },
  },
  {
    slug: 'mbaku',
    name: 'M’Baku',
    actor: 'Winston Duke',
    tagline: 'Líder da tribo Jabari.',
    universes: ['wakanda'],
    primer: 'Oposição legítima dentro de Wakanda. Discorda do trono sem trair o país.',
    appearances: [
      { title: 'pantera-negra', note: 'Estreia' },
      { title: 'pantera-negra-wakanda-para-sempre', note: 'Peso político' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Winston Duke está confirmado no elenco.' },
  },
  {
    slug: 'namor',
    name: 'Namor',
    actor: 'Tenoch Huerta Mejía',
    tagline: 'Soberano de Talokan.',
    universes: ['wakanda'],
    primer:
      'Governa uma civilização submarina antiga e não reconhece autoridade nenhuma acima da sua. Não é vilão nem aliado: é uma potência.',
    appearances: [{ title: 'pantera-negra-wakanda-para-sempre', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Tenoch Huerta Mejía está confirmado no elenco.' },
  },
  {
    slug: 'shang-chi',
    name: 'Shang-Chi',
    actor: 'Simu Liu',
    tagline: 'Portador dos Dez Anéis.',
    universes: ['avengers'],
    primer:
      'Treinado desde criança para matar, passou a vida fugindo disso. Carrega artefatos cuja origem o próprio MCU ainda não explicou.',
    appearances: [{ title: 'shang-chi', note: 'Origem' }],
    doomsday: { certainty: 'confirmed', note: 'Simu Liu está confirmado no elenco.' },
  },
  {
    slug: 'yelena-belova',
    name: 'Yelena Belova',
    actor: 'Florence Pugh',
    tagline: 'A Viúva Negra atual, e o centro emocional dos Thunderbolts.',
    universes: ['thunderbolts'],
    primer:
      'Criada no mesmo programa que Natasha. Seca, engraçada e a única do grupo que enxerga o que os outros estão evitando.',
    appearances: [
      { title: 'viuva-negra', note: 'Estreia' },
      { title: 'thunderbolts', note: 'Protagonista de fato' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Florence Pugh está confirmada no elenco.' },
  },
  {
    slug: 'red-guardian',
    name: 'Guardião Vermelho',
    actor: 'David Harbour',
    tagline: 'O super-soldado soviético que virou pai postiço.',
    universes: ['thunderbolts'],
    primer: 'Vaidoso, ridículo e sinceramente afetuoso. É o alívio cômico que sustenta o núcleo dos Thunderbolts.',
    appearances: [
      { title: 'viuva-negra', note: 'Estreia' },
      { title: 'thunderbolts', note: 'Reencontro com Yelena' },
    ],
    doomsday: { certainty: 'confirmed', note: 'David Harbour está confirmado no elenco.' },
  },
  {
    slug: 'john-walker',
    name: 'John Walker',
    actor: 'Wyatt Russell',
    tagline: 'O Capitão América que o governo escolheu. Hoje, Agente Americano.',
    universes: ['thunderbolts', 'street'],
    primer:
      'Um soldado condecorado colocado num cargo simbólico grande demais. O que ele faz sob pressão define tudo o que vem depois.',
    appearances: [
      { title: 'falcao-e-o-soldado-invernal', note: 'Estreia' },
      { title: 'thunderbolts', note: 'Redenção parcial' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Wyatt Russell está confirmado no elenco.' },
  },
  {
    slug: 'ghost',
    name: 'Fantasma',
    actor: 'Hannah John-Kamen',
    tagline: 'Ava Starr, presa entre estados de matéria.',
    universes: ['thunderbolts'],
    primer:
      'Atravessa sólidos por causa de um acidente que também a mantém em dor constante. Chegou aos Thunderbolts vinda dos filmes do Homem-Formiga.',
    appearances: [{ title: 'thunderbolts', note: 'Integra o grupo' }],
    doomsday: { certainty: 'confirmed', note: 'Hannah John-Kamen está confirmada no elenco.' },
  },
  {
    slug: 'sentry-bob',
    name: 'Sentinela / Bob',
    actor: 'Lewis Pullman',
    tagline: 'O ser mais poderoso da rota, e o mais instável.',
    universes: ['thunderbolts'],
    primer:
      'Um homem comum com poder desproporcional e saúde mental frágil. É o elemento imprevisível que os Thunderbolts levam consigo.',
    appearances: [{ title: 'thunderbolts', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Lewis Pullman está confirmado no elenco.' },
  },
  {
    slug: 'joaquin-torres',
    name: 'Joaquín Torres',
    actor: 'Danny Ramirez',
    tagline: 'O novo Falcão.',
    universes: ['avengers', 'street'],
    primer: 'Herda as asas de Sam quando Sam herda o escudo. Jovem, competente e ainda se provando.',
    appearances: [
      { title: 'falcao-e-o-soldado-invernal', note: 'Estreia' },
      { title: 'capitao-america-admiravel-mundo-novo', note: 'Assume o manto' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Danny Ramirez está confirmado no elenco.' },
  },
  {
    slug: 'reed-richards',
    name: 'Reed Richards',
    actor: 'Pedro Pascal',
    tagline: 'Senhor Fantástico. O homem mais inteligente do seu universo.',
    universes: ['fantastic-four'],
    primer:
      'Cientista que responde a qualquer crise com um quadro-negro. A família é, ao mesmo tempo, sua equipe e seu ponto cego.',
    appearances: [{ title: 'quarteto-fantastico-primeiros-passos', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Pedro Pascal está confirmado no elenco.' },
  },
  {
    slug: 'sue-storm',
    name: 'Sue Storm',
    actor: 'Vanessa Kirby',
    tagline: 'Mulher Invisível. O eixo real do Quarteto.',
    universes: ['fantastic-four'],
    primer: 'Diplomata, estrategista e a mais poderosa dos quatro em campo aberto.',
    appearances: [{ title: 'quarteto-fantastico-primeiros-passos', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Vanessa Kirby está confirmada no elenco.' },
  },
  {
    slug: 'johnny-storm',
    name: 'Johnny Storm',
    actor: 'Joseph Quinn',
    tagline: 'Tocha Humana.',
    universes: ['fantastic-four'],
    primer: 'Impulsivo, midiático e mais capaz do que aparenta. Irmão mais novo de Sue.',
    appearances: [{ title: 'quarteto-fantastico-primeiros-passos', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Joseph Quinn está confirmado no elenco.' },
  },
  {
    slug: 'ben-grimm',
    name: 'Ben Grimm',
    actor: 'Ebon Moss-Bachrach',
    tagline: 'O Coisa.',
    universes: ['fantastic-four'],
    primer: 'Pagou o preço físico mais alto da transformação. É o coração do grupo.',
    appearances: [{ title: 'quarteto-fantastico-primeiros-passos', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Ebon Moss-Bachrach está confirmado no elenco.' },
  },
  {
    slug: 'professor-x',
    name: 'Professor Xavier',
    actor: 'Patrick Stewart',
    tagline: 'Fundador dos X-Men. O telepata mais poderoso do seu mundo.',
    universes: ['xmen'],
    primer:
      'Acredita na convivência entre mutantes e humanos e sustenta essa fé mesmo quando ela custa caro. Amigo e adversário permanente do Magneto.',
    appearances: [
      { title: 'x-men', note: 'Estreia' },
      { title: 'x-men-2', note: 'Sob ataque' },
      { title: 'x-men-dias-de-um-futuro-esquecido', note: 'Duas gerações' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Patrick Stewart está confirmado no elenco.' },
  },
  {
    slug: 'magneto',
    name: 'Magneto',
    actor: 'Ian McKellen',
    tagline: 'Erik Lehnsherr. Sobrevivente, e por isso implacável.',
    universes: ['xmen'],
    primer:
      'Viu o que a humanidade faz com quem considera diferente e decidiu nunca mais esperar boa-fé. Controla metal — e, por extensão, o mundo moderno.',
    appearances: [
      { title: 'x-men', note: 'Estreia' },
      { title: 'x-men-2', note: 'Aliança forçada' },
      { title: 'x-men-dias-de-um-futuro-esquecido', note: 'Duas gerações' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Ian McKellen está confirmado no elenco.' },
  },
  {
    slug: 'cyclops',
    name: 'Ciclope',
    actor: 'James Marsden',
    tagline: 'Scott Summers. Líder de campo dos X-Men.',
    universes: ['xmen'],
    primer: 'Disparo óptico que ele não consegue desligar. Rígido, leal e sempre à sombra do Wolverine.',
    appearances: [
      { title: 'x-men', note: 'Estreia' },
      { title: 'x-men-2', note: 'Time em campo' },
    ],
    doomsday: { certainty: 'confirmed', note: 'James Marsden está confirmado no elenco.' },
  },
  {
    slug: 'beast',
    name: 'Fera',
    actor: 'Kelsey Grammer',
    tagline: 'Hank McCoy. Cientista de elite dentro de um corpo que assusta.',
    universes: ['xmen'],
    primer: 'A prova viva de que a mutação não escolhe quem é gentil. Erudito, azul e peludo.',
    appearances: [{ title: 'x-men-o-confronto-final', note: 'Estreia de Kelsey Grammer' }],
    doomsday: { certainty: 'confirmed', note: 'Kelsey Grammer está confirmado no elenco.' },
  },
  {
    slug: 'mystique',
    name: 'Mística',
    actor: 'Rebecca Romijn',
    tagline: 'Metamorfa. Qualquer pessoa, a qualquer hora.',
    universes: ['xmen'],
    primer: 'Braço direito do Magneto na trilogia clássica. Não pede desculpa por existir como é.',
    appearances: [
      { title: 'x-men', note: 'Estreia' },
      { title: 'x-men-2', note: 'Infiltração' },
    ],
    doomsday: { certainty: 'confirmed', note: 'Rebecca Romijn está confirmada no elenco.' },
  },
  {
    slug: 'nightcrawler',
    name: 'Noturno',
    actor: 'Alan Cumming',
    tagline: 'Kurt Wagner. Teletransporte, e fé.',
    universes: ['xmen'],
    primer:
      'Aparência demoníaca, temperamento devoto. A cena de abertura de X-Men 2 é a melhor apresentação de personagem da trilogia.',
    appearances: [{ title: 'x-men-2', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Alan Cumming está confirmado no elenco.' },
  },
  {
    slug: 'wolverine',
    name: 'Wolverine',
    actor: 'Hugh Jackman',
    tagline: 'Logan. Garras, cura acelerada e nenhuma paciência.',
    universes: ['xmen', 'multiverse'],
    primer:
      'O personagem que sustentou a franquia mutante por duas décadas. Em Deadpool & Wolverine, uma variante dele atravessa para dentro da lógica do MCU.',
    appearances: [
      { title: 'x-men-dias-de-um-futuro-esquecido', note: 'Elo entre gerações' },
      { title: 'deadpool-e-wolverine', note: 'Travessia' },
      { title: 'logan', note: 'Complementar' },
    ],
    doomsday: {
      certainty: 'confirmed',
      note: 'Hugh Jackman foi confirmado em agosto de 2026, na apresentação da D23. Fonte: D23 2026.',
    },
  },
  {
    slug: 'deadpool',
    name: 'Deadpool',
    actor: 'Ryan Reynolds',
    tagline: 'Wade Wilson. Sabe que está num filme.',
    universes: ['xmen', 'multiverse'],
    primer:
      'Mercenário imortal que quebra a quarta parede. É o veículo narrativo pelo qual a franquia mutante da Fox entra no MCU.',
    appearances: [
      { title: 'deadpool-e-wolverine', note: 'Ponte entre universos' },
      { title: 'deadpool', note: 'Complementar' },
      { title: 'deadpool-2', note: 'Complementar' },
    ],
    doomsday: {
      certainty: 'confirmed',
      note: 'Ryan Reynolds foi confirmado em agosto de 2026, na apresentação da D23. Fonte: D23 2026.',
    },
  },
  {
    slug: 'gambit',
    name: 'Gambit',
    actor: 'Channing Tatum',
    tagline: 'Remy LeBeau. Cartas energizadas e sotaque de Nova Orleans.',
    universes: ['xmen'],
    primer:
      'Apareceu pela primeira vez em Deadpool & Wolverine. Não tem filme próprio — chega em Doomsday quase sem bagagem, o que é intencional.',
    appearances: [{ title: 'deadpool-e-wolverine', note: 'Estreia' }],
    doomsday: { certainty: 'confirmed', note: 'Channing Tatum está confirmado no elenco.' },
  },
  {
    slug: 'doctor-doom',
    name: 'Doutor Destino',
    actor: 'Robert Downey Jr.',
    tagline: 'Victor von Doom. O antagonista de Doomsday.',
    universes: ['fantastic-four', 'multiverse'],
    primer:
      'Nos quadrinhos: monarca da Latvéria, cientista e feiticeiro, nêmesis histórico do Quarteto Fantástico. No cinema, é a estreia do personagem dentro do MCU — e o motivo do nome do filme.',
    appearances: [{ title: 'doomsday', note: 'Antagonista' }],
    doomsday: {
      certainty: 'confirmed',
      note: 'Robert Downey Jr. foi anunciado pela Marvel Studios como Doctor Doom em julho de 2024, no encerramento do painel da San Diego Comic-Con.',
    },
  },
]

export const CHARACTER_BY_SLUG = Object.fromEntries(CHARACTERS.map((c) => [c.slug, c])) as Record<
  string,
  Character
>
