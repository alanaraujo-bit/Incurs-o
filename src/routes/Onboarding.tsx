import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ROUTE_MINUTES, ROUTE_TOTAL } from '../lib/selectors'
import { daysUntilRelease, formatDuration, releaseDateLabel } from '../lib/format'
import { useProgress } from '../store/ProgressContext'
import { BrandMark } from '../components/layout/Brand'
import { Button, cx } from '../components/ui/primitives'

/**
 * Entrada.
 * Quatro cartões curtos, puláveis a qualquer momento. Nada de cadastro,
 * nada de landing page: em menos de trinta segundos a pessoa está dentro.
 */
const STEPS = [
  {
    eyebrow: 'o que é isto',
    title: 'Uma rota, não uma lista.',
    body: `Trinta filmes e séries em ordem curada, do primeiro Homem de Ferro ao Quarteto Fantástico. Cada parada explica por que está aqui e o que ela entrega para Avengers: Doomsday.`,
  },
  {
    eyebrow: 'por que esta seleção',
    title: 'Só o que o filme cobra de você.',
    body: `Doomsday junta heróis de três universos — o MCU, os X-Men herdados da Fox e o Quarteto Fantástico. A rota cobre o que cada um desses núcleos exige, e marca claramente o que dá para pular.`,
  },
  {
    eyebrow: 'como funciona',
    title: 'Marque, e o app cuida do resto.',
    body: `Diga o que já viu e o que está vendo. A partir daí você tem a porcentagem de preparação, o tempo que falta e sempre a próxima obra recomendada esperando na tela inicial.`,
  },
  {
    eyebrow: 'sem cadastro',
    title: 'Seu progresso é seu.',
    body: `Nada de conta, e-mail ou servidor. Tudo fica salvo neste aparelho, funciona offline depois de instalado, e você pode exportar um arquivo para levar para outro celular quando quiser.`,
  },
]

export default function Onboarding() {
  const { completeOnboarding } = useProgress()
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const step = STEPS[index]
  const last = index === STEPS.length - 1

  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ paddingTop: 'var(--safe-t)', paddingBottom: 'var(--safe-b)' }}
    >
      <header className="flex items-center justify-between px-5 pt-6 sm:px-10">
        <span className="inline-flex items-center gap-2.5">
          <BrandMark size={24} className="text-accent" />
          <span className="display text-[16px] tracking-[0.02em] uppercase">Incursão</span>
        </span>
        <button
          type="button"
          onClick={completeOnboarding}
          className="rounded-md px-2 py-1 text-[13px] font-medium text-ink-3 transition-colors hover:text-ink"
        >
          Pular
        </button>
      </header>

      <main className="flex flex-1 items-center px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-[640px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow mb-4">{step.eyebrow}</p>
              <h1 className="display mb-5 text-[34px] sm:text-[48px]">{step.title}</h1>
              <p className="max-w-[54ch] text-[15px] leading-relaxed text-ink-2">{step.body}</p>
            </motion.div>
          </AnimatePresence>

          {index === 0 && (
            <dl className="mt-9 grid grid-cols-3 gap-6 border-t border-line pt-6">
              <div>
                <dd className="numeric text-[22px] leading-none font-semibold text-ink">{ROUTE_TOTAL}</dd>
                <dt className="eyebrow mt-1.5">produções</dt>
              </div>
              <div>
                <dd className="numeric text-[22px] leading-none font-semibold text-ink">
                  {Math.round(ROUTE_MINUTES / 60)}h
                </dd>
                <dt className="eyebrow mt-1.5">de duração</dt>
              </div>
              <div>
                <dd className="numeric text-[22px] leading-none font-semibold text-doom">
                  {daysUntilRelease()}
                </dd>
                <dt className="eyebrow mt-1.5">dias até a estreia</dt>
              </div>
            </dl>
          )}

          {last && (
            <p className="mt-8 text-[12.5px] leading-relaxed text-ink-3">
              Avengers: Doomsday estreia em {releaseDateLabel()}. São{' '}
              {formatDuration(ROUTE_MINUTES)} de rota — dá tempo.
            </p>
          )}
        </div>
      </main>

      <footer className="px-5 pb-8 sm:px-10">
        <div className="mx-auto flex w-full max-w-[640px] items-center justify-between gap-6">
          <div className="flex gap-1.5" role="tablist" aria-label="Progresso da introdução">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Passo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cx(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-7 bg-accent' : 'w-1.5 bg-line-strong',
                )}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {index > 0 && (
              <Button onClick={() => setIndex((v) => v - 1)}>Voltar</Button>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={() => (last ? completeOnboarding() : setIndex((v) => v + 1))}
            >
              {last ? 'Começar a maratona' : 'Continuar'}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
