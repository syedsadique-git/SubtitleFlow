import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this project from https://<user>.github.io/SubtitleFlow/,
// so asset URLs must be prefixed with the repo name. Keep in sync with the
// BrowserRouter basename in src/main.tsx and the deploy workflow.
const REPO_NAME = 'SubtitleFlow'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: `/${REPO_NAME}/`,
})
