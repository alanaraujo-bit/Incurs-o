import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { PHASE_BY_ID } from '../../data'
import { accentColor, tint } from '../../lib/palette'
import { phaseShare, share } from '../../lib/share'
import { useProgress } from '../../store/ProgressContext'
import { Button } from '../ui/primitives'
import { IconShare } from '../ui/Icon'
import { useToast } from '../ui/Toast'

/**
 * Resposta visual à conclusão de uma fase.
 *
 * Sem confete e sem som: um corte de tela, uma linha que se desenha e o nome
 * do bloco fechado. A conclusão de um título isolado é celebrada apenas pelo
 * toast — só o fechamento de fase merece interromper a navegação.
 */
export function CelebrationLayer() {
  const { completion, ackCompletion } = useProgress()
  const { toast } = useToast()
  const reduce = useReducedMotion()

  const phaseId = completion?.phaseCompleted ?? null
  const phase = phaseId ? PHASE_BY_ID[phaseId] : null
  const visible = Boolean(phase) && !completion?.routeCompleted

  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(ackCompletion, 6500)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && ackCompletion()
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
    }
  }, [visible, ackCompletion])

  // Conclusão da rota inteira: sem overlay, a Home muda de estado sozinha.
  useEffect(() => {
    if (completion?.routeCompleted) {
      toast('Rota concluída. Você está pronto para Doomsday.', { tone: 'accent', duration: 6000 })
      ackCompletion()
    }
  }, [completion?.routeCompleted, toast, ackCompletion])

  if (!phase) return null
  const color = accentColor(phase.accent)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[95] grid place-content-center px-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: 'var(--scrim)', backdropFilter: 'blur(6px)' }}
          onClick={ackCompletion}
          role="alertdialog"
          aria-label={`Fase concluída: ${phase.fullName}`}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[440px] rounded-xl border p-8"
            style={{
              borderColor: tint(color, 34),
              background: `radial-gradient(120% 120% at 50% 0%, ${tint(color, 16)}, transparent 62%), var(--surface-1)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 120 40" className="mx-auto mb-6 h-10 w-[180px]" aria-hidden="true">
              <motion.path
                d="M4 20 H116"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={reduce ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.circle
                cx="116"
                cy="20"
                r="4"
                fill={color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={reduce ? { duration: 0 } : { delay: 0.9, duration: 0.4 }}
                style={{ transformOrigin: '116px 20px' }}
              />
            </svg>

            <p className="eyebrow mb-3" style={{ color }}>
              fase {String(phase.index).padStart(2, '0')} concluída
            </p>
            <h2 className="display mb-3 text-[28px]">{phase.fullName}</h2>
            <p className="mb-7 text-[13.5px] leading-relaxed text-ink-2">{phase.promise}</p>

            <div className="flex flex-wrap justify-center gap-2">
              <Button
                size="sm"
                onClick={async () => {
                  const result = await share(phaseShare(phase.fullName, phase.index))
                  if (result === 'copied') toast('Texto copiado.', { tone: 'accent' })
                }}
              >
                <IconShare size={14} />
                Compartilhar
              </Button>
              <Button size="sm" variant="primary" onClick={ackCompletion}>
                Seguir
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
