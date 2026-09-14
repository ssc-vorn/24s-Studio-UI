<script setup lang="ts">
import type { Service } from '~/types/service'

interface Props {
  service: Service
  active: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    data-story-stage
    class="relative overflow-hidden rounded-3xl border transition-colors duration-700 ease-out"
    :class="active ? 'bg-surface-inverse text-ink-inverse border-transparent' : 'bg-surface-elevated text-ink border-border-subtle'"
  >
    <div
      v-if="active"
      class="pointer-events-none absolute inset-y-0 right-0 w-2/5"
      style="background: linear-gradient(100deg, transparent 20%, rgb(255 255 255 / 0.12) 100%)"
      aria-hidden="true"
    />

    <div class="relative flex items-start justify-between gap-6 px-8 py-8 lg:px-12 lg:py-10">
      <h3 class="text-heading">{{ service.title }}</h3>
      <span
        class="text-body-sm shrink-0 pt-1 font-sans tabular-nums transition-colors duration-500"
        :class="active ? 'text-ink-inverse/45' : 'text-ink-muted'"
      >
        {{ service.index }}
      </span>
    </div>

    <div class="relative grid transition-[grid-template-rows] duration-700 ease-out" :style="{ gridTemplateRows: active ? '1fr' : '0fr' }">
      <div class="overflow-hidden">
        <div class="max-w-xl px-8 pb-10 lg:px-12 lg:pb-12">
          <p class="text-body-lg" :class="active ? 'text-ink-inverse/75' : 'text-ink-muted'">
            {{ service.summary }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
