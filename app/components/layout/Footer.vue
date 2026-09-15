<script setup lang="ts">
import { Instagram, Linkedin } from 'lucide-vue-next'
import BehanceIcon from '~/components/global/BehanceIcon.vue'

const year = new Date().getFullYear()

const explore = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' }
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'Behance', href: 'https://behance.net', icon: BehanceIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin }
]

const el = ref<HTMLElement | null>(null)
useScrollReveal(el, { start: 'top 95%' })
</script>

<template>
  <footer ref="el" class="bg-charcoal pt-24 pb-10 lg:pt-32">
    <Container class="flex flex-col items-center text-center">
      <NuxtLink to="/">
        <BrandLogo inverse />
      </NuxtLink>

      <nav aria-label="Footer navigation" class="mt-14">
        <ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <li v-for="link in explore" :key="link.to">
            <NuxtLink :to="link.to" class="text-ui text-white/60 tracking-[0.1em] uppercase transition-colors hover:text-white">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <a href="mailto:hello@24s.studio" class="text-heading mt-14 text-white transition-colors hover:text-accent">hello@24s.studio</a>

      <ul class="mt-10 flex items-center gap-3" aria-label="Social media">
        <li v-for="social in socials" :key="social.label">
          <a
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="hover:border-accent hover:text-accent inline-flex size-10 items-center justify-center border border-white/15 text-white/70 transition-colors"
          >
            <component :is="social.icon" class="size-4" aria-hidden="true" />
          </a>
        </li>
      </ul>

      <div class="border-border-subtle/20 mt-16 flex w-full flex-col items-center gap-3 border-t pt-8 text-white/40 sm:flex-row sm:justify-between">
        <p class="text-body-sm">© {{ year }} 24s Studio. All rights reserved.</p>
        <p class="text-body-sm">Graphic Design · Brand Identity · Video Editing · Digital Marketing · Advertising</p>
      </div>
    </Container>

    <!-- Closing mark — the credits-roll moment: the brand's own name,
         oversized, outlined rather than filled so it reads as a geometric
         flourish and not a competing headline. -->
    <div class="mt-14 overflow-hidden select-none lg:mt-20" aria-hidden="true">
      <p
        class="text-center font-serif leading-none font-normal tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]"
        style="font-size: clamp(3.5rem, 15vw, 12rem)"
      >
        24s Studio
      </p>
    </div>
  </footer>
</template>
