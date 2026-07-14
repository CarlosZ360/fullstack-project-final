import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "tests/**", // <-- Excluye los archivos .spec.ts de Playwright de la raíz
      "**/.{idea,git,cache,output,temp}/**"
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 5,
        functions: 5,
        branches: 5,
        statements: 5,
      },
    },
  },
})
