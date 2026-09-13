<script setup lang="ts">
import { Instagram, Linkedin, Twitter, Dribbble } from 'lucide-vue-next'

const { scrollTo } = useLenis()
const route = useRoute()
const isHome = computed(() => route.path === '/')

const year = new Date().getFullYear()

const explore = [
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' }
]

const serviceLinks = [
  'Graphic Design',
  'Branding & Identity',
  'Video Production',
  'Motion Graphics',
  'Digital Experiences',
  'Digital Marketing'
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: Dribbble }
]

function handleClick(event: MouseEvent, href: string) {
  if (!isHome.value) return
  event.preventDefault()
  scrollTo(href)
}

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!el.value) return
  const { gsap } = useGsap()
  const reduced = useReducedMotion()
  gsap.fromTo(
    el.value,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: reduced.value ? 0.001 : 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el.value, start: 'top 95%' }
    }
  )
})
</script>

<template>
  <footer ref="el" class="border-t border-fog bg-off-white pt-20 pb-10">
    <Container>
      <div class="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2 lg:col-span-1">
          <p class="text-h4 text-ink">24S<span class="text-primary-900">.</span></p>
          <p class="text-body-sm mt-4 max-w-xs text-sand-600">
            A creative studio building brands, digital experiences and visual systems that move people.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p class="text-label text-sand-600">Explore</p>
          <ul class="mt-5 flex flex-col gap-3">
            <li v-for="link in explore" :key="link.href">
              <a :href="isHome ? link.href : `/${link.href}`" class="text-body text-ink/80 transition-colors hover:text-ink" @click="handleClick($event, link.href)">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p class="text-label text-sand-600">Services</p>
          <ul class="mt-5 flex flex-col gap-3">
            <li v-for="service in serviceLinks" :key="service" class="text-body text-ink/80">
              {{ service }}
            </li>
          </ul>
        </div>

        <div>
          <p class="text-label text-sand-600">Contact</p>
          <ul class="mt-5 flex flex-col gap-3">
            <li>
              <a href="mailto:hello@24s.studio" class="text-body text-ink/80 transition-colors hover:text-ink">hello@24s.studio</a>
            </li>
            <li class="text-body text-ink/80">+1 (415) 555-0182</li>
            <li class="text-body text-ink/80">San Francisco, CA</li>
          </ul>
          <ul class="mt-6 flex items-center gap-4" aria-label="Social media">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                class="inline-flex size-10 items-center justify-center border border-fog text-ink/70 transition-colors hover:border-primary-900 hover:text-primary-900"
              >
                <component :is="social.icon" class="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-16 flex flex-col items-start justify-between gap-4 border-t border-fog pt-8 sm:flex-row sm:items-center">
        <p class="text-body-sm text-sand-600">© {{ year }} 24S Studio. All rights reserved.</p>
        <p class="text-body-sm text-sand-600">Graphic Design · Branding · Video · Motion · Digital · Marketing</p>
      </div>
    </Container>
  </footer>
</template>
