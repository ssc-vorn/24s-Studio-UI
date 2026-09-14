<script setup lang="ts">
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
      class="relative overflow-hidden rounded-3xl border transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="active ? 'bg-black text-white border-transparent' : 'bg-warm text-charcoal border-charcoal/10'"
    >
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-2/5 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="active ? 'opacity-100' : 'opacity-0'"
        style="background: linear-gradient(100deg, transparent 20%, rgb(255 255 255 / 0.12) 100%)"
        aria-hidden="true"
      />

      <div
        class="relative flex items-start justify-between gap-6 transition-[padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="active ? 'px-8 py-9 lg:px-12 lg:py-11' : 'px-8 py-6 lg:px-12 lg:py-7'"
      >
        <div class="min-w-0">
          <h3 class="text-heading">{{ service.title }}</h3>

          <div class="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" :style="{ gridTemplateRows: active ? '1fr' : '0fr' }">
            <div class="max-w-xl overflow-hidden">
              <p
                class="text-body-lg mt-4 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                :class="active ? 'text-white/75' : 'text-charcoal/60'"
              >
                {{ service.summary }}
              </p>

              <ul class="mt-6 flex flex-wrap gap-2">
                <li
                  v-for="capability in service.capabilities"
                  :key="capability"
                  class="text-label border px-3 py-1.5 transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  :class="active ? 'text-white/70 border-white/25' : 'text-charcoal/60 border-charcoal/20'"
                >
                  {{ capability }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <span
          class="text-body-sm shrink-0 pt-1 font-sans tabular-nums transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="active ? 'text-white/45' : 'text-charcoal/45'"
        >
          {{ service.index }}
        </span>
      </div>
    </div>
  </div>
</template>
