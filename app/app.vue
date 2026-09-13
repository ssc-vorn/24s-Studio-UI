<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' }
})
</script>

<template>
  <UApp :toaster="{ position: 'bottom-right' }">
    <NuxtRouteAnnouncer />
    <Preloader />
    <NuxtLayout>
      <PageTransition />
    </NuxtLayout>
  </UApp>
</template>
