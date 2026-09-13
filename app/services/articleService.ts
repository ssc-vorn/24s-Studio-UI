import { articleRepository } from '~/repositories/articleRepository'
import type { Article } from '~/types/article'

/** Business rules built on top of `articleRepository` — featured/latest selection, related and next-article navigation. */
export const articleService = {
  getFeatured(): Article | undefined {
    return articleRepository.list()[0]
  },

  getLatest(limit = 4): Article[] {
    return articleRepository.list().slice(0, limit)
  },

  getRelated(currentSlug: string, limit = 3): Article[] {
    const current = articleRepository.getBySlug(currentSlug)
    const rest = articleRepository.list().filter((article) => article.slug !== currentSlug)
    if (!current) return rest.slice(0, limit)

    const sameCategory = rest.filter((article) => article.category === current.category)
    const combined = [...sameCategory, ...rest.filter((article) => !sameCategory.includes(article))]
    return combined.slice(0, limit)
  },

  getNext(currentSlug: string): Article | undefined {
    const all = articleRepository.list()
    const index = all.findIndex((article) => article.slug === currentSlug)
    if (index === -1) return all[0]
    return all[(index + 1) % all.length]
  }
}
