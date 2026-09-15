<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { projectService } from '~/services/projectService'
import { animateCinematicProject } from '~/animations/sections/portfolio'

const projects = projectService.getSelectedWork(5)
const heroProject = computed(() => projects[0])
const reelProjects = computed(() => projects.slice(1))

const VARIANTS = ['asymmetric', 'portrait', 'wide', 'full-bleed'] as const

const reduced = useReducedMotion()
const { capture } = useSharedProjectTransition()

const pinRoot = ref<HTMLElement | null>(null)
const stickyViewport = ref<HTMLElement | null>(null)
const imageWrap = ref<HTMLElement | null>(null)
const heroImgEl = ref<HTMLImageElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const metaEl = ref<HTMLElement | null>(null)

function onActivateHero() {
  if (reduced.value || !heroProject.value) return
  capture(heroProject.value.slug, heroImgEl.value)
}

/**
 * HOME / Selected Work — mount — the section heading (handled separately by
 * <SplitText>) aside, this owns only the project-01 cinematic pin sequence
 * (see animateCinematicProject) — projects 2-5 each carry their own
 * independent entrance via ImageReveal/SplitText inside SelectedWorkPanel,
 * deliberately not coordinated into this same timeline (no relative-offset
 * choreography needed between separate, already-distinct compositions).
 */
useScrollAnimation(({ gsap, reduced: isReduced }) => {
  if (!pinRoot.value || !imageWrap.value || !titleEl.value || !metaEl.value) return
  animateCinematicProject(gsap, { pinRoot: pinRoot.value, imageWrap: imageWrap.value, title: titleEl.value, meta: metaEl.value }, isReduced)
})
</script>

<template>
  <section id="work" class="bg-surface py-28 lg:py-40">
    <Container>
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="text-label text-accent mb-5 flex items-center gap-3">
            <span class="bg-accent h-px w-8" aria-hidden="true" />
            Work / 01
          </span>
          <SplitText as="h2" class="text-heading text-ink">Selected work.</SplitText>
          <p class="text-body-lg text-ink-muted mt-6 max-w-md">Recent projects, chosen for range.</p>
        </div>
        <AnimatedLink to="/work" class="shrink-0">View All Work</AnimatedLink>
      </div>
    </Container>

    <!-- Signature cinematic moment — project 01 only. Tall pinned runway
         (CSS sticky, not GSAP pin:true) so the image can scrub from a
         framed 82% scale up to fully filling its frame as the user scrolls,
         with title/metadata overlaying in behind it partway through. The
         frame's own padding never animates — only `scale` does — so this
         costs one transform, not a layout animation. -->
    <div v-if="heroProject" ref="pinRoot" class="relative mt-16 min-h-[220vh] lg:mt-24">
      <div ref="stickyViewport" class="sticky top-0 flex h-screen items-center overflow-hidden">
        <NuxtLink :to="`/work/${heroProject.slug}`" class="group relative block size-full p-6 sm:p-10 lg:p-16" data-cursor="view" @click="onActivateHero">
          <!-- Only the image lives inside the scaled wrapper — number/title/
               metadata/arrow are separate, unscaled siblings positioned over
               the same area, so they stay crisp and only fade/rise via their
               own tween instead of growing along with the image. -->
          <div ref="imageWrap" class="relative size-full overflow-hidden">
            <img
              ref="heroImgEl"
              :src="heroProject.coverImage"
              :alt="`${heroProject.title} — ${heroProject.client}`"
              loading="eager"
              class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            >
            <div class="from-black/80 via-black/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" aria-hidden="true" />
          </div>

          <span class="text-body-sm absolute top-12 left-12 font-sans text-white/60 sm:top-16 sm:left-16">01</span>

          <div class="absolute inset-x-6 bottom-6 flex flex-wrap items-end justify-between gap-6 sm:inset-x-10 sm:bottom-10">
            <div>
              <h3 ref="titleEl" class="text-display text-white">{{ heroProject.title }}</h3>
              <div ref="metaEl" class="text-body-sm mt-4 flex flex-wrap items-center gap-3 text-white/60">
                <span>{{ heroProject.category }}</span>
                <span aria-hidden="true">·</span>
                <span>{{ heroProject.year }}</span>
              </div>
            </div>
            <span class="bg-white text-black flex size-14 shrink-0 items-center justify-center transition-all duration-400 group-hover:bg-accent group-hover:text-white" aria-hidden="true">
              <ArrowUpRight class="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <Container class="mt-16 flex flex-col gap-24 lg:mt-24 lg:gap-32">
      <SelectedWorkPanel
        v-for="(project, i) in reelProjects"
        :key="project.id"
        :project="project"
        :index="i + 1"
        :variant="VARIANTS[i % VARIANTS.length]!"
      />
    </Container>
  </section>
</template>
