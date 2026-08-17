import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type ThemePreference = 'system' | 'dark' | 'light'
export type ResolvedTheme = 'dark' | 'light'

const KEY = 'incursao.theme'

interface ThemeApi {
  preference: ThemePreference
  theme: ResolvedTheme
  setPreference: (value: ThemePreference) => void
  toggle: () => void
}

const ThemeCtx = createContext<ThemeApi | null>(null)

function readPreference(): ThemePreference {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw === 'dark' || raw === 'light' || raw === 'system') return raw
  } catch {
    /* storage indisponível */
  }
  return 'system'
}

function systemTheme(): ResolvedTheme {
  // `?.` na chamada devolve undefined quando matchMedia não existe; ler
  // `.matches` direto disso lançaria antes de qualquer coisa renderizar.
  return window.matchMedia?.('(prefers-color-scheme: light)')?.matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    typeof window === 'undefined' ? 'system' : readPreference(),
  )
  const [system, setSystem] = useState<ResolvedTheme>(() =>
    typeof window === 'undefined' ? 'dark' : systemTheme(),
  )

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!mq) return
    const onChange = () => setSystem(mq.matches ? 'light' : 'dark')
    // Safari anterior ao 14 só expõe addListener; sem este fallback o efeito
    // lança e derruba a árvore inteira na inicialização.
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    const legacy = mq as MediaQueryList & {
      addListener?: (cb: () => void) => void
      removeListener?: (cb: () => void) => void
    }
    legacy.addListener?.(onChange)
    return () => legacy.removeListener?.(onChange)
  }, [])

  const theme: ResolvedTheme = preference === 'system' ? system : preference

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    // A barra de status da PWA acompanha o fundo real do app.
    meta?.setAttribute('content', theme === 'dark' ? '#08090f' : '#f4f1ea')
  }, [theme])

  const setPreference = useCallback((value: ThemePreference) => {
    setPreferenceState(value)
    try {
      window.localStorage.setItem(KEY, value)
    } catch {
      /* storage indisponível */
    }
  }, [])

  const toggle = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark')
  }, [setPreference, theme])

  const value = useMemo(() => ({ preference, theme, setPreference, toggle }), [
    preference,
    theme,
    setPreference,
    toggle,
  ])

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme(): ThemeApi {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return ctx
}
