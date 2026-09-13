import type { Service } from '~/types/service'

export const services: Service[] = [
  {
    id: 1,
    index: '01',
    title: 'Graphic Design',
    description: 'Editorial systems, print collateral and visual language built to hold up across every surface a brand touches.',
    capabilities: ['Art direction', 'Print & packaging', 'Layout systems', 'Typography']
  },
  {
    id: 2,
    index: '02',
    title: 'Branding & Visual Identity',
    description: 'Naming, identity systems and brand worlds designed to feel inevitable — distinct, durable, unmistakably yours.',
    capabilities: ['Identity design', 'Brand strategy', 'Naming', 'Guidelines']
  },
  {
    id: 3,
    index: '03',
    title: 'Video Production & Editing',
    description: 'From concept to final grade — brand films, documentaries and campaign content shot and cut with intent.',
    capabilities: ['Direction', 'Cinematography', 'Editing', 'Colour grading']
  },
  {
    id: 4,
    index: '04',
    title: 'Motion Graphics',
    description: 'Kinetic identity systems, title sequences and animated storytelling that move brands with purpose.',
    capabilities: ['2D/3D animation', 'Title design', 'Kinetic type', 'Sound design']
  },
  {
    id: 5,
    index: '05',
    title: 'Digital Experiences',
    description: 'Websites and interactive products engineered with the same rigour as the design behind them.',
    capabilities: ['Web design', 'Front-end build', 'Interaction design', 'Prototyping']
  },
  {
    id: 6,
    index: '06',
    title: 'Digital Marketing',
    description: 'Campaign strategy and channel execution that turns creative work into measurable momentum.',
    capabilities: ['Campaign strategy', 'Paid media', 'Content systems', 'Analytics']
  }
]
