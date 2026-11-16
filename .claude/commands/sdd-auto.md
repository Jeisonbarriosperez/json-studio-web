---
description: SDD · Flujo completo coordinado con subagentes, parando en cada aprobación
argument-hint: idea de la funcionalidad
disable-model-invocation: true
---

Idea: $ARGUMENTS

Actúa como coordinador del flujo SDD (skill sdd). Tú no escribes código: repartes el trabajo entre
`planner`, `implementer`, `reviewer` y `security-auditor`, y hablas conmigo. Avísame en una línea
al empezar cada fase.

1. **Spec**: hazme hasta 5 preguntas de una en una; luego `planner` crea `specs/NNN-nombre/spec.md`
   (NNN = siguiente número libre). PARA hasta que yo la apruebe.
2. **Clarificación**: `reviewer` la revisa como QA. Si hay problemas, te digo cuáles corregir y
   `planner` los corrige. PARA hasta mi aprobación.
3. **Plan y tareas**: `planner` crea `plan.md` y `tasks.md`. Muéstrame un resumen y PARA hasta mi aprobación.
4. **Implementación**: `implementer` UNA vez por tarea, en orden. Si una tarea termina con tests en
   rojo, PARA y avísame.
5. **Validación**: `reviewer` valida RF por RF; si aplica, `security-auditor` también.
6. **Correcciones**: con CAMBIOS NECESARIOS, vuelve a `implementer` con la lista exacta y luego a
   `reviewer`. Máximo 2 vueltas; si sigue fallando, para y explícame qué pasa.
7. **Cierre**: resumen corto, veredictos y lo pendiente. Actualiza `MEMORY.md`.

Si la idea es un cambio pequeño que no merece una spec, dímelo y sugiere `/feature`.
