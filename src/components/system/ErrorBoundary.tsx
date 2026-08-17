import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface State {
  error: Error | null
}

/**
 * Rede de segurança da aplicação.
 * O progresso vive em localStorage e sobrevive a qualquer falha de render,
 * então a saída oferecida é recarregar — nunca limpar dados.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Incursão] falha de render', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="grid min-h-dvh place-content-center gap-4 px-6 text-center">
        <p className="eyebrow">algo quebrou</p>
        <h1 className="display text-[26px]">A interface falhou ao carregar</h1>
        <p className="mx-auto max-w-[44ch] text-[13.5px] leading-relaxed text-ink-2">
          Seu progresso está salvo e não foi afetado. Recarregar a página costuma resolver.
        </p>
        <div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-11 rounded-md border border-transparent bg-accent px-5 text-[14px] font-medium text-accent-ink"
          >
            Recarregar
          </button>
        </div>
      </div>
    )
  }
}
