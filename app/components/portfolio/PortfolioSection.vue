<script setup lang="ts">
import type { gsap } from 'gsap'
import { projects } from '~/data/projects'
import type { ProjectCategory } from '~/types/project'
import { filterEnter, filterExit } from '~/animations/sections/portfolio'

type Category = 'All' | ProjectCategory

const categories: Category[] = ['All', 'Branding', 'Motion', 'Video', 'Digital', 'Marketing']

const activeCategory = ref<Category>('All')
const reduced = useReducedMotion()

const filteredProjects = computed(() =>
  activeCategory.value === 'All' ? projects : projects.filter((project) => project.category === activeCategory.value)
)

const gridRef = ref<{ cardEls: HTMLElement[] } | null>(null)
let activeTween: gsap.core.Timeline | null = null
let requestToken = 0

async function setFilter(category: Category) {
  if (category === activeCategory.value) return

  const token = ++requestToken
  const { gsap } = useGsap()
  activeTween?.kill()

  const outgoing = gridRef.value?.cardEls.filter(Boolean) ?? []

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

  const incoming = gridRef.value?.cardEls.filter(Boolean) ?? []
  if (incoming.length) {
    activeTween = filterEnter(gsap, incoming, reduced.value)
  }
}

const { root: sectionRoot } = useScrollAnimation(({ gsap, root }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const filters = root.querySelector('[data-reveal="filters"]')
  const grid = root.querySelector('[data-reveal="grid"]')

  gsap.fromTo(
    [heading, filters],
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
  )

  if (grid) {
    const cards = Array.from(grid.children)
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: 'top 82%' }
      }
    )
  }
})
</script>

<template>
  <section id="portfolio" ref="sectionRoot" class="bg-off-white py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Selected Work" title="Our Portfolio" />
        <AnimatedLink href="#portfolio" class="shrink-0">View All Projects</AnimatedLink>
      </div>

      <div data-reveal="filters" class="mt-10">
        <PortfolioFilters :categories="categories" :active="activeCategory" @change="(category) => setFilter(category as Category)" />
      </div>

      <div data-reveal="grid" class="mt-14">
        <PortfolioGrid ref="gridRef" :projects="filteredProjects" />
      </div>
    </Container>
  </section>
</template>
