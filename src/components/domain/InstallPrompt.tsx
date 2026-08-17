import { useEffect, useState } from 'react'
import { IconInstall } from '../ui/Icon'
import { Button } from '../ui/primitives'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

/**
 * Instalação da PWA.
 * Android/desktop: usa o evento nativo. iOS não expõe API — mostra a
 * instrução real do Safari em vez de um botão que não faria nada.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    setInstalled(isStandalone())
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setDeferred(event as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferred(null)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) {
    return (
      <section className="rounded-lg border border-line bg-surface-1 p-5">
        <p className="eyebrow mb-2">aplicativo instalado</p>
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          Você está usando a versão instalada. Ela funciona offline: a rota, os textos e seu progresso
          ficam disponíveis mesmo sem conexão.
        </p>
      </section>
    )
  }

  const ios = isIos()
  if (!deferred && !ios) return null

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface-1 p-5">
      <div className="min-w-0">
        <p className="mb-1.5 flex items-center gap-2 text-[15px] font-medium text-ink">
          <IconInstall size={16} />
          Instalar no aparelho
        </p>
        <p className="max-w-[52ch] text-[13px] leading-relaxed text-ink-2">
          {ios
            ? 'No iPhone e no iPad: toque no botão Compartilhar do Safari e escolha "Adicionar à Tela de Início".'
            : 'Abre em tela cheia, sem barra de navegador, e continua funcionando offline.'}
        </p>
      </div>
      {deferred && (
        <Button
          variant="primary"
          onClick={async () => {
            await deferred.prompt()
            const choice = await deferred.userChoice
            if (choice.outcome === 'accepted') setInstalled(true)
            setDeferred(null)
          }}
        >
          Instalar
        </Button>
      )}
    </section>
  )
}
