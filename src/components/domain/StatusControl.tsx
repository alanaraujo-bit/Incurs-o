import { motion, useReducedMotion } from 'motion/react'
import type { Title } from '../../data'
import { statusOf } from '../../lib/selectors'
import { useProgress } from '../../store/ProgressContext'
import { useToast } from '../ui/Toast'
import { IconCheck, IconLock, IconPlay, IconUndo } from '../ui/Icon'
import { cx } from '../ui/primitives'

/**
 * Marcar assistido / assistindo / desfazer, em um único controle.
 * Disponível em qualquer lugar onde um título apareça — nunca é preciso
 * abrir uma tela só para mudar um status.
 */
export function StatusControl({
  title,
  variant = 'inline',
}: {
  title: Title
  variant?: 'inline' | 'full' | 'compact'
}) {
  const { state, setStatus } = useProgress()
  const { toast } = useToast()
  const reduce = useReducedMotion()
  const status = statusOf(state, title.slug)

  if (!title.markable) {
    return (
      <div
        className={cx(
          'inline-flex items-center gap-2 rounded-md border border-dashed border-line px-3 text-ink-3',
          variant === 'full' ? 'h-11 w-full justify-center' : 'h-9',
        )}
      >
        <IconLock size={14} />
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase">Ainda não estreou</span>
      </div>
    )
  }

  const mark = (next: 'done' | 'watching' | 'idle') => {
    const previous = status
    setStatus(title.slug, next)
    if (next === 'done') {
      toast(`${title.name} concluído.`, {
        tone: 'accent',
        action: { label: 'Desfazer', run: () => setStatus(title.slug, previous) },
      })
    } else if (next === 'watching') {
      toast(`Assistindo ${title.name}.`, {
        action: { label: 'Desfazer', run: () => setStatus(title.slug, previous) },
      })
    } else {
      toast('Status removido.')
    }
  }

  if (variant === 'compact') {
    const nextStatus = status === 'done' ? 'idle' : 'done'
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          mark(nextStatus)
        }}
        aria-pressed={status === 'done'}
        aria-label={status === 'done' ? `Desmarcar ${title.name}` : `Marcar ${title.name} como assistido`}
        className={cx(
          'tap grid place-items-center rounded-full border transition-all duration-200',
          'size-9',
          status === 'done'
            ? 'border-transparent bg-accent text-accent-ink'
            : status === 'watching'
              ? 'border-accent/50 text-accent'
              : 'border-line text-ink-3 hover:border-line-strong hover:text-ink',
        )}
      >
        <motion.span
          key={status}
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {status === 'done' ? <IconCheck size={16} /> : status === 'watching' ? <IconPlay size={13} /> : <IconCheck size={16} />}
        </motion.span>
      </button>
    )
  }

  const base =
    'inline-flex items-center justify-center gap-2 border font-medium transition-all duration-200 active:scale-[0.98]'
  const height = variant === 'full' ? 'h-12 text-[14px]' : 'h-9 text-[13px]'

  return (
    <div className={cx('flex gap-2', variant === 'full' && 'w-full')}>
      <button
        type="button"
        onClick={() => mark(status === 'done' ? 'idle' : 'done')}
        aria-pressed={status === 'done'}
        className={cx(
          base,
          height,
          'rounded-md px-4',
          variant === 'full' && 'flex-1',
          status === 'done'
            ? 'border-transparent bg-accent text-accent-ink'
            : 'border-line bg-surface-2 text-ink hover:border-line-strong',
        )}
      >
        <IconCheck size={15} />
        {status === 'done' ? 'Assistido' : 'Marcar assistido'}
      </button>

      {status !== 'done' && (
        <button
          type="button"
          onClick={() => mark(status === 'watching' ? 'idle' : 'watching')}
          aria-pressed={status === 'watching'}
          className={cx(
            base,
            height,
            'rounded-md px-4',
            status === 'watching'
              ? 'border-accent/50 bg-accent-soft text-accent'
              : 'border-line bg-surface-2 text-ink-2 hover:border-line-strong hover:text-ink',
          )}
        >
          <IconPlay size={12} />
          {status === 'watching' ? 'Assistindo' : 'Estou vendo'}
        </button>
      )}

      {status === 'done' && variant === 'full' && (
        <button
          type="button"
          onClick={() => mark('idle')}
          aria-label="Desfazer status"
          className={cx(base, height, 'w-12 rounded-md border-line bg-surface-2 text-ink-3 hover:text-ink')}
        >
          <IconUndo size={15} />
        </button>
      )}
    </div>
  )
}
