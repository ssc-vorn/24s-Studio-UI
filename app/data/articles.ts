import type { Article } from '~/types/article'

export const articles: Article[] = [
  {
    id: 1,
    slug: 'the-future-of-brand-design',
    title: 'The Future of Brand Design',
    category: 'Branding',
    excerpt: 'The identities that outlive their trends share three qualities most brand refreshes ignore entirely.',
    content: [
      'The identities that outlive their trends share three qualities most brand refreshes ignore entirely: restraint, structural flexibility, and a point of view that isn’t borrowed from a competitor.',
      'In this piece we walk through how we stress-test a new identity system against five years of hypothetical use before a single asset ships — from packaging under harsh retail lighting to a wordmark reduced to sixteen pixels in a browser tab.',
      'Restraint is the hardest discipline in the room. Every stakeholder wants to add one more flourish; the studio’s job is to protect the system from itself.'
    ],
    image: 'https://picsum.photos/1200/900?random=381',
    date: '2026-08-12',
    readingTime: '6 min read',
    author: 'Elena Marchetti'
  },
  {
    id: 2,
    slug: 'designing-digital-experiences',
    title: 'Designing Digital Experiences',
    category: 'Digital',
    excerpt: 'Speed isn’t the only metric that matters. Sometimes the right interaction takes an extra 200 milliseconds.',
    content: [
      'Speed isn’t the only metric that matters. Sometimes the right interaction takes an extra 200 milliseconds — and it’s worth it.',
      'We break down the interaction-design decisions behind three recent product launches and what they taught us about pacing, and why a technically “faster” interface can still feel worse to use.',
      'The best digital experiences are paced like good editing — every transition earns its place, and nothing lingers longer than the content it’s serving.'
    ],
    image: 'https://picsum.photos/1200/900?random=382',
    date: '2026-07-04',
    readingTime: '7 min read',
    author: 'Priya Nair'
  },
  {
    id: 3,
    slug: 'why-motion-matters',
    title: 'Why Motion Matters',
    category: 'Motion',
    excerpt: 'Good motion design disappears into the brand. Here’s how we build kinetic systems that never call attention to themselves.',
    content: [
      'Good motion design disappears into the brand. Here’s how we build kinetic systems that never call attention to themselves — starting from typographic logic rather than trend-driven effects.',
      'We test every transition against real content, not placeholder decks, because motion that only works on a clean mockup rarely survives contact with a real product.',
      'Motion should answer a question the viewer already has — where did that go, what happens next — never introduce a new one.'
    ],
    image: 'https://picsum.photos/1200/900?random=383',
    date: '2026-05-30',
    readingTime: '4 min read',
    author: 'Tom Bellweather'
  },
  {
    id: 4,
    slug: 'directing-a-brand-film-on-a-tight-timeline',
    title: 'Directing a Brand Film on a Founder’s Timeline',
    category: 'Video',
    excerpt: 'How we shot, cut and delivered a three-city documentary brand film in five weeks without compromising the story.',
    content: [
      'How we shot, cut and delivered a three-city documentary brand film in five weeks without compromising the story — including the pre-production decisions that made the compressed schedule possible.',
      'The single biggest lever was shooting modular vignettes instead of one continuous narrative, so the edit could adapt to whatever the footage actually gave us.',
      'Compression forces discipline. Every decision that would normally get revisited three times got made once, correctly, up front.'
    ],
    image: 'https://picsum.photos/1200/900?random=384',
    date: '2026-06-19',
    readingTime: '8 min read',
    author: 'Marcus Feld'
  },
  {
    id: 5,
    slug: 'why-we-stopped-pitching-mood-boards',
    title: 'Why We Stopped Pitching Mood Boards',
    category: 'Strategy',
    excerpt: 'Mood boards flatter clients into agreement. Here’s the concept-direction process we use instead.',
    content: [
      'Mood boards flatter clients into agreement without testing whether an idea actually works. Here’s the concept-direction process we use instead, and why it produces sharper first rounds.',
      'Instead of a board of borrowed references, we present three fully-realised territories built on the actual brand — each one defensible, none of them safe.',
      'It’s a harder conversation in the room, and a much better one six months later.'
    ],
    image: 'https://picsum.photos/1200/900?random=385',
    date: '2026-05-08',
    readingTime: '5 min read',
    author: 'Elena Marchetti'
  }
]
