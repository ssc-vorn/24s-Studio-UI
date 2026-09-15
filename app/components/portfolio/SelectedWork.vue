<script setup lang="ts">
import { projectService } from '~/services/projectService'
import { animateCardReveal } from '~/animations/sections/portfolio'

const projects = projectService.getSelectedWork(5)

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const rows = Array.from(root.querySelectorAll('[data-project-row]'))
  const heroMedia = rows[0]?.querySelector('[data-reveal="media-el"]')

  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
    )
  }

  rows.forEach((row) => {
    if (reduced) {
      const targets = row.querySelectorAll('[data-reveal="media"], [data-reveal="meta-title"], [data-reveal="meta-detail"]')
      gsap.set(targets, { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' })
      return
    }
    animateCardReveal(gsap, row, 'top 85%')
  })

  // Extra cinematic weight on just the hero tile — a slow continuous drift
  // for as long as it's in view, independent of its own entrance tween
  // (different element: the media-el wrapper, not the clip-path media div
  // animateCardReveal already owns) and of the image's own CSS hover-scale
  // (a third, innermost element) — three separate elements sharing one
  // visual stack so none of their transforms fight each other.
  if (!reduced && heroMedia) {
    gsap.fromTo(
      heroMedia,
      { yPercent: -5, scale: 1.15 },
      { yPercent: 5, scale: 1.15, ease: 'none', scrollTrigger: { trigger: rows[0], start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
    )
  }
})
</script>

<template>
  <section id="work" ref="root" class="bg-surface py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="text-label text-accent mb-5 flex items-center gap-3">
            <span class="bg-accent h-px w-8" aria-hidden="true" />
            Selected Work
          </span>
          <h2 class="text-heading text-ink">Recent projects, chosen for range.</h2>
        </div>
        <AnimatedLink to="/work" class="shrink-0">View All Work</AnimatedLink>
      </div>

      <!-- Editorial composition — every project visible at once rather than
           a long cinematic scroll: one wide hero banner leading the eye in,
           then the supporting work laid out as an even row beneath it. -->
      <div class="mt-16 flex flex-col gap-4 lg:gap-6">
        <div v-if="projects[0]" data-project-row>
          <SelectedWorkPanel :project="projects[0]" :index="0" size="large" />
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div v-for="(project, index) in projects.slice(1)" :key="project.id" data-project-row>
            <SelectedWorkPanel :project="project" :index="index + 1" size="small" />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
