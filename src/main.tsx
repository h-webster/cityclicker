import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GameProvider } from './contexts/GameContext.tsx'
import { EnviromentProvider } from './contexts/EnviromentContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <EnviromentProvider>
        <App />
      </EnviromentProvider>
    </GameProvider>
  </StrictMode>,
)
