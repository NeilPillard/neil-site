import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import '@fontsource/dm-mono/latin-400.css'
import '@fontsource/dm-mono/latin-500.css'
import './styles.css'
import './redesign.css'
import App from './App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Kouponly application root was not found.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
