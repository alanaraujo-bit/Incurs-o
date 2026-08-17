import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { CHARACTER_BY_SLUG, THREADS, TITLE_BY_SLUG } from '../data'
import type { Thread } from '../data'
import { statusOf } from '../lib/selectors'
import { accentColor, tint } from '../lib/palette'
import { useProgress } from '../store/ProgressContext'
import { Page } from '../components/layout/AppShell'
import { IconCheck, IconChevron } from '../components/ui/Icon'
import { cx } from '../components/ui/primitives'

/**
 * Conexões.
 *
 * Em vez de um grafo ilegível, cada relação é um "fio": uma sequência
 * horizontal de paradas que começa numa obra e termina em Doomsday.
 * Legível numa passada, e mostra o que um diagrama de nós não mostra —
 * a direção da história.
 */
export default function Threads() {
  const [openId, setOpenId] = useState<string>(THREADS[0].id)

  return (
    <Page width="wide" className="flex flex-col gap-8">
      <header>
        <p className="eyebrow mb-3">conexões</p>
        <h1 className="display mb-3 text-[30px] sm:text-[40px]">
          Nada aqui é um filme solto.
        </h1>
        <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-2">
          Seis fios narrativos atravessam a rota. Cada um responde a uma pergunta e termina no mesmo
          lugar. Abra um para ver as paradas em ordem.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {THREADS.map((thread) => (
          <ThreadPanel
            key={thread.id}
            thread={thread}
            open={openId === thread.id}
            onToggle={() => setOpenId((prev) => (prev === thread.id ? '' : thread.id))}
          />
        ))}
      </div>
    </Page>
  )
}

function ThreadPanel({
  thread,
  open,
  onToggle,
}: {
  thread: Thread
  open: boolean
  onToggle: () => void
}) {
  const { state } = useProgress()
  const reduce = useReducedMotion()
  const color = accentColor(thread.accent)

  const doneSteps = thread.steps.filter(
    (step) => step.kind === 'title' && statusOf(state, step.ref) === 'done',
  ).length
  const titleSteps = thread.steps.filter((s) => s.kind === 'title').length

  return (
    <section
      className="overflow-hidden rounded-xl border transition-colors"
      style={{ borderColor: open ? tint(color, 34) : 'var(--line)', background: 'var(--surface-1)' }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-surface-2/50 sm:p-6"
      >
        <span className="min-w-0 flex-1">
          <span className="eyebrow mb-1.5 block" style={{ color }}>
            {thread.question}
          </span>
          <span className="display block text-[19px] sm:text-[23px]">{thread.name}</span>
          <span className="mt-1.5 block max-w-[68ch] text-[13px] leading-relaxed text-ink-3">
            {thread.summary}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-2">
          <span className="numeric text-[11.5px] text-ink-3">
            {doneSteps}/{titleSteps}
          </span>
          <span
            className={cx('text-ink-3 transition-transform duration-300', open && 'rotate-90')}
            aria-hidden="true"
          >
            <IconChevron size={16} />
          </span>
        </span>
      </button>

      {open && (
        <motion.div
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          {/* a máscara à direita sinaliza que o fio continua rolando */}
          <div
            className="rail flex gap-0 border-t border-line px-5 py-6 sm:px-6"
            style={{
              maskImage: 'linear-gradient(90deg, #000 0, #000 calc(100% - 56px), transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(90deg, #000 0, #000 calc(100% - 56px), transparent 100%)',
            }}
          >
            {thread.steps.map((step, index) => {
              const isTitle = step.kind === 'title'
              const entity = isTitle ? TITLE_BY_SLUG[step.ref] : CHARACTER_BY_SLUG[step.ref]
              if (!entity) return null
              const done = isTitle && statusOf(state, step.ref) === 'done'
              const isLast = index === thread.steps.length - 1
              const href = isTitle
                ? TITLE_BY_SLUG[step.ref]?.destination
                  ? '/destino'
                  : `/titulo/${step.ref}`
                : `/elenco/${step.ref}`

              return (
                <div key={`${step.kind}-${step.ref}`} className="flex shrink-0 items-start">
                  <Link
                    to={href}
                    className="group block w-[190px] shrink-0 snap-start px-1 sm:w-[212px]"
                  >
                    <span className="mb-3 flex items-center gap-2">
                      <span
                        className="grid size-6 shrink-0 place-items-center rounded-full border text-[10px] font-medium transition-all"
                        style={{
                          borderColor: done || isLast ? color : 'var(--line-strong)',
                          background: done ? color : isLast ? tint(color, 18) : 'transparent',
                          color: done ? 'var(--ink-inverse)' : 'var(--ink-3)',
                        }}
                      >
                        {done ? <IconCheck size={12} /> : <span className="numeric">{index + 1}</span>}
                      </span>
                      {!isLast && (
                        <span
                          className="h-[2px] flex-1"
                          style={{ background: done ? color : 'var(--line-strong)', opacity: done ? 0.8 : 0.35 }}
                        />
                      )}
                    </span>
                    <span className="eyebrow mb-1 block truncate">{step.label}</span>
                    <span className="display mb-1.5 block text-[14.5px] leading-tight group-hover:text-accent">
                      {'name' in entity ? entity.name : step.ref}
                    </span>
                    <span className="block text-[12px] leading-snug text-ink-3">{step.note}</span>
                  </Link>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </section>
  )
}
