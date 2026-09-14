<script setup lang="ts">
import { projectService } from '~/services/projectService'
import { animateCardReveal } from '~/animations/sections/portfolio'

const projects = projectService.getSelectedWork(4)

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const rows = Array.from(root.querySelectorAll('[data-project-row]'))

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

      <!-- Editorial bento grid — every project visible at once as a single
           curated composition, rather than a long cinematic scroll: one
           large hero tile beside three smaller supporting tiles. -->
      <div class="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        <div v-if="projects[0]" data-project-row class="lg:col-span-7">
          <SelectedWorkPanel :project="projects[0]" :index="0" size="large" />
        </div>

        <div class="flex flex-col gap-4 lg:col-span-5 lg:gap-6">
          <div v-for="(project, index) in projects.slice(1)" :key="project.id" data-project-row>
            <SelectedWorkPanel :project="project" :index="index + 1" size="small" />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
