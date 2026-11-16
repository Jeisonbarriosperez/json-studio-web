// Hook PreToolUse: impide que Claude lea, busque, edite o imprima archivos de secretos
// (.env reales, llaves privadas, carpeta secrets/). Los .env.example sí se permiten.
// Salir con código 2 bloquea la acción y le muestra el mensaje a Claude.
import { readFileSync } from 'node:fs'

const SECRET_PATH =
  /(^|[\\/])(\.env(\.(?!example$|sample$|template$)[\w.-]+)?|[^\\/]+\.(pem|key|p12|pfx)|id_(rsa|ed25519|ecdsa)|secrets?[\\/].*)$/i

const SECRET_IN_COMMAND =
  /(^|[\s'"=\/])\.env(\.(?!example\b|sample\b|template\b)[\w.-]+)?(?=$|[\s'";|&)])|\bprintenv\b|(^|[;&|]\s*)env\s*($|[;&|])/i

function block(reason) {
  process.stderr.write(
    `Bloqueado por el hook proteger-secretos: ${reason}. ` +
      'Los secretos no se leen ni se escriben. Usa nombres de variables y .env.example con valores falsos.\n',
  )
  process.exit(2)
}

const input = JSON.parse(readFileSync(0, 'utf8'))
const tool = input.tool_name
const params = input.tool_input ?? {}

if (tool === 'Bash') {
  if (SECRET_IN_COMMAND.test(params.command ?? ''))
    block('el comando accede a un archivo .env o a variables de entorno')
} else {
  const path = params.file_path ?? params.path ?? params.notebook_path ?? ''
  if (path && SECRET_PATH.test(path)) block(`"${path}" es un archivo de secretos`)
}

process.exit(0)
