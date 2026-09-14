<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { projectRepository } from '~/repositories/projectRepository'
import { projectService } from '~/services/projectService'
import { testimonialService } from '~/services/testimonialService'

const route = useRoute()
const slug = route.params.slug as string
const project = projectRepository.getBySlug(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const nextProject = computed(() => projectService.getNext(project.slug))
const testimonial = computed(() => testimonialService.getByProject(project.slug))

useSeoMeta({
  title: `${project.title} — 24 Seven Studio`,
  description: project.excerpt,
  ogTitle: `${project.title} — 24 Seven Studio`,
  ogDescription: project.excerpt,
  ogImage: project.coverImage,
  ogType: 'article',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `https://24seven.studio/work/${project.slug}` }]
})
</script>

<template>
  <main id="main-content">
    <CaseStudyHero :project="project" />

    <section class="bg-surface py-28 lg:py-40">
      <Container class="flex flex-col gap-24 lg:gap-32">
        <CaseStudySection label="Challenge" :text="project.challenge" :image="project.gallery[0]" />
        <CaseStudySection label="Strategy" :text="project.strategy" :image="project.gallery[1]" reverse />
      </Container>

      <div class="my-24 lg:my-32">
        <CaseStudyVisualBreak :image="project.coverImage" :alt="`${project.title} — ${project.client}`" />
      </div>

      <Container class="flex flex-col gap-24 lg:gap-32">
        <CaseStudySection label="Creative Direction" :text="project.creativeDirection" :image="project.gallery[0]" />
        <CaseStudySection label="Execution" :text="project.execution" :image="project.gallery[1]" reverse />
        <CaseStudySection label="Result" :text="project.result" />
      </Container>
    </section>

    <section v-if="testimonial" class="bg-charcoal py-28 lg:py-40">
      <Container narrow>
        <p class="text-label mb-10 text-center text-white/50">Client Testimonial</p>
        <TestimonialQuote :testimonial="testimonial" tone="white" />
      </Container>
    </section>

    <section v-if="nextProject" class="bg-surface">
      <NuxtLink :to="`/work/${nextProject.slug}`" class="group relative flex min-h-[60vh] items-end overflow-hidden bg-black">
        <img :src="nextProject.coverImage" :alt="nextProject.title" class="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105">
        <div class="from-black/90 absolute inset-0 bg-gradient-to-t to-transparent" aria-hidden="true" />
        <Container class="relative z-10 pb-16">
          <span class="text-label mb-4 flex items-center gap-3 text-white/60">
            Next Project
            <ArrowUpRight class="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </span>
          <h2 class="text-display text-white">{{ nextProject.title }}</h2>
        </Container>
      </NuxtLink>
    </section>
  </main>
</template>
