---
description: SDD · Genera el plan técnico y las tareas de una spec aprobada
argument-hint: NNN-nombre
disable-model-invocation: true
---

Spec: `specs/$ARGUMENTS/spec.md`. Usa la skill sdd.

1. Si la spec no está "aprobada" o tiene `[NECESITA ACLARACIÓN]` pendientes, PARA y avísame.
2. Pide al subagente `planner` que genere `plan.md` y `tasks.md` en esa carpeta, según la skill sdd.
3. Muéstrame un resumen: decisiones técnicas clave, dependencias nuevas (si hay) y la lista de
   tareas en una línea cada una. Espera mi aprobación antes de implementar.
