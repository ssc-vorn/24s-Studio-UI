<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { articleService } from '~/services/articleService'
import { formatDate } from '~/utils/formatters'

const latestArticles = articleService.getLatest(3)
const activeIndex = ref(0)

const { root } = useScrollAnimation(({ gsap, root }) => {
  const heading = root.querySelector('[data-reveal="heading"]')
  const list = root.querySelector('[data-reveal="list"]')

  gsap.fromTo(
    [heading, list],
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: root, start: 'top 78%' } }
  )
})
</script>

<template>
  <section id="journal" ref="root" class="bg-surface py-28 lg:py-40">
    <Container>
      <div data-reveal="heading" class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span class="text-label text-accent mb-5 flex items-center gap-3">
            <span class="bg-accent h-px w-8" aria-hidden="true" />
            Journal
          </span>
          <h2 class="text-heading text-ink">Notes on craft, strategy and process.</h2>
        </div>
        <AnimatedLink to="/blog" class="shrink-0">View All Articles</AnimatedLink>
      </div>

      <div data-reveal="list" class="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div class="border-border-subtle border-t lg:col-span-8">
          <NuxtLink
            v-for="(article, index) in latestArticles"
            :key="article.slug"
            :to="`/blog/${article.slug}`"
            class="group border-border-subtle grid grid-cols-1 items-center gap-3 border-b py-8 sm:grid-cols-12 sm:gap-6"
            @mouseenter="activeIndex = index"
          >
            <span class="text-body-sm font-sans sm:col-span-1" :class="activeIndex === index ? 'text-accent' : 'text-ink-muted'">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h3 class="text-heading sm:col-span-7 text-ink transition-colors duration-300 group-hover:text-accent">{{ article.title }}</h3>
            <span class="text-body-sm text-ink-muted sm:col-span-2">{{ article.category }}</span>
            <div class="text-body-sm text-ink-muted flex items-center justify-between gap-4 sm:col-span-2">
              <time :datetime="article.date">{{ formatDate(article.date) }}</time>
              <ArrowUpRight
                class="size-5 shrink-0 transition-all duration-300"
                :class="activeIndex === index ? 'text-accent -translate-y-1 translate-x-1' : 'text-ink-muted'"
                aria-hidden="true"
              />
            </div>
          </NuxtLink>
        </div>

        <div class="bg-charcoal-200 relative hidden aspect-4/5 overflow-hidden lg:col-span-4 lg:block">
          <img
            v-for="(article, index) in latestArticles"
            :key="article.slug"
            :src="article.image"
            :alt="article.title"
            class="absolute inset-0 size-full object-cover transition-opacity duration-500"
            :class="activeIndex === index ? 'opacity-100' : 'opacity-0'"
          >
        </div>
      </div>
    </Container>
  </section>
</template>
