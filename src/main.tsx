import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import App from './App.tsx'

// basename must match the GitHub Pages subpath (no trailing slash).
// Keep in sync with `base` in vite.config.ts.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/SubtitleFlow">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
