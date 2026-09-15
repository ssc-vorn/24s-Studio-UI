<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' }
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
