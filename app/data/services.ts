import type { Service } from '~/types/service'

export const services: Service[] = [
  {
    id: 1,
    slug: 'digital-product-design',
    index: '01',
    title: 'Digital Product Design',
    summary: 'Product strategy, UX and interface design that turns complex ideas into clear, usable experiences.',
    description:
      'We design digital products from early concept to scalable systems — combining product strategy, UX and interface design to help startups and established companies turn complex ideas into experiences people actually want to use.',
    capabilities: ['Product Strategy', 'UX Design', 'UI Design', 'Design Systems'],
    process: [
      'Discovery and product strategy workshops',
      'UX flows and information architecture',
      'Interface design and prototyping',
      'Design system documentation and handoff'
    ],
    image: 'https://picsum.photos/1200/1500?random=501'
  },
  {
    id: 2,
    slug: 'web-design-development',
    index: '02',
    title: 'Web Design & Development',
    summary: 'Websites designed and engineered with the same rigour, from first sketch to production launch.',
    description:
      'Our web work pairs art direction with production-grade engineering — what you approve in design is exactly what ships. We build modular, maintainable sites your own team can extend long after we’re gone.',
    capabilities: ['Web Design', 'Front-End Development', 'CMS Integration', 'Performance Optimisation'],
    process: [
      'Sitemap, wireframes and content strategy',
      'Visual design in the browser, not just in the file',
      'Front-end build with production-grade engineering',
      'QA, launch and post-launch support'
    ],
    image: 'https://picsum.photos/1200/1500?random=502'
  },
  {
    id: 3,
    slug: 'digital-marketing-advertising',
    index: '03',
    title: 'Digital Marketing & Advertising',
    summary: 'Campaign strategy and paid media that turns creative work into measurable momentum.',
    description:
      'We design campaign platforms and advertising systems that scale across markets and channels without losing their shape, then hand over a system your team can run independently long after launch.',
    capabilities: ['Campaign Strategy', 'Paid Media', 'Social Advertising', 'Performance Reporting'],
    process: [
      'Channel and audience strategy',
      'Creative system and campaign platform',
      'Launch across paid, owned and earned channels',
      'Reporting cadence and iteration'
    ],
    image: 'https://picsum.photos/1200/1500?random=503'
  },
  {
    id: 4,
    slug: 'brand-identity',
    index: '04',
    title: 'Brand Identity',
    summary: 'Strategy, identity and art direction built to hold up for a decade, not a trend cycle.',
    description:
      'We build brand systems from a single point of view, not a mood board. Every identity we ship is structurally flexible enough to survive years of real-world use before a single asset goes to production.',
    capabilities: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Brand Systems'],
    process: [
      'Positioning workshops with founders and leadership',
      'Concept direction — three distinct territories, not one safe option',
      'System development across every real-world touchpoint',
      'Documentation built for a team that isn’t us'
    ],
    image: 'https://picsum.photos/1200/1500?random=504'
  }
]
