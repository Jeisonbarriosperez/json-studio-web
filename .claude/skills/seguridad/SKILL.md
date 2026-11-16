---
name: seguridad
description: Reglas de seguridad obligatorias del proyecto. Úsala siempre que escribas o revises código que toque formularios, autenticación, contraseñas, sesiones, cookies, consultas a base de datos, HTML con datos del usuario, subida de archivos, variables de entorno, APIs externas, pagos o dependencias nuevas.
---

# Seguridad al escribir código

Referencia completa y cómo verificar cada punto: `docs/security-checklist.md`.

## Reglas

- **Secretos**: solo en variables de entorno. Si necesitas uno nuevo, agrega el nombre con un valor
  falso a `.env.example` y pide al usuario que ponga el real en su `.env`. Nunca leas ni escribas `.env`.
  Las variables con prefijo público (`NEXT_PUBLIC_`, `VITE_`, `PUBLIC_`) jamás llevan secretos.
- **Entrada**: todo lo que llega de fuera (formularios, query params, cuerpos JSON, cabeceras,
  archivos, webhooks) se valida en el servidor con un esquema (Zod, Pydantic, Form Request).
  Define longitudes máximas.
- **Consultas**: ORM o consultas parametrizadas. Nunca concatenes texto del usuario en SQL o en comandos de shell.
- **Salida**: deja que el framework escape. Prohibido `dangerouslySetInnerHTML`, `v-html`, `{!! !!}`
  o `|safe` con datos del usuario, salvo pasados por DOMPurify o similar.
- **Contraseñas**: Argon2id (o bcrypt con costo 12 o más) usando la librería del framework.
- **Sesiones y cookies**: `HttpOnly`, `Secure`, `SameSite=Lax`; regenerar la sesión al iniciar sesión;
  invalidarla al cerrar sesión.
- **Formularios públicos**: Turnstile o reCAPTCHA + honeypot + rate limiting + CSRF si hay sesión.
- **Autorización**: cada acción comprueba que el usuario puede hacerla sobre ESE recurso, no solo que inició sesión.
- **Errores**: al usuario un mensaje genérico; el detalle va al log del servidor, sin datos sensibles.
- **Dependencias**: antes de agregar una, verifica en Context7 que esté mantenida y usa su versión
  estable actual. Después, corre la auditoría de dependencias.
- **Webhooks y pagos**: verifica siempre la firma del proveedor y no confíes en montos que manda el cliente.

## Antes de terminar

Di en una línea qué reglas de esta lista aplicaste en el cambio.
