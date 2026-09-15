<script setup lang="ts">
// Geometric wordmark stand-in for the studio's mark: a solid accent block
// carrying the "24" numerals (the brand's core geometric motif — see the
// design system tokens in assets/css/tokens.css) with a lowercase "s"
// clipped into its corner, paired with a tracked-out STUDIO lockup. Swap
// the <svg> below for the official asset (e.g. `public/brand/logo.svg`)
// if one is ever supplied as a file rather than a pasted image.
interface Props {
  inverse?: boolean
}

withDefaults(defineProps<Props>(), { inverse: false })
</script>

<template>
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
</template>
