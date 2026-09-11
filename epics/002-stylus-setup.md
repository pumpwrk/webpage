# Épica 002 — Migración de CSS a Stylus

## Objetivo

Convertir `assets/css/styles.css` (actualmente en `src/assets/stylus/styles.styl`) a Stylus con sintaxis nativa. El archivo debe generar exactamente el mismo CSS al compilarse.

## Decisiones adoptadas

- Un solo archivo `src/assets/stylus/styles.styl` (sin módulos).
- Sintaxis Stylus: sangría (no llaves), puntos y coma opcionales.
- Variables Stylus para colores y valores reutilizables.
- Se mantiene la estructura del CSS actual: :root, dark/light theme, resets, typography, layout, components, responsive, animations, utilities.

## Salida esperada

```
docs/assets/css/styles.css   # CSS compilado desde styles.styl
```

## Contenido de styles.styl

Debe traducir cada sección del CSS actual:

1. **Variables:** `--pw-black`, `--pw-volt`, etc. → variables Stylus con `!set` o direct assignment.
2. **Theme light:** `[data-theme="light"]` block con los valores claros.
3. **Reset & Base:** `* { box-sizing: ... }`, `html`, `body`, `a`, `img`.
4. **Typography:** `.pw-display`, `.pw-brand-lockup`, h1-h6, p.
5. **Layout:** `.container`, `section`, `.section-title`.
6. **Navigation:** `.nav`, `.nav-inner`, `.nav-logo`, `.nav-links`, `.nav-toggle`.
7. **Hero:** `.hero`, `.hero-content`, `.hero-logo`, `.hero-logo-text`, `.hero-buttons`.
8. **Buttons:** `.btn`, `.btn-primary`, `.btn-store`.
9. **Cards:** `.card`, `.card-icon`.
10. **Grid:** `.grid-2`, `.grid-3`, `.grid-4`.
11. **Features section:** `.features`, `.feature-tabs`, `.feature-panel`.
12. **How it works:** `.steps`, `.step`.
13. **Benefits:** `.benefits-list`.
14. **Pricing:** `.pricing`, `.pricing-highlight`, `.pricing-table-wrapper`, `.pricing-table`, `.founding-banner`, `.pricing-features`, `.pricing-cta`.
15. **Inline photos:** `.lifestyle-banner`, `.inline-photo`, `.inline-photo-duo`.
16. **Contact:** `.contact-layout`, `.contact-photo`.
17. **CTA:** `.cta`.
18. **Footer:** `.footer`, `.footer-inner`, `.footer-brand`, `.footer-links`, `.footer-bottom`.
19. **Legal pages:** `.legal` styles.
20. **Theme toggle:** `.theme-toggle`.
21. **Responsive:** `@media (max-width: 768px)`, `@media (max-width: 480px)`.
22. **Animations:** `@keyframes fadeInUp`, `.animate-in`, `.delay-*`.
23. **Utilities:** `.text-center`, `.text-accent`, `.mt-*`, `.mb-*`.

## Pasos de ejecución

1. Crear `src/assets/stylus/styles.styl` con el contenido traducido de `assets/css/styles.css`.
2. En `build.js`, agregar paso de compilación Stylus: `stylus(src)` → `docs/assets/css/styles.css`.
3. Probar: `npm run build` debe generar `docs/assets/css/styles.css` idéntico al CSS actual.
4. Validar con diff que el CSS generado es funcionalmente equivalente (mismas reglas, mismos valores).

## Validación

- `npm run build` genera `docs/assets/css/styles.css`.
- El CSS compilado produce el mismo estilo visual que el CSS actual.
- No hay errores de compilación de Stylus.
- El archivo `styles.css` generado contiene todas las secciones del original.

## Bloqueos

- Depende de épica 001 (estructura de `src/` creada).
- Depende de que `package.json` tenga `stylus` como dependencia.

## Bloquea

- Épica 004 (build script) — requiere `build.js` compilando Stylus correctamente.
