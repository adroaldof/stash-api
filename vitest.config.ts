import path from 'path'
import { defineConfig } from 'vitest/config'
/// <reference types="vitest" />
/// <reference types="vite/client" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    unstubEnvs: true,
    globals: true,
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
    coverage: {
      reporter: ['text', 'text-summary', 'html'],
      skipFull: true,
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      '@/use-cases': path.resolve(__dirname, './src/application/use-cases'),
      '@/entities': path.resolve(__dirname, './src/domain/entities'),
      '@/': path.resolve(__dirname, './src'),
    },
  },
})
