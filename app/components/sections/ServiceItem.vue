<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Service } from '~/types/service'

interface Props {
  service: Service
  active: boolean
}

defineProps<Props>()
const emit = defineEmits<{ hover: [] }>()
</script>

<template>
  <div class="border-border-subtle group border-t last:border-b" @mouseenter="emit('hover')">
    <button type="button" class="block w-full py-7 text-left lg:py-9" :aria-expanded="active" @click="emit('hover')">
      <div class="flex items-start justify-between gap-6">
        <div class="min-w-0">
          <span class="text-body-sm font-sans transition-colors duration-300" :class="active ? 'text-accent' : 'text-ink-muted'">
            {{ service.index }}
          </span>
          <h3
            class="text-ink mt-2 font-serif leading-[0.95] font-light transition-[font-size,color] duration-500 ease-out"
            :class="active ? 'text-[2rem] sm:text-[2.75rem] lg:text-[4.25rem]' : 'text-ink-muted text-[1.375rem] sm:text-[1.75rem] lg:text-[2.25rem]'"
          >
            {{ service.title }}
          </h3>
        </div>

        <ArrowUpRight
          class="mt-1 size-6 shrink-0 transition-all duration-300 lg:mt-2"
          :class="active ? 'text-accent translate-x-1 -translate-y-1 opacity-100' : 'text-ink-muted opacity-0'"
          aria-hidden="true"
        />
      </div>

      <div class="grid transition-[grid-template-rows] duration-500 ease-out" :style="{ gridTemplateRows: active ? '1fr' : '0fr' }">
        <div class="overflow-hidden">
          <div class="max-w-2xl pt-6">
            <p class="text-body-lg text-ink-muted">{{ service.summary }}</p>
            <p class="text-body-sm text-ink-muted/70 mt-4">{{ service.capabilities.join(' · ') }}</p>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>
