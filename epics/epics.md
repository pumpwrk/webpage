# Épicas — Pumpwrk Webpage Builder Migration

> 📖 **Nuevo agente:** lee primero [`README.md`](./README.md) para entender el contexto y roadmap completo.

## Estado general

| Épica | Título | Estado | Bloquea |
|-------|--------|--------|---------|
| [001](./001-initial-structure.md) | Estructura de proyecto y migración de assets | ✅ **Completada** | 002, 003 |
| [002](./002-stylus-setup.md) | Migración de CSS a Stylus | ✅ **Completada** | 004 |
| [003](./003-pug-templates.md) | Migración de HTML a Pug | ✅ **Completada** | 004 |
| [004](./004-build-script.md) | Build script (build.js) | ⬜ Pendiente | 005 |
| [005](./005-deploy-workflow.md) | CI/CD: actualizar deploy workflow | ⬜ Pendiente | — |

## Reglas generales

- Cada épica es independiente pero sigue el orden de la tabla.
- Al terminar cada épica, ejecutar `npm run build` y verificar que `./docs` sea idéntico visualmente.
- Commits: uno por épica completa (header + body), no commits intermedios.

## Próximas épicas (no creadas aún)

| # | Título | Notas |
|---|--------|-------|
| 006 | Optimizaciones (minificar CSS/JS, image optimization) | Post-migración |
| 007 | Desarrollo local con watch mode | Post-migración |
