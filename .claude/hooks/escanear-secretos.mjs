// Hook PreToolUse: antes de escribir o editar un archivo, busca claves y contraseñas reales
// en el contenido nuevo. Si encuentra una, bloquea la escritura para que el secreto nunca
// llegue al disco ni a git.
import { readFileSync } from 'node:fs'

// Formatos conocidos de claves: se bloquean en cualquier archivo.
const KNOWN_KEY_PATTERNS = [
  ['llave privada', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['clave de AWS', /\bAKIA[0-9A-Z]{16}\b/],
  ['token de GitHub', /\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{60,}\b/],
  ['clave de Anthropic', /\bsk-ant-[A-Za-z0-9_-]{20,}/],
  ['clave de OpenAI', /\bsk-(proj-)?[A-Za-z0-9]{32,}/],
  ['clave de Stripe', /\b(sk|rk)_live_[A-Za-z0-9]{20,}/],
  ['clave de Google', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['token de Slack', /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  [
    'cadena de conexión con contraseña',
    /\b(postgres(ql)?|mysql|mongodb(\+srv)?|redis):\/\/[^:\s'"]+:[^@\s'"]{6,}@(?!localhost|127\.0\.0\.1)/i,
  ],
]

// Asignación genérica tipo password = "valor". Se ignora en tests, ejemplos y documentación.
const GENERIC_ASSIGNMENT =
  /(api[_-]?key|secret|password|passwd|token|client[_-]?secret)\s*[:=]\s*['"]([^'"\s]{8,})['"]/gi
const PLACEHOLDER =
  /(x{4,}|your|tu_|cambiar|changeme|example|ejemplo|placeholder|dummy|test|<|\$\{|process\.env|os\.environ|getenv|env\()/i
const RELAXED_PATH = /(test|spec|fixture|seed|mock|\.example$|\.sample$|\.md$)/i

const input = JSON.parse(readFileSync(0, 'utf8'))
const params = input.tool_input ?? {}
const path = params.file_path ?? ''
const content = [
  params.content,
  params.new_string,
  ...(params.edits ?? []).map((edit) => edit.new_string),
]
  .filter(Boolean)
  .join('\n')

const findings = KNOWN_KEY_PATTERNS.filter(([, pattern]) => pattern.test(content)).map(
  ([name]) => name,
)

if (!RELAXED_PATH.test(path)) {
  for (const match of content.matchAll(GENERIC_ASSIGNMENT)) {
    if (!PLACEHOLDER.test(match[2])) findings.push(`valor literal en "${match[1]}"`)
  }
}

if (findings.length > 0) {
  process.stderr.write(
    `Bloqueado por el hook escanear-secretos en "${path}": parece contener ${[...new Set(findings)].join(', ')}. ` +
      'Lee el valor desde una variable de entorno y agrega solo el nombre a .env.example.\n',
  )
  process.exit(2)
}

process.exit(0)
