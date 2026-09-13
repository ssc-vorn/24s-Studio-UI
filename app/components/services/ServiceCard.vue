<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { Service } from '~/types/service'

interface Props {
  service: Service
}

defineProps<Props>()
</script>

<template>
  <article class="group border-b border-fog py-8 transition-colors duration-500 lg:py-10">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
      <span class="text-body-sm text-sand-400 font-medium transition-colors duration-500 group-hover:text-primary-900 lg:w-16">
        {{ service.index }}
      </span>

      <h3 class="text-h3 text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:w-[26rem] lg:shrink-0 lg:group-hover:translate-x-3">
        {{ service.title }}
      </h3>

      <div class="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p class="text-body text-sand-600 max-w-md">
          {{ service.description }}
        </p>

        <ul class="flex flex-wrap gap-x-4 gap-y-2 lg:justify-end">
          <li v-for="capability in service.capabilities" :key="capability" class="text-caption text-sand-600 border border-fog px-3 py-1">
            {{ capability }}
          </li>
        </ul>
      </div>

      <ArrowRight class="hidden size-6 shrink-0 text-primary-900 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 lg:block" aria-hidden="true" />
    </div>
  </article>
</template>
