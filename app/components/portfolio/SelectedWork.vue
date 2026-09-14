<script setup lang="ts">
import { projectService } from '~/services/projectService'

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
    const media = row.querySelector('[data-reveal="media"]')
    const meta = row.querySelector('[data-reveal="meta"]')

    if (reduced) {
      gsap.set([media, meta], { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' })
      return
    }

    // Media enters first — a clip-path wipe with a subtle zoom-settle —
    // then metadata follows a beat behind, the same sequence for every
    // project row so the interaction language stays consistent.
    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%' } })
    tl.fromTo(
      media,
      { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
      { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1, ease: 'power3.out' }
    ).fromTo(meta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
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

      <div class="mt-16 flex flex-col gap-16 lg:gap-24">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          data-project-row
          class="lg:w-[86%]"
          :class="index % 2 === 1 ? 'lg:ml-auto' : ''"
        >
          <ProjectPreview :project="project" :index="index" />
        </div>
      </div>
    </Container>
  </section>
</template>
