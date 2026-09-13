# 24S Studio

A premium creative studio website built with Nuxt 4, Vue 3, TypeScript, Tailwind CSS v4, Nuxt UI, GSAP/ScrollTrigger, Lenis and Three.js.

## Stack

- **Nuxt 4** + **Vue 3** + **TypeScript**
- **Tailwind CSS v4** + **Nuxt UI**
- **GSAP** + **ScrollTrigger** for scoped, cleaned-up scroll animation
- **Lenis** for smooth scrolling, synced to the GSAP ticker
- **Three.js** for the interactive hero scene (mouse + scroll reactive, with a reduced-motion and no-WebGL fallback)
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

See `app/` for the application source: `components/` (organized by section), `composables/`, `animations/` (the GSAP architecture — core utilities, per-section presets, shared constants), `webgl/` (the Three.js hero scene), `data/` + `types/` (typed mock content), `stores/`, and `pages/` (`/` and `/blog`).

## Notes

- Fonts (Syne/Inter) are fetched at build time via `@nuxt/fonts` from Google Fonts. In network-restricted environments this fetch can fail; the type stack falls back to the system sans-serif defined in `assets/css/tokens.css` and the build still succeeds.
- Portfolio images use `picsum.photos` placeholders with unique IDs per the prototype content spec.
