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
  { label: 'Experience', target: 'slide-5' },
  { label: 'Opportunity', target: 'slide-4' },
  { label: 'Investment', target: 'slide-9' },
  { label: 'Connect', target: 'slide-11' },
]

export const problemStatements = [
  'Student life costs more every year.',
  'Brands spend more to earn less Gen Z attention.',
  'The offers students need are scattered, generic, and hard to trust.',
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

export const journeySteps = [
  {
    title: 'Student verification',
    copy: 'Confirm eligibility through a student email or supporting document.',
    image: 'journey' as const,
  },
  {
    title: 'Explore discounts',
    copy: 'Discover relevant, local offers designed around student life.',
    image: 'solution' as const,
  },
  {
    title: 'Redeem offers',
    copy: 'Use a verified offer and give brands measurable engagement.',
    image: 'journey' as const,
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
      'Took ClassMate Qatar from early prototype to launch.',
      'Grew GMV to QAR 10M in 11 months.',
      'secured 358 partnerships across all categories in under 6 months',
    ],
  },
  {
    id: 'aazam',
    name: 'Aazam Thakur',
    fullName: 'Aazam Thakur',
    role: 'Co-founder, Technology',
    focus: 'Full-stack engineering, open source, and AI research',
    image: 'aazam',
    email: 'aazamthakur@gmail.com',
    phone: '+974 70450340',
    linkedin: 'https://www.linkedin.com/in/aazam-ln',
    achievements: [
      'Designed and built the RealX mobile and web ecosystem.',
      'Technical maintainer for Open Mainframe at the Linux Foundation.',
      'Contributed to data engineering at Airbyte.',
      'Selected for Google Summer of Code in AI research.',
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
  { year: 1, revenueIndex: 5, userIndex: 2 },
  { year: 2, revenueIndex: 7, userIndex: 5 },
  { year: 3, revenueIndex: 25, userIndex: 18 },
  { year: 4, revenueIndex: 48, userIndex: 48 },
  { year: 5, revenueIndex: 86, userIndex: 92 },
]
