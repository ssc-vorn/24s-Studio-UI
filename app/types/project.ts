export type ProjectCategory = 'Branding' | 'Digital' | 'Video' | 'Marketing'

export interface Project {
  id: number
  slug: string
  title: string
  client: string
  category: ProjectCategory
  services: string[]
  year: string
  coverImage: string
  gallery: string[]
  excerpt: string
  challenge: string
  strategy: string
  creativeDirection: string
  execution: string
  result: string
  featured?: boolean
}
