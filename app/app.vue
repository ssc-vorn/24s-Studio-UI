<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '24 Twenty Four Studio',
        alternateName: '24s Studio',
        url: 'https://24twentyfour.studio',
        description:
          'A cinematic, art-directed creative studio building brands, digital experiences and visual stories — Cambodia × Global.',
        email: 'hello@24twentyfour.studio',
        address: { '@type': 'PostalAddress', addressLocality: 'Phnom Penh', addressCountry: 'KH' },
        sameAs: ['https://instagram.com', 'https://behance.net', 'https://linkedin.com']
      })
    }
  ]
})

// Vite/Nuxt replace `import.meta.dev` at build time and strip the dead
// `false` branch, so MotionDebugPanel and this check never reach a
// production bundle.
const isDev = import.meta.dev
</script>

<template>
  <UApp :toaster="{ position: 'bottom-right' }">
    <NuxtRouteAnnouncer />
    <Preloader />
    <NuxtLayout>
      <PageTransition />
    </NuxtLayout>
    <ProjectMediaTransitionLayer />
    <CustomCursor />
    <MotionDebugPanel v-if="isDev" />
  </UApp>
</template>
