# 24s Studio

A premium digital creative studio website built with Nuxt 4, Vue 3, TypeScript, Tailwind CSS v4, Nuxt UI, GSAP/ScrollTrigger and Lenis.

## Stack

- **Nuxt 4** + **Vue 3** + **TypeScript**
- **Tailwind CSS v4** + **Nuxt UI**
- **GSAP** + **ScrollTrigger** for scoped, cleaned-up scroll animation (reveals, pins, horizontal scroll, velocity-reactive marquees)
- **Lenis** for smooth scrolling, synced to the GSAP ticker
- **Pinia** for the small amount of genuinely shared state (navigation, theme, UI)
- **VueUse** + **Lucide Icons**

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs at `http://localhost:3000`.

## Production

```bash
npm run build
npm run preview
```

## Project structure

See `app/` for the application source: `components/` (organized by section), `composables/`, `animations/` (the GSAP architecture — core utilities, per-section presets, shared constants), `data/` + `types/` (typed mock content), `stores/`, and `pages/`:

- `/`, `/about`, `/contact`
- `/services`, `/services/graphic-design`, `/services/brand-identity`, `/services/video-editing`, `/services/digital-marketing`, `/services/advertising`
- `/work`, `/work/[slug]`
- `/insights`, `/insights/[slug]`

## Notes

- Fonts (Fraunces/Inter) are fetched at build time via `@nuxt/fonts` from Google Fonts. In network-restricted environments this fetch can fail; the type stack falls back to the system serif/sans-serif defined in `assets/css/tokens.css` and the build still succeeds.
- Portfolio and service images use `picsum.photos` placeholders with unique IDs — swap for real brand/campaign photography before shipping.
- `BrandLogo.vue` renders a geometric text-based lockup, not the studio's actual mark — swap in a real `public/brand/logo.svg` asset if/when one is supplied as a file.
- A Three.js WebGL layer is a natural next step for the Hero (an abstract geometric scene reacting to mouse/scroll, lazy-loaded with a no-WebGL/reduced-motion fallback) but isn't implemented yet — the current Hero relies on GSAP-driven image parallax instead.
