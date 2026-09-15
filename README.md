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

- Fonts (Zen Dots/Inter) are fetched at build time via `@nuxt/fonts` from Google Fonts. Zen Dots is the brand-signature display face (`--font-serif` in `assets/css/tokens.css`, despite the name — see that token's comment) used only for headlines, section titles, large numbers and brand statements, never for body copy. In network-restricted environments the font-metadata fetch can fail; the stack falls back to the system fallbacks defined alongside each token and the build still succeeds.
- Portfolio and service images use `picsum.photos` placeholders with unique IDs — swap for real brand/campaign photography before shipping.
- `BrandLogo.vue` renders the real mark at `public/brand/logo.svg` (a single flat-fill navy SVG) via a plain `<img>` on light surfaces and a CSS mask on dark ones.
- `data/studio.ts`'s `studioStats` deliberately avoids claiming a business history (years in business, client count, project count) that doesn't exist yet — every value there is either literally true today or a values statement. Replace with real figures once they exist, not before.
- A Three.js WebGL layer is a natural next step for the Hero (an abstract geometric scene reacting to mouse/scroll, lazy-loaded with a no-WebGL/reduced-motion fallback) but isn't implemented yet — the current Hero relies on GSAP-driven image parallax instead.
