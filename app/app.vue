<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' }
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <Preloader />
    <NuxtLayout>
      <PageTransition />
    </NuxtLayout>
  </UApp>
</template>
