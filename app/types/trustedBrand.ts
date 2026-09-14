export interface TrustedBrand {
  id: number
  name: string
  /** Path to a real logomark, when one exists. Absent → the UI renders a typographic wordmark instead of a fabricated logo image. */
  logo?: string
  /** Optional link through to a related case study, when one exists. */
  caseStudySlug?: string
}
