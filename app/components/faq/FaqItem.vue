<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { Faq } from '~/types/faq'

interface Props {
  faq: Faq
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ toggle: [] }>()

const contentEl = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()
const buttonId = `faq-button-${props.faq.id}`
const panelId = `faq-panel-${props.faq.id}`

onMounted(() => {
  if (contentEl.value) contentEl.value.style.height = props.isOpen ? 'auto' : '0px'
})

watch(
  () => props.isOpen,
  (open) => {
    const el = contentEl.value
    if (!el) return
    const { gsap } = useGsap()

    if (reduced.value) {
      gsap.set(el, { height: open ? 'auto' : 0 })
      return
    }

    if (open) {
      gsap.set(el, { height: 'auto' })
      const target = el.offsetHeight
      gsap.fromTo(el, { height: 0 }, { height: target, duration: 0.45, ease: 'power2.out' })
    } else {
      const current = el.offsetHeight
      gsap.fromTo(el, { height: current }, { height: 0, duration: 0.35, ease: 'power2.inOut' })
    }
  }
)
</script>

<template>
  <div class="border-b border-fog">
    <h3>
      <button
        :id="buttonId"
        type="button"
        class="flex w-full items-center justify-between gap-6 py-6 text-left"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        @click="emit('toggle')"
      >
        <span class="text-h4 text-ink">{{ faq.question }}</span>
        <Plus class="text-primary-900 size-5 shrink-0 transition-transform duration-300" :class="{ 'rotate-45': isOpen }" aria-hidden="true" />
      </button>
    </h3>
    <div :id="panelId" ref="contentEl" role="region" :aria-labelledby="buttonId" class="h-0 overflow-hidden">
      <p class="text-body text-sand-600 max-w-2xl pb-6">
        {{ faq.answer }}
      </p>
    </div>
  </div>
</template>
