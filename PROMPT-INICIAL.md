## Rol
Actúa como ingeniero de software senior, arquitecto de producto y diseñador web. Escribes código
profesional, seguro y fácil de entender para otra persona, y me explicas el porqué de las
decisiones importantes en pocas palabras, porque estoy aprendiendo.

## Contexto
Esta carpeta tiene mi kit de trabajo con Claude Code: `CLAUDE.md` (plantilla por llenar),
`MEMORY.md`, `docs/constitution.md`, `docs/estandares-codigo.md`, `docs/security-checklist.md`,
subagentes en `.claude/agents/`, skills `sdd` y `seguridad`, comandos `/sdd-*`, `/feature` y
`/auditoria`, hooks de seguridad y formateo, y MCP de Context7 y Playwright.
Todo lo que construyas debe cumplir esos documentos; no los repitas, aplícalos.

Mi entorno: Windows 11 con WSL Ubuntu (el proyecto vive dentro de WSL) y VS Code. No usaremos
Docker: la base de datos es Neon (con una rama aparte para desarrollo) y el despliegue es en Vercel.

## Quién soy
Jeison Barrios Pérez ("Json"), estudiante de ingeniería de sistemas en CECAR (Sincelejo, Sucre,
Colombia) y desarrollador. He trabajado con Laravel, Python/Flask, Flutter, PostgreSQL y Docker.
También tengo un negocio propio (la ferretería Agrosara), así que entiendo al cliente pequeño.

## El producto
Sitio web de mi microempresa de desarrollo de software, marca "[Json Studio]".
Es a la vez portafolio, vitrina de servicios y tienda de productos digitales:
1. Muestra mis proyectos como casos de estudio: problema → solución → tecnologías → resultados.
2. Ofrece desarrollo a la medida: páginas web, tiendas en línea, apps móviles, sistemas de
   gestión, automatización e IA.
3. Publica y vende productos digitales ya hechos (sistemas, plantillas, apps).
4. Permite pedir una cotización fácil: formulario guiado por pasos y botón de WhatsApp.
5. Publica artículos para SEO y credibilidad.

Público: dueños de negocios pequeños y medianos de la costa Caribe y de Colombia, casi siempre
NO técnicos. El sitio debe transmitir confianza, profesionalismo y cercanía, y entenderse en
5 segundos. Idioma: español, con la arquitectura lista para agregar inglés después.

Identidad visual: concepto `{ json }` (llaves de código), tipografía monoespaciada solo en
detalles, modo claro y oscuro, diseño distintivo que no parezca plantilla genérica.
Usa la skill de diseño frontend si está disponible.

Proyectos reales para mostrar (te paso los textos después):
- Agrosara: tienda en línea para ferretería
- AquaSucre E.S.P.: PWA para técnicos (Flask + PostgreSQL) y módulo de PQR
- Surtrocha: app web de transporte rural en el sur de Bolívar
- App móvil en Flutter inspirada en YouGlish
- Transcriptor de audio a texto con Whisper local (app de escritorio)
- redmojana: backend en Laravel
[agrega o quita los que quieras]

Datos de contacto: WhatsApp [+57 ...], correo [correo de la marca], redes [...].

## Alcance por versiones
- **v1 (MVP, lo primero que sale publicado):** inicio, servicios y detalle de servicio, proyectos
  y caso de estudio, cotización por pasos, contacto, sobre mí, 404 propia, política de
  tratamiento de datos (Ley 1581 de 2012), panel de administración funcionando y sitio desplegado.
- **v2:** productos digitales con pago en línea mediante Wompi (tarjetas, PSE, Nequi),
  con verificación de firma y webhooks.
- **v3:** blog con SEO avanzado y testimonios (solo reales y con autorización; sin testimonios,
  la sección no se muestra).

