# Epics — Pumpwrk Webpage Builder Migration

> **Punto de entrada para agentes:** Lee esta página primero, luego sigue la épica que necesites en orden.

## Estado del proyecto

El repositorio **pumpwrk-webpage** está en medio de una migración de estructura. Actualmente el sitio es un set de HTML/CSS estático suelto en la raíz. El objetivo es migrar a un builder con **Pug** (templating), **Stylus** (estilos) y un script **build.js** que genere el output en `./docs`.

## Roadmap

| Épica | Descripción | Estado |
|-------|-------------|--------|
| [001](./001-initial-structure.md) | Estructura de proyecto y migración de assets | ✅ **Completada** |
| [002](./002-stylus-setup.md) | Migración de CSS a Stylus | ✅ **Completada** |
| [003](./003-pug-templates.md) | Migración de HTML a Pug | ✅ **Completada** |
| [004](./004-build-script.md) | Build script (build.js) | ✅ Completada |
| [005](./005-deploy-workflow.md) | CI/CD: actualizar deploy workflow | ✅ Completada |

## Cómo trabajar

1. **Lee [epics.md](./epics.md)** para la vista general del estado de todas las épicas.
2. **Lee la épica correspondiente** (`./00X-nombre.md`) para los detalles de ejecución.
3. **Marca el estado** en `epics.md` cuando termines.
4. **Commit:** uno por épica completa, con header + body detallado.

## Epics futuras (no creadas aún)

| # | Título | Notas |
|---|--------|-------|
| 006 | Optimizaciones (minificar CSS/JS, image optimization) | Post-migración |
| 007 | Development mode (watch + live reload) | Post-migración |

## Decisiones técnicas adoptadas

| Aspecto | Decisión | Épica |
|---------|----------|-------|
| Stylus | Un solo archivo `styles.styl` | 002 |
| Pug layout | `extends` + `block content` / `block head` | 003 |
| Build | Un único `build.js` CLI central | 004 |
| Sitemap | Generado automáticamente desde config en build.js | 004 |
| CNAME/robots.txt | Copiados como estáticos | 004 |

## Notas para nuevos agentes

- **No modifiques** los archivos originales en la raíz hasta que no se ejecute la épica 001.
- **No ejecutes** `npm run build` hasta que las épicas 002-004 estén completas.
- El output de build **siempre** va a `./docs/` (ignorada por git).
- El deploy actual de GitHub Pages sirve desde la raíz del repo; la épica 005 lo ajustará para servir desde `docs/`.
