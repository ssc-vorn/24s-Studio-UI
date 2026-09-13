export interface PricingTier {
  id: number
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  unit: string
  features: string[]
  highlighted: boolean
  cta: string
}
