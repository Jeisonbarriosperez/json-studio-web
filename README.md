# Json Studio — sitio web

Sitio de **Json Studio**, microempresa de desarrollo de software en Sincelejo (Colombia): portafolio
con casos de estudio, servicios a la medida, cotización guiada y, más adelante, tienda de productos
digitales y blog. Hecho con Next.js y Payload CMS en un solo proyecto.

## Requisitos

- Node.js 24 LTS. La versión exacta está en `.nvmrc`; con nvm basta `nvm use`.
- pnpm a través de Corepack (`corepack enable`). La versión la fija `packageManager` en `package.json`,
  así no choca con otros proyectos.
- Una base de datos PostgreSQL. Usamos [Neon](https://neon.tech) en su plan gratuito, con una rama
  para desarrollo y otra para producción.

## Instalación

```bash
nvm use
corepack enable
pnpm install
cp .env.example .env   # y llena los valores reales (ver "Variables de entorno")
pnpm dev               # http://localhost:3000 — panel en http://localhost:3000/admin
```

La primera vez que abras `/admin`, Payload te pide crear el usuario administrador.

## Variables de entorno

Todas están en `.env.example` con valores falsos y un comentario de para qué sirven. Resumen:

| Variable                                                 | Para qué                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `DATABASE_URL`                                           | Conexión a Neon (rama de desarrollo, cadena "pooled").                        |
| `PAYLOAD_SECRET`                                         | Firma las sesiones del panel. Generar con `openssl rand -base64 32`.          |
| `PREVIEW_SECRET`                                         | Protege la vista previa de borradores.                                        |
| `NEXT_PUBLIC_SERVER_URL`                                 | URL pública del sitio.                                                        |
| `RESEND_API_KEY`, `EMAIL_FROM`, `LEADS_NOTIFY_EMAIL`     | Correos de aviso cuando llega una cotización.                                 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Antispam de formularios. En local sirven las claves de prueba.                |
| `R2_*`                                                   | Solo al desplegar: archivos en Cloudflare R2. En local van a `public/media/`. |

## Comandos

| Comando                                        | Qué hace                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`                                     | Servidor de desarrollo.                                                   |
| `pnpm build` / `pnpm start`                    | Compila y sirve la versión de producción.                                 |
| `pnpm lint` / `pnpm typecheck` / `pnpm format` | ESLint, TypeScript estricto y Prettier.                                   |
| `pnpm test`                                    | Todos los tests: `pnpm test:int` (Vitest) y `pnpm test:e2e` (Playwright). |
| `pnpm audit --audit-level=high`                | Auditoría de dependencias.                                                |
| `pnpm generate:types`                          | Regenera `src/payload-types.ts` tras cambiar colecciones.                 |
| `pnpm payload migrate:create <nombre>`         | Crea una migración tras cambiar el esquema.                               |
| `pnpm payload migrate`                         | Aplica las migraciones pendientes (producción).                           |

## Estructura

- `src/app/(frontend)/` — sitio público (App Router).
- `src/app/(payload)/` — panel de administración y API de Payload. Generado; no se edita.
- `src/collections/` y `src/globals/` — modelo de contenido.
- `src/payload.config.ts` — configuración de Payload.
- `src/migrations/` — migraciones de base de datos.
- `specs/` — especificaciones (flujo SDD). `docs/` — constitución, estándares y checklist de seguridad.

## Cómo probamos

`pnpm test` en verde y `pnpm lint` + `pnpm typecheck` sin errores antes de dar algo por hecho.
La interfaz se revisa también a 375 px de ancho (móvil).

## Despliegue (pendiente)

Vercel (plan Pro) + rama de producción en Neon + Cloudflare R2 para archivos. Antes de publicar se
corre `/auditoria` contra `docs/security-checklist.md`.

## Trabajo con Claude Code

El repositorio incluye el kit de trabajo (`CLAUDE.md`, `.claude/`, `docs/`); está explicado en `LEEME.md`.
El MCP de Penpot se activa con la variable de entorno `PENPOT_MCP_URL` en tu shell; la clave nunca
se escribe en `.mcp.json`.
