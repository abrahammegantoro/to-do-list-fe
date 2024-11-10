import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './providers/ModalProvider.tsx'
import ToasterProvider from './providers/ToasterProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider />
    <ToasterProvider />
    <App />
  </StrictMode>,
)
