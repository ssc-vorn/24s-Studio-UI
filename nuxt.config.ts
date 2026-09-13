// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt'],

  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: '24 Seven Studio — Creative Studio, Cambodia × Worldwide',
      titleTemplate: '%s',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ],
      meta: [{ name: 'theme-color', content: '#032268' }]
    }
  },

  fonts: {
    families: [
      { name: 'Fraunces', provider: 'google', weights: [400, 500, 600] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'lenis']
    }
  }
})
