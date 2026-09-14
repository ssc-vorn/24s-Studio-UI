<script setup lang="ts">
import type { Service } from '~/types/service'

interface Props {
  service: Service
  active: boolean
}

defineProps<Props>()
</script>

<template>
  <div data-story-stage class="border-border-subtle border-t py-10 first:border-t-0 last:border-b lg:py-12">
    <span class="text-body-sm font-sans transition-colors duration-300" :class="active ? 'text-accent' : 'text-ink-muted'">
      {{ service.index }}
    </span>
    <h3
      data-service-title
      class="text-display text-ink mt-3 transition-colors duration-500 will-change-transform"
      :class="{ 'text-ink-muted': !active }"
    >
      {{ service.title }}
    </h3>
    <p class="text-body-lg text-ink mt-6 max-w-lg">{{ service.summary }}</p>
    <p class="text-body text-ink-muted mt-4 max-w-lg">{{ service.capabilities.join(' · ') }}</p>
  </div>
</template>
