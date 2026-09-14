import { testimonialRepository } from '~/repositories/testimonialRepository'
import type { Testimonial } from '~/types/testimonial'

/**
 * Business rules built on top of `testimonialRepository` — Home slider
 * selection, and the case-study/service cross-references that keep
 * testimonial content out of `Project`/`Service` entirely.
 */
export const testimonialService = {
  list(): Testimonial[] {
    return testimonialRepository.list()
  },

  /** Testimonials surfaced in the Home editorial slider. */
  getFeatured(): Testimonial[] {
    const featured = testimonialRepository.list().filter((testimonial) => testimonial.featured)
    return featured.length ? featured : testimonialRepository.list()
  },

  /** A quieter testimonial reserved for secondary placements (About, Contact) so they never repeat the Home slider. */
  getSecondary(): Testimonial | undefined {
    return testimonialRepository.list().find((testimonial) => !testimonial.featured)
  },

  getByProject(projectSlug: string): Testimonial | undefined {
    return testimonialRepository.list().find((testimonial) => testimonial.projectSlug === projectSlug)
  },

  getByService(serviceSlug: string): Testimonial | undefined {
    return testimonialRepository.list().find((testimonial) => testimonial.serviceSlug === serviceSlug)
  }
}
