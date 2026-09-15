<script setup lang="ts">
// The official mark (`public/brand/logo.svg`) is a single flat-fill navy
// (#032268) shape — fine as a plain <img> on light surfaces, but unreadable
// on the black Hero / dark floating nav. Rather than redraw or recolor the
// source file, `inverse` renders the exact same silhouette through a CSS
// mask so it can be painted white on dark surfaces without touching the
// asset itself.
interface Props {
  inverse?: boolean
}

withDefaults(defineProps<Props>(), { inverse: false })
</script>

<template>
  <img v-if="!inverse" src="/brand/logo.svg" alt="24s Studio" class="h-6 w-auto">
  <span
    v-else
    class="mask-logo inline-block h-6 w-16 bg-white"
    role="img"
    aria-label="24s Studio"
  />
</template>

<style scoped>
.mask-logo {
  mask-image: url('/brand/logo.svg');
  mask-repeat: no-repeat;
  mask-position: left center;
  mask-size: contain;
  -webkit-mask-image: url('/brand/logo.svg');
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: left center;
  -webkit-mask-size: contain;
}
</style>
