# Checklist de seguridad y calidad

Ninguna entrega sale a producción con un punto **crítico** en rojo. Cada punto dice cómo se verifica.
Lo ejecuta el subagente `security-auditor` con el comando `/auditoria`.

## A. Los 8 obligatorios (críticos)

### 1. Cero claves API ni contraseñas expuestas

- Secretos solo en variables de entorno. `.env` en `.gitignore`; `.env.example` con valores falsos.
- Variables públicas del frontend (`NEXT_PUBLIC_`, `VITE_`, `PUBLIC_`) jamás contienen secretos.
- Si un secreto se filtra: se **rota** de inmediato (borrarlo del código no basta, queda en el historial de git).
- **Verificar:** `gitleaks detect` (o `git log -p | grep`) sin hallazgos; revisar el bundle del cliente.

### 2. Formularios protegidos contra spam y ataques

- Validación en el servidor con esquema (Zod, Pydantic, Form Requests de Laravel). La del cliente es solo comodidad.
- Anti-bots: Cloudflare Turnstile o reCAPTCHA, más un campo trampa (honeypot).
- Límite de envíos por IP o usuario (rate limiting) y límite de tamaño de cada campo.
- Protección CSRF en formularios con sesión.
- **Verificar:** enviar 20 veces seguidas → bloqueado; enviar campos vacíos o gigantes → rechazado.

### 3. Protección contra inyección de código (SQL, comandos, plantillas)

- Consultas siempre parametrizadas u ORM. Jamás concatenar texto del usuario en SQL.
- Nunca `eval`, `exec`, `new Function` ni `shell=True` con datos externos.
- Usuario de base de datos con el mínimo privilegio necesario.
- **Verificar:** buscar concatenaciones en consultas; probar entradas como `' OR 1=1 --`.

### 4. Sin vulnerabilidades XSS

- Dejar que el framework escape la salida (React, Blade `{{ }}`, Jinja con autoescape).
- Prohibido `dangerouslySetInnerHTML`, `v-html`, `{!! !!}` o `|safe` con datos del usuario, salvo sanitizado con DOMPurify o similar.
- Cabecera Content-Security-Policy sin `unsafe-inline` en scripts cuando sea posible.
- **Verificar:** enviar `<script>alert(1)</script>` en cada campo y confirmar que se muestra como texto.

### 5. Contraseñas correctamente cifradas

- Hash con **Argon2id** (preferido), **bcrypt** con costo de 12 o más, o el del framework si cumple OWASP
  (Payload: PBKDF2-SHA256 con 600 000 iteraciones o más). Nunca MD5, SHA1, SHA256 solo, ni cifrado reversible.
- Usar la librería del framework, nunca criptografía casera.
- Mínimo 8 caracteres y bloqueo temporal tras varios intentos fallidos (Payload: `maxLoginAttempts` y `lockTime`).
- **Verificar:** en la BD solo hay hashes (`$argon2id$…`, `$2b$…` o `pbkdf2-sha256-v1:…`).

### 6. Sesiones y cookies seguras

- Cookies con `HttpOnly`, `Secure` y `SameSite=Lax` (o `Strict`).
- Regenerar el ID de sesión al iniciar sesión; invalidarla de verdad al cerrar sesión; expiración definida.
- Tokens nunca en `localStorage` si contienen credenciales.
- **Verificar:** revisar las cookies en DevTools → Application.

### 7. HTTPS y certificados SSL

- Todo el tráfico por HTTPS; HTTP redirige a HTTPS.
- Cabecera `Strict-Transport-Security` (HSTS) activa en producción.
- Certificados automáticos: los da el hosting (Vercel, Netlify) o Let's Encrypt (Caddy o Certbot en un VPS).
- **Verificar:** abrir `http://` y confirmar la redirección; probar en SSL Labs (nota A o mejor).

### 8. Dependencias actualizadas y seguras

- Archivo de bloqueo (`package-lock.json`, `pnpm-lock.yaml`, `composer.lock`, `poetry.lock`) siempre en git.
- Auditoría sin vulnerabilidades altas ni críticas: `npm audit`, `pnpm audit`, `composer audit`, `pip-audit`.
- Dependabot o Renovate activado en GitHub. No usar paquetes abandonados o con muy pocas descargas sin revisarlos.
- **Verificar:** el comando de auditoría en limpio.

## B. Añadidos que también son críticos

9. **Autorización, no solo autenticación**: cada endpoint comprueba que el recurso pertenece al usuario (evita ver `/pedidos/124` siendo dueño del 123). _Verificar:_ probar con IDs de otro usuario.
10. **Cabeceras de seguridad**: CSP, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `frame-ancestors 'none'`. _Verificar:_ securityheaders.com.
11. **Errores sin filtrar información**: sin stack traces ni consultas SQL en producción; modo debug apagado. _Verificar:_ forzar un error en producción.
12. **Subida de archivos segura**: validar tipo real y tamaño, renombrar, guardar fuera de la carpeta pública o en almacenamiento externo.
13. **CORS restringido**: solo los orígenes propios, nunca `*` en endpoints con credenciales.
14. **Logs sin datos sensibles**: no registrar contraseñas, tokens, ni datos personales completos.
15. **Redirecciones y SSRF**: no redirigir ni hacer peticiones a URLs que manda el usuario sin una lista permitida.
16. **Datos personales (Ley 1581 de 2012, Colombia)**: política de tratamiento de datos visible, consentimiento en formularios, pedir solo lo necesario.
17. **Backups**: copias automáticas de la base de datos y una restauración probada al menos una vez.

## C. Calidad mínima de cualquier producto

18. `README.md` completo y `.env.example` al día.
19. Tests de la lógica de negocio y de los flujos clave, en verde.
20. Lint y tipos sin errores.
21. Accesibilidad básica: contraste, textos alternativos, navegación con teclado, etiquetas en formularios.
22. Responsive: funciona en 375 px de ancho.
23. Rendimiento: imágenes optimizadas y Lighthouse de 90 o más en producción (en sitios web).
24. Páginas de error propias (404 y 500) con un camino de regreso.
25. Monitoreo de errores en producción (Sentry o similar) y una forma de saber si el sitio cae.
26. CI que corra lint, tests y auditoría en cada push.
