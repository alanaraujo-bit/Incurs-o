import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface ToastItem {
  id: number
  message: string
  action?: { label: string; run: () => void }
  tone: 'default' | 'accent' | 'danger'
}

interface ToastApi {
  toast: (
    message: string,
    options?: { action?: ToastItem['action']; tone?: ToastItem['tone']; duration?: number },
  ) => void
}

const Ctx = createContext<ToastApi | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const seq = useRef(0)
  const reduce = useReducedMotion()

  const toast = useCallback<ToastApi['toast']>((message, options) => {
    const id = ++seq.current
    setItems((prev) => [...prev.slice(-2), { id, message, action: options?.action, tone: options?.tone ?? 'default' }])
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), options?.duration ?? 4200)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <Ctx.Provider value={value}>
      {children}
      {createPortal(
        <div
          className="pointer-events-none fixed inset-x-0 z-[90] flex flex-col items-center gap-2 px-4"
          style={{
            bottom: 'calc(var(--safe-b) + var(--tabbar-h) + 12px)',
          }}
          role="status"
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto flex w-full max-w-[420px] items-center gap-3 rounded-md border border-line bg-surface-2 px-4 py-3 shadow-e2"
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{
                    background:
                      item.tone === 'accent'
                        ? 'var(--accent)'
                        : item.tone === 'danger'
                          ? 'var(--danger)'
                          : 'var(--ink-3)',
                  }}
                />
                <span className="min-w-0 flex-1 text-[13px] text-ink">{item.message}</span>
                {item.action && (
                  <button
                    type="button"
                    onClick={() => {
                      item.action?.run()
                      setItems((prev) => prev.filter((t) => t.id !== item.id))
                    }}
                    className="shrink-0 font-mono text-[11px] font-medium tracking-[0.08em] text-accent uppercase"
                  >
                    {item.action.label}
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </Ctx.Provider>
  )
}

export function useToast(): ToastApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast precisa estar dentro de <ToastProvider>')
  return ctx
}
