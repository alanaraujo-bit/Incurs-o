/**
 * Encerramento da tela de inicialização declarada em index.html.
 *
 * Precisa ser chamado em TODO caminho que resulta em algo renderizado —
 * inclusive no ErrorBoundary. O overlay é `position: fixed; z-index: 999`;
 * se ele sobreviver, a interface fica atrás dele e o usuário vê apenas uma
 * barra de carregamento infinita.
 */
export function dismissBoot(): void {
  if (typeof window === 'undefined') return

  // Avisa a rede de segurança do index.html para cancelar o timeout.
  window.__incursaoBooted = true
  window.dispatchEvent(new Event('incursao:ready'))

  const boot = document.getElementById('boot')
  if (!boot) return
  boot.setAttribute('hidden', '')
  window.setTimeout(() => boot.remove(), 500)
}

declare global {
  interface Window {
    __incursaoBooted?: boolean
  }
}
