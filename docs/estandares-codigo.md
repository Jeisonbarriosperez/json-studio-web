# Estándares de código humano

Objetivo: que cualquier desarrollador entienda el código en una sola lectura, sin preguntarle al autor.

## Nombres

- El nombre dice la intención: `calculateMonthlyTotal`, no `calc2` ni `doStuff`.
- Booleanos como pregunta: `isActive`, `hasPermission`, `canEdit`.
- Funciones con verbo (`sendInvoice`), clases y tipos con sustantivo (`Invoice`).
- Sin abreviaturas raras. Excepción: las universales (`id`, `url`, `db`).
- Nada de números mágicos: `const MAX_LOGIN_ATTEMPTS = 5`.

## Funciones y archivos

- Una función hace una sola cosa. Si necesitas la palabra "y" para describirla, divídela.
- Guía de tamaño: función de 30 líneas o menos, archivo de 300 líneas o menos. Si se pasa, se justifica o se divide.
- Máximo 3 parámetros; si hay más, usa un objeto con nombres.
- Retorno temprano en vez de `if` anidados (máximo 2 niveles de anidación).
- Funciones puras para la lógica de negocio: reciben datos (incluida la fecha "hoy") y devuelven resultados, sin tocar la UI ni la BD.

## Estructura

- Organiza por funcionalidad (`features/quotes/`), no solo por tipo de archivo, cuando el proyecto crezca.
- Capas claras: interfaz → casos de uso o servicios → acceso a datos. La interfaz nunca habla directo con la BD.
- Sigue el patrón que ya existe en el proyecto. Si propones uno nuevo, se justifica en el plan.

## Comentarios y documentación

- Comenta el **porqué** (una regla de negocio, un caso raro), no el **qué**: el código ya dice qué hace.
- Cero código comentado o muerto: para eso está git.
- Las funciones públicas y los módulos complejos llevan un docstring o JSDoc breve.
- `README.md` siempre al día: qué es, cómo instalar, cómo correr, cómo probar, variables de entorno.

## Errores

- Nunca un `catch` vacío. Se maneja, se registra o se relanza con contexto.
- Mensajes al usuario: claros y sin detalles técnicos. Detalles técnicos: solo en los logs del servidor.
- Valida en los bordes (formularios, APIs, archivos) y confía en los datos ya validados dentro del sistema.

## Simplicidad

- KISS: la solución más simple que cumpla la spec.
- YAGNI: no construyas "por si acaso". Si no está en la spec, no existe.
- DRY con criterio: duplicar dos veces es aceptable; a la tercera, se abstrae.

## Tipos y formato

- TypeScript en modo estricto, o type hints en Python. Nada de `any` sin justificar.
- El formato lo decide la herramienta (Prettier, Ruff, Pint), no la persona. El hook `formatear` lo aplica solo.
- El linter en verde es parte de "terminado".

## Git

- Commits pequeños con Conventional Commits en español: `feat: agrega formulario de cotización`, `fix: valida correo vacío`.
- Un commit = un cambio lógico. Nunca mezclar refactor y funcionalidad nueva.
- Nada de secretos, builds ni `node_modules` en el repositorio.
