<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { PricingTier } from '~/types/pricing'

interface Props {
  tier: PricingTier
}

defineProps<Props>()

const { scrollTo } = useLenis()

function handleClick(event: MouseEvent) {
  event.preventDefault()
  scrollTo('#contact')
}
</script>

<template>
  <div
    class="flex h-full flex-col justify-between border p-8 transition-colors duration-300 lg:p-10"
    :class="tier.highlighted ? 'border-primary-900 bg-primary-900 text-white' : 'border-fog bg-off-white text-ink'"
  >
    <div>
      <div class="flex items-center justify-between">
        <h3 class="text-h4">{{ tier.name }}</h3>
        <span
          v-if="tier.highlighted"
          class="text-label bg-white px-2.5 py-1 text-primary-900"
        >Popular</span>
      </div>
      <p class="text-body-sm mt-3" :class="tier.highlighted ? 'text-white/70' : 'text-sand-600'">
        {{ tier.description }}
      </p>
      <p class="text-h3 mt-8">{{ tier.price }}</p>

      <ul class="mt-8 flex flex-col gap-3">
        <li v-for="feature in tier.features" :key="feature" class="text-body-sm flex items-start gap-2.5">
          <Check class="mt-0.5 size-4 shrink-0" :class="tier.highlighted ? 'text-white' : 'text-primary-900'" aria-hidden="true" />
          <span :class="tier.highlighted ? 'text-white/90' : 'text-ink/80'">{{ feature }}</span>
        </li>
      </ul>
    </div>

    <a
      href="#contact"
      class="text-label mt-10 inline-flex items-center justify-center border px-6 py-3.5 text-center transition-colors"
      :class="tier.highlighted ? 'border-white text-white hover:bg-white hover:text-primary-900' : 'border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white'"
      @click="handleClick"
    >
      {{ tier.cta }}
    </a>
  </div>
</template>
