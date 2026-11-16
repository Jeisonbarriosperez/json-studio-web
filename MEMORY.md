# MEMORY.md — Json Studio (sitio web)

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.
Nunca guardes aquí claves, tokens, contraseñas ni datos personales.

## Estado actual

- 2026-11-16: kit adaptado y base creada con create-payload-app 3.93 (plantilla blank + Postgres).
  Lint, tipos, formato y `pnpm audit --audit-level=high` en verde. `test:int` no se corrió en local
  (falta la base de datos); CI lo corre con un Postgres de servicio.
- Commit inicial en `main` y CI en verde en GitHub. Dependabot abrió PRs de acciones (pendientes de fusionar).
- Neon y `.env` funcionan (test:int pasa). MCP de Penpot conectado (modo alojado, `PENPOT_MCP_URL`).
- Identidad aprobada y creada en Penpot (archivo "Nuevo Archivo 1", página "Identidad"): 99 tokens
  (`base`, `theme/light`, `theme/dark`, temas Mode→Light/Dark, 11 tipografías compuestas) y dos láminas
  de muestra (claro y oscuro). Nombres de tokens en inglés porque pasan al código. Logo: lo entrega el usuario.
- Sin dominio todavía: metadata y Resend trabajan con marcadores hasta que exista.

## Decisiones (y por qué)

- Payload 3.x (la 4 está en beta). Exige Node ≥ 24.22 → `.nvmrc` 24.22.3; pnpm 12 por Corepack (`packageManager`).
- Plantilla `blank`, no `website`: evita blog, buscador y estética genérica que v1 no necesita (YAGNI).
- `@payloadcms/db-postgres` con Neon; `push` solo en desarrollo; migraciones versionadas en `src/migrations/`.
- Localización de Payload activa desde el día 1 solo con `es`: agregar `en` después no obliga a migrar datos.
- Fase gratuita: uploads en disco (`public/media/`), Neon free. R2, Vercel Pro, Vercel Analytics y Sentry al desplegar.
- Rate limiting del formulario: Firewall de Vercel al desplegar, sin Redis ni dependencia extra.
- Checklist punto 5 ajustado: Payload usa PBKDF2-SHA256 (600k iteraciones, OWASP); bloqueo tras 5 intentos.
- Tailwind, shadcn/ui, Motion, RHF/Zod, Resend y Turnstile se instalan en la spec que los necesite, no antes.
- `overrides` de pnpm para dompurify y happy-dom (vulnerabilidades transitivas altas/críticas). esbuild y
  minimatch (moderadas, solo tooling) se dejan: forzar esbuild podría romper el `push` de esquema de Payload.

## Aprendizajes y errores a evitar

- pnpm 12 aprueba scripts de instalación con `allowBuilds` en `pnpm-workspace.yaml`
  (ya no sirve `pnpm.onlyBuiltDependencies` en package.json).
- El `eslint.config.mjs` de la plantilla usaba FlatCompat con `@eslint/eslintrc` sin declararlo; con pnpm
  falla → se usa la config plana de `eslint-config-next`.
- En el Bash de Claude Code el `node` por defecto puede ser otro: `. ~/.nvm/nvm.sh && nvm use` antes de pnpm.
- Nunca `migrate:fresh` sobre una base con datos; el hook lo bloquea.

## Próximos pasos

- Siguiente: `/sdd-spec 001-sistema-de-diseno` (leer tokens desde Penpot con el MCP y pasarlos a Tailwind).
- Penpot MCP, aprendido: `applyToken` de radio exige las 4 esquinas (no `'all'`); `resize` fija el alto
  (reponer `flex.verticalSizing='auto'`); al reconectar el plugin se pierde `storage`; la pestaña debe seguir activa.
- Primer commit y push cuando el usuario lo apruebe; comprobar que CI pasa en GitHub.
- Agregar job e2e de Playwright en CI cuando haya interfaz real que probar.
