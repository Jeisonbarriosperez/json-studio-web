# Kit de trabajo profesional con Claude Code

Plantilla que copias en cada proyecto para que Claude Code trabaje siempre igual: con specs,
subagentes, seguridad de entrada y gastando los tokens justos.
Es la adaptación a Claude Code de lo que viste en el curso con OpenCode.

## Cómo usarlo
1. Copia todo el contenido de esta carpeta (incluidas las carpetas ocultas `.claude/` y los
   archivos `.gitignore`, `.env.example` y `.mcp.json`) en la raíz de tu proyecto.
   - En WSL: `cp -r ~/claude-kit/. ~/proyectos/mi-proyecto/`
2. Necesitas **Node.js** instalado (los hooks y los MCP lo usan), incluso en proyectos Python o PHP.
3. Abre Claude Code en la carpeta del proyecto. La primera vez te pedirá confiar en la carpeta
   y aprobar los servidores MCP del proyecto.
4. Activa el modo plan (Shift+Tab) y pega el prompt de `PROMPT-INICIAL.md`.
5. Comprueba que todo cargó: `/agents`, `/hooks`, `/mcp`, y escribe `/` para ver los comandos.

## Qué hay y para qué sirve

| Archivo o carpeta | Equivale en el curso a | Para qué |
|---|---|---|
| `CLAUDE.md` | `AGENTS.md` | Reglas del proyecto. Claude lo lee en cada sesión. Corto a propósito. |
| `MEMORY.md` | `MEMORY.md` | Estado y decisiones entre sesiones. Se importa desde `CLAUDE.md`. |
| `docs/constitution.md` | constitución SDD | 8 principios innegociables. |
| `docs/estandares-codigo.md` | — | Reglas de código humano (nada de espagueti). |
| `docs/security-checklist.md` | — | Tus 8 puntos de seguridad + 9 añadidos + 9 de calidad, cada uno con cómo verificarlo. |
| `.claude/agents/` | `.opencode/agents/` | Subagentes: `planner` (Opus), `implementer` (Sonnet), `reviewer` (Sonnet), `security-auditor` (Opus) y `Explore` (Haiku). |
| `.claude/skills/` | `.agents/skills/` | Skills `sdd` y `seguridad`: Claude las carga solo cuando hacen falta. |
| `.claude/commands/` | `.opencode/commands/` | Comandos `/sdd-*`, `/feature` y `/auditoria`. |
| `.claude/hooks/` + `.claude/settings.json` | guardarraíles | Bloquean secretos y comandos destructivos, piden permiso para `git push` y formatean solo. |
| `.mcp.json` | `opencode.json` (mcp) | Context7 (documentación actual) y Playwright (probar la interfaz). |

## Flujo de trabajo
- **Funcionalidad grande:** `/sdd-spec 001-nombre idea` → `/sdd-clarify 001-nombre` →
  `/sdd-plan 001-nombre` → `/sdd-implement 001-nombre T1` (una por tarea) → `/sdd-validate 001-nombre`.
  - O todo coordinado de una vez, parando en cada aprobación: `/sdd-auto idea`.
  - Para saber dónde vas: `/sdd-status 001-nombre`. Para cambiar requisitos: `/sdd-change 001-nombre cambio`.
- **Cambio pequeño:** `/feature descripción`.
- **Antes de publicar:** `/auditoria`. No se despliega con resultado NO APTO.

## Cómo ahorrar tokens sin perder calidad
1. **Cada modelo en lo suyo.** Sesión principal con Sonnet (`/model sonnet`). El kit ya manda
   lo que exige pensar a Opus (`planner`, `security-auditor`), la búsqueda a Haiku (`Explore`)
   y `/sdd-status` también a Haiku.
2. **Subagentes para todo lo pesado.** Leen archivos en su propio contexto y te devuelven solo
   el resumen; tu sesión principal se mantiene limpia.
3. **`/clear` al terminar cada tarea** y antes de empezar otra que no tenga relación.
   `MEMORY.md` y las specs guardan lo importante, así que no pierdes nada.
4. **`/compact` con foco** cuando una sesión se alarga: `/compact conserva las decisiones de la spec 002`.
5. **`/context`** para ver qué está ocupando la ventana de contexto.
6. **Referencia archivos con `@`** (`@src/lib/auth.ts`) en vez de pegar código en el chat.
7. **`CLAUDE.md` corto.** Se carga en cada mensaje; lo detallado vive en skills y en `docs/`,
   que solo se leen cuando hacen falta.
8. **Pocos MCP.** Cada servidor MCP agrega sus herramientas al contexto. Activa solo los que el proyecto usa.
9. **Modo plan para lo grande, no para lo pequeño.** Un cambio obvio no necesita plan.
10. **Respuestas cortas.** `CLAUDE.md` ya le pide resúmenes de 5 líneas y no repetir código escrito.

## Lo que el kit NO puede hacer por ti
- **Poner tus secretos:** tú copias `.env.example` a `.env` y llenas los valores (el hook impide
  que Claude toque `.env`, incluso para copiarlo).
- **HTTPS, backups y cabeceras en producción:** se configuran en el hosting. `/auditoria` te dice
  cómo verificarlos.
- **Revisar por ti:** la regla de oro del curso sigue igual. La IA ejecuta, el responsable eres tú.

## Ajustes opcionales
- **Usar el kit en todos tus proyectos sin copiarlo:** pon los agentes, skills y comandos en
  `~/.claude/agents/`, `~/.claude/skills/` y `~/.claude/commands/`. Lo que tenga el proyecto
  en su propia carpeta `.claude/` tiene prioridad.
- **Navegador para pruebas:** Playwright funciona igual en WSL y en Windows. Si prefieres el de
  Chrome DevTools, cambia en `.mcp.json` el bloque `playwright` por
  `"chrome-devtools": { "command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"] }`.
- **MCP de GitHub o de base de datos:** agrégalos solo si el proyecto los necesita y con sus
  tokens en variables de entorno, nunca escritos en `.mcp.json`.
- **Context7 con más cuota:** saca una clave gratis en context7.com y configúrala como variable
  de entorno de tu sistema, no en el archivo.
