import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Progress } from '../../lib/selectors'
import { daysUntilRelease, formatDurationCompact, releaseDateLabel } from '../../lib/format'
import { progressShare, share } from '../../lib/share'
import { Button } from '../ui/primitives'
import { IconShare } from '../ui/Icon'
import { useToast } from '../ui/Toast'

/**
 * Estado final da maratona.
 * Sem confete: a recompensa é a mudança de registro visual — o arco vira
 * declaração, o verde do destino toma a composição.
 */
export function ReadyBanner({ progress }: { progress: Progress }) {
  const reduce = useReducedMotion()
  const { toast } = useToast()

  const onShare = async () => {
    const result = await share(progressShare(progress))
    if (result === 'copied') toast('Resumo copiado para a área de transferência.', { tone: 'accent' })
    if (result === 'failed') toast('Não foi possível compartilhar neste navegador.', { tone: 'danger' })
  }

  const stats = [
    { label: 'produções', value: String(progress.total) },
    { label: 'assistidas', value: formatDurationCompact(progress.minutesWatched) },
    { label: 'fases', value: '6/6' },
    { label: 'complementares', value: `${progress.optionalDone}/${progress.optionalTotal}` },
  ]

  return (
    <motion.section
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-xl border p-6 sm:p-10"
      style={{
        borderColor: 'color-mix(in oklab, var(--doom) 34%, transparent)',
        background:
          'radial-gradient(120% 120% at 15% 0%, color-mix(in oklab, var(--doom) 18%, transparent), transparent 62%), var(--surface-1)',
      }}
    >
      <p className="eyebrow mb-4 text-doom">preparação concluída</p>
      <h1 className="display mb-4 text-[38px] sm:text-[56px] lg:text-[68px]">
        Você está pronto
        <br />
        para Doomsday.
      </h1>
      <p className="mb-8 max-w-[58ch] text-[15px] leading-relaxed text-ink-2">
        Trinta produções, seis núcleos narrativos, duas décadas de história e três universos. Estreia
        em {releaseDateLabel()} — faltam {daysUntilRelease()} dias.
      </p>

      <dl className="mb-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:max-w-[560px] sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd className="numeric text-[24px] leading-none font-semibold text-ink">{stat.value}</dd>
            <dt className="eyebrow mt-1.5">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-3">
        <Button variant="doom" size="lg" onClick={onShare}>
          <IconShare size={16} />
          Compartilhar minha jornada
        </Button>
        <Link to="/progresso">
          <Button size="lg">Ver o resumo completo</Button>
        </Link>
      </div>
    </motion.section>
  )
}
