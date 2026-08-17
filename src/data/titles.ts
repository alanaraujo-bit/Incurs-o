import type { Title } from './types'

/**
 * Catálogo editorial da rota.
 *
 * `order` 1..30 = rota principal (base do cálculo de preparação).
 * `order: null` = complementar, fora da porcentagem.
 * `destination: true` = Avengers: Doomsday, o fim da linha.
 *
 * Durações são aproximadas. Séries somam a temporada inteira a partir de
 * uma média por episódio — servem para estimar tempo, não como dado técnico.
 */
export const TITLES: Title[] = [
  // ─────────────────────────── FASE 1 · FUNDAÇÃO ───────────────────────────
  {
    slug: 'homem-de-ferro',
    name: 'Homem de Ferro',
    originalName: 'Iron Man',
    year: 2008,
    type: 'film',
    runtimeMinutes: 126,
    phase: 'fundacao',
    importance: 'core',
    universes: ['avengers'],
    order: 1,
    markable: true,
    logline:
      'Um fabricante de armas bilionário é sequestrado, sobrevive construindo uma armadura numa caverna e decide desmontar o próprio império.',
    role: 'O ponto zero. Estabelece o tom, a escala e o homem cuja ausência move todo o resto da rota.',
    whyDoomsday:
      'Robert Downey Jr. volta em Doomsday — mas como Victor von Doom, um personagem diferente. Ver onde ele começou é o que faz esse retorno significar alguma coisa, seja qual for a explicação que o filme dê.',
    context:
      'Não precisa de nada antes. Este é o primeiro filme do universo compartilhado inteiro e foi feito para funcionar sozinho.',
    concepts: [
      {
        name: 'Universo compartilhado',
        body: 'A ideia de que filmes separados dividem o mesmo mundo e as mesmas consequências. Tudo nesta rota depende disso.',
      },
    ],
    characters: ['tony-stark'],
    connections: [{ to: 'os-vingadores', label: 'Forma a equipe' }],
  },
  {
    slug: 'capitao-america-o-primeiro-vingador',
    name: 'Capitão América: O Primeiro Vingador',
    originalName: 'Captain America: The First Avenger',
    year: 2011,
    type: 'film',
    runtimeMinutes: 124,
    phase: 'fundacao',
    importance: 'key',
    universes: ['avengers'],
    order: 2,
    markable: true,
    logline:
      'Um rapaz franzino do Brooklyn é recusado pelo exército cinco vezes até um experimento transformá-lo no primeiro super-soldado.',
    role: 'Apresenta o homem cujo caráter vira a régua moral de todos os outros — e o amigo que ele nunca abandona.',
    whyDoomsday:
      'Chris Evans está confirmado no elenco de Doomsday. Steve Rogers e Bucky Barnes são uma dupla que atravessa décadas de história, e essa história começa aqui.',
    context:
      'Passado nos anos 1940, durante a Segunda Guerra. É o filme mais isolado no tempo de toda a rota — pode ser visto sem nenhum contexto prévio.',
    concepts: [
      {
        name: 'Tesseract',
        body: 'Um artefato de energia impossível caçado pelos vilões do filme. Ele reaparece em vários pontos da rota e nunca é só um objeto.',
      },
    ],
    characters: ['steve-rogers', 'bucky-barnes', 'peggy-carter'],
    connections: [
      { to: 'capitao-america-o-soldado-invernal', label: 'Continuação direta' },
      { to: 'os-vingadores', label: 'Steve acorda no presente' },
    ],
  },
  {
    slug: 'thor',
    name: 'Thor',
    year: 2011,
    type: 'film',
    runtimeMinutes: 115,
    phase: 'fundacao',
    importance: 'key',
    universes: ['avengers', 'cosmic'],
    order: 3,
    markable: true,
    logline:
      'Um príncipe arrogante é exilado do reino dourado de Asgard e mandado para a Terra sem poderes, enquanto seu irmão adotivo assume o trono.',
    role: 'Abre o universo para além da Terra e apresenta a relação de irmãos mais longa e mais instável da franquia.',
    whyDoomsday:
      'Chris Hemsworth e Tom Hiddleston estão confirmados em Doomsday. A dinâmica Thor–Loki é uma das poucas linhas que atravessa a maratona inteira de ponta a ponta.',
    context:
      'Você pode assistir antes ou depois do Capitão América, tanto faz. O importante é chegar em Os Vingadores conhecendo os dois irmãos.',
    concepts: [
      {
        name: 'Nove Reinos',
        body: 'A cosmologia asgardiana: mundos ligados entre si. É a primeira vez que a rota diz "existe mais coisa lá fora".',
      },
    ],
    characters: ['thor', 'loki'],
    connections: [{ to: 'os-vingadores', label: 'Loki vira a ameaça' }],
  },
  {
    slug: 'os-vingadores',
    name: 'Os Vingadores',
    originalName: 'The Avengers',
    year: 2012,
    type: 'film',
    runtimeMinutes: 143,
    phase: 'fundacao',
    importance: 'core',
    universes: ['avengers'],
    order: 4,
    markable: true,
    logline:
      'Uma invasão sobre Nova York obriga pessoas que não se suportam a trabalhar juntas pela primeira vez.',
    role: 'O momento em que a rota deixa de ser uma coleção de filmes e vira uma história só. Também é o evento que todos os outros filmes chamam de "Nova York".',
    whyDoomsday:
      'Doomsday reúne heróis de três universos diferentes. Este é o filme que ensinou o público a assistir a um crossover — e a referência interna que o próprio MCU usa para medir catástrofe.',
    context:
      'Assista depois de Homem de Ferro, Capitão América e Thor. Se pular algum, o filme funciona mesmo assim, mas você perde a piada de metade das interações.',
    concepts: [
      {
        name: 'Iniciativa Vingadores',
        body: 'A premissa de juntar indivíduos poderosos demais para agir sozinhos. Doomsday é a versão final e inflacionada dessa ideia.',
      },
    ],
    characters: ['tony-stark', 'steve-rogers', 'thor', 'loki'],
    connections: [
      { to: 'vingadores-era-de-ultron', label: 'A equipe continua' },
      { to: 'loki-t1', label: 'Um detalhe daqui inicia a série do Loki' },
    ],
  },
  {
    slug: 'capitao-america-o-soldado-invernal',
    name: 'Capitão América: O Soldado Invernal',
    originalName: 'Captain America: The Winter Soldier',
    year: 2014,
    type: 'film',
    runtimeMinutes: 136,
    phase: 'fundacao',
    importance: 'core',
    universes: ['avengers', 'street'],
    order: 5,
    markable: true,
    logline:
      'Steve Rogers descobre que a organização para a qual trabalha está podre por dentro, e é caçado por um assassino mascarado.',
    role: 'O melhor filme da fase e o que mais rende adiante: apresenta Sam Wilson, devolve Bucky à história e destrói a estrutura de poder que sustentava tudo.',
    whyDoomsday:
      'Sam Wilson, Bucky Barnes e Steve Rogers — três nomes do elenco de Doomsday — se cruzam aqui pela primeira vez. A relação entre eles é a linha mais direta que liga 2014 a 2026.',
    context:
      'Veja depois de Os Vingadores. É um thriller político; espere menos ficção científica e mais desconfiança.',
    spoilers: [
      {
        label: 'A identidade do Soldado Invernal',
        guards: 'capitao-america-o-soldado-invernal',
        body: 'O assassino sob a máscara é Bucky Barnes, o melhor amigo de Steve, sobrevivente e submetido a décadas de lavagem cerebral. Tudo que Bucky faz nas obras seguintes — inclusive em Thunderbolts* — parte daqui.',
      },
    ],
    characters: ['steve-rogers', 'bucky-barnes', 'sam-wilson'],
    connections: [
      { to: 'capitao-america-guerra-civil', label: 'Continuação direta' },
      { to: 'falcao-e-o-soldado-invernal', label: 'Sam e Bucky assumem a frente' },
    ],
  },
  {
    slug: 'vingadores-era-de-ultron',
    name: 'Vingadores: Era de Ultron',
    originalName: 'Avengers: Age of Ultron',
    year: 2015,
    type: 'film',
    runtimeMinutes: 141,
    phase: 'fundacao',
    importance: 'key',
    universes: ['avengers'],
    order: 6,
    markable: true,
    logline:
      'Uma inteligência artificial criada para proteger o mundo conclui que o problema do mundo são os Vingadores.',
    role: 'É o filme que planta a rachadura: Tony toma uma decisão sozinho e o time nunca mais confia nele do mesmo jeito. Também introduz Wanda Maximoff.',
    whyDoomsday:
      'A desconfiança que explode em Guerra Civil nasce aqui, e Wanda — central para o Multiverso mais adiante — entra na história neste filme.',
    context:
      'Depois de O Soldado Invernal. É o elo mais fraco da fase em qualidade, mas o mais necessário para entender o racha seguinte.',
    shortcut:
      'Com pouco tempo? Este é o filme mais pulável da Fase 1 — desde que você aceite chegar em Guerra Civil sabendo apenas que Tony causou um desastre e Wanda existe.',
    characters: ['tony-stark', 'steve-rogers', 'thor', 'wanda-maximoff'],
    connections: [
      { to: 'capitao-america-guerra-civil', label: 'A rachadura vira ruptura' },
      { to: 'wandavision', label: 'A dor da Wanda começa aqui' },
    ],
  },
  {
    slug: 'capitao-america-guerra-civil',
    name: 'Capitão América: Guerra Civil',
    originalName: 'Captain America: Civil War',
    year: 2016,
    type: 'film',
    runtimeMinutes: 147,
    phase: 'fundacao',
    importance: 'core',
    universes: ['avengers', 'wakanda'],
    order: 7,
    markable: true,
    logline:
      'Governos exigem controle sobre os Vingadores. Tony aceita, Steve recusa, e o time se despedaça de dentro para fora.',
    role: 'A guerra que importa não é contra um vilão: é entre duas pessoas que estavam certas. Também é a porta de entrada de Wakanda e do Homem-Aranha.',
    whyDoomsday:
      'Doomsday junta gente que já se traiu antes. O passivo emocional entre Steve, Tony e Bucky nasce aqui — e T’Challa entra na história neste filme, abrindo a linha que leva a Wakanda Para Sempre.',
    context:
      'Requer O Soldado Invernal e ajuda muito ter visto Era de Ultron. É o clímax da Fase 1 em termos de relação entre personagens.',
    characters: ['steve-rogers', 'tony-stark', 'bucky-barnes', 'sam-wilson'],
    connections: [
      { to: 'pantera-negra', label: 'Wakanda entra na rota' },
      { to: 'vingadores-guerra-infinita', label: 'O time chega dividido' },
    ],
  },
  {
    slug: 'doutor-estranho',
    name: 'Doutor Estranho',
    originalName: 'Doctor Strange',
    year: 2016,
    type: 'film',
    runtimeMinutes: 115,
    phase: 'fundacao',
    importance: 'key',
    universes: ['avengers', 'multiverse'],
    order: 8,
    markable: true,
    logline:
      'Um neurocirurgião brilhante e insuportável perde as mãos num acidente e encontra, procurando cura, uma disciplina que reescreve o que ele acha que é real.',
    role: 'A primeira vez que a rota fala a palavra "multiverso". Tudo o que vem depois — variantes, realidades, incursões — precisa deste vocabulário.',
    whyDoomsday:
      'Doomsday é um filme sobre realidades colidindo. Este é o ponto em que o universo admite que existe mais de uma.',
    context:
      'Cronologicamente convive com Guerra Civil, mas assista depois: o contraste entre um filme político e um filme de magia funciona melhor nessa ordem.',
    concepts: [
      {
        name: 'Multiverso',
        body: 'A existência de realidades paralelas às nossas. Aqui ainda é uma nota de rodapé. Em Doomsday, é a premissa.',
      },
      {
        name: 'Dimensões e portais',
        body: 'A ideia de atravessar espaços por vontade própria. Prepara o público para travessias muito maiores adiante.',
      },
    ],
    characters: ['doctor-strange'],
    connections: [
      { to: 'doutor-estranho-no-multiverso-da-loucura', label: 'Continuação direta' },
      { to: 'homem-aranha-sem-volta-para-casa', label: 'O feitiço que rompe a barreira' },
    ],
  },
  {
    slug: 'thor-ragnarok',
    name: 'Thor: Ragnarok',
    year: 2017,
    type: 'film',
    runtimeMinutes: 130,
    phase: 'fundacao',
    importance: 'key',
    universes: ['avengers', 'cosmic'],
    order: 9,
    markable: true,
    logline:
      'Thor perde tudo o que definia sua identidade e é obrigado a descobrir quem ele é sem isso — enquanto participa de um torneio de gladiadores.',
    role: 'Reinventa Thor e Loki e coloca os dois exatamente no estado emocional em que Guerra Infinita os encontra.',
    whyDoomsday:
      'É o filme que estabelece a versão de Thor e a versão de Loki que a rota carrega até o fim. Ambos os atores estão confirmados em Doomsday.',
    context:
      'Assista depois de Era de Ultron. Tom completamente diferente dos dois filmes anteriores do Thor — é comédia, e é proposital.',
    characters: ['thor', 'loki'],
    connections: [{ to: 'vingadores-guerra-infinita', label: 'Termina exatamente onde Guerra Infinita começa' }],
  },
  {
    slug: 'pantera-negra',
    name: 'Pantera Negra',
    originalName: 'Black Panther',
    year: 2018,
    type: 'film',
    runtimeMinutes: 134,
    phase: 'fundacao',
    importance: 'key',
    universes: ['avengers', 'wakanda'],
    order: 10,
    markable: true,
    logline:
      'Um novo rei assume o trono de uma nação africana tecnologicamente muito à frente do mundo — e precisa decidir se ela continua escondida.',
    role: 'Constrói Wakanda como lugar, cultura e potência política. Sem isso, o núcleo wakandano de Doomsday é só figurino.',
    whyDoomsday:
      'Shuri e M’Baku estão confirmados em Doomsday. Os dois são apresentados aqui, e a lógica de sucessão do trono wakandano importa diretamente para onde eles estão hoje.',
    context: 'Depois de Guerra Civil, onde T’Challa aparece pela primeira vez.',
    characters: ['shuri', 'mbaku'],
    connections: [
      { to: 'pantera-negra-wakanda-para-sempre', label: 'Continuação direta' },
      { to: 'vingadores-guerra-infinita', label: 'Wakanda vira campo de batalha' },
    ],
  },
  {
    slug: 'vingadores-guerra-infinita',
    name: 'Vingadores: Guerra Infinita',
    originalName: 'Avengers: Infinity War',
    year: 2018,
    type: 'film',
    runtimeMinutes: 149,
    phase: 'fundacao',
    importance: 'core',
    universes: ['avengers', 'cosmic', 'wakanda'],
    order: 11,
    markable: true,
    logline:
      'Um titã convencido de estar certo caça seis pedras capazes de reescrever a realidade, e ninguém consegue detê-lo a tempo.',
    role: 'O filme que prova que a rota tem consequências reais. É a derrota que dá peso a todo o resto.',
    whyDoomsday:
      'Doomsday é vendido como um evento de escala comparável. Este é o padrão de comparação — e a razão pela qual "um vilão que ganha" não soa impossível.',
    context:
      'Requer praticamente toda a Fase 1. É o único ponto da rota em que pular filmes realmente machuca a experiência.',
    characters: ['thor', 'steve-rogers', 'tony-stark', 'doctor-strange', 'shuri'],
    connections: [{ to: 'vingadores-ultimato', label: 'Segunda metade da mesma história' }],
  },
  {
    slug: 'vingadores-ultimato',
    name: 'Vingadores: Ultimato',
    originalName: 'Avengers: Endgame',
    year: 2019,
    type: 'film',
    runtimeMinutes: 181,
    phase: 'fundacao',
    importance: 'core',
    universes: ['avengers', 'multiverse'],
    order: 12,
    markable: true,
    logline: 'O que sobrou dos Vingadores tenta desfazer uma perda que já aconteceu.',
    role: 'Encerra onze anos de história e, sem alarde, abre a porta por onde toda a Saga do Multiverso entra.',
    whyDoomsday:
      'A solução usada aqui tem um efeito colateral que o MCU passou os anos seguintes explorando: linhas do tempo que não deveriam existir. Doomsday é, em grande medida, a fatura dessa conta.',
    context:
      'Continuação direta de Guerra Infinita. Três horas. Vale reservar a sessão inteira em vez de dividir.',
    spoilers: [
      {
        label: 'O que Ultimato faz com a linha do tempo',
        guards: 'vingadores-ultimato',
        body: 'A equipe viaja ao passado para recuperar as Joias. Isso cria ramificações temporais — realidades alternativas geradas pela própria intervenção. A série Loki pega exatamente esse fio, e é por isso que ela é obrigatória na rota.',
      },
      {
        label: 'O destino de Steve Rogers no final',
        guards: 'vingadores-ultimato',
        body: 'Steve escolhe ficar no passado e volta velho, entregando o escudo a Sam Wilson. É o gesto que torna Falcão e o Soldado Invernal necessário — e que deixa em aberto, para Doomsday, a pergunta sobre onde exatamente Steve esteve.',
      },
    ],
    concepts: [
      {
        name: 'Linhas do tempo ramificadas',
        body: 'A ideia de que uma escolha pode gerar uma realidade paralela em vez de alterar a existente. É a base de tudo na Fase 2.',
      },
    ],
    characters: ['tony-stark', 'steve-rogers', 'thor', 'sam-wilson', 'loki'],
    connections: [
      { to: 'loki-t1', label: 'O efeito colateral vira série' },
      { to: 'falcao-e-o-soldado-invernal', label: 'O escudo troca de dono' },
      { to: 'wandavision', label: 'O luto de Wanda' },
    ],
  },

  // ───────────────────────── FASE 2 · PÓS-ULTIMATO ─────────────────────────
  {
    slug: 'wandavision',
    name: 'WandaVision',
    year: 2021,
    type: 'series',
    episodes: 9,
    episodeMinutes: 35,
    runtimeMinutes: 315,
    phase: 'pos-ultimato',
    importance: 'key',
    universes: ['avengers', 'multiverse'],
    order: 13,
    markable: true,
    logline:
      'Wanda vive uma sitcom perfeita numa cidadinha americana, e nada ali suporta uma segunda pergunta.',
    role: 'A primeira obra pós-Ultimato. Mostra que a franquia mudou de forma e transforma luto em poder narrativo.',
    whyDoomsday:
      'Estabelece o nível de poder capaz de dobrar realidade — o vocabulário que Multiverso da Loucura usa e que Doomsday assume como dado.',
    context:
      'Depois de Ultimato. Os primeiros episódios imitam sitcoms de décadas diferentes de propósito; é estranho porque tem que ser.',
    characters: ['wanda-maximoff'],
    connections: [{ to: 'doutor-estranho-no-multiverso-da-loucura', label: 'Continuação direta' }],
  },
  {
    slug: 'falcao-e-o-soldado-invernal',
    name: 'Falcão e o Soldado Invernal',
    originalName: 'The Falcon and the Winter Soldier',
    year: 2021,
    type: 'series',
    episodes: 6,
    episodeMinutes: 50,
    runtimeMinutes: 300,
    phase: 'pos-ultimato',
    importance: 'core',
    universes: ['avengers', 'street'],
    order: 14,
    markable: true,
    logline:
      'Sam Wilson não se sente no direito de carregar o escudo do Capitão América. O governo, enquanto isso, escolhe outro homem para o cargo.',
    role: 'Explica como o mundo reage à ausência de Steve e apresenta o Capitão América que estará em Doomsday.',
    whyDoomsday:
      'Anthony Mackie, Sebastian Stan, Wyatt Russell e Danny Ramirez estão todos confirmados em Doomsday. Quatro personagens do elenco final passam por esta série.',
    context: 'Depois de Ultimato. É a continuação direta e explícita de O Soldado Invernal.',
    concepts: [
      {
        name: 'O escudo como cargo público',
        body: 'A ideia de que "Capitão América" é uma função que alguém precisa merecer. Isso ainda é uma questão em aberto em Doomsday.',
      },
    ],
    characters: ['sam-wilson', 'bucky-barnes', 'john-walker', 'joaquin-torres'],
    connections: [
      { to: 'capitao-america-admiravel-mundo-novo', label: 'Continuação direta' },
      { to: 'thunderbolts', label: 'John Walker reaparece' },
    ],
  },
  {
    slug: 'viuva-negra',
    name: 'Viúva Negra',
    originalName: 'Black Widow',
    year: 2021,
    type: 'film',
    runtimeMinutes: 134,
    phase: 'pos-ultimato',
    importance: 'key',
    universes: ['avengers', 'thunderbolts'],
    order: 15,
    markable: true,
    logline:
      'Natasha Romanoff volta para a família falsa que lhe deram na infância e descobre que ela ainda existe.',
    role: 'Não é sobre Natasha, na prática: é a estreia de Yelena e do Guardião Vermelho, dois nomes que chegam até Doomsday.',
    whyDoomsday:
      'Florence Pugh e David Harbour estão confirmados. Sem este filme, os dois personagens mais divertidos de Thunderbolts* chegam sem passado.',
    context:
      'Passado entre Guerra Civil e Guerra Infinita, mas assista aqui: ele funciona melhor como prólogo dos Thunderbolts do que como capítulo dos Vingadores.',
    characters: ['yelena-belova', 'red-guardian'],
    connections: [{ to: 'thunderbolts', label: 'Yelena e Alexei se reencontram' }],
  },
  {
    slug: 'loki-t1',
    name: 'Loki — 1ª temporada',
    year: 2021,
    type: 'series',
    episodes: 6,
    episodeMinutes: 50,
    runtimeMinutes: 300,
    phase: 'pos-ultimato',
    importance: 'core',
    universes: ['multiverse', 'avengers'],
    order: 16,
    markable: true,
    logline:
      'Uma versão do Loki que escapou da própria história é presa por uma burocracia que fiscaliza o tempo.',
    role: 'A aula de regras do Multiverso. Se você só tiver tempo para uma obra da Fase 2, é esta.',
    whyDoomsday:
      'Variante, linha do tempo, ramificação, realidade paralela: todo o vocabulário que Doomsday usa sem explicar é ensinado aqui, com paciência e clareza.',
    context:
      'Assista depois de Ultimato — a série começa literalmente dentro de uma cena daquele filme.',
    concepts: [
      {
        name: 'Variante',
        body: 'Uma versão alternativa da mesma pessoa, vinda de outra linha do tempo. É o conceito mais importante da rota inteira.',
      },
      {
        name: 'Linha do tempo sagrada',
        body: 'A ideia de uma única realidade "correta", mantida à força. O que acontece quando ela deixa de ser mantida define a Saga do Multiverso.',
      },
    ],
    characters: ['loki'],
    connections: [
      { to: 'loki-t2', label: 'Continuação direta' },
      { to: 'homem-aranha-sem-volta-para-casa', label: 'As regras passam a valer' },
    ],
  },
  {
    slug: 'loki-t2',
    name: 'Loki — 2ª temporada',
    year: 2023,
    type: 'series',
    episodes: 6,
    episodeMinutes: 51,
    runtimeMinutes: 306,
    phase: 'pos-ultimato',
    importance: 'core',
    universes: ['multiverse'],
    order: 17,
    markable: true,
    logline: 'Com a estrutura que sustentava o tempo em colapso, alguém precisa decidir o que fazer com os cacos.',
    role: 'Fecha a explicação do Multiverso e define o estado atual das linhas do tempo — que é o estado em que Doomsday começa.',
    whyDoomsday:
      'Tom Hiddleston está confirmado em Doomsday. O que ele é ao final desta temporada muda completamente o que a presença dele significa no filme.',
    context: 'Continuação direta da primeira temporada. Não pule.',
    spoilers: [
      {
        label: 'Onde a 2ª temporada deixa o Multiverso',
        guards: 'loki-t2',
        body: 'A linha do tempo única deixa de existir e passa a haver muitas realidades ramificadas coexistindo, sustentadas por um preço pessoal altíssimo. Doomsday parte desse estado de coisas: um Multiverso aberto, não vigiado.',
      },
    ],
    characters: ['loki'],
    connections: [{ to: 'doomsday', label: 'O Multiverso aberto' }],
  },
  {
    slug: 'shang-chi',
    name: 'Shang-Chi e a Lenda dos Dez Anéis',
    originalName: 'Shang-Chi and the Legend of the Ten Rings',
    year: 2021,
    type: 'film',
    runtimeMinutes: 132,
    phase: 'pos-ultimato',
    importance: 'key',
    universes: ['avengers'],
    order: 18,
    markable: true,
    logline:
      'Um homem que fugiu do pai e da própria formação como assassino é obrigado a voltar para casa.',
    role: 'Apresenta um dos poucos heróis genuinamente novos do pós-Ultimato e uma fonte de poder ainda não explicada.',
    whyDoomsday: 'Simu Liu está confirmado no elenco de Doomsday.',
    context: 'Funciona quase como filme independente. Pode ser visto a qualquer momento da Fase 2.',
    characters: ['shang-chi'],
  },
  {
    slug: 'homem-aranha-sem-volta-para-casa',
    name: 'Homem-Aranha: Sem Volta Para Casa',
    originalName: 'Spider-Man: No Way Home',
    year: 2021,
    type: 'film',
    runtimeMinutes: 148,
    phase: 'pos-ultimato',
    importance: 'core',
    universes: ['multiverse'],
    order: 19,
    markable: true,
    logline:
      'Um feitiço para apagar um segredo dá errado e começa a puxar gente de outros universos para dentro deste.',
    role: 'A primeira demonstração prática do Multiverso funcionando — e a prova de que personagens de outras franquias podem coexistir com o MCU.',
    whyDoomsday:
      'Este filme estabelece o precedente exato que Doomsday leva ao extremo: atores e versões de fora do MCU aparecendo como legítimos habitantes de outras realidades.',
    context:
      'Você não precisa ter visto os filmes anteriores do Homem-Aranha do MCU para acompanhar a rota, mas precisa ter visto Doutor Estranho.',
    concepts: [
      {
        name: 'Travessia entre universos',
        body: 'Pessoas cruzando de uma realidade para outra. Aqui é acidente. Em Doomsday, é o enredo.',
      },
    ],
    characters: ['doctor-strange'],
    connections: [
      { to: 'doutor-estranho-no-multiverso-da-loucura', label: 'Consequência direta' },
      { to: 'deadpool-e-wolverine', label: 'Mesma lógica, escala maior' },
    ],
  },
  {
    slug: 'doutor-estranho-no-multiverso-da-loucura',
    name: 'Doutor Estranho no Multiverso da Loucura',
    originalName: 'Doctor Strange in the Multiverse of Madness',
    year: 2022,
    type: 'film',
    runtimeMinutes: 126,
    phase: 'pos-ultimato',
    importance: 'key',
    universes: ['multiverse'],
    order: 20,
    markable: true,
    logline:
      'Estranho atravessa realidades atrás de uma garota capaz de abrir portas entre universos, perseguido por algo que não deveria conseguir alcançá-lo.',
    role: 'Mostra o Multiverso como paisagem — universos com regras, histórias e equipes próprias — e não mais como truque pontual.',
    whyDoomsday:
      'É onde o MCU explicita que existem outros mundos com outros heróis, alguns interpretados por atores de fora da franquia. Doomsday opera nesse terreno.',
    context: 'Requer WandaVision e Doutor Estranho. É o filme mais próximo de terror da rota.',
    concepts: [
      {
        name: 'Incursão',
        body: 'A colisão entre dois universos, com destruição de ambos. Conceito citado explicitamente neste filme — e o eixo temático do nome deste app.',
      },
    ],
    characters: ['doctor-strange', 'wanda-maximoff'],
    connections: [{ to: 'doomsday', label: 'Incursões' }],
  },
  {
    slug: 'pantera-negra-wakanda-para-sempre',
    name: 'Pantera Negra: Wakanda Para Sempre',
    originalName: 'Black Panther: Wakanda Forever',
    year: 2022,
    type: 'film',
    runtimeMinutes: 161,
    phase: 'pos-ultimato',
    importance: 'core',
    universes: ['wakanda'],
    order: 21,
    markable: true,
    logline:
      'Wakanda enfrenta um luto nacional e, ao mesmo tempo, a pressão de uma civilização submarina que também esconde seu poder do mundo.',
    role: 'Define quem lidera Wakanda hoje e apresenta Namor, um poder soberano que não responde a ninguém.',
    whyDoomsday:
      'Letitia Wright, Winston Duke e Tenoch Huerta Mejía estão confirmados em Doomsday. O núcleo wakandano do filme sai inteiro deste longa.',
    context: 'Requer Pantera Negra e ajuda ter visto Guerra Infinita e Ultimato.',
    characters: ['shuri', 'namor', 'mbaku'],
    connections: [{ to: 'doomsday', label: 'Núcleo Wakanda' }],
  },

  // ─────────────────────── FASE 3 · LEGADO DOS X-MEN ───────────────────────
  {
    slug: 'x-men',
    name: 'X-Men',
    year: 2000,
    type: 'film',
    runtimeMinutes: 104,
    phase: 'legado-xmen',
    importance: 'key',
    universes: ['xmen'],
    order: 22,
    markable: true,
    logline:
      'Num mundo onde pessoas nascem com mutações, dois velhos amigos discordam radicalmente sobre como conviver com a humanidade.',
    role: 'A porta de entrada do universo mutante — feito por outro estúdio, com outro elenco e outra lógica. Aqui a rota muda de território.',
    whyDoomsday:
      'Patrick Stewart, Ian McKellen, James Marsden e Rebecca Romijn estão confirmados em Doomsday nesses mesmos papéis. Este é o filme em que os quatro aparecem juntos pela primeira vez.',
    context:
      'Não é MCU e não precisa ser encaixado na cronologia dos Vingadores. Trate como um universo vizinho — porque é exatamente isso que ele é.',
    concepts: [
      {
        name: 'Mutantes',
        body: 'Pessoas nascidas com habilidades, tratadas pelo mundo como ameaça. O conflito é social antes de ser físico.',
      },
    ],
    characters: ['professor-x', 'magneto', 'cyclops', 'mystique'],
    connections: [{ to: 'x-men-2', label: 'Continuação direta' }],
  },
  {
    slug: 'x-men-2',
    name: 'X-Men 2',
    originalName: 'X2: X-Men United',
    year: 2003,
    type: 'film',
    runtimeMinutes: 134,
    phase: 'legado-xmen',
    importance: 'key',
    universes: ['xmen'],
    order: 23,
    markable: true,
    logline:
      'Um militar convence o governo a agir contra os mutantes, e inimigos históricos precisam se aliar.',
    role: 'O melhor filme desta fase e a estreia do Noturno, um dos rostos confirmados em Doomsday.',
    whyDoomsday:
      'Alan Cumming está confirmado como Noturno. O personagem aparece pela primeira vez neste filme, e a sequência de abertura é a melhor apresentação que ele já teve.',
    context: 'Continuação direta de X-Men.',
    characters: ['nightcrawler', 'professor-x', 'magneto', 'mystique'],
    connections: [{ to: 'x-men-o-confronto-final', label: 'Continuação direta' }],
  },
  {
    slug: 'x-men-o-confronto-final',
    name: 'X-Men: O Confronto Final',
    originalName: 'X-Men: The Last Stand',
    year: 2006,
    type: 'film',
    runtimeMinutes: 104,
    phase: 'legado-xmen',
    importance: 'extra',
    universes: ['xmen'],
    order: 24,
    markable: true,
    logline: 'Uma cura para a mutação divide o mundo mutante entre aceitar e resistir.',
    role: 'O capítulo mais fraco da trilogia clássica, incluído porque encerra arcos e introduz o Fera de Kelsey Grammer.',
    whyDoomsday:
      'Kelsey Grammer está confirmado em Doomsday como Fera. Esta é a estreia dele no papel — e praticamente o único motivo forte para o filme estar na rota.',
    context: 'Depois de X-Men 2.',
    shortcut:
      'Com pouco tempo? Este é o título mais dispensável da Fase 3. Assista à apresentação do Fera e siga para Dias de um Futuro Esquecido sem culpa.',
    characters: ['beast', 'professor-x', 'magneto'],
    connections: [{ to: 'x-men-dias-de-um-futuro-esquecido', label: 'É corrigido pelo filme seguinte' }],
  },
  {
    slug: 'x-men-dias-de-um-futuro-esquecido',
    name: 'X-Men: Dias de um Futuro Esquecido',
    originalName: 'X-Men: Days of Future Past',
    year: 2014,
    type: 'film',
    runtimeMinutes: 132,
    phase: 'legado-xmen',
    importance: 'core',
    universes: ['xmen', 'multiverse'],
    order: 25,
    markable: true,
    logline:
      'Num futuro em que máquinas caçadoras de mutantes venceram, a única saída é mandar uma consciência de volta para o passado.',
    role: 'O filme que junta as duas gerações de elenco e usa viagem no tempo para reescrever a própria franquia. É o X-Men mais próximo, em lógica, do que Doomsday propõe.',
    whyDoomsday:
      'Além do elenco clássico confirmado, este filme torna natural a ideia de que versões diferentes dos mesmos personagens podem coexistir. É exatamente o terreno de Doomsday.',
    context:
      'Assista depois dos três primeiros. Você não precisa ter visto Primeira Classe para acompanhar — o filme se explica.',
    concepts: [
      {
        name: 'Sentinelas',
        body: 'Máquinas construídas para caçar mutantes. Apareceram nos materiais de divulgação de Doomsday.',
      },
      {
        name: 'Reescrita de linha do tempo',
        body: 'A franquia mutante usando viagem temporal para mudar o próprio passado — uma prima direta do que Ultimato faz.',
      },
    ],
    characters: ['professor-x', 'magneto', 'mystique', 'wolverine'],
    connections: [{ to: 'deadpool-e-wolverine', label: 'O legado da Fox é absorvido' }],
  },

  // ──────────────────────── FASE 4 · COLISÃO ────────────────────────
  {
    slug: 'as-marvels',
    name: 'As Marvels',
    originalName: 'The Marvels',
    year: 2023,
    type: 'film',
    runtimeMinutes: 105,
    phase: 'colisao',
    importance: 'extra',
    universes: ['cosmic', 'multiverse'],
    order: 26,
    markable: true,
    logline:
      'Três heroínas descobrem que seus poderes as fazem trocar de lugar entre si toda vez que os usam.',
    role: 'O filme mais leve da rota. Entra por causa de uma ideia — buracos no tecido do espaço — e de uma cena final que aponta para fora deste universo.',
    whyDoomsday:
      'Reforça, de forma explícita, que existem realidades vizinhas com heróis próprios. É o aperitivo conceitual antes de Deadpool & Wolverine.',
    context: 'Ajuda ter visto WandaVision. Não é obrigatório conhecer os filmes anteriores da Capitã Marvel.',
    shortcut:
      'Com pouco tempo? É o título mais pulável desta fase. O essencial dele é conceitual e você reencontra em Deadpool & Wolverine.',
    characters: [],
    connections: [{ to: 'deadpool-e-wolverine', label: 'Realidades vizinhas' }],
  },
  {
    slug: 'deadpool-e-wolverine',
    name: 'Deadpool & Wolverine',
    year: 2024,
    type: 'film',
    runtimeMinutes: 128,
    phase: 'colisao',
    importance: 'core',
    universes: ['multiverse', 'xmen'],
    order: 27,
    markable: true,
    logline:
      'Um mercenário tagarela é recrutado por uma burocracia temporal e vai atrás da única pessoa capaz de salvar seu universo: um Wolverine qualquer.',
    role: 'A ponte oficial entre o universo mutante da Fox e o MCU. É o filme que torna Doomsday possível dentro das regras da própria ficção.',
    whyDoomsday:
      'Hugh Jackman e Ryan Reynolds estão confirmados em Doomsday. Este filme estabelece, na tela, o mecanismo pelo qual personagens de outra franquia entram na história principal.',
    context:
      'Requer a série Loki (a burocracia temporal volta aqui) e rende muito mais com a Fase 3 vista. Os filmes anteriores do Deadpool são bem-vindos, mas opcionais.',
    concepts: [
      {
        name: 'Ancoragem de realidade',
        body: 'A ideia de que um universo depende de figuras específicas para continuar existindo. Explica por que um único personagem pode valer um mundo.',
      },
    ],
    characters: ['deadpool', 'wolverine'],
    connections: [
      { to: 'x-men-dias-de-um-futuro-esquecido', label: 'Herda o legado mutante' },
      { to: 'doomsday', label: 'Universos coexistindo' },
    ],
  },
  {
    slug: 'deadpool',
    name: 'Deadpool',
    year: 2016,
    type: 'film',
    runtimeMinutes: 108,
    phase: 'colisao',
    importance: 'extra',
    universes: ['xmen'],
    order: null,
    markable: true,
    logline: 'Um mercenário submetido a um experimento cruel sai de lá desfigurado, imortal e absolutamente insuportável.',
    role: 'Complementar. Explica quem é o personagem e por que ele fala com a câmera.',
    whyDoomsday:
      'Não é necessário para entender Doomsday. Serve para quem quer chegar em Deadpool & Wolverine com o personagem já calibrado.',
    context: 'Fora da rota obrigatória. Assista antes de Deadpool & Wolverine, se quiser.',
    characters: ['deadpool'],
  },
  {
    slug: 'logan',
    name: 'Logan',
    year: 2017,
    type: 'film',
    runtimeMinutes: 137,
    phase: 'colisao',
    importance: 'extra',
    universes: ['xmen'],
    order: null,
    markable: true,
    logline: 'Num futuro sem mutantes novos, um Wolverine velho e cansado cuida de um Xavier ainda mais velho.',
    role: 'Complementar, e o melhor filme deste bloco. Dá o peso emocional que Deadpool & Wolverine cita diretamente.',
    whyDoomsday:
      'Não é necessário. Mas é o filme que dá dimensão trágica ao Wolverine e ao Xavier — dois personagens confirmados em Doomsday.',
    context: 'Fora da rota obrigatória. Funciona sozinho, sem nenhum outro X-Men.',
    characters: ['wolverine', 'professor-x'],
  },
  {
    slug: 'deadpool-2',
    name: 'Deadpool 2',
    year: 2018,
    type: 'film',
    runtimeMinutes: 119,
    phase: 'colisao',
    importance: 'extra',
    universes: ['xmen'],
    order: null,
    markable: true,
    logline: 'Deadpool monta um time improvisado para proteger um garoto de um soldado vindo do futuro.',
    role: 'Complementar. Brinca com viagem no tempo e prepara piadas que Deadpool & Wolverine retoma.',
    whyDoomsday: 'Não é necessário para a preparação. Puro prazer de fã.',
    context: 'Fora da rota obrigatória. Depois de Deadpool.',
    characters: ['deadpool'],
  },

  // ───────────────────── FASE 5 · ESTADO ATUAL ─────────────────────
  {
    slug: 'capitao-america-admiravel-mundo-novo',
    name: 'Capitão América: Admirável Mundo Novo',
    originalName: 'Captain America: Brave New World',
    year: 2025,
    type: 'film',
    runtimeMinutes: 119,
    phase: 'estado-atual',
    importance: 'key',
    universes: ['avengers', 'street'],
    order: 28,
    markable: true,
    logline: 'O primeiro caso de Sam Wilson como Capitão América o coloca contra a própria Casa Branca.',
    role: 'Mostra o Capitão América atual em operação: sem soro, sem time, sem margem de erro.',
    whyDoomsday:
      'Anthony Mackie e Danny Ramirez estão confirmados em Doomsday. Este é o filme que define em que ponto os dois estão quando o Doom aparece.',
    context: 'Requer Falcão e o Soldado Invernal.',
    characters: ['sam-wilson', 'joaquin-torres'],
    connections: [{ to: 'doomsday', label: 'O Capitão América atual' }],
  },
  {
    slug: 'thunderbolts',
    name: 'Thunderbolts*',
    year: 2025,
    type: 'film',
    runtimeMinutes: 127,
    phase: 'estado-atual',
    importance: 'core',
    universes: ['thunderbolts', 'avengers'],
    order: 29,
    markable: true,
    logline:
      'Um grupo de operativos descartáveis é jogado numa armadilha comum e descobre que só tem uns aos outros.',
    role: 'O filme mais recente e mais diretamente conectado ao elenco de Doomsday. Encerra a Fase 5 com o time que hoje ocupa o lugar dos Vingadores.',
    whyDoomsday:
      'Florence Pugh, David Harbour, Wyatt Russell, Hannah John-Kamen, Lewis Pullman e Sebastian Stan estão confirmados em Doomsday. Seis nomes do elenco final saem deste filme.',
    context:
      'Rende muito mais com Viúva Negra e Falcão e o Soldado Invernal vistos. O asterisco no título é intencional — o filme explica.',
    spoilers: [
      {
        label: 'O que o asterisco significa',
        guards: 'thunderbolts',
        body: 'Ao final, o grupo é apresentado publicamente como os Novos Vingadores. É por isso que este filme é a antessala direta de Doomsday: o time que atende ao chamado já foi formado aqui.',
      },
    ],
    characters: ['yelena-belova', 'red-guardian', 'john-walker', 'ghost', 'sentry-bob', 'bucky-barnes'],
    connections: [{ to: 'doomsday', label: 'Novos Vingadores' }],
  },

  // ────────────────── FASE 6 · CAMINHO DIRETO ──────────────────
  {
    slug: 'quarteto-fantastico-primeiros-passos',
    name: 'Quarteto Fantástico: Primeiros Passos',
    originalName: 'The Fantastic Four: First Steps',
    year: 2025,
    type: 'film',
    runtimeMinutes: 115,
    phase: 'caminho-direto',
    importance: 'core',
    universes: ['fantastic-four', 'multiverse'],
    order: 30,
    markable: true,
    logline:
      'Quatro exploradores voltam de uma viagem espacial transformados, numa versão retrofuturista da Terra que os trata como família nacional.',
    role: 'A última parada. Apresenta os quatro personagens que chegam mais quentes em Doomsday e um universo com regras próprias.',
    whyDoomsday:
      'Pedro Pascal, Vanessa Kirby, Joseph Quinn e Ebon Moss-Bachrach estão confirmados em Doomsday. E, nos quadrinhos, o Doutor Destino é o inimigo histórico desta família — a proximidade entre as duas coisas não é acidente.',
    context:
      'Funciona sozinho. Não exige nenhum outro filme da rota, o que faz dele um ótimo último passo antes do destino.',
    characters: ['reed-richards', 'sue-storm', 'johnny-storm', 'ben-grimm'],
    connections: [{ to: 'doomsday', label: 'Última parada' }],
  },

  // ────────────────── DESTINO ──────────────────
  {
    slug: 'doomsday',
    name: 'Avengers: Doomsday',
    year: 2026,
    type: 'film',
    runtimeMinutes: 0,
    phase: 'caminho-direto',
    importance: 'core',
    universes: ['avengers', 'multiverse', 'xmen', 'fantastic-four', 'thunderbolts', 'wakanda'],
    order: 31,
    destination: true,
    markable: false,
    logline:
      'Heróis de três universos diferentes são colocados em rota de colisão diante de uma ameaça existencial.',
    role: 'O destino desta maratona. Estreia em 18 de dezembro de 2026.',
    whyDoomsday: 'É o Doomsday.',
    context:
      'Dirigido por Anthony e Joe Russo, com roteiro de Stephen McFeely. A sinopse acima é a linha oficial divulgada pela Marvel Studios — não existe sinopse completa publicada.',
    characters: ['doctor-doom'],
  },
]

export const TITLE_BY_SLUG = Object.fromEntries(TITLES.map((t) => [t.slug, t])) as Record<string, Title>
