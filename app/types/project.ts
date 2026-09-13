export type ProjectCategory = 'Branding' | 'Motion' | 'Video' | 'Digital' | 'Marketing'

export interface Project {
  id: number
  title: string
  client: string
  category: ProjectCategory
  year: string
  image: string
  description: string
}
