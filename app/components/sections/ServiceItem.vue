<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Service } from '~/types/service'

interface Props {
  service: Service
  /** Sets the sticky offset so each card pins slightly lower than the one before it, letting a sliver of the earlier cards peek out above the current one as they stack. */
  index: number
  /** The card currently at the front of the stack — title always shows, but the detail (summary + capabilities) only unfolds while a card holds this position; scrolling past it collapses the detail back to a title-only tab as the next card takes over. */
  active: boolean
}

defineProps<Props>()
</script>

<template>
  <div data-story-stage class="sticky" :style="{ top: `calc(var(--nav-height) + ${index * 1}rem)` }">
    <div
      class="border-border-subtle bg-surface-elevated relative overflow-hidden rounded-3xl border shadow-2xl shadow-black/30 transition-[padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="active ? 'px-8 py-10 lg:px-12 lg:py-14' : 'px-8 py-6 lg:px-12 lg:py-7'"
    >
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
        <!-- Masthead column — index and title stay put while the detail column beside it does the expanding, an editorial split rather than a top-to-bottom stack. -->
        <div class="flex items-center justify-between gap-4 lg:block">
          <span class="text-body-sm text-ink-muted font-sans tabular-nums">{{ service.index }}</span>
          <h3 class="text-subheading text-ink mt-0 lg:mt-3">
            {{ service.title }}
          </h3>
        </div>

        <div class="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" :style="{ gridTemplateRows: active ? '1fr' : '0fr' }">
          <div class="overflow-hidden">
            <div class="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p class="text-body-lg text-ink-muted max-w-lg">{{ service.summary }}</p>
              <ArrowUpRight class="text-accent hidden size-8 shrink-0 lg:block" aria-hidden="true" />
            </div>

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
  </div>
</template>
