import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ErrorBoundary } from './components/system/ErrorBoundary'
import { ToastProvider } from './components/ui/Toast'
import { ProgressProvider } from './store/ProgressContext'
import { ThemeProvider } from './store/ThemeContext'
import './index.css'

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
