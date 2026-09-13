import type { Service } from '~/types/service'

export const services: Service[] = [
  {
    id: 1,
    slug: 'branding',
    index: '01',
    title: 'Branding',
    summary: 'Strategy, identity and art direction built to hold up for a decade, not a trend cycle.',
    description:
      'We build brand systems from a single point of view, not a mood board. Every identity we ship is structurally flexible enough to survive five years of real-world use before a single asset goes to production.',
    capabilities: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Brand Systems'],
    process: [
      'Positioning workshops with founders and leadership',
      'Concept direction — three distinct territories, not one safe option',
      'System development across every real-world touchpoint',
      'Documentation built for a team that isn’t us'
    ]
  },
  {
    id: 2,
    slug: 'digital',
    index: '02',
    title: 'Digital',
    summary: 'Websites and products engineered with the same rigour as the design behind them.',
    description:
      'Our digital work pairs art direction with production-grade engineering — what you approve in design is exactly what ships. We build modular, maintainable systems your own team can extend after we’re gone.',
    capabilities: ['Web Design', 'UX/UI', 'Web Development', 'Digital Experiences'],
    process: [
      'UX audit and information architecture',
      'Interface design in the browser, not just in the file',
      'Front-end build with production-grade engineering',
      'Handoff documentation and component library'
    ]
  },
  {
    id: 3,
    slug: 'video-motion',
    index: '03',
    title: 'Video & Motion',
    summary: 'Brand film, motion identity and commercial content shot and cut with intent.',
    description:
      'From concept to final grade, our motion work is built to be distinct enough to become a reference point for the brand, not disposable campaign content thrown away after one cycle.',
    capabilities: ['Video Editing', 'Motion Graphics', 'Commercial Content', 'Social Content'],
    process: [
      'Treatment and creative direction',
      'Production — direction, cinematography, sound',
      'Edit, motion and colour grade',
      'Cutdowns for every distribution channel'
    ]
  },
  {
    id: 4,
    slug: 'marketing',
    index: '04',
    title: 'Marketing',
    summary: 'Campaign strategy and channel execution that turns creative work into momentum.',
    description:
      'We design campaign platforms that scale across markets and channels without losing their shape, then hand over a system your team can run independently long after launch.',
    capabilities: ['Digital Marketing', 'Social Media', 'Campaigns', 'Content Strategy'],
    process: [
      'Channel and audience strategy',
      'Campaign platform and creative system',
      'Launch across paid, owned and earned channels',
      'Reporting cadence and iteration'
    ]
  }
]
