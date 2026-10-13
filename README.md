# NovaTech — Proyecto Frontend DAW

Plataforma web corporativa desarrollada con **Bootstrap 5.3** y **CSS3 avanzado**.  
Proyecto de mejora del módulo de Diseño de Interfaces Web — DAW.
Javier Castro Muriana 2 DAW
---

## Estructura del proyecto

```
novatech/
├── index.html          # Landing Page pública
├── dashboard.html      # Panel de control interno
├── css/
│   ├── styles.css      # Estilos globales, variables CSS, animaciones
│   └── dashboard.css   # Estilos específicos del dashboard
└── js/
    ├── main.js         # Theme toggle, validación, observers
    └── dashboard.js    # Progress bars, contadores, toasts
```

---

## Paleta de colores elegida

| Variable | Valor | Uso |
|---|---|---|
| `--nt-bg` | `#0a0e1a` | Fondo principal (modo oscuro) |
| `--nt-surface` | `#141929` | Cards y paneles |
| `--nt-accent` | `#a8ff3e` | Color principal de marca (verde lima) |
| `--nt-cyan` | `#3ef0ff` | Color complementario de acento |
| `--nt-text` | `#e8eaf0` | Texto principal |
| `--nt-text-muted` | `#7a8099` | Texto secundario |

**¿Por qué esta paleta?**  
Quería algo que se diferenciara del típico azul Bootstrap sin caer en los gradientes morados que usa todo el mundo. El verde lima eléctrico (`#a8ff3e`) sobre fondos slate muy oscuros crea un contraste altísimo (supera el ratio 7:1 para texto grande exigido por WCAG AA) y tiene personalidad propia: recuerda a terminales de código, dashboards de ciencia ficción y marcas tech emergentes. El cyan actúa de complementario para los gradientes sin saturar la paleta.

---

## Parte más difícil de investigar e implementar

**El CSS Grid Layout asimétrico combinado con Bootstrap** (sección de servicios).

El reto fue usar `display: grid` nativo de CSS3 para crear el mosaico de tarjetas con `grid-column` y `grid-row` personalizados, sin que el grid de Bootstrap interfiriera. Tuve que entender bien la diferencia entre el sistema de columnas de Bootstrap (que usa Flexbox internamente) y CSS Grid Layout real. La documentación de MDN sobre `grid-template-columns`, `grid-column: span` y cómo manejar los breakpoints manualmente (sin las clases `col-*` de Bootstrap) fue clave.

También fue complicado el **sistema de animaciones encadenadas del hero section**: combinar `@keyframes`, `animation-delay` con variables CSS (`--delay`) y `IntersectionObserver` para que las animaciones solo se dispararan al entrar en el viewport, no al cargar la página.

---

## Animaciones CSS3 personalizadas

Todas las animaciones están definidas en `css/styles.css` a partir de la **línea 82**:

| Animación | Línea | Uso |
|---|---|---|
| `@keyframes fadeUp` | 82 | Entrada escalonada del hero (badge, título, subtítulo, CTA) |
| `@keyframes floatOrb` | 89 | Orbes de fondo flotantes del hero |
| `@keyframes pulseDot` | 96 | Punto de estado parpadeante en el badge |
| `@keyframes blink` | 101 | Cursor de terminal en la tarjeta decorativa |
| `@keyframes typingBlink` | 106 | Cursor de escritura (step-end) |
| `@keyframes scrollLine` | 111 | Línea animada del indicador de scroll |
| `@keyframes particleFloat` | 118 | Partículas flotantes del fondo |
| `@keyframes shineBtn` | 127 | Efecto brillo (shine) en hover de botones |
| `@keyframes chartRise` | 132 | Barras del mini-gráfico decorativo |
| `@keyframes slideIn` | 136 | Entrada de KPI cards del dashboard |
| `@keyframes iconPop` | 141 | Rebote del icono de servicio al hover |

---

## Requisitos técnicos cumplidos

### Vista 1 — Landing Page
- ✅ **Hero Section** con animaciones CSS3 puras: orbes flotantes, fade-up escalonado, partículas, cursor parpadeante
- ✅ **Servicios** con CSS Grid Layout nativo asimétrico (3 columnas, distribución `grid-column` y `grid-row`)
- ✅ **Portfolio** con 6 imágenes, filtro `grayscale(80%)` + `brightness` por defecto, eliminados al hover
- ✅ **Modales Bootstrap** al hacer clic en cada proyecto del portfolio
- ✅ **Formulario de contacto** con validación Bootstrap (`.is-valid`, `.is-invalid`), input range personalizado y Toast de éxito

### Vista 2 — Dashboard
- ✅ **Layout Sidebar fijo** + contenido principal con CSS Flexbox
- ✅ **Offcanvas Bootstrap** en móvil para el menú lateral
- ✅ **Tabla Bootstrap** con hover personalizado en filas (`.nova-table`)
- ✅ **Accordion** (actividad reciente) con apariencia radicalmente modificada
- ✅ **Progress Bars** animadas con transición al entrar en viewport
- ✅ **Tooltips Bootstrap** en el stack tecnológico
- ✅ **Toasts** en notificaciones y formulario

### Transversales
- ✅ **Dark/Light mode** con `data-bs-theme` de Bootstrap 5.3, switch personalizado, persistencia en `localStorage`
- ✅ **Variables CSS en `:root`** para toda la paleta, inyectadas en componentes Bootstrap
- ✅ **Accesibilidad**: atributos ARIA en todos los elementos interactivos, ratios de contraste > 4.5:1, `aria-label`, `aria-current`, `aria-live`, navegación por teclado

---

## Tecnologías

- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3
- Google Fonts — Space Grotesk + JetBrains Mono
- CSS3 nativo (Grid Layout, Custom Properties, @keyframes, Flexbox)
- JavaScript ES6+ (IntersectionObserver, requestAnimationFrame)
- Sin dependencias adicionales de JavaScript

🔗 **Ver la web:** https://javicastro03.github.io/NovaTech/
