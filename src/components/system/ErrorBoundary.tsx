import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { dismissBoot } from '../../lib/boot'

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
    // Sem isto a tela de erro fica ATRÁS do overlay de inicialização e o
    // usuário vê apenas uma barra de carregamento que nunca termina.
    dismissBoot()
  }

  /** Remove service workers e caches. Não toca no progresso em localStorage. */
  private repair = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(registrations.map((r) => r.unregister()))
      }
      if (typeof caches !== 'undefined') {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
      }
    } catch {
      /* melhor esforço: recarrega de qualquer forma */
    }
    window.location.replace(`${window.location.pathname}?restaurado=${Date.now()}`)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="grid min-h-dvh place-content-center gap-4 px-6 text-center">
        <p className="eyebrow">algo quebrou</p>
        <h1 className="display text-[26px]">A interface falhou ao carregar</h1>
        <p className="mx-auto max-w-[44ch] text-[13.5px] leading-relaxed text-ink-2">
          Seu progresso está salvo e não foi afetado. Recarregar costuma resolver; restaurar limpa o
          cache do aplicativo sem apagar o que você marcou.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-11 rounded-md border border-transparent bg-accent px-5 text-[14px] font-medium text-accent-ink"
          >
            Recarregar
          </button>
          <button
            type="button"
            onClick={this.repair}
            className="h-11 rounded-md border border-line px-5 text-[14px] font-medium text-ink-2"
          >
            Restaurar aplicativo
          </button>
        </div>
        <p className="mx-auto max-w-[52ch] font-mono text-[11px] leading-relaxed text-ink-3">
          {this.state.error.message}
        </p>
      </div>
    )
  }
}
