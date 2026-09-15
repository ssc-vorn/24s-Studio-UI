import type { Testimonial } from '~/types/testimonial'

/**
 * SAMPLE / MOCK DATA — no real client relationships are implied or claimed.
 * Entries link to the studio's own sample case studies (see data/projects.ts)
 * via `projectSlug`/`serviceSlug` purely so the testimonial system has real
 * cross-references to demonstrate against in this prototype. No portrait or
 * logo assets exist for them, so the UI renders quote + attribution only —
 * add a real, permissioned `portrait`/`logo` per client before this ships
 * with actual clients.
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'They didn’t just design a brand — they gave us a point of view. Every deliverable felt considered, and the process was the smoothest we’ve had with any studio.',
    clientName: 'Elena Marchetti',
    role: 'Chief Marketing Officer',
    company: 'Solene Cosmetics',
    project: 'Brand Identity & Packaging',
    service: 'Brand Identity',
    projectSlug: 'solene-cosmetics',
    serviceSlug: 'brand-identity',
    featured: true
  },
  {
    id: 2,
    quote:
      'The digital experience they built increased engagement across every metric we track. More importantly, it finally feels like our patients trust the product.',
    clientName: 'Marcus Feld',
    role: 'Head of Product',
    company: 'Halo Health',
    project: 'Patient Portal Redesign',
    service: 'Web Design & Development',
    projectSlug: 'halo-health',
    serviceSlug: 'web-design-development',
    featured: false
  },
  {
    id: 3,
    quote:
      'Rare to find a partner equally strong in strategy and craft. They challenged our thinking and still shipped on time, every time.',
    clientName: 'Priya Nair',
    role: 'Founder',
    company: 'Northfield Capital',
    project: 'Digital Experience Platform',
    service: 'Digital Product Design',
    projectSlug: 'northfield-capital',
    serviceSlug: 'digital-product-design',
    featured: true
  },
  {
    id: 4,
    quote:
      'They understood the film could open a festival and still cut into fifteen-second edits without feeling compromised. That balance is rare.',
    clientName: 'Jonas Reyes',
    role: 'Creative Director',
    company: 'Aperture Film Co.',
    project: 'Brand Film & Social Cutdowns',
    service: 'Video Editing',
    projectSlug: 'aperture-film-co',
    serviceSlug: 'video-editing',
    featured: true
  },
  {
    id: 5,
    quote:
      'One campaign platform, four markets, zero compromises. They handed our team something we can actually keep running ourselves.',
    clientName: 'Freya Lindqvist',
    role: 'Head of Marketing',
    company: 'Tidal Energy',
    project: 'European Campaign Platform',
    service: 'Advertising',
    projectSlug: 'tidal-energy',
    serviceSlug: 'advertising',
    featured: true
  }
]
