<script setup lang="ts">
import { Instagram, Linkedin } from 'lucide-vue-next'
import BehanceIcon from '~/components/global/BehanceIcon.vue'

const year = new Date().getFullYear()

const explore = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/about' },
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
  <footer ref="el" class="bg-charcoal pt-20 pb-10">
    <Container>
      <div class="grid grid-cols-1 gap-14 border-b border-white/10 pb-16 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <NuxtLink to="/">
            <BrandLogo inverse />
          </NuxtLink>
          <p class="text-body-sm mt-6 max-w-xs text-white/60">
            A digital creative studio building brands that move — graphic design, brand identity, video editing, digital marketing and advertising.
          </p>
          <ul class="mt-6 flex items-center gap-3" aria-label="Social media">
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
        </div>

        <nav aria-label="Footer navigation" class="lg:col-span-3">
          <p class="text-label text-white/40">Explore</p>
          <ul class="mt-5 flex flex-col gap-3">
            <li v-for="link in explore" :key="link.to">
              <NuxtLink :to="link.to" class="text-body text-white/70 transition-colors hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="lg:col-span-4">
          <p class="text-label text-white/40">Get In Touch</p>
          <ul class="mt-5 flex flex-col gap-3">
            <li>
              <a href="mailto:hello@24s.studio" class="text-body text-white/70 transition-colors hover:text-white">hello@24s.studio</a>
            </li>
            <li class="text-body text-white/70">Working with clients worldwide</li>
            <li class="text-body text-white/70">Replies within two business days</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 flex flex-col items-start justify-between gap-4 text-white/40 sm:flex-row sm:items-center">
        <p class="text-body-sm">© {{ year }} 24s Studio. All rights reserved.</p>
        <p class="text-body-sm">Graphic Design · Brand Identity · Video Editing · Digital Marketing · Advertising</p>
      </div>
    </Container>

    <!-- Closing mark — the brand's own name, oversized, as the last thing a
         visitor sees: an outlined ghost lockup rather than a solid fill, so
         it reads as a geometric flourish rather than competing with the
         copyright line above it. -->
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
