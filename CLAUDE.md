# CLAUDE.md — Json Studio (sitio web)

Sitio de Json Studio, microempresa de desarrollo de software: portafolio con casos de estudio, vitrina
de servicios, cotización guiada y, en v2/v3, tienda de productos digitales y blog. Público: dueños de
negocios pequeños y medianos de Colombia, no técnicos; debe entenderse en 5 segundos y transmitir
confianza. Brief completo: `PROMPT-INICIAL.md`. Identidad: concepto `{ json }`, paleta azul, modo claro y oscuro.

@docs/constitution.md
@MEMORY.md

## Stack y estructura

- Next.js 16 (App Router, Server Components por defecto) + React 19 + TypeScript 6 estricto.
- Payload CMS 3 en el mismo proyecto: panel en `/admin`, Postgres en Neon con `@payloadcms/db-postgres`.
- Tailwind CSS 4 + shadcn/ui + Motion. Formularios: React Hook Form + Zod. Correo: Resend. Antispam: Turnstile.
- Node 24 LTS (`.nvmrc`) y pnpm por Corepack (`packageManager`). ESLint, Prettier, Vitest, Playwright.
- `src/app/(frontend)/` sitio público · `src/app/(payload)/` panel y API (generado, no se edita) ·
  `src/collections/` y `src/globals/` modelo de contenido · `src/payload.config.ts` · `src/migrations/`.
- Fase actual: todo gratis y en local (archivos en disco, Neon free). Al desplegar: Vercel Pro, R2, Vercel Analytics, Sentry.

## Comandos

- Instalar: `pnpm install` (antes, `nvm use`)
- Desarrollo: `pnpm dev` → http://localhost:3000, panel en `/admin`
- Tests: `pnpm test` (`pnpm test:int` Vitest, `pnpm test:e2e` Playwright)
- Lint y tipos: `pnpm lint` · `pnpm typecheck` · `pnpm format`
- Auditoría de dependencias: `pnpm audit --audit-level=high`
- Payload: `pnpm generate:types` tras cambiar colecciones · `pnpm payload migrate:create <nombre>` tras cambiar el esquema

## Cómo trabajamos

- Cambio grande → flujo SDD (skill `sdd`, comandos `/sdd-*`). Cambio pequeño → `/feature`.
- Antes de tocar código, lee la spec activa (`specs/NNN-*/`). Si falta una decisión, para y pregunta.
- Una tarea a la vez. Cambios pequeños y enfocados. No reescribas lo que ya funciona.
- Delega para no llenar el contexto: buscar → `Explore`; implementar → `implementer`;
  revisar → `reviewer`; seguridad → `security-auditor`.
- Antes de usar la API de una librería, consulta su documentación actual con Context7.
- Estoy aprendiendo: explica el porqué de las decisiones importantes en pocas palabras.

## Reglas propias de este producto

- Mobile-first, WCAG 2.2 AA y Lighthouse ≥ 95 en las cuatro categorías (páginas públicas).
- Server Components por defecto; `'use client'` solo donde hay interacción. Datos con la Local API de Payload, nunca `fetch` a la propia REST.
- El contenido editable vive en Payload con localización (`es` por defecto, `en` después); nada de textos de contenido fijos en código.
- Esquema: `push` solo en desarrollo; todo cambio de colección lleva migración versionada y `pnpm generate:types`.
- SEO: metadata dinámica, Open Graph, sitemap, robots, JSON-LD (Organization, Service, Product, Article) y URLs limpias en español.
- Leads: se guardan en la BD antes de enviar el correo; si el correo falla, el lead no se pierde.

## Código humano (detalle: `docs/estandares-codigo.md`)

- Código en inglés; interfaz, comentarios y documentación en español.
- Nombres que expliquen la intención. Funciones cortas que hagan una sola cosa.
- Comentarios que expliquen el porqué, no el qué. Nada de código muerto ni comentado.
- Sigue los patrones que ya existen en el proyecto antes de inventar otros.

## Seguridad (detalle: skill `seguridad` y `docs/security-checklist.md`)

- Cero secretos en el código: variables de entorno y `.env.example` con valores falsos. `NEXT_PUBLIC_` jamás con secretos.
- Todo dato externo se valida en el servidor con Zod. Consultas siempre por la Local API (parametrizadas).
- Nada de `eval`, ni `dangerouslySetInnerHTML` con datos del usuario.

## Límites

- ✅ Siempre: tests en verde antes de dar algo por hecho; actualizar `MEMORY.md` al cerrar una tarea.
- ⚠️ Pregunta antes: dependencias nuevas, cambios de esquema de BD o de formato de datos,
  borrar archivos, tocar CI/CD o despliegue, cualquier servicio que cueste dinero.
- 🚫 Nunca: leer o escribir archivos `.env` reales, desactivar tests o validaciones para que
  algo "pase", `git push --force`, commitear secretos, `migrate:fresh` sobre una BD con datos.

## Verificación

- `pnpm test`, `pnpm lint` y `pnpm typecheck` en verde; la UI se revisa con el MCP de Playwright
  en escritorio y a 375 px de ancho, en modo claro y oscuro.

## Forma de responder

- Al terminar: resumen en 5 líneas o menos, archivos tocados y decisiones que yo deba revisar.
- No repitas en el chat código que ya quedó escrito en archivos.
