import type { Claim, DossierSection } from './types'

/**
 * Conteúdo editorial verificado.
 *
 * Regra do produto: toda afirmação sobre Doomsday carrega um grau de certeza.
 * `confirmed` = anunciado por Marvel Studios / Disney ou noticiado a partir de
 * evento oficial. `interpretation` = leitura razoável do material divulgado.
 * `theory` = especulação de fãs ou imprensa, sem confirmação.
 *
 * Última verificação editorial: 17 de agosto de 2026.
 */
export const LAST_VERIFIED = '17 de agosto de 2026'

export const DOOMSDAY_FACTS: Claim[] = [
  {
    certainty: 'confirmed',
    text: 'Estreia mundial marcada para 18 de dezembro de 2026.',
    source: 'Marvel Studios',
  },
  { certainty: 'confirmed', text: 'Direção de Anthony e Joe Russo.', source: 'Marvel Studios' },
  { certainty: 'confirmed', text: 'Roteiro de Stephen McFeely.', source: 'Marvel Studios' },
  { certainty: 'confirmed', text: 'Trilha sonora de Alan Silvestri.', source: 'Marvel Studios' },
  {
    certainty: 'confirmed',
    text: 'Robert Downey Jr. interpreta Victor von Doom / Doutor Destino. O anúncio foi feito no painel da San Diego Comic-Con em julho de 2024.',
    source: 'Marvel Studios · SDCC 2024',
  },
  {
    certainty: 'confirmed',
    text: 'O elenco foi revelado em transmissão ao vivo da Marvel Studios em março de 2025, com dezenas de nomes anunciados de uma vez.',
    source: 'Marvel Studios',
  },
  {
    certainty: 'confirmed',
    text: 'A linha oficial de sinopse fala em heróis de três universos distintos colocados em rota de colisão diante de uma ameaça existencial.',
    source: 'Marvel Studios',
  },
  {
    certainty: 'confirmed',
    text: 'Quatro teasers foram lançados entre dezembro de 2025 e janeiro de 2026, destacando respectivamente Steve Rogers, Thor, os X-Men e o núcleo Wakanda / Quarteto Fantástico.',
    source: 'Marvel Studios',
  },
  {
    certainty: 'confirmed',
    text: 'O primeiro trailer completo foi divulgado em 20 de julho de 2026, com a primeira aparição do Doutor Destino.',
    source: 'Marvel Studios',
  },
  {
    certainty: 'confirmed',
    text: 'Um novo material foi apresentado na D23 em agosto de 2026, com Kevin Feige, Robert Downey Jr., Chris Evans e Hayley Atwell no palco, confirmando também Hugh Jackman e Ryan Reynolds.',
    source: 'D23 2026',
  },
  {
    certainty: 'interpretation',
    text: 'Os três universos citados na sinopse correspondem, na leitura mais direta do material divulgado, ao MCU, ao universo mutante herdado da Fox e ao universo do Quarteto Fantástico.',
  },
  {
    certainty: 'theory',
    text: 'Especulações sobre adaptações de arcos específicos dos quadrinhos, mortes de personagens e a natureza exata da ameaça circulam há meses. Nada disso foi confirmado pela Marvel Studios.',
  },
]

export const DOOM_DOSSIER: DossierSection[] = [
  {
    id: 'quem-e',
    title: 'Quem é Victor von Doom',
    body: 'Nos quadrinhos da Marvel, Victor von Doom é o monarca absoluto da Latvéria, um país fictício do leste europeu. Ele é, simultaneamente, um dos maiores cientistas do mundo e um feiticeiro treinado — combinação rara, e parte central do que o torna perigoso. Sua armadura não é um traje de super-herói: é uma coroa. E seu adversário histórico, desde a origem do personagem em 1962, é Reed Richards, do Quarteto Fantástico.',
    claims: [
      {
        certainty: 'confirmed',
        text: 'É a estreia do personagem dentro do Universo Cinematográfico Marvel. Versões anteriores em cinema pertenceram a outros estúdios e não fazem parte desta continuidade.',
      },
    ],
  },
  {
    id: 'rdj',
    title: 'Por que Robert Downey Jr.',
    body: 'Downey encerrou sua participação como Tony Stark em 2019. Cinco anos depois, a Marvel Studios o trouxe de volta para um personagem diferente — não uma continuação, uma substituição de papel. O anúncio foi feito no palco da San Diego Comic-Con, em julho de 2024, com os irmãos Russo confirmados na direção. É uma decisão de elenco deliberada e altamente incomum, e a própria estranheza dela faz parte do que o estúdio está vendendo.',
    claims: [
      {
        certainty: 'confirmed',
        text: 'Robert Downey Jr. interpreta Victor von Doom em Avengers: Doomsday.',
        source: 'Marvel Studios · SDCC 2024',
      },
      {
        certainty: 'confirmed',
        text: 'O personagem foi apresentado como Doutor Destino, e não como uma continuação de Tony Stark.',
      },
    ],
  },
  {
    id: 'variante',
    title: 'A teoria da variante de Tony Stark',
    body: 'Desde o anúncio, uma leitura circula com força: a de que este Doom seria uma variante multiversal de Tony Stark, aproveitando o fato de o mesmo ator interpretar os dois. A teoria é sedutora e coerente com as regras que a série Loki estabeleceu. Ela também é, até hoje, apenas uma teoria.\n\nEste app não a trata como fato, e recomenda que você também não trate. Se o filme confirmar, você terá a surpresa que merece. Se não confirmar, você não terá passado meses acreditando numa coisa que ninguém disse.',
    claims: [
      {
        certainty: 'theory',
        text: 'Que Victor von Doom seja uma variante de Tony Stark. Não há confirmação da Marvel Studios, da Disney ou dos diretores.',
      },
      {
        certainty: 'interpretation',
        text: 'A escalação do mesmo ator para dois papéis num universo que já estabeleceu variantes torna a pergunta legítima. Isso não a torna respondida.',
      },
    ],
  },
  {
    id: 'como-ler',
    title: 'Como ler informação sobre este filme',
    body: 'Um filme desta escala gera mais boato do que notícia. A separação usada aqui é simples e você pode aplicá-la em qualquer lugar: se veio da Marvel Studios, da Disney ou de um evento oficial com o estúdio no palco, é fato. Se é uma conclusão razoável tirada de material divulgado, é interpretação — e deve ser rotulada como tal. Se veio de "fontes próximas à produção", é boato até segunda ordem.\n\nTudo neste app carrega um desses três selos.',
  },
]
