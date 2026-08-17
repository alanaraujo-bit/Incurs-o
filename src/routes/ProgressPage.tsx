import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { OPTIONAL_TITLES, ROUTE_TITLES, statusOf } from '../lib/selectors'
import {
  daysUntilRelease,
  estimateDays,
  formatDate,
  formatDuration,
  formatDurationCompact,
  formatRelativeDate,
} from '../lib/format'
import { accentColor } from '../lib/palette'
import { progressShare, share, downloadFile, copy } from '../lib/share'
import { parseImport, toExportPayload } from '../store/storage'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { ProgressArc } from '../components/ui/ProgressArc'
import { Sheet } from '../components/ui/Sheet'
import { useToast } from '../components/ui/Toast'
import { InstallPrompt } from '../components/domain/InstallPrompt'
import {
  IconCheck,
  IconDownload,
  IconEye,
  IconShare,
  IconTrash,
  IconUpload,
} from '../components/ui/Icon'
import { Button, Meter, SectionHeader, cx } from '../components/ui/primitives'

export default function ProgressPage() {
  const { progress, state, reset, replaceState, setSpoilerPolicy, persistent } = useProgress()
  const { toast } = useToast()
  const [confirmReset, setConfirmReset] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const history = [...ROUTE_TITLES, ...OPTIONAL_TITLES]
    .filter((t) => state.entries[t.slug])
    .sort((a, b) => (state.entries[b.slug]?.at ?? '').localeCompare(state.entries[a.slug]?.at ?? ''))
    .slice(0, 8)

  const onShare = async () => {
    const result = await share(progressShare(progress))
    if (result === 'copied') toast('Resumo copiado.', { tone: 'accent' })
    if (result === 'failed') toast('Não foi possível compartilhar.', { tone: 'danger' })
  }

  const onExport = () => {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadFile(`incursao-progresso-${stamp}.json`, JSON.stringify(toExportPayload(state), null, 2))
    toast('Arquivo de progresso baixado.', { tone: 'accent' })
  }

  const onImportFile = async (file: File) => {
    const text = await file.text()
    const result = parseImport(text)
    if (!result.ok) {
      toast(result.error, { tone: 'danger' })
      return
    }
    replaceState(result.state)
    toast(`Progresso importado: ${result.count} registros.`, { tone: 'accent' })
  }

  return (
    <Page width="default" className="flex flex-col gap-12">
      <header>
        <p className="eyebrow mb-3">seu progresso</p>
        <h1 className="display mb-3 text-[30px] sm:text-[40px]">A jornada até aqui</h1>
        <p className="max-w-[58ch] text-[14px] leading-relaxed text-ink-2">
          Tudo fica salvo neste navegador. Sem conta, sem servidor, sem sincronização — e com um
          arquivo de exportação para levar para outro aparelho.
        </p>
      </header>

      {/* Cartão compartilhável */}
      <section
        className="relative overflow-hidden rounded-xl border border-line bg-surface-1 p-6 sm:p-8"
        aria-labelledby="cartao"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(90% 100% at 100% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="relative grid items-center gap-8 sm:grid-cols-[auto_1fr]">
          <ProgressArc value={progress.ratio} size={168} stroke={8}>
            <p className="numeric text-[40px] leading-none font-semibold">{progress.percent}%</p>
            <p className="eyebrow mt-1.5">preparado</p>
          </ProgressArc>

          <div className="min-w-0">
            <h2 id="cartao" className="display mb-4 text-[22px] sm:text-[26px]">
              {progress.complete
                ? 'Preparação concluída.'
                : progress.untouched
                  ? 'A rota está aberta.'
                  : `${progress.done} de ${progress.total} concluídos.`}
            </h2>
            <dl className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <Stat label="assistido" value={formatDurationCompact(progress.minutesWatched)} />
              <Stat label="restante" value={formatDurationCompact(progress.minutesLeft)} />
              <Stat
                label="fases fechadas"
                value={`${progress.phases.filter((p) => p.complete).length}/6`}
              />
              <Stat label="complementares" value={`${progress.optionalDone}/${progress.optionalTotal}`} />
              <Stat
                label="a 3h por dia"
                value={progress.complete ? 'concluído' : `${estimateDays(progress.minutesLeft, 180)} dias`}
              />
              <Stat label="até a estreia" value={`${daysUntilRelease()} dias`} />
            </dl>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={onShare}>
                <IconShare size={16} />
                Compartilhar
              </Button>
              <Button
                onClick={async () => {
                  const result = await copy(progressShare(progress).text)
                  toast(result === 'copied' ? 'Texto copiado.' : 'Não foi possível copiar.', {
                    tone: result === 'copied' ? 'accent' : 'danger',
                  })
                }}
              >
                Copiar texto
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Progresso por fase */}
      <section>
        <SectionHeader eyebrow="detalhe" title="Por núcleo narrativo" />
        <div className="flex flex-col divide-y divide-[var(--line)] rounded-lg border border-line bg-surface-1">
          {progress.phases.map((phase) => {
            const color = accentColor(phase.phase.accent)
            return (
              <Link
                key={phase.phase.id}
                to={`/rota#fase-${phase.phase.id}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-surface-2/60"
              >
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full border text-[11px] font-medium"
                  style={{
                    borderColor: phase.complete ? color : 'var(--line)',
                    background: phase.complete ? color : 'transparent',
                    color: phase.complete ? 'var(--ink-inverse)' : 'var(--ink-3)',
                  }}
                >
                  {phase.complete ? (
                    <IconCheck size={14} />
                  ) : (
                    <span className="numeric">{phase.phase.index}</span>
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className={cx('display text-[15px]', phase.complete && 'opacity-65')}>
                      {phase.phase.name}
                    </span>
                    <span className="numeric shrink-0 text-[11.5px] text-ink-3">
                      {phase.done}/{phase.total} ·{' '}
                      {phase.complete
                        ? 'concluída'
                        : `${formatDurationCompact(phase.minutesLeft)} restantes`}
                    </span>
                  </span>
                  <Meter value={phase.ratio} color={color} height={3} />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {history.length > 0 && (
        <section>
          <SectionHeader eyebrow="histórico" title="Últimas marcações" />
          <ul className="flex flex-col divide-y divide-[var(--line)] rounded-lg border border-line bg-surface-1">
            {history.map((title) => {
              const entry = state.entries[title.slug]
              return (
                <li key={title.slug}>
                  <Link
                    to={`/titulo/${title.slug}`}
                    className="flex items-center justify-between gap-4 p-3.5 transition-colors hover:bg-surface-2/60"
                  >
                    <span className="min-w-0">
                      <span className="display block truncate text-[14.5px]">{title.name}</span>
                      <span className="block text-[11.5px] text-ink-3">
                        {statusOf(state, title.slug) === 'done' ? 'Concluído' : 'Assistindo'} ·{' '}
                        {formatRelativeDate(entry?.at ?? '')}
                      </span>
                    </span>
                    <span className="numeric shrink-0 text-[11.5px] text-ink-3">
                      {formatDuration(title.runtimeMinutes)}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <InstallPrompt />

      {/* Preferências e dados */}
      <section>
        <SectionHeader eyebrow="dados e preferências" title="Seus dados" />

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface-1 p-4">
            <div className="min-w-0">
              <p className="mb-1 flex items-center gap-2 text-[14px] font-medium text-ink">
                <IconEye size={15} />
                Proteção de spoiler
              </p>
              <p className="max-w-[48ch] text-[12.5px] leading-relaxed text-ink-3">
                Blocos com spoiler ficam ocultos até você tocar. Quem já marcou a obra como assistida vê
                tudo automaticamente.
              </p>
            </div>
            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant={state.spoilerPolicy === 'guard' ? 'primary' : 'secondary'}
                onClick={() => setSpoilerPolicy('guard')}
                aria-pressed={state.spoilerPolicy === 'guard'}
              >
                Proteger
              </Button>
              <Button
                size="sm"
                variant={state.spoilerPolicy === 'open' ? 'primary' : 'secondary'}
                onClick={() => setSpoilerPolicy('open')}
                aria-pressed={state.spoilerPolicy === 'open'}
              >
                Mostrar tudo
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onExport}
              className="flex items-start gap-3 rounded-lg border border-line bg-surface-1 p-4 text-left transition-colors hover:border-line-strong"
            >
              <IconDownload size={18} className="mt-0.5 shrink-0 text-ink-3" />
              <span>
                <span className="block text-[14px] font-medium text-ink">Exportar progresso</span>
                <span className="block text-[12.5px] leading-relaxed text-ink-3">
                  Baixa um arquivo JSON com tudo o que você marcou.
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-start gap-3 rounded-lg border border-line bg-surface-1 p-4 text-left transition-colors hover:border-line-strong"
            >
              <IconUpload size={18} className="mt-0.5 shrink-0 text-ink-3" />
              <span>
                <span className="block text-[14px] font-medium text-ink">Importar progresso</span>
                <span className="block text-[12.5px] leading-relaxed text-ink-3">
                  Substitui o progresso atual pelo do arquivo.
                </span>
              </span>
            </button>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void onImportFile(file)
              e.target.value = ''
            }}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line p-4">
            <div className="min-w-0">
              <p className="mb-1 text-[14px] font-medium text-ink">Recomeçar do zero</p>
              <p className="text-[12.5px] leading-relaxed text-ink-3">
                Apaga todas as marcações deste aparelho. Não dá para desfazer.
              </p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setConfirmReset(true)}>
              <IconTrash size={15} />
              Zerar
            </Button>
          </div>

          <p className="text-[12px] leading-relaxed text-ink-3">
            {persistent
              ? `Progresso salvo neste navegador desde ${formatDate(state.createdAt)}.`
              : 'Este navegador está bloqueando o armazenamento local. Seu progresso vale apenas para esta sessão — exporte o arquivo antes de sair.'}{' '}
            <Link to="/sobre" className="text-ink-2 underline underline-offset-2 hover:text-ink">
              Sobre o projeto, privacidade e direitos
            </Link>
            .
          </p>
        </div>
      </section>

      <Sheet
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Zerar progresso?"
        footer={
          <div className="flex gap-2">
            <Button block onClick={() => setConfirmReset(false)}>
              Cancelar
            </Button>
            <Button
              block
              variant="danger"
              onClick={() => {
                reset()
                setConfirmReset(false)
                toast('Progresso zerado.')
              }}
            >
              Zerar tudo
            </Button>
          </div>
        }
      >
        <p className="text-[14px] leading-relaxed text-ink-2">
          Isto apaga as {Object.keys(state.entries).length} marcações salvas neste aparelho e devolve a
          preparação para 0%. Se quiser guardar um registro antes, exporte o arquivo de progresso.
        </p>
      </Sheet>
    </Page>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="numeric text-[18px] leading-none font-semibold text-ink">{value}</p>
      <p className="eyebrow mt-1.5">{label}</p>
    </div>
  )
}
