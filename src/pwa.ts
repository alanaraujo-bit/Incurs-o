import { registerSW } from 'virtual:pwa-register'

/**
 * Registro do service worker.
 *
 * Fica em módulo próprio, importado por main.tsx, e NÃO dentro de um
 * componente: qualquer retorno antecipado na árvore (o onboarding, por
 * exemplo) impediria o registro. Foi exatamente esse o defeito — quem
 * instalava o app sem ter passado pelo onboarding ficava sem service
 * worker e, portanto, sem funcionamento offline.
 *
 * `immediate: true` registra na carga, sem esperar o evento load.
 * O modo autoUpdate aplica novas versões sozinho e recarrega uma única vez,
 * de forma que uma build quebrada nunca fica presa no aparelho.
 */
export function setupPWA(): void {
  if (import.meta.env.DEV) return
  try {
    registerSW({
      immediate: true,
      onRegisterError(error) {
        console.warn('[Incursão] service worker não registrou', error)
      },
    })
  } catch (error) {
    // Nunca impedir a aplicação de subir por causa do service worker.
    console.warn('[Incursão] registro de service worker indisponível', error)
  }
}
