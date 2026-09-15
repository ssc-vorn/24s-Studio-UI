<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Check } from 'lucide-vue-next'
import { serviceRepository } from '~/repositories/serviceRepository'
import { projectRepository } from '~/repositories/projectRepository'
import { testimonialService } from '~/services/testimonialService'
import type { ProjectCategory } from '~/types/project'

interface Props {
  slug: string
}

const props = defineProps<Props>()

const serviceList = serviceRepository.list()
const service = serviceRepository.getBySlug(props.slug)

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

const categoryByService: Record<string, ProjectCategory> = {
  'graphic-design': 'Branding',
  'brand-identity': 'Branding',
  'video-editing': 'Video',
  'digital-marketing': 'Marketing',
  advertising: 'Marketing'
}

const relatedProjects = computed(() => {
  const category = categoryByService[service.slug]
  return category ? projectRepository.listByCategory(category).slice(0, 3) : []
})

const testimonial = computed(() => testimonialService.getByService(service.slug))

const nextService = computed(() => {
  const currentIndex = serviceList.findIndex((item) => item.slug === service.slug)
  return serviceList[(currentIndex + 1) % serviceList.length]!
})

useSeoMeta({
  title: `${service.title} — 24s Studio`,
  description: service.summary,
  ogTitle: `${service.title} — 24s Studio`,
  ogDescription: service.summary,
  ogImage: service.image,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `https://24s.studio/services/${service.slug}` }]
})

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const info = root.querySelector('[data-reveal="info"]')
  const media = root.querySelector('[data-reveal="media"]')

  if (reduced) {
    gsap.set([info, media], { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' })
    return
  }

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 75%' } })
  tl.fromTo(info, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }).fromTo(
    media,
    { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
    { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1, ease: 'power3.out' },
    '-=0.65'
  )
})
</script>

<template>
  <main id="main-content">
    <section class="bg-surface pt-44 pb-20 lg:pt-56 lg:pb-28">
      <Container>
        <span class="text-label text-accent mb-6 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Service — {{ service.index }} / {{ String(serviceList.length).padStart(2, '0') }}
        </span>
        <h1 class="text-display-xl max-w-4xl text-ink">{{ service.title }}</h1>
        <p class="text-body-lg text-ink-muted mt-8 max-w-xl">{{ service.summary }}</p>
      </Container>
    </section>

    <section ref="root" class="bg-surface pb-24 lg:pb-32">
      <Container>
        <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div data-reveal="info" class="lg:col-span-5">
            <p class="text-body-lg text-ink-muted">{{ service.description }}</p>

            <div class="mt-10">
              <MagneticButton as="NuxtLink" href="/contact" data-cursor="start" variant="outline">
                Start a Project
                <ArrowRight class="size-4" aria-hidden="true" />
              </MagneticButton>
            </div>

            <div class="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <p class="text-label text-ink-muted mb-5">Capabilities</p>
                <ul class="flex flex-col gap-3">
                  <li v-for="capability in service.capabilities" :key="capability" class="text-body flex items-start gap-2.5 text-ink">
                    <Check class="text-accent mt-1 size-4 shrink-0" aria-hidden="true" />
                    {{ capability }}
                  </li>
                </ul>
              </div>

              <div>
                <p class="text-label text-ink-muted mb-5">Process</p>
                <ol class="flex flex-col gap-3">
                  <li v-for="(step, index) in service.process" :key="step" class="text-body flex items-start gap-2.5 text-ink">
                    <span class="text-body-sm text-ink-muted">{{ String(index + 1).padStart(2, '0') }}</span>
                    {{ step }}
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div class="relative overflow-hidden lg:col-span-7">
            <div data-reveal="media" class="aspect-4/5 lg:aspect-auto lg:h-full">
              <img :src="service.image" :alt="`${service.title} — representative work`" loading="lazy" class="size-full object-cover">
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section v-if="relatedProjects.length" class="border-border-subtle border-t py-24 lg:py-32">
      <Container>
        <p class="text-label text-ink-muted mb-10">Related Work</p>
        <ScrollReveal as="div" class="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3">
          <ProjectPreview v-for="(project, index) in relatedProjects" :key="project.id" :project="project" :index="index" />
        </ScrollReveal>
      </Container>
    </section>

    <section v-if="testimonial" class="bg-charcoal py-24 lg:py-32">
      <Container narrow>
        <TestimonialQuote :testimonial="testimonial" tone="white" />
      </Container>
    </section>

    <section class="bg-surface">
      <NuxtLink :to="`/services/${nextService.slug}`" class="group border-border-subtle flex items-center justify-between border-t px-6 py-10 sm:px-10 lg:px-16">
        <div>
          <span class="text-label text-ink-muted">Next Service — {{ nextService.index }}</span>
          <h2 class="text-subheading mt-2 text-ink transition-colors group-hover:text-accent">{{ nextService.title }}</h2>
        </div>
        <ArrowUpRight class="text-ink-muted size-6 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" aria-hidden="true" />
      </NuxtLink>
    </section>

    <FinalCta />
  </main>
</template>
