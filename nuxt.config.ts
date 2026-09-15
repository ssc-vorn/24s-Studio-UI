// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/sitemap'],

  components: [{ path: '~/components', pathPrefix: false }],

  site: {
    url: 'https://24s.studio'
  },

  sitemap: {
    urls: async () => {
      const { projects } = await import('./app/data/projects')
      const { articles } = await import('./app/data/articles')
      return [
        ...projects.map((project) => ({ loc: `/work/${project.slug}` })),
        ...articles.map((article) => ({ loc: `/insights/${article.slug}` }))
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: '24s Studio — Digital Creative Studio',
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
      { name: 'Zen Dots', provider: 'google', weights: [400] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700], styles: ['normal', 'italic'] }
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
