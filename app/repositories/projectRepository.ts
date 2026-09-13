import { projects } from '~/data/projects'
import type { Project, ProjectCategory } from '~/types/project'

/**
 * Typed access to project/case-study records. A `Project` doubles as the
 * case study entity — there is no separate case-study dataset, since the
 * two are the same content viewed from different pages. This is the layer
 * to swap for a real API/CMS client later; nothing above it should import
 * `~/data/projects` directly.
 */
export const projectRepository = {
  list(): Project[] {
    return projects
  },
  listByCategory(category: ProjectCategory | 'All'): Project[] {
    return category === 'All' ? projects : projects.filter((project) => project.category === category)
  },
  getBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug)
  }
}
