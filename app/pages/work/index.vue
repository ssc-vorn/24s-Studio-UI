<script setup lang="ts">
import type { gsap } from 'gsap'
import { projectRepository } from '~/repositories/projectRepository'
import type { ProjectCategory } from '~/types/project'
import { filterEnter, filterExit } from '~/animations/sections/portfolio'

type Category = 'All' | ProjectCategory

const categories: Category[] = ['All', 'Branding', 'Digital', 'Video', 'Marketing']

useSeoMeta({
  title: 'Work — 24s Studio',
  description: 'An archive of branding, digital, video & motion and marketing work from the 24s Studio team.',
  ogTitle: 'Work — 24s Studio',
  ogDescription: 'An archive of branding, digital, video & motion and marketing work from the 24s Studio team.',
  ogImage: 'https://picsum.photos/1200/630?random=3',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24s.studio/work' }]
})

const activeCategory = ref<Category>('All')
const reduced = useReducedMotion()

const filteredProjects = computed(() => projectRepository.listByCategory(activeCategory.value))

const listRef = ref<{ cardEls: HTMLElement[] } | null>(null)
let activeTween: gsap.core.Timeline | null = null
let requestToken = 0

async function setFilter(category: Category) {
  if (category === activeCategory.value) return

  const token = ++requestToken
  const { gsap } = useGsap()
  activeTween?.kill()

  const outgoing = listRef.value?.cardEls.filter(Boolean) ?? []

  if (outgoing.length) {
    activeTween = filterExit(gsap, outgoing, reduced.value)
    await new Promise<void>((resolve) => {
      activeTween?.eventCallback('onComplete', resolve)
    })
  }

  if (token !== requestToken) return

  activeCategory.value = category
  await nextTick()

  if (token !== requestToken) return

  const incoming = listRef.value?.cardEls.filter(Boolean) ?? []
  if (incoming.length) {
    activeTween = filterEnter(gsap, incoming, reduced.value)
  }
}
</script>

<template>
  <main id="main-content">
    <section class="bg-surface pt-44 pb-16 lg:pt-56 lg:pb-20">
      <Container>
        <span class="text-label text-accent mb-6 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Archive
        </span>
        <h1 class="text-display-xl max-w-4xl text-ink">Work</h1>
        <p class="text-body-lg text-ink-muted mt-8 max-w-xl">
          Branding, digital, video & motion and marketing work built for founders, institutions and everyone in between.
        </p>
      </Container>
    </section>

    <section class="bg-surface pb-28 lg:pb-40">
      <Container>
        <div class="border-border-subtle border-b pb-8">
          <PortfolioFilters :categories="categories" :active="activeCategory" @change="(category) => setFilter(category as Category)" />
        </div>

        <div class="mt-16">
          <ProjectList ref="listRef" :projects="filteredProjects" />
        </div>
      </Container>
    </section>
  </main>
</template>
