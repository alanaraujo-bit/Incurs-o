import { Link } from 'react-router-dom'
import { DOOM_DOSSIER, LAST_VERIFIED } from '../data'
import { Page } from '../components/layout/AppShell'
import { CertaintyTag, ClaimRow } from '../components/domain/badges'
import { IconChevron, IconDoom } from '../components/ui/Icon'

export default function Doom() {
  return (
    <Page width="narrow" className="flex flex-col gap-10">
      <header>
        <p className="eyebrow mb-3 flex items-center gap-2 text-doom">
          <IconDoom size={14} /> dossiê
        </p>
        <h1 className="display mb-4 text-[34px] sm:text-[48px]">
          Victor von Doom
        </h1>
        <p className="max-w-[58ch] text-[15px] leading-relaxed text-ink-2">
          O vilão que dá nome ao filme e a decisão de elenco mais comentada da década. Esta página
          separa, item por item, o que foi confirmado do que é leitura e do que é boato.
        </p>
      </header>

      <div
        className="rounded-lg border p-5"
        style={{
          borderColor: 'color-mix(in oklab, var(--doom) 30%, transparent)',
          background: 'color-mix(in oklab, var(--doom) 6%, transparent)',
        }}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <CertaintyTag certainty="confirmed" />
          <CertaintyTag certainty="interpretation" />
          <CertaintyTag certainty="theory" />
        </div>
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          Três selos, usados em todo o app. <strong className="text-ink">Confirmado</strong> vem da
          Marvel Studios, da Disney ou de evento oficial.{' '}
          <strong className="text-ink">Interpretação</strong> é conclusão razoável a partir de material
          divulgado. <strong className="text-ink">Teoria</strong> é especulação — e permanece
          especulação até que alguém com autoridade diga o contrário.
        </p>
      </div>

      {DOOM_DOSSIER.map((section) => (
        <section key={section.id}>
          <h2 className="display mb-4 text-[21px] sm:text-[25px]">{section.title}</h2>
          {section.body.split('\n\n').map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-4 text-[14.5px] leading-relaxed text-ink-2">
              {paragraph}
            </p>
          ))}
          {section.claims && section.claims.length > 0 && (
            <ul className="mt-5 rounded-lg border border-line bg-surface-1 px-5 py-1">
              {section.claims.map((claim) => (
                <ClaimRow key={claim.text} {...claim} />
              ))}
            </ul>
          )}
        </section>
      ))}

      <footer className="flex flex-col gap-4 border-t border-line pt-6">
        <p className="text-[12.5px] leading-relaxed text-ink-3">
          Última verificação editorial: {LAST_VERIFIED}. Este é um projeto independente de fãs, sem
          vínculo com a Marvel Studios ou com a Disney. Todos os personagens, títulos e marcas citados
          pertencem a seus respectivos detentores de direitos.
        </p>
        <Link
          to="/destino"
          className="inline-flex items-center gap-1 self-start text-[13.5px] font-medium text-doom hover:underline"
        >
          Ver a página do filme <IconChevron size={14} />
        </Link>
      </footer>
    </Page>
  )
}
