import type { TrustedBrand } from '~/types/trustedBrand'

/**
 * SAMPLE / MOCK DATA — no real client relationships are implied or claimed.
 * These names mirror the studio's own sample case studies (see data/projects.ts)
 * purely so the "Trusted By" wall links through to something real in this
 * prototype. No logo files exist for them, so the UI renders a typographic
 * wordmark rather than a fabricated logo mark — replace `logo` with a real,
 * permissioned asset path per brand before this ships with actual clients.
 */
export const trustedBrands: TrustedBrand[] = [
  { id: 1, name: 'Solene Cosmetics', caseStudySlug: 'solene-cosmetics' },
  { id: 2, name: 'Northfield Capital', caseStudySlug: 'northfield-capital' },
  { id: 3, name: 'Aperture Film Co.', caseStudySlug: 'aperture-film-co' },
  { id: 4, name: 'Kinetic Running', caseStudySlug: 'kinetic-running' },
  { id: 5, name: 'Marble & Co Interiors', caseStudySlug: 'marble-and-co' },
  { id: 6, name: 'Tidal Energy', caseStudySlug: 'tidal-energy' },
  { id: 7, name: 'Halo Health', caseStudySlug: 'halo-health' },
  { id: 8, name: 'Ferrous Studio', caseStudySlug: 'ferrous-studio' }
]
