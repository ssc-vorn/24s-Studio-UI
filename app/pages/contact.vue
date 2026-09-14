<script setup lang="ts">
import { Mail, MapPin, Phone } from 'lucide-vue-next'
import { testimonialService } from '~/services/testimonialService'

useSeoMeta({
  title: 'Contact — 24 Seven Studio',
  description: 'Tell us about your project. We reply within two business days.',
  ogTitle: 'Contact — 24 Seven Studio',
  ogDescription: 'Tell us about your project. We reply within two business days.',
  ogImage: 'https://picsum.photos/1200/630?random=6',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://24seven.studio/contact' }]
})

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@24seven.studio', href: 'mailto:hello@24seven.studio' },
  { icon: Phone, label: 'Phone', value: '+855 (0) 23 555 0182', href: 'tel:+85523555018' },
  { icon: MapPin, label: 'Studio', value: 'Phnom Penh, Cambodia', href: undefined }
]

const trustQuote = testimonialService.getSecondary()

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const info = root.querySelector('[data-reveal="info"]')
  const form = root.querySelector('[data-reveal="form"]')

  const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 78%' } })
  if (reduced) {
    tl.set([info, form], { opacity: 1, x: 0 })
    return
  }
  tl.fromTo(info, { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }).fromTo(
    form,
    { opacity: 0, x: 32 },
    { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.7'
  )
})
</script>

<template>
  <main id="main-content">
    <section class="bg-surface pt-44 pb-20 lg:pt-56 lg:pb-28">
      <Container>
        <span class="text-label text-accent mb-6 flex items-center gap-3">
          <span class="bg-accent h-px w-8" aria-hidden="true" />
          Get In Touch
        </span>
        <h1 class="text-display-xl max-w-4xl text-ink">
          Let’s create something meaningful.
        </h1>
      </Container>
    </section>

    <TrustedBySection variant="compact" />

    <section ref="root" class="bg-surface pb-28 lg:pb-40">
      <Container>
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          <div data-reveal="info" class="lg:col-span-4">
            <p class="text-body-lg text-ink-muted max-w-sm">
              Tell us a little about what you’re working on. We reply within two business days, and every inquiry gets a real answer from someone on the team.
            </p>

            <ul class="mt-12 flex flex-col gap-5">
              <li v-for="detail in contactDetails" :key="detail.label" class="flex items-center gap-4">
                <span class="border-border-subtle text-ink flex size-11 shrink-0 items-center justify-center border">
                  <component :is="detail.icon" class="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p class="text-caption text-ink-muted">{{ detail.label }}</p>
                  <component :is="detail.href ? 'a' : 'p'" :href="detail.href" class="text-body font-medium text-ink">
                    {{ detail.value }}
                  </component>
                </div>
              </li>
            </ul>

            <blockquote v-if="trustQuote" class="border-border-subtle mt-12 border-l-2 pl-5">
              <p class="text-body-sm text-ink-muted italic">“{{ trustQuote.quote }}”</p>
              <footer class="text-caption text-ink-muted/70 mt-3 not-italic">
                {{ trustQuote.clientName }}, {{ trustQuote.company }}
              </footer>
            </blockquote>
          </div>

          <div data-reveal="form" class="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  </main>
</template>
