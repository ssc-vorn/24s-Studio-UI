import { services } from '~/data/services'
import type { Service } from '~/types/service'

export const serviceRepository = {
  list(): Service[] {
    return services
  },
  getBySlug(slug: string): Service | undefined {
    return services.find((service) => service.slug === slug)
  }
}
