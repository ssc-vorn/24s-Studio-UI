export interface Service {
  id: number
  slug: string
  index: string
  title: string
  summary: string
  description: string
  capabilities: string[]
  process: string[]
  /** Representative image for the Home services list's hover/tap media panel. */
  image: string
}
