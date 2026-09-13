<script setup lang="ts">
interface Props {
  inverse?: boolean
}

withDefaults(defineProps<Props>(), { inverse: false })
</script>

<template>
  <div class="flex flex-col items-center gap-3" :class="inverse ? 'text-white/60' : 'text-ink/50'" aria-hidden="true">
    <span class="text-ui tracking-[0.2em] uppercase [writing-mode:vertical-rl]">Scroll</span>
    <span class="relative h-16 w-px overflow-hidden" :class="inverse ? 'bg-white/20' : 'bg-ink/15'">
      <span class="bg-accent absolute inset-x-0 top-0 h-1/2 animate-[scroll-indicator_2s_ease-in-out_infinite]" />
    </span>
  </div>
</template>

<style scoped>
@keyframes scroll-indicator {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-\[scroll-indicator_2s_ease-in-out_infinite\] {
    animation: none;
  }
}
</style>
