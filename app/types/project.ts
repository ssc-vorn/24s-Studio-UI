export type ProjectCategory = 'Branding' | 'Digital' | 'Video' | 'Marketing'

export interface ProjectTestimonial {
  quote: string
  name: string
  role: string
}

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
  testimonial?: ProjectTestimonial
  featured?: boolean
}
