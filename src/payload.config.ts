import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Json Studio',
    },
  },
  collections: [Users, Media],
  // La localización se activa desde el inicio: agregar "en" después solo requiere
  // sumarlo a esta lista; activarla más tarde obligaría a migrar los datos existentes.
  localization: {
    locales: [{ label: 'Español', code: 'es' }],
    defaultLocale: 'es',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // El adaptador solo hace "push" del esquema fuera de producción. En producción
    // se aplican las migraciones versionadas de esta carpeta (constitución, principio 6).
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [],
})
