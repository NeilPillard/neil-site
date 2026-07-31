export type NavigationItem = {
  label: string
  target: `slide-${number}`
}

export type DetailItem = {
  title: string
  lines: string[]
}

export type Founder = {
  id: 'neil' | 'aazam'
  name: string
  fullName: string
  role: string
  focus: string
  image: 'neil' | 'aazam'
  email: string
  phone: string
  linkedin: string
  achievements: string[]
}

export const navigation: NavigationItem[] = [
  { label: 'Experience', target: 'slide-3' },
  { label: 'Opportunity', target: 'slide-4' },
  { label: 'Investment', target: 'slide-8' },
  { label: 'Connect', target: 'slide-10' },
]

export const problemStatements = [
  'Students have FOMO.',
  'Brands lack a unified student platform.',
  'No platform connects the two.',
]

export const marketStats = [
  {
    value: '800M+',
    label: 'Young consumers',
    note: 'A vast audience choosing experiences every day.',
  },
  {
    value: '65%',
    label: 'Under 35',
    note: 'Mobile-first consumers shaping what comes next.',
  },
  {
    value: 'Weekly',
    label: 'Every week',
    note: 'Discovery, decisions, and spending happen repeatedly.',
  },
]

export const verificationSteps = [
  {
    title: 'Verify instantly',
    timing: 'In seconds',
    copy: 'Use a student email or eligible certificate to unlock access.',
  },
  {
    title: 'Review securely',
    timing: 'Within 24 hours',
    copy: 'Upload a student ID or supporting document for a secure review.',
  },
]

export const businessModel: DetailItem[] = [
  {
    title: 'Subscription',
    lines: [
      'Memberships for students and general users.',
      'Designed so savings meaningfully exceed the subscription cost.',
    ],
  },
  {
    title: 'Strategic partnerships',
    lines: ['Telecom bundles.', 'Banking partnerships.'],
  },
  {
    title: 'Growth and visibility',
    lines: ['Paid featured placements.', 'Targeted campaigns and push notifications.'],
  },
  {
    title: 'Brand services',
    lines: [
      'Gen Z-focused campaigns.',
      'Content, influencer marketing, and digital promotion.',
    ],
  },
]

export const launchStrategy: DetailItem[] = [
  {
    title: 'Pre-launch waitlist',
    lines: ['Build early demand with trial memberships and priority access.'],
  },
  {
    title: 'Exclusive launch offer',
    lines: ['Trigger immediate downloads and first visits.'],
  },
  {
    title: 'Referral-led growth',
    lines: ['Let users unlock free access by inviting others.'],
  },
  {
    title: 'Digital distribution',
    lines: ['Use social media and creator-led campaigns to reach Gen Z.'],
  },
]

export const expansionStrategy: DetailItem[] = [
  {
    title: 'Build and validate',
    lines: ['Launch across Kerala.', 'Establish product-market fit and repeat usage.'],
  },
  {
    title: 'Expand to metros',
    lines: [
      'Launch in major metropolitan cities across India.',
      'Scale partnerships and brand visibility.',
    ],
  },
  {
    title: 'Scale nationwide',
    lines: ['Expand into Tier 2 cities and key tourist destinations.'],
  },
  {
    title: 'Own the decision moment',
    lines: [
      'Become the default app for going out.',
      'Make Kouponly the first check before any experience.',
    ],
  },
]

export const founders: Founder[] = [
  {
    id: 'neil',
    name: 'Neil Pillard',
    fullName: 'Neil Jose Pillard',
    role: 'Co-founder, Growth',
    focus: 'Scaling, growth, and business development',
    image: 'neil',
    email: 'neil.j.pillard@gmail.com',
    phone: '+974 3363 7582',
    linkedin: 'https://www.linkedin.com/in/neilpillard',
    achievements: [
      'Scaled ClassMate App Qatar from concept to a live platform.',
      'Drove QAR 10M+ in GMV within the first year.',
      'Built a 350+ partner network across multiple industries in Qatar within the first year.',
    ],
  },
  {
    id: 'aazam',
    name: 'Aazam Thakur',
    fullName: 'Aazam Thakur',
    role: 'Co-founder, Technology',
    focus: 'Engineering, Product and Design',
    image: 'aazam',
    email: 'aazamthakur@gmail.com',
    phone: '+974 7045 0340',
    linkedin: 'https://www.linkedin.com/in/aazam-ln',
    achievements: [
      'Designed and Developed the entier technical ecosystem of RealX (Mobile + Web Applications)',
      'OpenMainframe Technical Maintainer (Linux Foundation - 300M ARR)',
      'Previous OSS Contributor Data Engineering - Airbyte (YC 20 Winter Batch - 20M ARR)',
    ],
  },
]

export const investmentAllocations = [
  { label: 'Product and technology', value: 20 },
  { label: 'People and talent', value: 25 },
  { label: 'Partners and supply', value: 10 },
  { label: 'Operations and compliance', value: 5 },
]

export const projectionYears = [
  { year: 1, revenueCr: 0, outlook: 'Early launch / market entry' },
  { year: 2, revenueCr: 80, outlook: 'Initial traction' },
  { year: 3, revenueCr: 330, outlook: 'Significant growth' },
  { year: 4, revenueCr: 830, outlook: 'Accelerated expansion' },
  { year: 5, revenueCr: 1650, outlook: 'Large-scale market penetration' },
]
