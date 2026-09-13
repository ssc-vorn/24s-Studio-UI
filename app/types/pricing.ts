export interface PricingTier {
  id: number
  name: string
  description: string
  price: string
  features: string[]
  highlighted: boolean
  cta: string
}
