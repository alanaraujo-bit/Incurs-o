import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ErrorBoundary } from './components/system/ErrorBoundary'
import { ToastProvider } from './components/ui/Toast'
import { ProgressProvider } from './store/ProgressContext'
import { ThemeProvider } from './store/ThemeContext'
import { setupPWA } from './pwa'
import './index.css'

// Antes do render: o registro não pode depender de qual tela a árvore escolhe.
setupPWA()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ProgressProvider>
          <ToastProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ToastProvider>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
