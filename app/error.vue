<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: isNotFound.value ? 'Page Not Found — 24 Twenty Four Studio' : 'Something Went Wrong — 24 Twenty Four Studio'
})

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="site-shell">
    <header class="fixed inset-x-0 top-0 z-50 py-6">
      <Container>
        <NuxtLink to="/" @click.prevent="handleClear">
          <BrandLogo />
        </NuxtLink>
      </Container>
    </header>

    <main class="bg-surface flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span class="text-label text-accent mb-6">{{ error.statusCode }}</span>
      <h1 class="text-display text-ink max-w-2xl">
        {{ isNotFound ? 'This page went missing.' : 'Something went wrong.' }}
      </h1>
      <p class="text-body-lg text-ink-muted mt-6 max-w-md">
        {{
          isNotFound
            ? 'The page you’re looking for doesn’t exist or may have moved.'
            : 'An unexpected error occurred. Please try again, or head back to the homepage.'
        }}
      </p>
      <div class="mt-10">
        <MagneticButton as="button" type="button" @click="handleClear">Back to Home</MagneticButton>
      </div>
    </main>

    <Footer />
  </div>
</template>
