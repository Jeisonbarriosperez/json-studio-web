---
name: sdd
description: Flujo Spec-Driven Development del proyecto y sus plantillas. Úsala siempre que trabajes con docs/constitution.md o con archivos dentro de specs/ - redactar, revisar o cambiar specs, planes y tareas, o implementar y validar tareas de una spec.
---

# Spec-Driven Development (SDD)

## Flujo

Spec → Clarificación → Plan y tareas → Implementación (una tarea a la vez) → Validación → Cambios.

- Nunca pases a la siguiente fase sin la aprobación explícita del usuario.
- La spec manda: si algo no está en la spec, no se implementa. Si falta una decisión, para y pregunta.
- Un cambio de requisitos va primero a la spec, luego al plan y las tareas, y por último al código.
- Cada spec vive en `specs/NNN-nombre/` con `spec.md`, `plan.md` y `tasks.md`.
- Al terminar cada fase, actualiza `MEMORY.md` en una o dos líneas.

## Quién hace qué (ahorra contexto)

- Sesión principal: coordina, habla con el usuario y hace las preguntas. No escribe código en el flujo SDD.
- `planner`: spec, plan y tareas. `implementer`: una tarea. `reviewer`: clarificación y validación.
- `security-auditor`: cuando la spec toca autenticación, formularios, pagos, datos personales o archivos.
- A los subagentes pásales siempre: la fase, lo que se espera, las palabras del usuario y sus
  decisiones, las rutas a leer y el resultado de la fase anterior. Ellos no ven esta conversación.

## Plantilla de spec (spec.md)

```
# Spec NNN — <Nombre>
Estado: borrador | aprobada | implementada

## Contexto y objetivo
<Qué problema resuelve y por qué vale la pena. Un párrafo.>
## Usuarios
## Historias de usuario
- HU-1. Como <rol>, quiero <acción> para <beneficio>.
## Definiciones (solo si hay términos que puedan entenderse de varias formas)
## Requisitos funcionales
## Requisitos no funcionales (rendimiento, seguridad, accesibilidad, idioma...)
## Casos límite (vacíos, duplicados, datos corruptos, límites, concurrencia)
## Fuera de alcance
## Criterios de finalización
## Dudas abiertas
- [NECESITA ACLARACIÓN] <duda>
```

La spec describe el QUÉ y el POR QUÉ. Nada de stack, arquitectura ni nombres de archivos.

## Requisitos en EARS (en español)

- RF-x: CUANDO <evento>, EL SISTEMA <respuesta>.
- RF-x: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>.
- RF-x: MIENTRAS <estado>, EL SISTEMA <respuesta>.
- RF-x: EL SISTEMA <comportamiento permanente>.

Cada RF debe ser verificable: nada de "rápido", "bonito" o "seguro" sin un criterio medible.

## Plan (plan.md)

Archivos y responsabilidades · Modelo de datos · Funciones de lógica pura · Interfaz ·
Decisiones justificadas con su alternativa descartada · Puntos del security-checklist que aplican ·
Estrategia de tests. Indica qué RF cubre cada parte.

## Tareas (tasks.md)

```
- [ ] **Tn. <Descripción>.** RF-x, RF-y
  - Hecho cuando: <comprobación verificable>.
```

De 20 a 30 minutos por tarea, en orden de dependencia. Si salen más de 10, propón dividir la spec.

## Implementación

Una sola tarea a la vez: test primero (en rojo), después el código, tests en verde, marcar la tarea y parar.
