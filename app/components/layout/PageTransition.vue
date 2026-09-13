<script setup lang="ts">
const { onLeave, onEnter } = usePageTransition()
</script>

<template>
  <NuxtPage :transition="{ mode: 'out-in', css: false, onLeave, onEnter }" />
</template>
