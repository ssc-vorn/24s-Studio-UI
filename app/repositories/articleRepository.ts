import { articles } from '~/data/articles'
import type { Article } from '~/types/article'

export const articleRepository = {
  list(): Article[] {
    return articles
  },
  getBySlug(slug: string): Article | undefined {
    return articles.find((article) => article.slug === slug)
  }
}
