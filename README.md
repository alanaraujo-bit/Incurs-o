# Incursão

Companion de maratona para **Avengers: Doomsday**. Trinta filmes e séries em ordem curada, com o
motivo editorial de cada um, progresso persistente no aparelho e nenhuma tela de cadastro.

PWA instalável, offline-first, pt-BR, dark e light desenhados separadamente.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # typecheck + bundle de produção
npm run preview    # servir o build em :4173
```

## Scripts auxiliares

| script          | o que faz                                                              |
| --------------- | ---------------------------------------------------------------------- |
| `npm run verify`| typecheck + lint + build                                               |
| `npm run assets`| regenera ícones da PWA e a imagem social a partir de SVG (`scripts/`)  |
| `npm run shots` | percorre todas as telas em 4 larguras × 2 temas e salva PNGs em `.shots`, reportando erros de console e overflow horizontal |

`npm run shots` exige um servidor de preview rodando e o Chromium do Playwright instalado
(`npx playwright install chromium`).

## Arquitetura

```
src/
  data/        catálogo editorial — nenhum texto de conteúdo vive fora daqui
    types.ts     contratos (Title, Phase, Character, Thread, Claim…)
    titles.ts    33 produções + o destino
    phases.ts    os 6 blocos da rota
    characters.ts elenco, com grau de certeza sobre presença em Doomsday
    threads.ts   fios narrativos (a base da tela de conexões)
    dossiers.ts  dossiê do Doom e fatos verificados sobre o filme
  store/       estado e persistência
    schema.ts    formato salvo + função de migração versionada
    storage.ts   localStorage tolerante a falha, export/import
    ProgressContext.tsx / ThemeContext.tsx
  lib/         cálculo e utilidades puras
    selectors.ts ÚNICA fonte de verdade do cálculo de preparação
    format.ts, palette.ts, share.ts
  components/
    ui/          primitivas do design system (Button, Sheet, Toast, Spoiler, ProgressArc, Sigil…)
    domain/      componentes que conhecem o domínio (TitleCard, ContinueCard, StatusControl…)
    layout/      casca, navegação, marca
    system/      ErrorBoundary, banners de offline e atualização
  routes/      uma tela por arquivo, todas lazy exceto a Home
```

### Decisões que importam

**Denominador do progresso.** A porcentagem considera apenas as 30 produções da rota principal
(`order` 1–30). Os três complementares (`order: null`) e o destino ficam de fora, então não existe
leitura acima de 100%. A regra vive em um único lugar: `lib/selectors.ts`.

**Doomsday não é marcável.** `markable: false` no dado; a UI mostra o motivo em vez de um botão
inerte. Quando o filme estrear, basta virar a flag.

**Sem pôsteres.** O produto não redistribui material licenciado. Cada obra recebe um *sigilo* — duas
órbitas em colisão, posicionadas por um hash estável do slug (`components/ui/Sigil.tsx`). Arte
determinística, zero bytes de imagem, zero requisição de rede.

**Certeza declarada.** Toda afirmação sobre o filme carrega `confirmed | interpretation | theory`
como campo de dado, não como escolha de redação. A teoria de que Doom seria uma variante de Tony
Stark aparece explicitamente rotulada como teoria.

**Persistência versionada.** `schema.ts` expõe `migrate()`, que normaliza qualquer payload — de
localStorage antigo ou de arquivo importado — para o formato atual. Dados corrompidos viram estado
inicial em vez de quebrar o app.

## Direitos

Projeto independente de fãs. Sem vínculo, patrocínio ou afiliação com a Marvel Studios ou a The Walt
Disney Company. Nomes e marcas citados pertencem a seus respectivos titulares e são usados em caráter
referencial. Nenhum pôster, still ou material promocional é reproduzido.
