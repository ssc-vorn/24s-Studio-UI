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
    <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-sand-200">
      <img
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        class="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      >
    </div>
    <div class="flex flex-1 flex-col pt-5">
      <h3 class="text-base font-semibold text-ink">{{ post.title }}</h3>
      <time :datetime="post.date" class="text-body-sm text-sand-600 mt-2">{{ formatDate(post.date) }}</time>
      <span class="text-primary-900 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
        Read More
        <ArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </div>
  </article>
</template>
