<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Service } from '~/types/service'

interface Props {
  service: Service
  active: boolean
  isLast: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ activate: [] }>()

const meta = computed(() => props.service.capabilities.slice(0, 3).join(' / '))

const separatorEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const metaEl = ref<HTMLElement | null>(null)

defineExpose({ separatorEl, titleEl, metaEl })
</script>

<template>
  <NuxtLink
    :to="`/services/${service.slug}`"
    class="group block w-full py-8 text-left lg:py-10"
    data-cursor="explore"
    @mouseenter="emit('activate')"
    @focus="emit('activate')"
  >
    <span ref="separatorEl" class="bg-border-subtle block h-px w-full origin-left" aria-hidden="true" />

    <span class="mt-8 flex items-start justify-between gap-6 transition-opacity duration-500 lg:mt-10" :class="active ? 'opacity-100' : 'opacity-45 lg:opacity-50 group-hover:opacity-75'">
      <span class="flex items-baseline gap-5 lg:gap-8">
        <span class="text-body-sm text-ink-muted font-sans tabular-nums">{{ service.index }}</span>
        <span class="flex flex-col gap-3">
          <span ref="titleEl" class="text-service-title text-ink block" :class="active ? 'text-accent' : ''">{{ service.title }}</span>
          <span ref="metaEl" class="text-body-sm text-ink-muted block">{{ meta }}</span>

          <!-- Mobile-only expand: no side image panel on mobile, so the
               summary + a small image live inline instead, revealed via a
               pure-CSS grid-rows transition — no JS height measurement, and
               scoped to mobile only, so it never competes with the desktop
               media-panel crossfade or the one documented JS height
               exception (ServiceItem's old scrub, which this section no
               longer has at all). -->
          <span
            class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out lg:hidden"
            :class="active ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'"
          >
            <span class="block min-h-0">
              <span class="text-body text-ink-muted block max-w-sm pb-2">{{ service.summary }}</span>
              <span class="relative block aspect-4/3 w-full max-w-xs overflow-hidden">
                <img :src="service.image" :alt="`${service.title} — representative work`" loading="lazy" class="size-full object-cover">
              </span>
            </span>
          </span>
        </span>
      </span>

      <ArrowUpRight
        class="size-6 shrink-0 transition-transform duration-300"
        :class="active ? 'text-accent translate-x-1 -translate-y-1' : 'text-ink-muted'"
        aria-hidden="true"
      />
    </span>

    <span v-if="isLast" class="bg-border-subtle mt-8 block h-px w-full lg:mt-10" aria-hidden="true" />
  </NuxtLink>
</template>
