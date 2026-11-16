import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

// Ancho mínimo que debe funcionar según docs/security-checklist.md (punto 22).
const MOBILE_VIEWPORT = { width: 375, height: 667 }

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'escritorio',
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    },
    {
      name: 'movil-375',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        viewport: MOBILE_VIEWPORT,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    reuseExistingServer: !process.env.CI,
    url: BASE_URL,
  },
})
