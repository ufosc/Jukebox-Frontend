/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

const __filename = import.meta.url.substring(
  import.meta.url.lastIndexOf('/') + 1,
)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: 'src', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 8000,
    setupFiles: ['./src/config/vitest.setup.ts'],
    reporters: ['default', 'html'],
    coverage: {
      provider: 'v8',
      exclude: [
        './src/config/**',
        '**/_deprecated/**',
        'node_modules/**',
        '**/*.test.ts',
        '**/index.ts',
        '**/*.d.ts',
        '**/types.ts',
        '**/*.types.ts',
        'dist/**',
        'html/**',
        '**/docs/**',
        '**.cjs',
        'vite.config.ts',
      ],
      reportsDirectory: 'coverage/',
    },
    exclude: [
      ...configDefaults.exclude,
      './src/config/**',
      '**/_deprecated/**',
      'node_modules/**',
    ],
  },
})
