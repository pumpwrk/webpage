# Épica 005 — CI/CD: actualizar deploy workflow

## Objetivo

Actualizar `.github/workflows/deploy.yml` para que el build de GitHub Pages ejecute `npm run build` antes de subir el artifact. El repo ahora tiene estructura de build (src/ → docs/), y GitHub Pages debe servir desde el directorio `docs/`.

## Cambios necesarios en deploy.yml

1. Agregar paso de instalación de Node.js y dependencias.
2. Ejecutar `npm run build` para generar `docs/`.
3. Cambiar `path: '.'` por `path: 'docs/'` en el paso de upload.

## Workflow modificado

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'docs'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Pasos de ejecución

1. Actualizar `.github/workflows/deploy.yml` con el contenido de arriba.
2. Verificar que el workflow no tenga conflictos con otras configuraciones del repo.

## Validación

- El workflow de GitHub Actions se ejecuta correctamente.
- `docs/` se genera correctamente en el CI.
- GitHub Pages sirve desde `docs/`.
- La página visible en `https://pumpwrk.com` es idéntica a la versión anterior.

## Bloqueos

- Depende de épica 004 (build.js funcional y `npm run build` generando docs/).

## Bloquea

- Ninguna. Es la última épica de la migración.
