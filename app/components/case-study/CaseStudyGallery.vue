<script setup lang="ts">
interface Props {
  images: string[]
  title: string
  client: string
}

const props = defineProps<Props>()

const lead = computed(() => props.images[0])
const rest = computed(() => props.images.slice(1))
</script>

<template>
  <section v-if="images.length" class="bg-surface py-24 lg:py-32">
    <Container>
      <span class="text-label text-accent mb-14 flex items-center gap-3">
        <span class="bg-accent h-px w-8" aria-hidden="true" />
        Applications
      </span>
    </Container>

    <Container v-if="lead" class="mb-6 lg:mb-8">
      <Reveal variant="clip" class="bg-charcoal-200 block aspect-16/9 overflow-hidden">
        <img :src="lead" :alt="`${title} — ${client} application`" loading="lazy" class="size-full object-cover">
      </Reveal>
    </Container>

    <Container v-if="rest.length">
      <ScrollReveal as="div" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        <div v-for="(image, index) in rest" :key="index" class="bg-charcoal-200 aspect-4/5 overflow-hidden">
          <img :src="image" :alt="`${title} — ${client} application ${index + 2}`" loading="lazy" class="size-full object-cover">
        </div>
      </ScrollReveal>
    </Container>
  </section>
</template>
