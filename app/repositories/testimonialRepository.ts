import { testimonials } from '~/data/testimonials'
import type { Testimonial } from '~/types/testimonial'

export const testimonialRepository = {
  list(): Testimonial[] {
    return testimonials
  }
}
