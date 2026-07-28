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
  { label: 'Product', target: 'slide-5' },
  { label: 'Market', target: 'slide-4' },
  { label: 'Strategy', target: 'slide-8' },
  { label: 'Team', target: 'slide-10' },
  { label: 'Investment', target: 'slide-13' },
  { label: 'Contact', target: 'slide-16' },
]

export const problemStatements = [
  'Rising living and education costs put financial pressure on students.',
  'Brands struggle to reach and engage Gen Z audiences effectively.',
  'There is no unified platform dedicated to student needs.',
]

export const marketStats = [
  {
    value: '800M+',
    label: 'Youth audience',
    note: 'A massive, experience-driven consumer segment.',
  },
  {
    value: '65%',
    label: 'Population under 35',
    note: 'Mobile-first consumers who actively shape demand.',
  },
  {
    value: 'Weekly',
    label: 'High-frequency behavior',
    note: 'Millions of young consumers go out every week.',
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
    title: 'Instant verification',
    timing: 'Immediate',
    copy: 'Users enter a student email or upload a 10th/12th certificate for automated verification.',
  },
  {
    title: 'Document review',
    timing: 'Within 24 hours',
    copy: 'Users upload a student ID or supporting documents for review by Kouponly.',
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
    linkedin: 'https://www.linkedin.com/in/neilpilllard',
    achievements: [
      'Scaled ClassMate App Qatar during its early prototype phase and led the launch.',
      'Raised GMV to QAR 10M in 11 months.',
      'Secured more than 350 partnerships in under six months.',
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
      'Designed and developed the RealX mobile and web application ecosystem.',
      'OpenMainframe technical maintainer at the Linux Foundation.',
      'Open-source contributor in data engineering at Airbyte.',
      'Google Summer of Code contributor in AI research.',
    ],
  },
]

export const investmentAllocations = [
  { label: 'Technology and product development', value: 20 },
  { label: 'Team expansion and salaries', value: 25 },
  { label: 'Vendor acquisition and partnerships', value: 10 },
  { label: 'Legal, compliance, and operations', value: 5 },
]

export const projectionYears = [
  { year: 1, revenueIndex: 5, userIndex: 2 },
  { year: 2, revenueIndex: 7, userIndex: 5 },
  { year: 3, revenueIndex: 25, userIndex: 18 },
  { year: 4, revenueIndex: 48, userIndex: 48 },
  { year: 5, revenueIndex: 86, userIndex: 92 },
]
