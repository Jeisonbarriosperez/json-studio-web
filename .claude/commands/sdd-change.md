---
description: SDD · Nuevo requisito o cambio - primero la spec, luego el código
argument-hint: NNN-nombre descripción del cambio
disable-model-invocation: true
---

Argumentos (carpeta de la spec y descripción del cambio): $ARGUMENTS

NO toques código. Usa la skill sdd.

1. Pide al subagente `planner` que actualice `spec.md`: RF nuevo o modificado en EARS, sus casos
   límite y lo que queda fuera de alcance.
2. Indica qué partes de `plan.md` y `tasks.md` habría que cambiar después.
3. Muéstrame el diff de la spec y espera mi aprobación.
