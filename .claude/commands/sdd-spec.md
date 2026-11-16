---
description: SDD · Entrevista y crea la spec de una funcionalidad
argument-hint: NNN-nombre idea inicial
disable-model-invocation: true
---

NO escribas código. Usa la skill sdd.

Carpeta de la spec e idea inicial (la primera palabra es la carpeta, el resto es la idea): $ARGUMENTS

1. Hazme preguntas de UNA en UNA para eliminar ambigüedades (casos límite, errores, qué queda
   fuera de esta versión). Máximo 5 preguntas. Si la idea ya es clara, haz menos.
2. Con mis respuestas, pide al subagente `planner` que cree `specs/<carpeta>/spec.md` con la
   plantilla de la skill sdd, requisitos en EARS y "Estado: borrador". Pásale mis palabras y respuestas.
3. Muéstrame un resumen de la spec (no el archivo completo) y espera mi aprobación.
