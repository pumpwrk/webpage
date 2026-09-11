# Épica 001 — Estructura de proyecto y migración de assets

## Objetivo

Reorganizar el repositorio para separar código fuente (src/) del output de build (docs/). Mover todos los archivos actuales a `./src` y crear la estructura de directorios de origen. El resultado de `npm run build` debe generar en `./docs` un árbol idéntico al actual.

## Decisiones adoptadas

- **Stylus:** Un solo archivo `src/assets/stylus/styles.styl` (mínimo cambio).
- **Pug layout:** `layout.pug` con `extends`/`block content` + `block head`.
- **Build:** un único `build.js` CLI central.
- **Sitemap:** generado automáticamente desde config en build.js.
- **CNAME/robots.txt:** copiados como estáticos sin procesamiento.

## Resultado esperado (docs/)

```
docs/
├── index.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── pages/
│   ├── terminos-y-condiciones.html
│   ├── politica-de-privacidad.html
│   ├── politica-de-cookies.html
│   └── licencia.html
├── assets/
│   ├── css/
│   │   └── styles.css          # generado por build
│   └── images/                 # copiados desde src/assets/images
│       ├── logo.png
│       ├── logo-text.png
│       ├── imagotipo.jpg
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── site.webmanifest
│       ├── 001.jpg
│       ├── 002.jpg
│       ├── 003.jpg
│       ├── 004.jpg
│       ├── 005.jpg
│       └── 006.jpg
```

## Estructura de origen (src/)

```
src/
├── index.pug                     # index.html → renderiza layout
├── pages/
│   ├── terminos-y-condiciones.pug
│   ├── politica-de-privacidad.pug
│   ├── politica-de-cookies.pug
│   └── licencia.pug
├── layouts/
│   └── layout.pug                # layout base con block head/content
├── assets/
│   ├── stylus/
│   │   └── styles.styl           # TODO: épica 002
│   └── images/                   # copia exacta de assets/images actual
│       └── ... (mismo contenido)
├── static/                       # archivos copiados tal cual a docs/
│   ├── CNAME
│   ├── robots.txt
│   └── sitemap.xml               # TODO: épica 004 (generado, no estático)
├── build.js                      # TODO: épica 004
├── package.json
└── .gitignore
```

## Archivos que se mueven a src/

| De (raíz actual) | A (src/) | Tipo |
|------------------|----------|------|
| `index.html` | `src/index.pug` | Transformar a Pug |
| `pages/*.html` (4) | `src/pages/*.pug` | Transformar a Pug |
| `assets/css/styles.css` | `src/assets/stylus/styles.styl` | Transformar a Stylus (épica 002) |
| `assets/images/*` (17) | `src/assets/images/*` | Copia directa |
| `CNAME` | `src/static/CNAME` | Copia directa |
| `robots.txt` | `src/static/robots.txt` | Copia directa |
| `sitemap.xml` | `src/static/sitemap.xml` | Generado por build (épica 004) |

## Pasos de ejecución

1. Crear `./epics/` si no existe.
2. Crear directorios de estructura:
   - `mkdir -p src/{pages,layouts,assets/{stylus,images},static}`
3. Mover assets actuales:
   - `cp -r assets/images/* src/assets/images/`
   - `cp CNAME src/static/`
   - `cp robots.txt src/static/`
4. Mover `index.html` a `src/index.pug` (temporalmente como HTML, se transforma en épica 003).
5. Mover `pages/*.html` a `src/pages/*.pug` (temporalmente).
6. Crear `package.json` con dependencias: `pug`, `stylus`, `stylus-loader` (o CLI de stylus).
7. Crear `.gitignore` con `docs/`, `node_modules/`, `package-lock.json`.
8. **NO ejecutar build todavía** — depende de épicas 002-004.

## Validación

- `src/` contiene toda la estructura de arriba con los archivos correctos.
- `src/assets/images/` tiene los 17 archivos originales.
- `src/static/` tiene CNAME y robots.txt.
- No hay duplicación: los archivos originales en raíz se mueven (no se copian al mismo tiempo) a `src/`.
- `npm run build` NO se ejecuta aún (falta stylus y pug).

## Bloqueos

- Ninguno (épica fundacional).

## Bloquea

- Épica 002 (Stylus setup) — requiere `src/assets/stylus/styles.styl` creado.
- Épica 003 (Pug templates) — requiere `src/index.pug` y `src/pages/*.pug` creados.
- Épica 004 (Build script) — requiere `src/` estructurado y `build.js` creado.
