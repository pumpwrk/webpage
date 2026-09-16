# Pumpwrk Webpage

Landing page estática para Pumpwrk — app de gestión de gimnasios.

## Descripción

Sitio web estático que cumple con los requisitos de Apple y Android para listar la app en sus tiendas. Incluye páginas legales (TyC, privacidad, cookies, licencia), descripción de features para admin y usuario, y botones de descarga para App Store/Play Store.

## Estructura

```
pumpwrk-webpage/
├── index.html              # Landing page principal
├── pages/
│   ├── terminos-y-condiciones.html
│   ├── politica-de-privacidad.html
│   ├── politica-de-cookies.html
│   └── licencia.html
├── assets/
│   ├── css/
│   │   └── styles.css      # CSS con paleta brutalist Pumpwrk
│   └── images/
│       ├── logo.png        # Logo de Pumpwrk
│       ├── imagotipo.jpg   # Imagotipo de Pumpwrk
│       ├── favicon.ico     # Favicon
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       └── site.webmanifest
├── sitemap.xml             # Sitemap para SEO
├── robots.txt              # Reglas para crawlers
└── README.md               # Este archivo
```

## Desarrollo

Para ver el sitio localmente, abre `index.html` en tu navegador o usa un servidor local:

```bash
cd pumpwrk-webpage
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Variables de entorno

El build arma la sección "Planes para tu gimnasio" consumiendo el API público de brackets de pricing (sin auth). La URL se lee de `PRICING_API_URL` y es **obligatoria** — si no está definida, el build falla.

```bash
# desarrollo local
export PRICING_API_URL=http://localhost:3000/api/public/billing/brackets
npm run build

# producción (mismo valor que el secret PRICING_API_URL en GitHub Actions)
export PRICING_API_URL=https://api.pumpwrk.com/api/public/billing/brackets
```

## Deploy a GitHub Pages

1. Crear un repo separado en GitHub
2. Subir el contenido de `pumpwrk-webpage/`
3. Configurar GitHub Pages para que sirva desde la rama `main` o `gh-pages`
4. Opcionalmente configurar un dominio personalizado

## Temas

El sitio soporta tema oscuro (default) y claro. El toggle está en el header.

## Licencia

© 2026 Pumpwrk. Todos los derechos reservados.