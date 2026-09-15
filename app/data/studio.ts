import type { ProcessStage, StudioValue, TeamMember } from '~/types/studio'

export const studioValues: StudioValue[] = [
  { title: 'Craft', description: 'Every pixel and frame is considered — nothing ships because it was easy.' },
  { title: 'Curiosity', description: 'We start each project by questioning the brief, not just answering it.' },
  { title: 'Candor', description: 'Honest creative feedback, even when it slows us down in the short term.' },
  { title: 'Restraint', description: 'The best decision is often the one we don’t make. Less, done properly.' }
]

export const teamMembers: TeamMember[] = [
  { name: 'Elena Marchetti', role: 'Founder & Creative Director', image: 'https://picsum.photos/500/600?random=371' },
  { name: 'Tom Bellweather', role: 'Motion Director', image: 'https://picsum.photos/500/600?random=372' },
  { name: 'Priya Nair', role: 'Head of Strategy', image: 'https://picsum.photos/500/600?random=373' },
  { name: 'Marcus Feld', role: 'Lead Engineer', image: 'https://picsum.photos/500/600?random=374' }
]

export const processStages: ProcessStage[] = [
  {
    index: '01',
    title: 'Discover',
    description: 'We start by questioning the brief, not answering it.',
    detail:
      'Workshops with your team, audits of the existing brand and competitive landscape, and enough uncomfortable questions to find the real problem before we design anything.'
  },
  {
    index: '02',
    title: 'Define',
    description: 'A single, defensible point of view — not three safe options.',
    detail:
      'We narrow discovery into one positioning and one creative direction, tested against every real-world use case before a single pixel is refined.'
  },
  {
    index: '03',
    title: 'Create',
    description: 'Design developed in the medium it will actually live in.',
    detail:
      'Identity, interface and motion built together so nothing arrives disconnected — packaging tested under real light, interfaces built in the browser, film cut against real footage.'
  },
  {
    index: '04',
    title: 'Deliver',
    description: 'Documentation your team can run without us.',
    detail:
      'Every engagement ends with a system, not just a set of files — guidelines, component libraries and process notes built for a team that isn’t us.'
  }
]

// Deliberately not a claimed history of years/clients/projects — those
// numbers don't exist yet for a studio this new, and stating them as fact
// would be exactly the fabricated business claim the brief warns against.
// Every value here is either literally true today (disciplines, services)
// or a values statement, not a performance metric.
export const studioStats = [
  { value: '05', label: 'Core Disciplines' },
  { value: '100%', label: 'Creative Focus' },
  { value: '01', label: 'Unified Studio' }
]
