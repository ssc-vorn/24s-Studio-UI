<script setup lang="ts">
import { ArrowRight, Link2, Linkedin, Twitter } from 'lucide-vue-next'
import { articleRepository } from '~/repositories/articleRepository'
import { articleService } from '~/services/articleService'
import { formatDate } from '~/utils/formatters'

const route = useRoute()
const slug = route.params.slug as string
const article = articleRepository.getBySlug(slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

const related = articleService.getRelated(article.slug, 3)
const next = articleService.getNext(article.slug)

useSeoMeta({
  title: `${article.title} — 24 Seven Studio Journal`,
  description: article.excerpt,
  ogTitle: `${article.title} — 24 Seven Studio Journal`,
  ogDescription: article.excerpt,
  ogImage: article.image,
  ogType: 'article',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `https://24seven.studio/blog/${article.slug}` }]
})

const progress = ref(0)
const articleBodyEl = ref<HTMLElement | null>(null)
const copied = ref(false)

function handleScroll() {
  const el = articleBodyEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  const scrolled = -rect.top
  progress.value = Math.min(100, Math.max(0, (scrolled / total) * 100))
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

async function copyLink() {
  if (!import.meta.client) return
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <main id="main-content">
    <div class="bg-border-subtle fixed inset-x-0 top-0 z-40 h-0.5">
      <div class="bg-accent h-full transition-[width] duration-150" :style="{ width: `${progress}%` }" />
    </div>

    <article ref="articleBodyEl" class="bg-surface pt-44 pb-28 lg:pt-56 lg:pb-40">
      <Container narrow>
        <div class="text-body-sm text-ink-muted flex flex-wrap items-center gap-3">
          <span class="text-accent font-medium">{{ article.category }}</span>
          <span aria-hidden="true">·</span>
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ article.readingTime }}</span>
        </div>

        <h1 class="text-display mt-6 text-ink">{{ article.title }}</h1>
        <p class="text-body-sm text-ink-muted mt-6">By {{ article.author }}</p>
      </Container>

      <Container class="mt-14">
        <div class="bg-charcoal-200 aspect-16/9 overflow-hidden">
          <img :src="article.image" :alt="article.title" class="size-full object-cover">
        </div>
      </Container>

      <Container narrow class="mt-16">
        <div class="flex flex-col gap-6">
          <p v-for="(paragraph, index) in article.content" :key="index" class="text-body-lg text-ink">
            {{ paragraph }}
          </p>
        </div>

        <div class="border-border-subtle mt-16 flex items-center gap-4 border-t pt-8">
          <span class="text-label text-ink-muted">Share</span>
          <a
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            class="hover:border-accent hover:text-accent border-border-subtle inline-flex size-9 items-center justify-center border text-ink transition-colors"
          >
            <Twitter class="size-4" aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/sharing/share-offsite"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            class="hover:border-accent hover:text-accent border-border-subtle inline-flex size-9 items-center justify-center border text-ink transition-colors"
          >
            <Linkedin class="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-label="Copy link"
            class="hover:border-accent hover:text-accent border-border-subtle inline-flex size-9 items-center justify-center border text-ink transition-colors"
            @click="copyLink"
          >
            <Link2 class="size-4" aria-hidden="true" />
          </button>
          <span v-if="copied" class="text-body-sm text-ink-muted">Copied!</span>
        </div>
      </Container>
    </article>

    <section v-if="related.length" class="bg-surface border-border-subtle border-t py-24 lg:py-32">
      <Container>
        <p class="text-label text-ink-muted mb-10">Related Articles</p>
        <div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-3">
          <NuxtLink v-for="item in related" :key="item.slug" :to="`/blog/${item.slug}`">
            <ArticleCard :article="item" />
          </NuxtLink>
        </div>
      </Container>
    </section>

    <section v-if="next" class="bg-surface">
      <NuxtLink :to="`/blog/${next.slug}`" class="group border-border-subtle flex items-center justify-between border-t px-6 py-10 sm:px-10 lg:px-16">
        <div>
          <span class="text-label text-ink-muted">Next Article</span>
          <h2 class="text-subheading mt-2 text-ink transition-colors group-hover:text-accent">{{ next.title }}</h2>
        </div>
        <ArrowRight class="text-ink-muted size-6 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
      </NuxtLink>
    </section>
  </main>
</template>
