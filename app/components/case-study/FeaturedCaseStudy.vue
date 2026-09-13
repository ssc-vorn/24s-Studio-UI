<script setup lang="ts">
import { projectService } from '~/services/projectService'

const project = projectService.getFeaturedCaseStudy()

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const image = root.querySelector('[data-reveal="image"]')
  const content = root.querySelector('[data-reveal="content"]')

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 72%' } })

  if (reduced) {
    tl.set([image, content], { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  tl.fromTo(image, { clipPath: 'inset(0 0 100% 0)', scale: 1.06 }, { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.1, ease: 'power3.out' }).fromTo(
    content,
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.7'
  )
})
</script>

<template>
  <section v-if="project" ref="root" class="bg-charcoal py-28 lg:py-40">
    <Container>
      <span class="text-label text-accent mb-10 flex items-center gap-3">
        <span class="bg-accent h-px w-8" aria-hidden="true" />
        Featured Case Study
      </span>

      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="image" class="overflow-hidden lg:col-span-7">
          <img :src="project.coverImage" :alt="`${project.title} — ${project.client}`" loading="lazy" class="aspect-4/5 size-full object-cover lg:aspect-auto">
        </div>

        <div data-reveal="content" class="flex flex-col justify-center lg:col-span-5">
          <div class="text-body-sm text-white/50 flex flex-wrap items-center gap-3">
            <span>{{ project.client }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ project.year }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ project.services.join(', ') }}</span>
          </div>

          <h2 class="text-heading mt-5 text-white">{{ project.title }}</h2>
          <p class="text-body-lg mt-6 text-white/70">{{ project.excerpt }}</p>

          <dl class="mt-8 flex flex-col gap-5 border-t border-white/10 pt-8">
            <div>
              <dt class="text-label text-white/40">Challenge</dt>
              <dd class="text-body text-white/70 mt-2">{{ project.challenge }}</dd>
            </div>
            <div>
              <dt class="text-label text-white/40">Result</dt>
              <dd class="text-body text-white/70 mt-2">{{ project.result }}</dd>
            </div>
          </dl>

          <div class="mt-10">
            <MagneticButton as="NuxtLink" :href="`/work/${project.slug}`" class="bg-white! text-black! hover:bg-accent! hover:text-white!">
              View Case Study
            </MagneticButton>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
