<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Service } from '~/types/service'

interface Props {
  service: Service
}

defineProps<Props>()
</script>

<template>
  <div data-service-row class="border-border-subtle group relative border-r border-b p-8 lg:p-12">
    <div class="flex items-start justify-between gap-6">
      <span class="text-body-sm text-ink-muted font-sans">{{ service.index }}</span>
      <ArrowUpRight
        class="text-ink-muted size-5 shrink-0 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </div>

    <h3 class="text-display text-ink mt-8">{{ service.title }}</h3>
    <p class="text-body-lg text-ink-muted mt-6 max-w-md">{{ service.summary }}</p>

    <ul class="mt-8 flex flex-wrap gap-2">
      <li
        v-for="capability in service.capabilities"
        :key="capability"
        class="text-label text-ink-muted border-border-subtle border px-3 py-1.5"
      >
        {{ capability }}
      </li>
    </ul>
  </div>
</template>
