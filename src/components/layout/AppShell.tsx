import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useProgress } from '../../store/ProgressContext'
import { useTheme } from '../../store/ThemeContext'
import { IconMoon, IconSun } from '../ui/Icon'
import { Meter, cx } from '../ui/primitives'
import { BrandLockup } from './Brand'
import { NAV_ITEMS, PRIMARY_NAV } from './navigation'

/**
 * Casca da aplicação.
 * Desktop: rail lateral persistente + coluna de conteúdo com respiro.
 * Mobile: topo mínimo + barra inferior ao alcance do polegar, com safe-area.
 * As duas composições são desenhadas separadamente, não escaladas uma da outra.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const { progress } = useProgress()

  return (
    <div className="flex min-h-dvh">
      <DesktopRail />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopBar />

        <main
          id="conteudo"
          className="flex-1 lg:pb-16"
          style={{ paddingBottom: 'calc(var(--tabbar-h) + var(--safe-b) + 20px)' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <MobileTabBar percent={progress.percent} />
    </div>
  )
}

function DesktopRail() {
  const { progress } = useProgress()
  const { theme, toggle } = useTheme()

  return (
    <aside
      className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col border-r border-line bg-surface-1/70 backdrop-blur-xl lg:flex xl:w-[268px]"
      style={{ paddingTop: 'var(--safe-t)', paddingLeft: 'var(--safe-l)' }}
    >
      <div className="px-6 pt-7 pb-6">
        <NavLink to="/" className="inline-flex rounded-md" aria-label="Incursão, início">
          <BrandLockup />
        </NavLink>
        <p className="mt-2 text-[11.5px] leading-snug text-ink-3">
          Rota até <span className="text-ink-2">Avengers: Doomsday</span>
        </p>
      </div>

      <nav className="flex-1 px-3" aria-label="Navegação principal">
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cx(
                    'group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-[13.5px] font-medium transition-colors',
                    isActive
                      ? 'bg-surface-3 text-ink'
                      : 'text-ink-2 hover:bg-surface-2 hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cx(
                        'absolute top-1/2 left-0 h-5 w-[2px] -translate-y-1/2 rounded-full transition-all duration-200',
                        isActive ? 'bg-accent opacity-100' : 'opacity-0',
                      )}
                      aria-hidden="true"
                    />
                    <item.icon size={17} className="shrink-0" />
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-line px-6 py-5" style={{ paddingBottom: 'calc(1.25rem + var(--safe-b))' }}>
        <div className="mb-4">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="eyebrow">preparação</span>
            <span className="numeric text-[15px] font-semibold text-ink">{progress.percent}%</span>
          </div>
          <Meter value={progress.ratio} label="Preparação para Doomsday" />
          <p className="numeric mt-2 text-[11px] text-ink-3">
            {progress.done}/{progress.total} concluídos
          </p>
        </div>

        <button
          type="button"
          onClick={toggle}
          className="flex w-full items-center justify-between rounded-md border border-line px-3 py-2 text-[12.5px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
          aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          <span>{theme === 'dark' ? 'Escuro' : 'Claro'}</span>
          {theme === 'dark' ? <IconMoon size={15} /> : <IconSun size={15} />}
        </button>
      </div>
    </aside>
  )
}

function MobileTopBar() {
  const { progress } = useProgress()
  const { theme, toggle } = useTheme()

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl lg:hidden"
      style={{ paddingTop: 'var(--safe-t)' }}
    >
      <div className="flex h-13 items-center justify-between gap-3 px-4">
        <NavLink to="/" className="rounded-md" aria-label="Incursão, início">
          <BrandLockup />
        </NavLink>
        <div className="flex items-center gap-3">
          <span className="numeric text-[12.5px] font-medium text-ink-2">{progress.percent}%</span>
          <button
            type="button"
            onClick={toggle}
            className="tap -mr-2 grid place-items-center rounded-md text-ink-3 transition-colors active:bg-surface-2"
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {theme === 'dark' ? <IconMoon size={17} /> : <IconSun size={17} />}
          </button>
        </div>
      </div>
      <div className="h-[2px] w-full bg-surface-2">
        <div
          className="h-full bg-accent transition-[width] duration-700 ease-[var(--ease-out-quint)]"
          style={{ width: `${progress.ratio * 100}%` }}
        />
      </div>
    </header>
  )
}

function MobileTabBar({ percent }: { percent: number }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/92 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'var(--safe-b)' }}
      aria-label="Navegação"
    >
      <ul className="mx-auto flex max-w-[560px]" style={{ height: 'var(--tabbar-h)' }}>
        {PRIMARY_NAV.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cx(
                  'relative flex h-full flex-col items-center justify-center gap-[3px] transition-colors',
                  isActive ? 'text-ink' : 'text-ink-3',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cx(
                      'absolute top-0 h-[2px] w-8 rounded-full bg-accent transition-opacity duration-200',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                    aria-hidden="true"
                  />
                  <item.icon size={20} />
                  <span className="text-[10px] font-medium tracking-[0.01em]">
                    {item.to === '/progresso' ? `${percent}%` : item.short}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Container padrão de página. Mantém ritmo e largura consistentes. */
export function Page({
  children,
  className,
  width = 'default',
}: {
  children: ReactNode
  className?: string
  width?: 'default' | 'wide' | 'narrow'
}) {
  return (
    <div
      className={cx(
        'mx-auto w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-10',
        width === 'wide' && 'max-w-[1400px]',
        width === 'default' && 'max-w-[1120px]',
        width === 'narrow' && 'max-w-[760px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
