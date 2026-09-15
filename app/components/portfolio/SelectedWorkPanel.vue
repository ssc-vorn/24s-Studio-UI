<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'

interface Props {
  project: Project
  index: number
  /** Editorial rhythm across the reel — each of the four non-hero projects gets a distinct composition rather than repeating the same card. */
  variant: 'asymmetric' | 'portrait' | 'wide' | 'full-bleed'
}

const props = defineProps<Props>()

const reduced = useReducedMotion()
const { capture } = useSharedProjectTransition()
const imageReveal = ref<{ imgEl: HTMLImageElement | null } | null>(null)

function onActivate() {
  if (reduced.value) return
  capture(props.project.slug, imageReveal.value?.imgEl ?? null)
}

const indexLabel = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <NuxtLink :to="`/work/${project.slug}`" class="group block" data-cursor="view" @click="onActivate">
    <!-- Asymmetric — image and info sit side by side, alternating which side the info panel falls on so consecutive projects don't repeat the same silhouette. -->
    <div v-if="variant === 'asymmetric'" class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-7" :class="index % 2 === 1 ? 'lg:order-2' : ''">
        <ImageReveal :ref="(el) => (imageReveal = el as unknown as { imgEl: HTMLImageElement | null } | null)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" class="aspect-4/5 sm:aspect-3/2" img-class="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" parallax :parallax-distance="5" />
      </div>
      <div class="lg:col-span-5" :class="index % 2 === 1 ? 'lg:order-1' : ''">
        <span class="text-body-sm text-ink-muted font-sans tabular-nums">{{ indexLabel }}</span>
        <SplitText as="h3" class="text-heading text-ink mt-4">{{ project.title }}</SplitText>
        <div class="text-body-sm text-ink-muted mt-4 flex flex-wrap items-center gap-3">
          <span>{{ project.category }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ project.year }}</span>
        </div>
        <span class="text-ui text-ink group-hover:text-accent mt-6 inline-flex items-center gap-2 transition-colors">
          Explore Project
          <ArrowUpRight class="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </div>

    <!-- Portrait-led — narrow, centered, generous whitespace; title settles underneath rather than overlaying the image. -->
    <div v-else-if="variant === 'portrait'" class="mx-auto flex max-w-md flex-col items-center text-center">
      <ImageReveal :ref="(el) => (imageReveal = el as unknown as { imgEl: HTMLImageElement | null } | null)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" class="aspect-3/4 w-full" img-class="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
      <span class="text-body-sm text-ink-muted mt-8 font-sans tabular-nums">{{ indexLabel }}</span>
      <SplitText as="h3" class="text-heading text-ink mt-3">{{ project.title }}</SplitText>
      <div class="text-body-sm text-ink-muted mt-4 flex flex-wrap items-center justify-center gap-3">
        <span>{{ project.category }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ project.year }}</span>
      </div>
    </div>

    <!-- Wide cinematic — full-width ultra-wide banner, title overlaid like a poster. -->
    <div v-else-if="variant === 'wide'" class="relative overflow-hidden">
      <ImageReveal :ref="(el) => (imageReveal = el as unknown as { imgEl: HTMLImageElement | null } | null)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" class="aspect-21/9" img-class="opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" parallax :parallax-distance="4" />
      <div class="from-black/90 via-black/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" aria-hidden="true" />
      <div class="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-10">
        <div>
          <span class="text-body-sm font-sans text-white/50">{{ indexLabel }}</span>
          <SplitText as="h3" class="text-heading mt-2 text-white">{{ project.title }}</SplitText>
          <div class="text-body-sm mt-3 flex flex-wrap items-center gap-3 text-white/60">
            <span>{{ project.category }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ project.year }}</span>
          </div>
        </div>
        <span class="bg-white text-black flex size-12 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white" aria-hidden="true">
          <ArrowUpRight class="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>

    <!-- Full-bleed — the largest of the four, number top-right for rhythm against the wide variant's top-left placement. -->
    <div v-else class="relative overflow-hidden">
      <ImageReveal :ref="(el) => (imageReveal = el as unknown as { imgEl: HTMLImageElement | null } | null)" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" class="aspect-16/10" img-class="opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" parallax :parallax-distance="6" />
      <div class="from-black/90 via-black/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" aria-hidden="true" />
      <span class="text-body-sm absolute top-6 right-6 font-sans text-white/50 sm:top-8 sm:right-8">{{ indexLabel }}</span>
      <div class="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-10">
        <div>
          <SplitText as="h3" class="text-heading text-white">{{ project.title }}</SplitText>
          <div class="text-body-sm mt-3 flex flex-wrap items-center gap-3 text-white/60">
            <span>{{ project.category }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ project.year }}</span>
          </div>
        </div>
        <span class="bg-white text-black flex size-12 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white" aria-hidden="true">
          <ArrowUpRight class="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
