import type { Service } from '~/types/service'

export const services: Service[] = [
  {
    id: 1,
    slug: 'graphic-design',
    index: '01',
    title: 'Graphic Design',
    summary: 'Print, packaging and digital graphics built with the same editorial discipline as the brand system around them.',
    description:
      'From packaging and print collateral to digital layouts and campaign assets, we treat every graphic as a small piece of the larger brand system — considered typography, deliberate composition and a point of view, not decoration applied after the fact.',
    capabilities: ['Print & Packaging', 'Layout & Composition', 'Typography Systems', 'Campaign Assets'],
    process: [
      'Audit of existing assets and visual language',
      'Concept exploration across real formats, not mockups',
      'Refinement against production constraints',
      'Production-ready files and usage guidelines'
    ],
    image: 'https://picsum.photos/1200/1500?random=501'
  },
  {
    id: 2,
    slug: 'brand-identity',
    index: '02',
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
  },
  {
    id: 3,
    slug: 'video-editing',
    index: '03',
    title: 'Video Editing',
    summary: 'Cinematic edits and motion language that hold a brand together across every cut, from launch film to fifteen-second cutdown.',
    description:
      'We cut brand films, campaign content and social edits with the same rigour as the identity they carry — pacing, sound design and colour treated as brand decisions, not post-production afterthoughts.',
    capabilities: ['Narrative Editing', 'Motion Graphics', 'Colour Grading', 'Sound Design'],
    process: [
      'Story and pacing plan before a single cut is made',
      'Assembly edit reviewed against the brand’s motion language',
      'Colour, sound and motion graphics pass',
      'Delivery across every aspect ratio and platform'
    ],
    image: 'https://picsum.photos/1200/1500?random=502'
  },
  {
    id: 4,
    slug: 'digital-marketing',
    index: '04',
    title: 'Digital Marketing',
    summary: 'Channel strategy and content systems that turn creative work into measurable, repeatable momentum.',
    description:
      'We design content and channel strategies that scale across markets without losing their shape, then hand over a system your team can run independently long after launch.',
    capabilities: ['Channel Strategy', 'Content Systems', 'Social Strategy', 'Performance Reporting'],
    process: [
      'Audience and channel audit',
      'Content system and editorial calendar',
      'Launch across owned and earned channels',
      'Reporting cadence and iteration'
    ],
    image: 'https://picsum.photos/1200/1500?random=503'
  },
  {
    id: 5,
    slug: 'advertising',
    index: '05',
    title: 'Advertising',
    summary: 'Campaign platforms and paid media built to travel across markets without losing their voice.',
    description:
      'From concept to media buy, we build advertising campaigns as a coherent creative platform — one idea that flexes across formats and markets rather than a set of disconnected executions.',
    capabilities: ['Campaign Strategy', 'Paid Media', 'Creative Production', 'Media Planning'],
    process: [
      'Campaign platform and creative territory',
      'Production across every required format',
      'Media planning and launch',
      'Optimisation against real performance data'
    ],
    image: 'https://picsum.photos/1200/1500?random=505'
  }
]
