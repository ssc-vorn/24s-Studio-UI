<script setup lang="ts">
import type { Project } from '~/types/project'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const { requestDestination } = useSharedProjectTransition()
const heroImgEl = ref<HTMLImageElement | null>(null)

/**
 * Resolves the shared-element Work → Case Study transition (see
 * useSharedProjectTransition / ProjectMediaTransitionLayer): if the
 * visitor arrived by clicking this exact project's preview image, the
 * transition layer animates from that image's captured position into
 * this hero's position, then reveals this real image underneath. If
 * they arrived any other way (direct link, back/forward, a different
 * project was captured), this is a no-op — the layer was never shown.
 * getBoundingClientRect() is layout-accurate here even before the image
 * itself has loaded, since this section's height comes from `min-h-
 * [85vh]`, not from the image's natural size.
 */
onMounted(() => {
  requestDestination(props.project.slug, heroImgEl.value)
})
</script>

<template>
  <section class="relative flex min-h-[85vh] flex-col justify-end overflow-hidden bg-black pb-16 lg:pb-24">
    <img ref="heroImgEl" :src="project.coverImage" :alt="`${project.title} — ${project.client}`" class="absolute inset-0 size-full object-cover opacity-70">
    <div class="from-black/95 via-black/50 absolute inset-0 bg-gradient-to-t to-black/20" aria-hidden="true" />

    <Container class="relative z-10 pt-32">
      <div class="text-body-sm mb-6 flex flex-wrap items-center gap-3 text-white/60">
        <NuxtLink to="/work" class="hover:text-white">Work</NuxtLink>
        <span aria-hidden="true">/</span>
        <span>{{ project.client }}</span>
      </div>
      <h1 class="text-display-xl max-w-4xl text-white">{{ project.title }}</h1>

      <dl class="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8">
        <div>
          <dt class="text-label text-white/40">Client</dt>
          <dd class="text-body mt-2 text-white">{{ project.client }}</dd>
        </div>
        <div>
          <dt class="text-label text-white/40">Year</dt>
          <dd class="text-body mt-2 text-white">{{ project.year }}</dd>
        </div>
        <div>
          <dt class="text-label text-white/40">Services</dt>
          <dd class="text-body mt-2 text-white">{{ project.services.join(', ') }}</dd>
        </div>
      </dl>
    </Container>
  </section>
</template>
