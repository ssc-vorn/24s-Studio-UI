<script setup lang="ts">
<<<<<<< HEAD
// The official mark (`public/brand/logo.svg`) is a single flat-fill navy
// (#032268) shape — fine as a plain <img> on light surfaces, but unreadable
// on the black Hero / dark floating nav. Rather than redraw or recolor the
// source file, `inverse` renders the exact same silhouette through a CSS
// mask so it can be painted white on dark surfaces without touching the
// asset itself.
=======
// Geometric wordmark stand-in for the studio's mark: a solid accent block
// carrying the "24" numerals (the brand's core geometric motif — see the
// design system tokens in assets/css/tokens.css) with a lowercase "s"
// clipped into its corner, paired with a tracked-out STUDIO lockup. Swap
// the <svg> below for the official asset (e.g. `public/brand/logo.svg`)
// if one is ever supplied as a file rather than a pasted image.
>>>>>>> 2b5263f8b05202dc6abcd9040f4527dde46fbbe0
interface Props {
  inverse?: boolean
}

withDefaults(defineProps<Props>(), { inverse: false })
</script>

<template>
<<<<<<< HEAD
  <img v-if="!inverse" src="/brand/logo.svg" alt="24 Twenty Four Studio" class="h-6 w-auto">
  <span
    v-else
    class="mask-logo inline-block h-6 w-16 bg-white"
    role="img"
    aria-label="24 Twenty Four Studio"
  />
=======
  <span class="group inline-flex items-center gap-2.5 leading-none" :class="inverse ? 'text-white' : 'text-ink'">
    <span
      class="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[3px]"
      :class="inverse ? 'bg-white text-black' : 'bg-ink text-surface'"
      aria-hidden="true"
    >
      <span class="text-[0.95rem] font-semibold tracking-[-0.06em]">24</span>
      <span
        class="absolute right-0 bottom-0 flex size-3 items-center justify-center rounded-tl-[3px] text-[0.55rem] font-semibold"
        :class="inverse ? 'bg-black text-white' : 'bg-accent text-white'"
      >s</span>
    </span>
    <span class="text-ui tracking-[0.22em] uppercase">Studio</span>
  </span>
>>>>>>> 2b5263f8b05202dc6abcd9040f4527dde46fbbe0
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
