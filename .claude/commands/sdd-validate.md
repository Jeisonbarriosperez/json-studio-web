---
description: SDD · Valida una spec implementada, RF por RF
argument-hint: NNN-nombre
disable-model-invocation: true
---

Pide al subagente `reviewer` que valide la implementación de `specs/$ARGUMENTS/` RF por RF:
tests, lint, tipos, UI con Playwright (incluida la vista de 375 px), estándares de código y
criterios de finalización.

Si la spec toca autenticación, formularios, pagos, cookies, datos personales o dependencias,
pide además al subagente `security-auditor` que revise los mismos cambios.

Muéstrame los veredictos. NO arregles nada todavía: si hay cambios necesarios, propón el
siguiente paso y espera mi confirmación.
