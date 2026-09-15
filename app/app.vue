<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '24s Studio',
        alternateName: 'Twenty Four S Studio',
        url: 'https://24s.studio',
        description:
          'A cinematic, art-directed digital creative studio working across graphic design, brand identity, video editing, digital marketing and advertising.',
        email: 'hello@24s.studio',
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
