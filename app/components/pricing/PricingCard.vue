<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import type { PricingTier } from '~/types/pricing'
import { formatCurrency } from '~/utils/formatters'

interface Props {
  tier: PricingTier
  billing: 'monthly' | 'yearly'
}

const props = defineProps<Props>()

const { scrollTo } = useLenis()

const price = computed(() => (props.billing === 'yearly' ? props.tier.priceYearly : props.tier.priceMonthly))

function handleClick(event: MouseEvent) {
  event.preventDefault()
  scrollTo('#contact')
}
</script>

<template>
  <div
    class="flex h-full flex-col justify-between rounded-2xl border p-8 transition-colors duration-300 lg:p-9"
    :class="tier.highlighted ? 'border-primary-900 bg-navy-900 text-white' : 'border-fog bg-white text-ink'"
  >
    <div>
      <div class="flex items-center justify-between">
        <h3 class="text-h4">{{ tier.name }}</h3>
        <span v-if="tier.highlighted" class="text-primary-900 rounded-full bg-white px-2.5 py-1 text-xs font-semibold">Most Popular</span>
      </div>
      <p class="text-body-sm mt-3" :class="tier.highlighted ? 'text-white/70' : 'text-sand-600'">
        {{ tier.description }}
      </p>

      <p class="mt-8 flex items-baseline gap-1">
        <span class="text-h2">{{ formatCurrency(price) }}</span>
        <span class="text-body-sm" :class="tier.highlighted ? 'text-white/60' : 'text-sand-600'">{{ tier.unit }}</span>
      </p>

      <ul class="mt-8 flex flex-col gap-3">
        <li v-for="feature in tier.features" :key="feature" class="text-body-sm flex items-start gap-2.5">
          <Check class="mt-0.5 size-4 shrink-0" :class="tier.highlighted ? 'text-white' : 'text-primary-900'" aria-hidden="true" />
          <span :class="tier.highlighted ? 'text-white/90' : 'text-ink/80'">{{ feature }}</span>
        </li>
      </ul>
    </div>

    <a
      href="#contact"
      class="mt-10 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-center text-sm font-semibold transition-colors"
      :class="tier.highlighted ? 'bg-white text-primary-900 hover:bg-white/90' : 'bg-primary-900 text-white hover:bg-primary-800'"
      @click="handleClick"
    >
      {{ tier.cta }}
    </a>
  </div>
</template>
