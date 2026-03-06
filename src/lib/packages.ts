export interface Package {
  slug: string
  name: string
  tagline: string
  price: number
  priceLabel: string
  duration: string
  description: string
  includes: string[]
  whatToExpect: string[]
  idealFor: string
  groupSize: string
  image: string
  featured: boolean
}

export const packages: Package[] = [
  {
    slug: 'discovery',
    name: 'Polo Discovery Experience',
    tagline: 'Your first taste of the Sport of Kings',
    price: 199,
    priceLabel: '€199 per person',
    duration: '2 hours',
    description: 'Perfect for tourists and curious beginners, this 2-hour experience introduces you to the world of polo. No prior horse riding experience needed — just bring your sense of adventure.',
    includes: [
      'Polo introduction and history session',
      'Horse riding basics (if needed)',
      'Stickwork practice on wooden horse',
      'One chukker with professional instructor',
      'Champagne toast celebration',
      'Digital photo package (20 edited photos)',
    ],
    whatToExpect: [
      'No prior horse riding experience needed',
      'All equipment provided (helmets, boots, mallets)',
      'Group size: 4-6 people',
      'Available time slots: 10:00 AM, 2:00 PM, 6:00 PM',
      'Wear comfortable clothing — we provide the rest',
    ],
    idealFor: 'Tourists, curious beginners, special occasions',
    groupSize: '4-6 people',
    image: '/images/discovery.jpg',
    featured: true,
  },
  {
    slug: 'weekend',
    name: 'Polo Weekend Package',
    tagline: 'Two days of polo, unforgettable memories',
    price: 599,
    priceLabel: '€599 per person',
    duration: '2 days',
    description: 'Spend a weekend immersed in polo with three lessons over two days. Progress from complete beginner to playing your first chukkers, all while enjoying the beautiful Sotogrande setting.',
    includes: [
      'Day 1: Full Polo Discovery Experience',
      'Day 2: Two chukkers with gameplay',
      'All equipment (helmets, boots, mallets)',
      'Lunch at the club restaurant (both days)',
      'Digital photo package (50 edited photos)',
      'Branded polo shirt (your size)',
      'Certificate of participation',
    ],
    whatToExpect: [
      'Prior horse riding experience helpful but not required',
      'All equipment provided',
      'Group size: 4-6 people',
      'Saturday 10 AM - 6 PM, Sunday 10 AM - 4 PM',
      'Accommodation add-on available',
    ],
    idealFor: 'Weekend travelers, couples, small groups',
    groupSize: '4-6 people',
    image: '/images/weekend.jpg',
    featured: true,
  },
  {
    slug: 'week-immersion',
    name: 'Polo Week Immersion',
    tagline: 'The ultimate polo holiday in Andalusia',
    price: 1499,
    priceLabel: '€1,499 per person',
    duration: '5 days, 4 nights',
    description: 'Our flagship experience: five days of intensive polo training in Sotogrande. Includes accommodation, daily lessons, social events, and a final tournament. The complete polo holiday.',
    includes: [
      'Daily polo lessons (3 chukkers per day)',
      'Evening social events (welcome drinks, tapas night, farewell dinner)',
      'Match-watching during tournament season',
      '4-night accommodation at 4-star partner hotel',
      'Breakfast and lunch daily',
      'Video analysis and feedback',
      'Final tournament with prizes',
      'Certificate of completion',
      'Polo shirt and cap (branded)',
      'Digital photo + video package',
    ],
    whatToExpect: [
      'No prior horse riding experience needed',
      'Intensive but supportive learning environment',
      'Group size: 4-8 people',
      'Daily schedule: 10 AM - 4 PM (lessons), evening events',
      '4-star hotel accommodation included',
    ],
    idealFor: 'Serious beginners, families, polo holiday seekers',
    groupSize: '4-8 people',
    image: '/images/immersion.jpg',
    featured: true,
  },
  {
    slug: 'corporate',
    name: 'Corporate Team Building',
    tagline: 'Unite your team with the Sport of Kings',
    price: 2500,
    priceLabel: '€2,500 per group',
    duration: 'Half day (4 hours)',
    description: 'A unique corporate experience that combines teamwork, strategy, and the thrill of polo. Perfect for company retreats, client entertainment, and team building events in southern Spain.',
    includes: [
      'Polo introduction for the whole team',
      'Mini-tournament (teams of 3, 3 chukkers)',
      'All equipment and horses',
      'Professional instructor',
      'Gourmet lunch with drinks',
      'Team awards ceremony',
      'Video highlights (10-minute montage)',
      'Digital photo package (50+ photos)',
    ],
    whatToExpect: [
      'No prior experience needed for any participant',
      'Focus on team collaboration and fun',
      'Suitable for all fitness levels',
      'Group size: 6-12 people',
      'Professional photos and video for company marketing',
    ],
    idealFor: 'Company retreats, team building, client entertainment',
    groupSize: '6-12 people',
    image: '/images/corporate.jpg',
    featured: true,
  },
  {
    slug: 'private-lessons',
    name: 'Private Polo Lessons',
    tagline: 'One-on-one instruction at your pace',
    price: 150,
    priceLabel: '€150 per hour',
    duration: '1 hour',
    description: 'Personalized one-on-one polo instruction tailored to your skill level. Whether you are a complete beginner or looking to refine your technique, our professional instructors create a custom lesson plan just for you.',
    includes: [
      'Private 1-on-1 instruction',
      'Horse and all equipment',
      'Custom lesson plan',
      'Progress tracking',
      'Flexible scheduling (morning, afternoon, evening)',
    ],
    whatToExpect: [
      'Suitable for all levels (beginner to advanced)',
      'Customized instruction pace',
      'Flexible scheduling available',
      'Cancel 24 hours in advance for full refund',
      'Video feedback available (+€30)',
    ],
    idealFor: 'Serious learners, locals, advanced players',
    groupSize: '1 person',
    image: '/images/private.jpg',
    featured: true,
  },
]

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find(p => p.slug === slug)
}
