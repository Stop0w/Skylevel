import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'

console.log('main.tsx: Starting React application')

// Debug: Check for any immediate errors
try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
  console.log('main.tsx: React application rendered successfully')
} catch (error) {
  console.error('main.tsx: Error rendering React application:', error)
}
