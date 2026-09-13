<script setup lang="ts">
import { ArrowUpRight, Plus } from 'lucide-vue-next'
import type { Service } from '~/types/service'

interface Props {
  service: Service
  active: boolean
}

defineProps<Props>()
const emit = defineEmits<{ hover: [] }>()

const expanded = ref(false)
</script>

<template>
  <div class="border-border-subtle group border-t last:border-b" @mouseenter="emit('hover')">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-6 py-7 text-left lg:cursor-default lg:py-9"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <div class="flex items-baseline gap-6">
        <span class="text-body-sm font-sans transition-colors duration-300" :class="active ? 'text-accent' : 'text-ink-muted'">
          {{ service.index }}
        </span>
        <span class="text-heading text-ink transition-colors duration-300" :class="{ 'text-accent': active }">
          {{ service.title }}
        </span>
      </div>

      <span class="text-body-sm text-ink-muted hidden max-w-xs text-right lg:block">{{ service.capabilities.join(' / ') }}</span>

      <ArrowUpRight
        class="hidden size-6 shrink-0 transition-all duration-300 lg:block"
        :class="active ? 'text-accent -translate-y-1 translate-x-1' : 'text-ink-muted'"
        aria-hidden="true"
      />
      <Plus class="text-ink-muted size-5 shrink-0 transition-transform duration-300 lg:hidden" :class="{ 'rotate-45': expanded }" aria-hidden="true" />
    </button>

    <div class="grid transition-[grid-template-rows] duration-300 lg:hidden" :style="{ gridTemplateRows: expanded ? '1fr' : '0fr' }">
      <div class="overflow-hidden">
        <p class="text-body-sm text-ink-muted pb-6">{{ service.summary }}</p>
      </div>
    </div>
  </div>
</template>
