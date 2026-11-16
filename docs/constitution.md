# Constitución — Json Studio (sitio web)

Principios innegociables. Toda spec, plan, tarea y línea de código debe cumplirlos.

1. **La spec manda**: no se implementa nada que no esté en la spec activa. Si falta una decisión, se para y se pregunta.
2. **Seguro por defecto**: se cumple `docs/security-checklist.md`. Ninguna entrega con un punto crítico en rojo.
3. **Código humano**: se cumple `docs/estandares-codigo.md`. Si otra persona no lo entiende en una lectura, se reescribe.
4. **Lógica separada de la interfaz**: las reglas de negocio (validación de cotizaciones, precios, mensajes de
   WhatsApp, datos de SEO) viven en funciones puras de `src/lib/` o `src/features/*/`, testeables sin UI ni base
   de datos. Los componentes y las rutas solo orquestan.
5. **Tests como puerta**: la lógica se prueba. Prohibido avanzar con tests en rojo o desactivarlos.
6. **Los datos del usuario son sagrados**: todo cambio de esquema va en una migración de Payload versionada y
   reversible; `push` automático solo en desarrollo; nunca `migrate:fresh` ni borrados masivos sobre una base con
   datos; rama de Neon separada para desarrollo y copia de seguridad antes de migrar producción.
7. **Dependencias mínimas y vigentes**: cada paquete nuevo se justifica y se pregunta antes; se usa la versión
   estable actual (Payload 3.x, Next.js 16.4.x); `pnpm audit` sin vulnerabilidades altas ni críticas; nada que
   cueste dinero sin aprobación.
8. **Idioma**: código en inglés; interfaz, comentarios y documentación en español. El contenido editable vive en
   Payload con localización activa (`es` por defecto), listo para agregar `en`.
