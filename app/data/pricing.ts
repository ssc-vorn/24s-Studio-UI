import type { PricingTier } from '~/types/pricing'

export const pricingTiers: PricingTier[] = [
  {
    id: 1,
    name: 'Starter',
    description: 'For founders and small teams who need a focused identity and a launch-ready presence.',
    price: 'Let’s Talk',
    features: ['Brand identity essentials', 'One-page digital experience', 'Core brand guidelines', '4-week delivery'],
    highlighted: false,
    cta: 'Start a Project'
  },
  {
    id: 2,
    name: 'Growth',
    description: 'For scaling brands that need a complete visual system across print and digital.',
    price: 'Custom Quote',
    features: ['Full identity system', 'Multi-page digital experience', 'Motion & social toolkit', 'Dedicated creative lead', '8-week delivery'],
    highlighted: true,
    cta: 'Start a Project'
  },
  {
    id: 3,
    name: 'Premium',
    description: 'For established brands undertaking a full repositioning across every channel.',
    price: 'Custom Quote',
    features: ['Brand strategy & positioning', 'Full identity + digital product', 'Video & motion production', 'Ongoing campaign support', 'Dedicated studio team'],
    highlighted: false,
    cta: 'Start a Project'
  },
  {
    id: 4,
    name: 'Custom',
    description: 'For long-term partnerships spanning multiple products, markets or campaigns.',
    price: 'Let’s Talk',
    features: ['Retainer-based engagement', 'Cross-functional studio team', 'Priority turnaround', 'Quarterly strategy reviews'],
    highlighted: false,
    cta: 'Talk to Us'
  }
]
