import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * Estado de sistema: conexão.
 *
 * O registro e a atualização do service worker vivem em `src/pwa.ts`, fora da
 * árvore de componentes — depender do render deixava instalações novas sem
 * service worker. Como o modo é autoUpdate, também não existe mais banner de
 * "nova versão": ela se aplica sozinha.
 */
export function SystemBanners() {
  const [offline, setOffline] = useState(() => typeof navigator !== 'undefined' && !navigator.onLine)

  useEffect(() => {
    const on = () => setOffline(false)
    const off = () => setOffline(true)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  const banner = offline
    ? {
        key: 'offline',
        text: 'Você está offline. A rota e seu progresso continuam funcionando.',
      }
    : null

  return (
    <AnimatePresence>
      {banner && (
        <motion.div
          key={banner.key}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 z-[70] flex justify-center px-4"
          style={{ top: 'calc(var(--safe-t) + 10px)' }}
          role="status"
        >
          <div className="flex w-full max-w-[440px] items-center gap-3 rounded-md border border-line bg-surface-2 px-4 py-2.5 shadow-e2">
            <span className="min-w-0 flex-1 text-[12.5px] text-ink">{banner.text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