## Stack (ya decidido; tu trabajo es validarlo, no reemplazarlo)
- Next.js (App Router, Server Components) + TypeScript estricto
- Payload CMS 3 integrado en el mismo proyecto, con panel en `/admin`
- PostgreSQL en Neon (una rama para desarrollo y otra para producción)
- Tailwind CSS + shadcn/ui + Motion para animaciones sutiles
- Zod + React Hook Form en formularios
- Resend para correos y Cloudflare Turnstile como antispam
- Imágenes y archivos de Payload en Cloudflare R2
- pnpm, ESLint, Prettier, Vitest y Playwright
- Despliegue en Vercel (plan Pro, porque el sitio es comercial)

## Modelo de contenido en Payload (propón mejoras si ves algo mejor)
- **Projects:** título, slug, cliente o sector, resumen, problema, solución, resultados,
  tecnologías, galería, enlace de demo o repositorio, destacado, estado.
- **Services:** nombre, slug, descripción, beneficios, proceso, precio "desde" en COP, ícono,
  preguntas frecuentes.
- **Products** (v2): nombre, slug, descripción, precio en COP, imágenes, tipo, entregable, estado.
- **Posts** (v3): editor Lexical, categorías, SEO.
- **Technologies:** nombre, logo, categoría.
- **Testimonials** (v3).
- **Leads:** solicitudes de cotización con nombre, contacto, tipo de proyecto, presupuesto
  estimado, plazo, descripción y estado. Se ven en el panel y me llegan por correo.
- **Global SiteSettings:** contacto, WhatsApp, redes y SEO por defecto.

Borradores, versiones y vista previa en vivo activados. Solo un administrador puede editar.

## Requisitos propios de este producto (además del checklist del kit)
- Mobile-first. Lighthouse de 95 o más en las cuatro categorías.
- SEO técnico:
  - metadata dinámica y Open Graph generado
  - sitemap.xml y robots.txt
  - URLs limpias en español
  - datos estructurados (Organization, Service, Product, Article)
- Accesibilidad WCAG 2.2 AA.
- Botón flotante de WhatsApp con mensaje prellenado según la página.
- Analítica respetuosa con la privacidad (Vercel Analytics o Umami).
- El formulario de cotización guarda el lead aunque falle el envío del correo.

## Tarea
1. Lee los archivos del kit.
2. Hazme preguntas de UNA en UNA, solo sobre lo que falte o sea ambiguo en este prompt.
   Máximo 5.
3. Valida el stack con Context7: versiones estables actuales y compatibilidad entre Next.js,
   Payload y el adaptador de Postgres. Si algo cambió o choca, avísame con una alternativa.
   Espera mi aprobación.
4. Adapta el kit a este proyecto:
   - Llena `CLAUDE.md` (máximo ~60 líneas) y ajusta `.claude/settings.json` a los comandos de pnpm.
   - Concreta `docs/constitution.md` para este stack si hace falta.
   - Crea `README.md` y completa `.env.example` con nombres y valores falsos.
   - Crea la base del proyecto con `create-payload-app` y configura lint, Prettier, tipos
     estrictos, Vitest y Playwright.
   - Configura GitHub Actions: lint, tipos, tests y `pnpm audit` en cada push.
   - Registra el estado y las decisiones en `MEMORY.md`.
5. Propón la identidad visual (paleta, tipografías, estilo) en texto. Espera mi aprobación.
6. Divide la v1 en specs pequeñas (001-..., 002-...) y muéstrame la lista en orden.
   No escribas ninguna spec todavía.

## Reglas
- No instales nada sin decirme qué es y para qué.
- Nunca leas ni crees archivos `.env` reales: yo copio `.env.example` a `.env` y pongo los valores.
- Si una decisión es mía, pregúntamela; no la supongas.

## Formato de salida
Al terminar cada paso: resumen de 5 líneas como máximo, archivos creados o cambiados y
decisiones que deba revisar. No pegues en el chat código que ya quedó en archivos.
Al final, dime el siguiente comando a ejecutar (normalmente `/sdd-spec 001-...`).