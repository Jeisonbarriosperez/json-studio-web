// Hook PreToolUse (Bash): bloquea comandos destructivos o muy riesgosos antes de ejecutarlos.
// Los comandos delicados pero legítimos (git push, git reset --hard) se controlan con
// "ask" en .claude/settings.json para que Claude te pida permiso.
import { readFileSync } from 'node:fs'

const DANGEROUS_COMMANDS = [
  [
    'borrado recursivo de la raíz, el home o todo el directorio',
    /\brm\s+-\w*r\w*\s+(\/|~|\$HOME|\*|\.\.?\/?)(\s|$)/i,
  ],
  ['git push forzado', /\bgit\s+push\b.*(--force(?!-with-lease)|\s-f\b)/],
  ['formateo o escritura directa en discos', /\b(mkfs(\.\w+)?|dd\s+.*of=\/dev\/)/],
  ['permisos 777 recursivos', /\bchmod\s+-R\s+777\b/],
  ['ejecutar un script descargado de internet', /\b(curl|wget)\b[^|]*\|\s*(sudo\s+)?(ba|z)?sh\b/],
  ['borrar una base de datos completa', /\b(DROP\s+(DATABASE|SCHEMA)|TRUNCATE\s+TABLE)\b/i],
  [
    'migraciones que borran todos los datos',
    /\b(migrate:fresh|migrate:reset|db:drop|prisma\s+migrate\s+reset|--force-reset)\b/,
  ],
]

const input = JSON.parse(readFileSync(0, 'utf8'))
const command = input.tool_input?.command ?? ''

const match = DANGEROUS_COMMANDS.find(([, pattern]) => pattern.test(command))

if (match) {
  process.stderr.write(
    `Bloqueado por el hook comandos-peligrosos (${match[0]}): "${command}". ` +
      'Si de verdad hace falta, explícale al usuario por qué y deja que él lo ejecute.\n',
  )
  process.exit(2)
}

process.exit(0)
