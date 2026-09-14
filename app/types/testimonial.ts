export interface Testimonial {
  id: number
  quote: string
  clientName: string
  role: string
  company: string
  /** Human-readable engagement name, when this testimonial speaks to a specific case study. */
  project?: string
  /** Human-readable discipline, when this testimonial speaks to a specific service line. */
  service?: string
  /** Client portrait, when a real, permissioned photo exists. */
  portrait?: string
  /** Client/company logo, when a real, permissioned asset exists. */
  logo?: string
  /** Surfaces this testimonial in the Home editorial slider. */
  featured?: boolean
  /** Links to a case study (`work/[slug]`) so the two never need to store the same content twice. */
  projectSlug?: string
  /** Links to a service section on the Services page. */
  serviceSlug?: string
}
