<script setup lang="ts">
interface Props {
  categories: string[]
  active: string
}

defineProps<Props>()
const emit = defineEmits<{ change: [string] }>()
</script>

<template>
  <div class="flex flex-wrap gap-x-8 gap-y-3" role="tablist" aria-label="Filter portfolio by category">
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      role="tab"
      :aria-selected="active === category"
      class="text-label relative pb-1 transition-colors"
      :class="active === category ? 'text-ink' : 'text-ink/40 hover:text-ink/70'"
      @click="emit('change', category)"
    >
      {{ category }}
      <span
        class="absolute inset-x-0 -bottom-0.5 h-px bg-primary-900 transition-transform duration-300 ease-out"
        :class="active === category ? 'scale-x-100' : 'scale-x-0'"
        aria-hidden="true"
      />
    </button>
  </div>
</template>
