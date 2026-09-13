<script setup lang="ts">
import type { Component } from 'vue'
import type { Service } from '~/types/service'

interface Props {
  service: Service
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <article class="group h-full rounded-2xl border border-fog bg-white p-7 transition-colors duration-300 hover:border-primary-900/30 hover:shadow-[0_16px_40px_-24px_rgba(1,26,64,0.35)]">
    <div class="bg-primary-50 text-primary-900 group-hover:bg-primary-900 flex size-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white">
      <component :is="icon" class="size-5" aria-hidden="true" />
    </div>

    <h3 class="text-h4 text-ink mt-5">{{ service.title }}</h3>
    <p class="text-body-sm text-sand-600 mt-2">{{ service.description }}</p>

    <ul class="mt-5 flex flex-wrap gap-2">
      <li v-for="capability in service.capabilities" :key="capability" class="text-caption text-sand-600 rounded-full bg-mist px-2.5 py-1">
        {{ capability }}
      </li>
    </ul>
  </article>
</template>
