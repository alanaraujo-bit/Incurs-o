import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useProgress } from './store/ProgressContext'
import { dismissBoot } from './lib/boot'
import { AppShell } from './components/layout/AppShell'
import { CelebrationLayer } from './components/domain/CelebrationLayer'
import { SystemBanners } from './components/system/SystemBanners'
import Home from './routes/Home'
import Onboarding from './routes/Onboarding'
import NotFound from './routes/NotFound'

// Rotas secundárias saem do bundle inicial: a Home abre primeiro.
const Journey = lazy(() => import('./routes/Journey'))
const Catalog = lazy(() => import('./routes/Catalog'))
const TitleDetail = lazy(() => import('./routes/TitleDetail'))
const Cast = lazy(() => import('./routes/Cast'))
const CastDetail = lazy(() => import('./routes/CastDetail'))
const Threads = lazy(() => import('./routes/Threads'))
const Doom = lazy(() => import('./routes/Doom'))
const Destination = lazy(() => import('./routes/Destination'))
const ProgressPage = lazy(() => import('./routes/ProgressPage'))
const About = lazy(() => import('./routes/About'))

export default function App() {
  const { state, ready } = useProgress()

  // A tela de boot do index.html some assim que o estado está hidratado.
  useEffect(() => {
    if (ready) dismissBoot()
  }, [ready])

  if (!ready) return null
  if (!state.onboarded) return <Onboarding />

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only rounded-md bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
      >
        Pular para o conteúdo
      </a>
      <SystemBanners />
      <ScrollToTop />
      <AppShell>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rota" element={<Journey />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/titulo/:slug" element={<TitleDetail />} />
            <Route path="/elenco" element={<Cast />} />
            <Route path="/elenco/:slug" element={<CastDetail />} />
            <Route path="/conexoes" element={<Threads />} />
            <Route path="/doom" element={<Doom />} />
            <Route path="/destino" element={<Destination />} />
            <Route path="/titulo/doomsday" element={<Navigate to="/destino" replace />} />
            <Route path="/progresso" element={<ProgressPage />} />
            <Route path="/sobre" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
      <CelebrationLayer />
    </>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function RouteFallback() {
  return (
    <div className="grid min-h-[60dvh] place-content-center" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando</span>
      <span className="block h-[2px] w-24 overflow-hidden rounded-full bg-surface-3">
        <span
          className="block h-full w-1/3 rounded-full bg-accent"
          style={{ animation: 'incursao-sweep 1.1s cubic-bezier(0.65,0,0.35,1) infinite' }}
        />
      </span>
    </div>
  )
}
