import { trustedBrands } from '~/data/trustedBrands'
import type { TrustedBrand } from '~/types/trustedBrand'

export const trustedBrandRepository = {
  list(): TrustedBrand[] {
    return trustedBrands
  }
}
