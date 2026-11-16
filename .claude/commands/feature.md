---
description: Cambio pequeño sin spec - plan corto, aprobación y luego código
argument-hint: descripción del cambio
disable-model-invocation: true
---

Quiero este cambio pequeño: $ARGUMENTS

Antes de escribir código, dame un plan de 5 líneas como máximo:

1. Qué archivos vas a modificar y qué cambia en cada uno (usa `Explore` si necesitas ubicarlos).
2. Casos límite y dudas que debo decidir yo.
3. Si toca algo de la skill `seguridad`, qué reglas aplican.

No modifiques nada hasta que apruebe el plan. Después implementa con tests, corre tests y lint,
y responde en el formato corto de `CLAUDE.md`. Si el cambio resulta grande, para y sugiere `/sdd-spec`.
