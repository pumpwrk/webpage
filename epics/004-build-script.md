# Épica 004 — Build Script (build.js)

## Objetivo

Crear `build.js` como CLI central que orqueste todo el pipeline de build: compilar Stylus a CSS, renderizar Pug a HTML, copiar assets estáticos, generar sitemap.xml. Ejecutar con `npm run build` y generar `docs/` completo.

## Decisiones adoptadas

- Un único archivo `build.js` como CLI central.
- No usa Node.js server ni hot-reload (eso vendrá en épica posterior).
- Build es un proceso step-by-step: limpiar docs/, copiar static, compilar stylus, renderizar pug.
- Dependencias mínimas: `pug`, `stylus`, `fs-extra` (o fs nativo), `glob` (o glob nativo de Node 18+).
- Node 18+ para importmaps/glob nativo si es posible, sino agregar dependencias.

## Dependencias de build (package.json devDependencies)

```json
{
  "devDependencies": {
    "pug": "^3.0.2",
    "stylus": "^0.62.0",
    "fs-extra": "^11.1.1"
  }
}
```

## Estructura de build.js

```javascript
// build.js
const fs = require('fs-extra');
const path = require('path');
const pug = require('pug');
const stylus = require('stylus');

const SRC_DIR = path.join(__dirname, 'src');
const DOCS_DIR = path.join(__dirname, 'docs');

// 1. Limpiar docs/
async function clean() {
  await fs.remove(DOCS_DIR);
  await fs.ensureDir(DOCS_DIR);
}

// 2. Copiar archivos estáticos (CNAME, robots.txt)
async function copyStatic() {
  const srcStatic = path.join(SRC_DIR, 'static');
  const destStatic = path.join(DOCS_DIR, 'static');
  
  // CNAME, robots.txt al root de docs/
  await fs.copy(path.join(srcStatic, 'CNAME'), path.join(DOCS_DIR, 'CNAME'));
  await fs.copy(path.join(srcStatic, 'robots.txt'), path.join(DOCS_DIR, 'robots.txt'));
}

// 3. Copiar assets/images
async function copyImages() {
  const srcImages = path.join(SRC_DIR, 'assets', 'images');
  const destImages = path.join(DOCS_DIR, 'assets', 'images');
  await fs.copy(srcImages, destImages);
}

// 4. Compilar Stylus a CSS
async function compileStylus() {
  const srcPath = path.join(SRC_DIR, 'assets', 'stylus', 'styles.styl');
  const destPath = path.join(DOCS_DIR, 'assets', 'css', 'styles.css');
  
  await fs.ensureDir(path.dirname(destPath));
  
  const css = stylus.compile(
    fs.readFileSync(srcPath, 'utf-8'),
    { filename: srcPath }
  );
  
  await fs.writeFile(destPath, css);
}

// 5. Renderizar Pug a HTML
async function renderPug() {
  const pages = [
    { src: 'index.pug', dest: 'index.html' },
    { src: 'pages/terminos-y-condiciones.pug', dest: 'pages/terminos-y-condiciones.html' },
    { src: 'pages/politica-de-privacidad.pug', dest: 'pages/politica-de-privacidad.html' },
    { src: 'pages/politica-de-cookies.pug', dest: 'pages/politica-de-cookies.html' },
    { src: 'pages/licencia.pug', dest: 'pages/licencia.html' },
  ];
  
  for (const page of pages) {
    const srcPath = path.join(SRC_DIR, page.src);
    const destPath = path.join(DOCS_DIR, page.dest);
    
    await fs.ensureDir(path.dirname(destPath));
    
    const html = pug.renderFile(srcPath, {
      pretty: true, // opcional: prety print HTML
      // locals: página específica si tiene variables
    });
    
    await fs.writeFile(destPath, html);
  }
}

// 6. Generar sitemap.xml desde config
async function generateSitemap() {
  const baseUrl = 'https://pumpwrk.com';
  const lastMod = '2026-08-30'; // TODO: leer de archivos o configurar
  
  const urls = [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/pages/terminos-y-condiciones.html', changefreq: 'monthly', priority: 0.8 },
    { loc: '/pages/politica-de-privacidad.html', changefreq: 'monthly', priority: 0.8 },
    { loc: '/pages/politica-de-cookies.html', changefreq: 'monthly', priority: 0.8 },
    { loc: '/pages/licencia.html', changefreq: 'monthly', priority: 0.8 },
  ];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  await fs.writeFile(path.join(DOCS_DIR, 'sitemap.xml'), xml);
}

// Main
async function build() {
  console.log('🏗️  Iniciando build...');
  await clean();
  console.log('✓ Limpieza completada');
  
  await copyStatic();
  console.log('✓ Archivos estáticos copiados');
  
  await copyImages();
  console.log('✓ Imágenes copiadas');
  
  await compileStylus();
  console.log('✓ Stylus compilado');
  
  await renderPug();
  console.log('✓ Pug renderizado');
  
  await generateSitemap();
  console.log('✓ Sitemap generado');
  
  console.log('✅ Build completado en docs/');
}

build().catch(err => {
  console.error('❌ Build fallido:', err);
  process.exit(1);
});
```

## package.json

```json
{
  "name": "pumpwrk-webpage",
  "version": "1.0.0",
  "description": "Pumpwrk landing page static site builder",
  "scripts": {
    "build": "node build.js",
    "dev": "node build.js && open docs/index.html"
  },
  "devDependencies": {
    "pug": "^3.0.2",
    "stylus": "^0.62.0",
    "fs-extra": "^11.1.1"
  }
}
```

## Pasos de ejecución

1. Crear `package.json` con las dependencias y scripts.
2. Crear `build.js` con el contenido de arriba.
3. Ejecutar `npm install`.
4. Ejecutar `npm run build`.
5. Verificar que `docs/` tenga la estructura completa.

## Validación

- `npm run build` no produce errores.
- `docs/` tiene la estructura esperada (index.html, pages/*.html, assets/css/styles.css, assets/images/*, CNAME, robots.txt, sitemap.xml).
- El HTML generado es idéntico al HTML original.
- El CSS compilado es idéntico al CSS original.
- Los assets images están completos.

## Bloqueos

- Depende de épica 001 (estructura src/).
- Depende de épica 002 (styles.styl creado).
- Depende de épica 003 (páginas Pug creadas).

## Bloquea

- Épica 005 (deploy workflow).
