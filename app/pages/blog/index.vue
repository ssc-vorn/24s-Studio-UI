<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { articleRepository } from '~/repositories/articleRepository'
import { formatDate } from '~/utils/formatters'

useSeoMeta({
  title: 'Journal — 24 Seven Studio',
  description: 'Notes on brand craft, motion design, digital product and strategy from the 24 Seven Studio team.',
  ogTitle: 'Journal — 24 Seven Studio',
  ogDescription: 'Notes on brand craft, motion design, digital product and strategy from the 24 Seven Studio team.',
  ogImage: 'https://picsum.photos/1200/630?random=2',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24seven.studio/blog' }]
})

const allArticles = articleRepository.list()
const featured = allArticles[0]
const rest = allArticles.slice(1)
</script>

<template>
  <main id="main-content">
    <section class="bg-surface pt-44 pb-16 lg:pt-56 lg:pb-20">
      <Container>
        <span class="text-label text-accent mb-6 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Journal
        </span>
        <h1 class="text-display-xl max-w-4xl text-ink">Ideas, process and craft from the studio.</h1>
      </Container>
    </section>

    <section v-if="featured" class="bg-surface pb-20">
      <Container>
        <NuxtLink :to="`/blog/${featured.slug}`" class="group grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="clip" class="bg-charcoal-200 block aspect-4/3 overflow-hidden lg:col-span-7">
            <img :src="featured.image" :alt="featured.title" class="size-full object-cover transition-transform duration-700 group-hover:scale-105">
          </Reveal>
          <Reveal as="div" :delay="0.15" class="flex flex-col justify-center lg:col-span-5">
            <div class="text-body-sm text-ink-muted flex items-center gap-3">
              <span class="text-accent font-medium">{{ featured.category }}</span>
              <span aria-hidden="true">·</span>
              <time :datetime="featured.date">{{ formatDate(featured.date) }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ featured.readingTime }}</span>
            </div>
            <h2 class="text-heading mt-4 text-ink transition-colors group-hover:text-accent">{{ featured.title }}</h2>
            <p class="text-body-lg text-ink-muted mt-4">{{ featured.excerpt }}</p>
            <span class="text-ui mt-8 inline-flex items-center gap-2 text-ink uppercase tracking-widest group-hover:text-accent">
              Read Article
              <ArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Reveal>
        </NuxtLink>
      </Container>
    </section>

    <section class="bg-surface pb-28 lg:pb-40">
      <Container>
        <div class="border-border-subtle border-t pt-16">
          <ScrollReveal as="div" class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink v-for="article in rest" :key="article.slug" :to="`/blog/${article.slug}`">
              <ArticleCard :article="article" />
            </NuxtLink>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  </main>
</template>
