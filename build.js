const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const pug = require('pug');
const stylus = require('stylus');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DOCS = path.join(ROOT, 'docs');

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}

const PAGES = [
  { src: 'index.pug', dest: 'index.html' },
  { src: 'pages/terminos-y-condiciones.pug', dest: 'pages/terminos-y-condiciones.html' },
  { src: 'pages/politica-de-privacidad.pug', dest: 'pages/politica-de-privacidad.html' },
  { src: 'pages/politica-de-cookies.pug', dest: 'pages/politica-de-cookies.html' },
  { src: 'pages/licencia.pug', dest: 'pages/licencia.html' },
];

const BASE_URL = 'https://pumpwrk.com';

async function clean() {
  try { await fsp.rm(DOCS, { recursive: true, force: true }); } catch {}
  await ensureDir(DOCS);
}

async function copyStatic() {
  const srcStatic = path.join(SRC, 'static');
  await fsp.cp(srcStatic, DOCS, { recursive: true });
}

async function copyImages() {
  const srcImg = path.join(SRC, 'assets', 'images');
  const destImg = path.join(DOCS, 'assets', 'images');
  await fsp.cp(srcImg, destImg, { recursive: true });
}

async function compileStylus() {
  const srcPath = path.join(SRC, 'assets', 'stylus', 'styles.styl');
  const css = await new Promise((resolve, reject) => {
    stylus(fs.readFileSync(srcPath, 'utf-8'))
      .set('filename', srcPath)
      .render((err, css) => err ? reject(err) : resolve(css));
  });

  const destPath = path.join(DOCS, 'assets', 'css');
  await ensureDir(destPath);
  await fsp.writeFile(path.join(destPath, 'styles.css'), css);
}

async function renderPug() {
  for (const page of PAGES) {
    const srcPath = path.join(SRC, page.src);
    const destPath = path.join(DOCS, page.dest);
    await ensureDir(path.dirname(destPath));

    const html = pug.renderFile(srcPath, { pretty: true });
    await fsp.writeFile(destPath, html);
  }
}

async function generateSitemap() {
  const urls = [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/pages/terminos-y-condiciones.html', changefreq: 'monthly', priority: 0.8 },
    { loc: '/pages/politica-de-privacidad.html', changefreq: 'monthly', priority: 0.8 },
    { loc: '/pages/politica-de-cookies.html', changefreq: 'monthly', priority: 0.8 },
    { loc: '/pages/licencia.html', changefreq: 'monthly', priority: 0.8 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  await fsp.writeFile(path.join(DOCS, 'sitemap.xml'), xml);
}

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
