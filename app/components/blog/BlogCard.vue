<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { BlogPost } from '~/types/blog'
import { formatDate } from '~/utils/formatters'

interface Props {
  post: BlogPost
}

defineProps<Props>()
</script>

<template>
  <article class="group flex h-full flex-col">
    <div class="aspect-[4/3] overflow-hidden bg-sand-200">
      <img
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      >
    </div>
    <div class="flex flex-1 flex-col pt-6">
      <div class="text-caption text-sand-600 flex items-center gap-3">
        <span class="text-primary-900 font-semibold">{{ post.category }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </div>
      <h3 class="text-h4 text-ink mt-3">{{ post.title }}</h3>
      <p class="text-body-sm text-sand-600 mt-3 flex-1">{{ post.excerpt }}</p>
      <span class="text-label text-ink mt-6 inline-flex items-center gap-2">
        Read More
        <ArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </div>
  </article>
</template>
