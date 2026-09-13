<script setup lang="ts">
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-vue-next'
import type { ContactFormErrors, ContactFormState } from '~/types/contact'
import { revealContact } from '~/animations/sections/contact'

const serviceOptions = [
  'Graphic Design',
  'Branding & Visual Identity',
  'Video Production & Editing',
  'Motion Graphics',
  'Digital Experiences',
  'Digital Marketing'
]

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@nexora.studio', href: 'mailto:hello@nexora.studio' },
  { icon: Phone, label: 'Phone', value: '+1 (415) 555-0182', href: 'tel:+14155550182' },
  { icon: MapPin, label: 'Studio', value: 'San Francisco, CA', href: undefined }
]

const initialState = (): ContactFormState => ({ name: '', email: '', company: '', service: '', message: '' })

const form = reactive<ContactFormState>(initialState())
const errors = ref<ContactFormErrors>({})
const isSubmitting = ref(false)

const toast = useToast()

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  const next: ContactFormErrors = {}

  if (!form.name.trim()) next.name = 'Please enter your name.'
  if (!form.email.trim()) next.email = 'Please enter your email.'
  else if (!emailPattern.test(form.email)) next.email = 'Please enter a valid email address.'
  if (!form.service) next.service = 'Please select a project type.'
  if (!form.message.trim()) next.message = 'Please tell us a little about your project.'

  errors.value = next
  return Object.keys(next).length === 0
}

// A `fail` in the email is a deliberate hook for exercising the error toast/state — never a real backend rule.
function simulateSubmit(state: ContactFormState) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (state.email.toLowerCase().includes('fail')) reject(new Error('Simulated network error'))
      else resolve()
    }, 1200)
  })
}

async function handleSubmit() {
  if (isSubmitting.value) return
  if (!validate()) return

  isSubmitting.value = true

  try {
    await simulateSubmit(form)
    toast.add({
      title: 'Message sent successfully!',
      description: 'We’ll get back to you soon.',
      color: 'primary'
    })
    Object.assign(form, initialState())
    errors.value = {}
  } catch {
    toast.add({
      title: 'Something went wrong',
      description: 'We couldn’t send your message. Please try again in a moment.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

const { root } = useScrollAnimation(({ gsap, root, reduced }) => {
  const info = root.querySelector('[data-reveal="info"]')
  const form = root.querySelector('[data-reveal="form"]')
  revealContact(gsap, { info, form }, root, reduced)
})

const inputClass =
  'mt-2 w-full rounded-xl border border-fog bg-white px-4 py-3 text-ink outline-none transition-colors focus-visible:border-primary-900'
</script>

<template>
  <section id="contact" ref="root" class="bg-off-white py-28 lg:py-40">
    <Container>
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div data-reveal="info" class="lg:col-span-5">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact Us"
            description="Let’s create something amazing together. We’d love to hear from you."
          />

          <ul class="mt-12 flex flex-col gap-5">
            <li v-for="detail in contactDetails" :key="detail.label" class="flex items-center gap-4">
              <span class="bg-primary-50 text-primary-900 flex size-11 shrink-0 items-center justify-center rounded-full">
                <component :is="detail.icon" class="size-5" aria-hidden="true" />
              </span>
              <div>
                <p class="text-caption text-sand-600">{{ detail.label }}</p>
                <component :is="detail.href ? 'a' : 'p'" :href="detail.href" class="text-body font-medium text-ink">
                  {{ detail.value }}
                </component>
              </div>
            </li>
          </ul>
        </div>

        <form data-reveal="form" novalidate class="lg:col-span-7" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <label for="contact-name" class="text-label text-sand-600">Name *</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Your name"
                :class="inputClass"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'contact-name-error' : undefined"
              >
              <p v-if="errors.name" id="contact-name-error" class="text-body-sm mt-2 text-red-600">{{ errors.name }}</p>
            </div>

            <div class="sm:col-span-1">
              <label for="contact-email" class="text-label text-sand-600">Email *</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder="your@email.com"
                :class="inputClass"
                :aria-invalid="Boolean(errors.email)"
                :aria-describedby="errors.email ? 'contact-email-error' : undefined"
              >
              <p v-if="errors.email" id="contact-email-error" class="text-body-sm mt-2 text-red-600">{{ errors.email }}</p>
            </div>

            <div class="sm:col-span-1">
              <label for="contact-company" class="text-label text-sand-600">Company</label>
              <input
                id="contact-company"
                v-model="form.company"
                type="text"
                autocomplete="organization"
                placeholder="Company (optional)"
                :class="inputClass"
              >
            </div>

            <div class="sm:col-span-1">
              <label for="contact-service" class="text-label text-sand-600">Project Type</label>
              <select
                id="contact-service"
                v-model="form.service"
                :class="inputClass"
                :aria-invalid="Boolean(errors.service)"
                :aria-describedby="errors.service ? 'contact-service-error' : undefined"
              >
                <option value="" disabled>Select an option</option>
                <option v-for="option in serviceOptions" :key="option" :value="option">{{ option }}</option>
              </select>
              <p v-if="errors.service" id="contact-service-error" class="text-body-sm mt-2 text-red-600">{{ errors.service }}</p>
            </div>

            <div class="sm:col-span-2">
              <label for="contact-message" class="text-label text-sand-600">Message *</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                placeholder="Tell us about your project..."
                :class="[inputClass, 'resize-none']"
                :aria-invalid="Boolean(errors.message)"
                :aria-describedby="errors.message ? 'contact-message-error' : undefined"
              />
              <p v-if="errors.message" id="contact-message-error" class="text-body-sm mt-2 text-red-600">{{ errors.message }}</p>
            </div>
          </div>

          <MagneticButton type="submit" class="mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            <ArrowRight v-if="!isSubmitting" class="size-4" aria-hidden="true" />
          </MagneticButton>
        </form>
      </div>
    </Container>
  </section>
</template>
