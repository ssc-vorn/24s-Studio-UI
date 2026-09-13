import { projectRepository } from '~/repositories/projectRepository'
import type { Project } from '~/types/project'

/** Business rules built on top of `projectRepository` — home page selection, case-study navigation. */
export const projectService = {
  getSelectedWork(limit = 4): Project[] {
    const featured = projectRepository.list().filter((project) => project.featured)
    const source = featured.length ? featured : projectRepository.list()
    return source.slice(0, limit)
  },

  getFeaturedCaseStudy(): Project | undefined {
    return projectRepository.list().find((project) => project.featured) ?? projectRepository.list()[0]
  },

  getNext(currentSlug: string): Project | undefined {
    const all = projectRepository.list()
    const index = all.findIndex((project) => project.slug === currentSlug)
    if (index === -1) return all[0]
    return all[(index + 1) % all.length]
  },

  /** Unique client names across every project, for trust-signal display (logo strip, etc). */
  getClientNames(): string[] {
    return Array.from(new Set(projectRepository.list().map((project) => project.client)))
  }
}
