<script setup lang="ts">
interface Props {
  categories: string[]
  active: string
}

defineProps<Props>()
const emit = defineEmits<{ change: [string] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter portfolio by category">
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      role="tab"
      :aria-selected="active === category"
      class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
      :class="active === category ? 'bg-primary-900 text-white' : 'bg-black/5 text-ink/60 hover:bg-black/10 hover:text-ink'"
      @click="emit('change', category)"
    >
      {{ category }}
    </button>
  </div>
</template>
