<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { Article } from '~/types/article'
import { formatDate } from '~/utils/formatters'

interface Props {
  article: Article
}

defineProps<Props>()
</script>

<template>
  <article class="group flex h-full flex-col">
    <div class="bg-charcoal-200 aspect-4/3 overflow-hidden">
      <img
        :src="article.image"
        :alt="article.title"
        loading="lazy"
        class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      >
    </div>
    <div class="flex flex-1 flex-col pt-6">
      <div class="text-body-sm text-ink-muted flex items-center gap-3">
        <span class="text-accent font-medium">{{ article.category }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="article.date">{{ formatDate(article.date) }}</time>
      </div>
      <h3 class="text-subheading text-ink mt-3">{{ article.title }}</h3>
      <p class="text-body-sm text-ink-muted mt-3 flex-1">{{ article.excerpt }}</p>
      <span class="text-ui mt-6 inline-flex items-center gap-2 text-ink uppercase tracking-widest group-hover:text-accent">
        Read More
        <ArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </div>
  </article>
</template>
