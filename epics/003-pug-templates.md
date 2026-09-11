# Épica 003 — Migración de HTML a Pug

## Objetivo

Convertir todos los archivos `.html` actuales a templates `.pug` usando `layout.pug` como base con `extends`/`block content` y `block head`.

## Decisiones adoptadas

- `src/layouts/layout.pug` como layout base con `block head` y `block content`.
- Cada página extiende el layout con `extends ../layouts/layout.pug`.
- Bloques por defecto en layout para contenido opcional (`block scripts`, `block extra-head`).
- Los includes parciales (nav, footer, head) se insertan en el layout con `include`.

## Estructura de templates

```
src/
├── layouts/
│   └── layout.pug              # layout base
├── index.pug                   # extiende layout
└── pages/
    ├── terminos-y-condiciones.pug
    ├── politica-de-privacidad.pug
    ├── politica-de-cookies.pug
    └── licencia.pug
```

## Contenido de layout.pug

Debe incluir:
- `doctype html`
- `html(lang='es', data-theme='dark')`
- `block head` con: charset, viewport, title, meta tags (description, keywords, author), Open Graph, Twitter cards, favicon links, Google Fonts preconnect + CSS, link a styles.css (`/assets/css/styles.css`), block extra-head (para contenido adicional por página).
- `<body>` con:
  - `<nav class='nav'>` — se incluye con `include components/nav.pug` o inline.
  - `block content` — contenido de cada página.
  - Footer — `include components/footer.pug` o inline.
  - Scripts — theme toggle, showTab, smooth scroll, theme init, block scripts.

## Archivos de componentes parciales (dentro de layouts/)

```
src/layouts/
├── layout.pug
├── head.pug                    # todo el bloque <head> reutilizable
├── nav.pug                     # navegación (misma para todas las páginas)
├── footer.pug                  # footer (misma para todas las páginas)
└── scripts.pug                 # scripts compartidos (theme, tab, smooth scroll)
```

O bien, sin includes separados: todo el layout en `layout.pug` con `block content`.

**Nota:** Según la decisión de la épica 001, se usa layout con extends/block. Los includes parciales son opcionales si se prefieren. Se recomienda: layout.pug autocontenido con `block head` y `block content`, más `block scripts`.

## Migración de index.html → index.pug

Convertir `index.html` manteniendo toda la estructura HTML exacta. Cambios necesarios:

- `<!DOCTYPE html>` → `doctype html`
- `<html lang="es" data-theme="dark">` → `html(lang='es', data-theme='dark')`
- `<head>...</head>` → `block head` con meta, OG, Twitter, favicons, fonts, styles.
- `<body>` contenido → `block content`
- Mantener todos los `onclick`, `href`, `src`, `alt` idénticos.
- Mantener el `<script>` del theme toggle, showTab, smooth scroll en `block scripts`.

## Migración de pages/*.html → pages/*.pug

Para cada página legal (terminos, privacidad, cookies, licencia):

- `extends ../layouts/layout.pug`
- `block title` → título específico de la página
- `block extra-head` → links con `../assets/...` que en el build se convierten a `/assets/...`
- `block content` → el contenido del `<main>` exclusivo de cada página (h1, secciones legales, meta date).
- El layout ya incluye nav y footer, pero las páginas legales tienen un nav simplificado y footer simplificado. **Solución:** o bien el layout tiene nav/footer por defecto que las páginas heredan, o bien las páginas sobrescriben con `block nav` y `block footer` personalizados.

**Solución recomendada:** El layout incluye nav y footer por defecto. Para las páginas legales, se puede:
1. Opción A: Las páginas legales usan el mismo nav/footer que la landing (más consistente).
2. Opción B: Las páginas legales tienen bloques override para nav/footer simplificados.

**Decisión:** Opción A — el layout es compartido. Si hay diferencias de contenido entre nav/footer de la landing vs legales, se hacen bloques opcionales `block nav-extra` / `block footer-extra` que sobrescriben los defaults.

## Pasos de ejecución

1. Crear `src/layouts/layout.pug` con `block head`, `block content`, `block scripts`.
2. Crear `src/layouts/nav.pug` y `src/layouts/footer.pug` como parciales (o todo inline en layout).
3. Convertir `index.html` a `src/index.pug` con `extends layout.pug` y `block content`.
4. Convertir cada `pages/*.html` a `src/pages/*.pug` con `extends ../layouts/layout.pug`.
5. En `build.js`, agregar paso de renderizado Pug: `pug.renderFile(src, {locals})` → `docs/index.html`, `docs/pages/*.html`.
6. Verificar que los paths de assets sean correctos en las páginas legales (en el build, `../assets/...` se convierte a `/assets/...` ya que las páginas se renderizan en `docs/pages/`).

## Validación

- `npm run build` genera `docs/index.html` y `docs/pages/*.html`.
- El HTML renderizado es idéntico al HTML original (mismos tags, atributos, contenido).
- Las páginas legales renderizan con el nav y footer correctos.
- Los assets paths (`assets/css/styles.css`, `assets/images/*`) apuntan a la ruta correcta relativa al documento (ej: `/assets/css/styles.css` desde `docs/`, `../assets/css/styles.css` desde `docs/pages/`).

## Bloqueos

- Depende de épica 001 (estructura de `src/` creada).
- Depende de que `package.json` tenga `pug` como dependencia.

## Bloquea

- Épica 004 (build script) — requiere `build.js` renderizando Pug correctamente.
