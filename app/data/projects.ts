import type { Project } from '~/types/project'

export const projects: Project[] = [
  {
    id: 1,
    slug: 'solene-cosmetics',
    title: 'Solene',
    client: 'Solene Cosmetics',
    category: 'Branding',
    services: ['Brand Strategy', 'Visual Identity', 'Packaging'],
    year: '2026',
    coverImage: 'https://picsum.photos/1600/2000?random=301',
    gallery: [
      'https://picsum.photos/1400/1000?random=302',
      'https://picsum.photos/1000/1300?random=303',
      'https://picsum.photos/1400/1000?random=304'
    ],
    excerpt: 'A full identity system for a clean-beauty label — wordmark, packaging language and a restrained editorial art direction.',
    challenge:
      'Solene entered a crowded clean-beauty category with no distinct visual language. Every competitor leaned on the same pastel palette and script logotype, making genuine differentiation nearly impossible at shelf and online.',
    strategy:
      'We repositioned Solene around precision rather than softness — a beauty brand built for people who read ingredient labels. The strategy traded pastel warmth for clinical clarity, using restraint as the primary signal of quality.',
    creativeDirection:
      'The identity is built on a single architectural wordmark, a monochrome navy palette, and typographic packaging that reads more like a laboratory notebook than a cosmetics shelf. Photography favors texture and material over lifestyle staging.',
    execution:
      'We delivered the full identity system, packaging for eleven SKUs, a modular web experience and a photography direction guide, all shipped inside an eight-week production window alongside the in-house team.',
    result:
      'The relaunched line sold through its first production run ahead of forecast, and the identity has since been adopted as the reference system for two subsequent product lines.',
    featured: true
  },
  {
    id: 2,
    slug: 'northfield-capital',
    title: 'Northfield',
    client: 'Northfield Capital',
    category: 'Digital',
    services: ['UX/UI', 'Web Development', 'Digital Experience'],
    year: '2026',
    coverImage: 'https://picsum.photos/1600/2000?random=305',
    gallery: [
      'https://picsum.photos/1400/1000?random=306',
      'https://picsum.photos/1000/1300?random=307',
      'https://picsum.photos/1400/1000?random=308'
    ],
    excerpt: 'A digital experience for an asset manager — modular content system, data visualisation and a calm, confident interface.',
    challenge:
      'Northfield’s existing site buried its investment philosophy under generic finance-template visuals, undermining the trust the firm had spent a decade building with institutional clients.',
    strategy:
      'We designed the experience around legibility and restraint — letting Northfield’s actual performance data and research carry the page, rather than stock imagery of skylines and handshakes.',
    creativeDirection:
      'A quiet, confident interface: a single accent colour reserved for data, generous margins, and a typographic system built to make dense financial content genuinely readable.',
    execution:
      'A fully modular Nuxt front end with a custom data-visualisation layer, built to be maintained by Northfield’s internal content team without further studio involvement.',
    result:
      'Average session duration on the research section more than doubled within the first quarter post-launch, and the site now anchors every institutional pitch deck.',
    featured: true
  },
  {
    id: 3,
    slug: 'aperture-film-co',
    title: 'Aperture',
    client: 'Aperture Film Co.',
    category: 'Video',
    services: ['Direction', 'Cinematography', 'Colour Grading'],
    year: '2025',
    coverImage: 'https://picsum.photos/1600/2000?random=309',
    gallery: [
      'https://picsum.photos/1400/1000?random=310',
      'https://picsum.photos/1000/1300?random=311'
    ],
    excerpt: 'Documentary-style brand film shot across three cities, cut for both cinema release and social distribution.',
    challenge: 'Aperture needed a brand film that could open film festivals and still cut cleanly into fifteen-second social edits without feeling compromised in either format.',
    strategy: 'We built the shoot around modular vignettes rather than one continuous narrative, so each sequence could stand alone or combine into the full seven-minute cut.',
    creativeDirection: 'Handheld documentary cinematography, natural light only, a restrained sound design built from location audio rather than a scored soundtrack.',
    execution: 'A five-day shoot across three cities, edited into a long-form cut and fourteen short-form variants for paid and organic social distribution.',
    result: 'The film screened at two regional festivals and became Aperture’s highest-performing acquisition asset of the year.',
    featured: false
  },
  {
    id: 4,
    slug: 'kinetic-running',
    title: 'Kinetic',
    client: 'Kinetic Running',
    category: 'Video',
    services: ['Motion Graphics', 'Title Design', 'Sound Design'],
    year: '2025',
    coverImage: 'https://picsum.photos/1600/2000?random=312',
    gallery: [
      'https://picsum.photos/1400/1000?random=313',
      'https://picsum.photos/1000/1300?random=314'
    ],
    excerpt: 'A motion identity built from typographic fragments and fabric simulation, deployed across launch and product film.',
    challenge: 'Kinetic’s launch film needed a motion language distinct enough to anchor the brand for years, not just one campaign cycle.',
    strategy: 'We built the entire motion system from a single typographic asset — the wordmark itself — rather than importing decorative effects unrelated to the brand.',
    creativeDirection: 'Kinetic type fragments, cloth and fabric simulation tied to footstrike rhythm, and a sound design built around breath and stride cadence.',
    execution: 'A modular after-effects rig delivered to the in-house team, alongside the launch film and six cutdowns for paid media.',
    result: 'The motion system became the reference point for the brand’s entire visual identity going forward.',
    featured: false
  },
  {
    id: 5,
    slug: 'marble-and-co',
    title: 'Marble & Co',
    client: 'Marble & Co Interiors',
    category: 'Branding',
    services: ['Identity Design', 'Print Collateral', 'Signage'],
    year: '2025',
    coverImage: 'https://picsum.photos/1600/2000?random=315',
    gallery: [
      'https://picsum.photos/1400/1000?random=316',
      'https://picsum.photos/1000/1300?random=317'
    ],
    excerpt: 'Identity, print collateral and signage for a design-led interiors studio expanding into three new markets.',
    challenge: 'Marble & Co’s identity hadn’t evolved since the studio’s founding, and no longer matched the calibre of the work it now produced.',
    strategy: 'We rebuilt the identity around material honesty — the same principle that defines the studio’s interior work — letting texture and typography carry the brand rather than illustration.',
    creativeDirection: 'A quarried-stone colour palette, a single architectural serif, and signage detailed to the same tolerance as the studio’s built work.',
    execution: 'Full identity system, print collateral for three showrooms, and fabricated signage across two new market openings.',
    result: 'The refreshed identity launched alongside the studio’s expansion into two new cities without incident.',
    featured: false
  },
  {
    id: 6,
    slug: 'tidal-energy',
    title: 'Tidal',
    client: 'Tidal Energy',
    category: 'Marketing',
    services: ['Campaign Strategy', 'Paid Media', 'Content Strategy'],
    year: '2025',
    coverImage: 'https://picsum.photos/1600/2000?random=318',
    gallery: [
      'https://picsum.photos/1400/1000?random=319',
      'https://picsum.photos/1000/1300?random=320'
    ],
    excerpt: 'A campaign platform and paid-media system supporting a renewable energy brand’s European expansion.',
    challenge: 'Tidal needed to build market awareness across four new countries simultaneously without a proportional increase in production budget.',
    strategy: 'We designed one modular campaign platform that could be localised per market rather than producing bespoke campaigns for each region.',
    creativeDirection: 'A restrained, data-forward visual system built around real infrastructure photography rather than abstract renewable-energy stock imagery.',
    execution: 'A twelve-month paid media system, localisation toolkit, and quarterly content calendar handed off to Tidal’s regional teams.',
    result: 'Brand awareness metrics rose across all four target markets within two quarters of launch.',
    featured: false
  },
  {
    id: 7,
    slug: 'halo-health',
    title: 'Halo',
    client: 'Halo Health',
    category: 'Digital',
    services: ['UX/UI', 'Digital Experiences'],
    year: '2024',
    coverImage: 'https://picsum.photos/1600/2000?random=321',
    gallery: [
      'https://picsum.photos/1400/1000?random=322',
      'https://picsum.photos/1000/1300?random=323'
    ],
    excerpt: 'A patient-facing product experience redesigned around clarity, trust and accessible interaction patterns.',
    challenge: 'Halo’s existing patient portal scored poorly on usability testing across every age group, undermining trust at the exact moment patients needed it most.',
    strategy: 'We rebuilt the experience around a single principle — never make a patient guess what happens next — and tested every flow against that standard.',
    creativeDirection: 'A calm, high-contrast interface built to WCAG AA as a baseline rather than an afterthought, with plain-language copy throughout.',
    execution: 'A full UX audit, redesigned core flows, and a component library documented for Halo’s internal engineering team.',
    result: 'Task-completion rates in usability testing improved substantially across every tested age group.',
    featured: false
  },
  {
    id: 8,
    slug: 'ferrous-studio',
    title: 'Ferrous',
    client: 'Ferrous Studio',
    category: 'Video',
    services: ['Motion Graphics', 'Sound Design'],
    year: '2024',
    coverImage: 'https://picsum.photos/1600/2000?random=324',
    gallery: [
      'https://picsum.photos/1400/1000?random=325',
      'https://picsum.photos/1000/1300?random=326'
    ],
    excerpt: 'Title sequence and sonic-motion language for an independent design studio’s showreel.',
    challenge: 'Ferrous wanted a showreel opener that felt distinct from the fast-cut, high-energy convention of most studio reels.',
    strategy: 'We slowed the pacing down deliberately, trusting a smaller number of confident moves over a high edit count.',
    creativeDirection: 'A title sequence built from negative space and a single kinetic typographic move, paired with a minimal sound design.',
    execution: 'A ninety-second title sequence delivered in three aspect ratios for reel, site and social use.',
    result: 'The sequence has run unchanged as Ferrous’s reel opener for two consecutive years.',
    featured: false
  }
]
