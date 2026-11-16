import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // tests/int: integración con Payload (necesita base de datos).
    // src/**/*.test.ts: lógica pura, sin base de datos (constitución, principio 4).
    include: ['tests/int/**/*.int.spec.ts', 'src/**/*.test.ts'],
  },
})
