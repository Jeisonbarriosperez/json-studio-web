// Hook PostToolUse: formatea automáticamente cada archivo que Claude crea o edita, con la
// herramienta del proyecto (Prettier, Ruff o Laravel Pint) si está instalada.
// Así Claude no gasta tokens en formato. Nunca bloquea: si algo falla, sigue en silencio.
import { existsSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { extname, join } from 'node:path'

const PRETTIER_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
  '.json',
  '.css',
  '.scss',
  '.html',
  '.vue',
  '.svelte',
  '.astro',
  '.md',
  '.yml',
  '.yaml',
])

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()

function run(command, args) {
  spawnSync(command, args, { cwd: projectDir, stdio: 'ignore', timeout: 20_000 })
}

try {
  const input = JSON.parse(readFileSync(0, 'utf8'))
  const filePath = input.tool_input?.file_path
  if (!filePath || !existsSync(filePath)) process.exit(0)

  const extension = extname(filePath).toLowerCase()
  const prettierBin = join(projectDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
  const pintBin = join(projectDir, 'vendor', 'bin', 'pint')

  if (PRETTIER_EXTENSIONS.has(extension) && existsSync(prettierBin)) {
    run(process.execPath, [prettierBin, '--write', '--log-level', 'silent', filePath])
  } else if (extension === '.py') {
    run('ruff', ['format', '--quiet', filePath])
  } else if (extension === '.php' && existsSync(pintBin)) {
    run('php', [pintBin, '--quiet', filePath])
  }
} catch {
  // El formateo es una ayuda: un error aquí no debe detener el trabajo.
}

process.exit(0)
