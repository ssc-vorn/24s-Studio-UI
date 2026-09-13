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

  /**
   * One entry per unique client, linked to its case study — backs trust-signal
   * displays (e.g. the "Trusted By" strip) with something to click through to,
   * rather than inert logo text.
   */
  getTrustedClients(): { name: string; slug: string }[] {
    const seen = new Set<string>()
    const entries: { name: string; slug: string }[] = []

    for (const project of projectRepository.list()) {
      if (seen.has(project.client)) continue
      seen.add(project.client)
      entries.push({ name: project.client, slug: project.slug })
    }

    return entries
  }
}
