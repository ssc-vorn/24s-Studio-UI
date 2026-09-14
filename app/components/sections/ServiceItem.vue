<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Service } from '~/types/service'

interface Props {
  service: Service
  /** Layered scroll narrative, stage two: the card itself (with its title) is already in view — this flips once the user scrolls far enough for its detail to unfold. */
  revealed: boolean
}

defineProps<Props>()
</script>

<template>
  <div data-service-row class="border-border-subtle group relative border-r border-b p-8 lg:p-12">
    <div class="flex items-start justify-between gap-6">
      <span class="text-body-sm font-sans transition-colors duration-300" :class="revealed ? 'text-accent' : 'text-ink-muted'">
        {{ service.index }}
      </span>
      <ArrowUpRight
        class="text-ink-muted size-5 shrink-0 transition-all duration-500"
        :class="revealed ? 'text-accent opacity-100' : 'opacity-0'"
        aria-hidden="true"
      />
    </div>

    <h3 class="text-display text-ink mt-8">{{ service.title }}</h3>

    <div class="grid transition-[grid-template-rows] duration-700 ease-out" :style="{ gridTemplateRows: revealed ? '1fr' : '0fr' }">
      <div class="overflow-hidden">
        <div class="pt-6">
          <p class="text-body-lg text-ink-muted max-w-md">{{ service.summary }}</p>
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
      </div>
    </div>
  </div>
</template>
