<script setup lang="ts">
import { Instagram, Linkedin } from 'lucide-vue-next'
import BehanceIcon from '~/components/global/BehanceIcon.vue'

const year = new Date().getFullYear()

const explore = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/about' },
  { label: 'Insights', to: '/blog' },
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
            A creative studio building brands, digital experiences and visual stories that move people. Cambodia × Global.
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
              <a href="mailto:hello@24twentyfour.studio" class="text-body text-white/70 transition-colors hover:text-white">hello@24twentyfour.studio</a>
            </li>
            <li class="text-body text-white/70">+855 (0) 23 555 0182</li>
            <li class="text-body text-white/70">Phnom Penh, Cambodia</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 flex flex-col items-start justify-between gap-4 text-white/40 sm:flex-row sm:items-center">
        <p class="text-body-sm">© {{ year }} 24 Twenty Four Studio. All rights reserved.</p>
        <p class="text-body-sm">Branding · Digital · Video & Motion · Marketing</p>
      </div>
    </Container>
  </footer>
</template>
