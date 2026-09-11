# STATUS — Pumpwrk Webpage Builder Migration

> ⚠️ **Agentes:** si estás en `pumpwrk-webpage/`, los pendientes de este repo están en [`epics/`](./epics/).
> No subas al directorio padre: ese status pertenece a otro proyecto.

## Estado actual

En medio de una migración: de HTML/CSS estático en raíz → builder con **Pug + Stylus + build.js** → output en `docs/`.

## Pendientes

| Épica | Qué hacer | Estado |
|-------|-----------|--------|
| [001](./epics/001-initial-structure.md) | Reorganizar a `src/` + `docs/`, copiar assets | ✅ **Completada** |
| [002](./epics/002-stylus-setup.md) | Migrar `styles.css` → `styles.styl` | ✅ **Completada** |
| [003](./epics/003-pug-templates.md) | Migrar `.html` → `.pug` con layout extend | ⬜ Pendiente |
| [004](./epics/004-build-script.md) | Crear `build.js` CLI + `package.json` | ⬜ Pendiente |
| [005](./epics/005-deploy-workflow.md) | Actualizar `.github/workflows/deploy.yml` | ⬜ Pendiente |

## Cómo continuar

1. Leer [`epics/README.md`](./epics/README.md) para el roadmap completo.
2. Ver la tabla de arriba → identificar la primera épica pendiente.
3. Leer `epics/00X-nombre.md` → ejecutar los pasos.
4. Marcar `⬜ → ✅` en esta tabla al terminar.

## Decisiones técnicas

| Aspecto | Decisión |
|---------|----------|
| Stylus | Un solo archivo `styles.styl` |
| Pug layout | `extends` + `block content` / `block head` |
| Build | `build.js` CLI central |
| Sitemap | Generado automáticamente en build.js |
| CNAME/robots.txt | Copiados como estáticos |

## Progreso

- Épicas creadas: 5/5
- Completadas: 2
- En curso: ninguna (épica 002 terminada — listo para 003)

## Notas

- Output de build → `./docs/` (ignorada por git).
- Commits: uno por épica completa.
- Validar con `npm run build` al terminar cada épica.
