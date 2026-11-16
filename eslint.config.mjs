import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

// Configuración plana de ESLint 9 con las reglas oficiales de Next.js (sin FlatCompat,
// que exigía un paquete extra). `any` queda prohibido: docs/estandares-codigo.md.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  globalIgnores([
    '.next/',
    'src/payload-types.ts',
    'src/payload-generated-schema.ts',
    'src/app/(payload)/admin/importMap.js',
    'public/media/',
  ]),
])
