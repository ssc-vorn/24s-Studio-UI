<script setup lang="ts">
// TODO(brand): swap this text lockup for the official 24 Twenty Four Studio
// logo asset once it's added to the repo (e.g. `public/brand/logo.svg`),
// rendered as a plain <img :src="..." alt="24 Twenty Four Studio"> at the
// same size. This text
// lockup is a deliberate stand-in, not a redrawn version of the mark — the
// original asset was supplied as a pasted image this session had no way to
// save to disk, so it could not be embedded pixel-for-pixel.
interface Props {
  inverse?: boolean
}

withDefaults(defineProps<Props>(), { inverse: false })
</script>

<template>
  <span class="inline-flex items-baseline gap-1.5 leading-none" :class="inverse ? 'text-white' : 'text-ink'">
    <span class="text-sm font-semibold tracking-[0.02em]">24</span>
    <span class="text-sm font-semibold tracking-[0.02em]">Twenty Four</span>
    <span class="font-serif text-sm font-normal tracking-[0.02em] italic opacity-70">Studio</span>
  </span>
</template>
