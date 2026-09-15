<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'
import { serviceRepository } from '~/repositories/serviceRepository'
import { projectRepository } from '~/repositories/projectRepository'
import { testimonialService } from '~/services/testimonialService'
import type { ProjectCategory } from '~/types/project'

useSeoMeta({
  title: 'Services — 24 Twenty Four Studio',
  description: 'Digital product design, web design & development, digital marketing and brand identity — full-service creative work from strategy through execution.',
  ogTitle: 'Services — 24 Twenty Four Studio',
  ogDescription: 'Digital product design, web design & development, digital marketing and brand identity — full-service creative work from strategy through execution.',
  ogImage: 'https://picsum.photos/1200/630?random=4',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24twentyfour.studio/services' }]
})

const serviceList = serviceRepository.list()

const categoryByService: Record<string, ProjectCategory> = {
  'digital-product-design': 'Digital',
  'web-design-development': 'Digital',
  'digital-marketing-advertising': 'Marketing',
  'brand-identity': 'Branding',
  'web-design-development-2': 'Digital'
}

function relatedProjects(slug: string) {
  const category = categoryByService[slug]
  return category ? projectRepository.listByCategory(category).slice(0, 2) : []
}

function serviceTestimonial(slug: string) {
  return testimonialService.getByService(slug)
}
</script>

<template>
  <main id="main-content">
    <section class="bg-surface pt-44 pb-20 lg:pt-56 lg:pb-28">
      <Container>
        <span class="text-label text-accent mb-6 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          What We Do
        </span>
        <h1 class="text-display-xl max-w-4xl text-ink">Full-service creative, held to one standard.</h1>
        <p class="text-body-lg text-ink-muted mt-8 max-w-xl">
          Every discipline you need, run by one studio, so nothing gets lost in translation between strategy, design and production.
        </p>
      </Container>
    </section>

    <section v-for="service in serviceList" :key="service.id" :id="service.slug" class="border-border-subtle border-t py-24 lg:py-32">
      <Container>
        <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal as="div" class="lg:col-span-5">
            <span class="text-body-sm text-ink-muted">{{ service.index }}</span>
            <h2 class="text-heading mt-3 text-ink">{{ service.title }}</h2>
            <p class="text-body-lg text-ink-muted mt-6">{{ service.description }}</p>

            <div class="mt-10">
              <MagneticButton as="NuxtLink" href="/contact" variant="outline">
                Start a Project
                <ArrowRight class="size-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </Reveal>

          <div class="lg:col-span-7">
            <div class="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <Reveal as="div">
                <p class="text-label text-ink-muted mb-5">Capabilities</p>
                <ul class="flex flex-col gap-3">
                  <li v-for="capability in service.capabilities" :key="capability" class="text-body flex items-start gap-2.5 text-ink">
                    <Check class="text-accent mt-1 size-4 shrink-0" aria-hidden="true" />
                    {{ capability }}
                  </li>
                </ul>
              </Reveal>

              <Reveal as="div" :delay="0.1">
                <p class="text-label text-ink-muted mb-5">Process</p>
                <ol class="flex flex-col gap-3">
                  <li v-for="(step, index) in service.process" :key="step" class="text-body flex items-start gap-2.5 text-ink">
                    <span class="text-body-sm text-ink-muted">{{ String(index + 1).padStart(2, '0') }}</span>
                    {{ step }}
                  </li>
                </ol>
              </Reveal>
            </div>

            <Reveal v-if="relatedProjects(service.slug).length" as="div" :delay="0.2" class="mt-14">
              <p class="text-label text-ink-muted mb-5">Related Work</p>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ProjectPreview v-for="(project, index) in relatedProjects(service.slug)" :key="project.id" :project="project" :index="index" />
              </div>
            </Reveal>
          </div>
        </div>

        <div v-if="serviceTestimonial(service.slug)" class="border-border-subtle mt-16 border-t pt-16">
          <TestimonialQuote :testimonial="serviceTestimonial(service.slug)!" size="compact" />
        </div>
      </Container>
    </section>

    <FinalCta />
  </main>
</template>
