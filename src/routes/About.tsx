import { Link } from 'react-router-dom'
import { LAST_VERIFIED } from '../data'
import { ROUTE_MINUTES, ROUTE_TOTAL } from '../lib/selectors'
import { formatDuration } from '../lib/format'
import { Page } from '../components/layout/AppShell'
import { CertaintyTag } from '../components/domain/badges'

export default function About() {
  return (
    <Page width="narrow" className="flex flex-col gap-9">
      <header>
        <p className="eyebrow mb-3">sobre</p>
        <h1 className="display mb-4 text-[30px] sm:text-[40px]">O que é a Incursão</h1>
        <p className="text-[15px] leading-relaxed text-ink-2">
          Um companion de maratona feito por fã, para fã. {ROUTE_TOTAL} produções em ordem curada —{' '}
          {formatDuration(ROUTE_MINUTES)} no total — com o motivo editorial de cada uma e um sistema de
          progresso que vive inteiramente no seu aparelho.
        </p>
      </header>

      <section>
        <h2 className="display mb-3 text-[19px]">Como a rota foi montada</h2>
        <p className="mb-3 text-[14px] leading-relaxed text-ink-2">
          O critério é um só: o que Avengers: Doomsday assume que você já sabe. Isso inclui laços
          afetivos (a Fase 1 existe para você se importar), vocabulário narrativo (variantes e linhas
          do tempo, na Fase 2), e presença de elenco anunciado — cada núcleo da rota corresponde a
          atores confirmados no filme.
        </p>
        <p className="text-[14px] leading-relaxed text-ink-2">
          Nem tudo pesa igual. Cada obra recebe um dos três selos —{' '}
          <strong className="text-ink">Espinha dorsal</strong>,{' '}
          <strong className="text-ink">Alto retorno</strong> ou{' '}
          <strong className="text-ink">Dispensável</strong> — e as que podem ser puladas dizem isso
          explicitamente, na própria página.
        </p>
      </section>

      <section>
        <h2 className="display mb-3 text-[19px]">Como a informação é tratada</h2>
        <p className="mb-4 text-[14px] leading-relaxed text-ink-2">
          Toda afirmação sobre o filme carrega um selo de certeza. Boato não vira notícia aqui.
        </p>
        <ul className="flex flex-col gap-3">
          <li className="flex flex-wrap items-baseline gap-3">
            <CertaintyTag certainty="confirmed" />
            <span className="text-[13.5px] text-ink-2">
              Marvel Studios, Disney ou evento oficial com o estúdio no palco.
            </span>
          </li>
          <li className="flex flex-wrap items-baseline gap-3">
            <CertaintyTag certainty="interpretation" />
            <span className="text-[13.5px] text-ink-2">
              Conclusão razoável a partir de material divulgado. Não é declaração oficial.
            </span>
          </li>
          <li className="flex flex-wrap items-baseline gap-3">
            <CertaintyTag certainty="theory" />
            <span className="text-[13.5px] text-ink-2">
              Especulação de fãs ou de imprensa. Permanece especulação até prova em contrário.
            </span>
          </li>
        </ul>
        <p className="mt-4 text-[12.5px] text-ink-3">Última verificação editorial: {LAST_VERIFIED}.</p>
      </section>

      <section>
        <h2 className="display mb-3 text-[19px]">Privacidade</h2>
        <p className="text-[14px] leading-relaxed text-ink-2">
          Não existe conta, login, cadastro ou servidor. Seu progresso é gravado no armazenamento local
          deste navegador e nunca sai do aparelho, a não ser que você mesmo exporte o arquivo. Não há
          rastreamento, analytics nem cookies de terceiros.
        </p>
      </section>

      <section>
        <h2 className="display mb-3 text-[19px]">Direitos</h2>
        <p className="mb-3 text-[14px] leading-relaxed text-ink-2">
          Projeto independente, sem qualquer vínculo, patrocínio ou afiliação com a Marvel Studios, a
          The Walt Disney Company ou suas subsidiárias. Marvel, Avengers, Doomsday, X-Men, Quarteto
          Fantástico e demais nomes citados são marcas de seus respectivos titulares, usadas aqui em
          caráter referencial e informativo.
        </p>
        <p className="text-[14px] leading-relaxed text-ink-2">
          Nenhum pôster, fotografia ou material promocional é reproduzido. Toda a arte visual do app —
          incluindo os sigilos de cada produção — é gerada por código a partir do próprio catálogo.
        </p>
      </section>

      <footer className="border-t border-line pt-6">
        <Link to="/" className="text-[13.5px] font-medium text-accent hover:underline">
          Voltar para a base
        </Link>
      </footer>
    </Page>
  )
}
