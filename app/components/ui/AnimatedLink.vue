<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

interface Props {
  to?: string
  href?: string
  showArrow?: boolean
}

withDefaults(defineProps<Props>(), { showArrow: true })
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'a'"
    :to="to"
    :href="href"
    data-cursor="explore"
    class="group relative inline-flex items-center gap-1.5 text-body font-medium text-ink"
  >
    <span class="relative">
      <slot />
      <span
        class="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-right group-hover:scale-x-0"
        aria-hidden="true"
      />
      <span
        class="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform delay-100 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100"
        aria-hidden="true"
      />
    </span>
    <ArrowUpRight
      v-if="showArrow"
      class="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    />
  </component>
</template>
