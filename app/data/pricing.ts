import type { PricingTier } from '~/types/pricing'

export const pricingTiers: PricingTier[] = [
  {
    id: 1,
    name: 'Starter',
    description: 'For founders and small teams who need a focused identity and a launch-ready presence.',
    priceMonthly: 1500,
    priceYearly: 1200,
    unit: '/project',
    features: ['Brand identity essentials', 'One-page digital experience', 'Core brand guidelines', '4-week delivery'],
    highlighted: false,
    cta: 'Get Started'
  },
  {
    id: 2,
    name: 'Professional',
    description: 'For scaling brands that need a complete visual system across print and digital.',
    priceMonthly: 3500,
    priceYearly: 2800,
    unit: '/project',
    features: ['Full identity system', 'Multi-page digital experience', 'Motion & social toolkit', 'Dedicated creative lead', '8-week delivery'],
    highlighted: true,
    cta: 'Get Started'
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'For established brands undertaking a full repositioning across every channel.',
    priceMonthly: 6500,
    priceYearly: 5200,
    unit: '/project',
    features: ['Brand strategy & positioning', 'Full identity + digital product', 'Video & motion production', 'Ongoing campaign support', 'Dedicated studio team'],
    highlighted: false,
    cta: 'Get Started'
  }
]
