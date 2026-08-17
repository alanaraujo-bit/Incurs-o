import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useProgress } from '../../store/ProgressContext'
import { statusOf } from '../../lib/selectors'
import { IconEye, IconLock } from './Icon'
import { cx } from './primitives'

/**
 * Proteção de spoiler.
 *
 * Três caminhos liberam o conteúdo, nessa ordem de prioridade:
 *  1. o usuário optou por "mostrar tudo" nas preferências;
 *  2. o título que seria queimado já está marcado como concluído;
 *  3. o usuário clicou para revelar — e a escolha fica registrada.
 */
export function Spoiler({
  id,
  label,
  guards,
  children,
}: {
  id: string
  label: string
  /** slug do título queimado por este conteúdo. */
  guards?: string
  children: ReactNode
}) {
  const { isRevealed, reveal, state } = useProgress()
  const reduce = useReducedMotion()

  const alreadyWatched = guards ? statusOf(state, guards) === 'done' : false
  const open = alreadyWatched || isRevealed(id)

  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-md border transition-colors duration-300',
        open ? 'border-line bg-surface-2' : 'border-dashed border-line-strong bg-surface-2/60',
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="open"
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="p-3.5"
          >
            <p className="eyebrow mb-2 flex items-center gap-1.5">
              <IconEye size={12} />
              {alreadyWatched ? 'liberado — você já assistiu' : label}
            </p>
            <div className="text-[13.5px] leading-relaxed text-ink-2">{children}</div>
          </motion.div>
        ) : (
          <motion.button
            key="closed"
            type="button"
            onClick={() => reveal(id)}
            exit={reduce ? undefined : { opacity: 0 }}
            className="tap flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-surface-3"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-3">
              <IconLock size={15} />
            </span>
            <span className="min-w-0">
              <span className="block text-[13.5px] font-medium text-ink">{label}</span>
              <span className="block text-[12px] text-ink-3">
                Contém spoiler. Toque para revelar.
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
