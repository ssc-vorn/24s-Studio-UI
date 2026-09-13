<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { ContactFormErrors, ContactFormState } from '~/types/contact'

const projectTypeOptions = ['Branding', 'Digital', 'Video & Motion', 'Marketing', 'Something else']

const initialState = (): ContactFormState => ({ name: '', email: '', company: '', projectType: '', message: '' })

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
  if (!form.projectType) next.projectType = 'Please select a project type.'
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
      title: 'Inquiry sent',
      description: 'Thanks for reaching out. We’ll reply within two business days.',
      color: 'primary'
    })
    Object.assign(form, initialState())
    errors.value = {}
  } catch {
    toast.add({
      title: 'Something went wrong',
      description: 'We couldn’t send your inquiry. Please try again in a moment.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

const inputClass = 'border-border-subtle focus-visible:border-accent mt-2 w-full border-b bg-transparent py-3 text-ink outline-none transition-colors'
</script>

<template>
  <form novalidate @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div class="sm:col-span-1">
        <label for="contact-name" class="text-label text-ink-muted">Name</label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          autocomplete="name"
          :class="inputClass"
          :aria-invalid="Boolean(errors.name)"
          :aria-describedby="errors.name ? 'contact-name-error' : undefined"
        >
        <p v-if="errors.name" id="contact-name-error" class="text-body-sm mt-2 text-red-500">{{ errors.name }}</p>
      </div>

      <div class="sm:col-span-1">
        <label for="contact-email" class="text-label text-ink-muted">Email</label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          :class="inputClass"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'contact-email-error' : undefined"
        >
        <p v-if="errors.email" id="contact-email-error" class="text-body-sm mt-2 text-red-500">{{ errors.email }}</p>
      </div>

      <div class="sm:col-span-1">
        <label for="contact-company" class="text-label text-ink-muted">Company</label>
        <input id="contact-company" v-model="form.company" type="text" autocomplete="organization" :class="inputClass">
      </div>

      <div class="sm:col-span-1">
        <label for="contact-project-type" class="text-label text-ink-muted">Project Type</label>
        <select
          id="contact-project-type"
          v-model="form.projectType"
          :class="inputClass"
          :aria-invalid="Boolean(errors.projectType)"
          :aria-describedby="errors.projectType ? 'contact-project-type-error' : undefined"
        >
          <option value="" disabled>Select an option</option>
          <option v-for="option in projectTypeOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <p v-if="errors.projectType" id="contact-project-type-error" class="text-body-sm mt-2 text-red-500">{{ errors.projectType }}</p>
      </div>

      <div class="sm:col-span-2">
        <label for="contact-message" class="text-label text-ink-muted">Message</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="5"
          :class="[inputClass, 'resize-none']"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="errors.message ? 'contact-message-error' : undefined"
        />
        <p v-if="errors.message" id="contact-message-error" class="text-body-sm mt-2 text-red-500">{{ errors.message }}</p>
      </div>
    </div>

    <MagneticButton type="submit" class="mt-10 disabled:cursor-not-allowed disabled:opacity-50" :disabled="isSubmitting">
      {{ isSubmitting ? 'Sending...' : 'Send Inquiry' }}
      <ArrowRight v-if="!isSubmitting" class="size-4" aria-hidden="true" />
    </MagneticButton>
  </form>
</template>
