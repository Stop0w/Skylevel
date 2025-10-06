// Mock data for design testing
export const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    headline: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Next.js'],
    fitScore: 92,
    confidence: 'high' as const,
    breakdown: { tms: 94, srs: 89, rns: 93 },
    status: 'review' as const,
    avatar: 'SC'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    headline: 'Full-Stack Developer',
    location: 'Austin, TX',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
    fitScore: 78,
    confidence: 'medium' as const,
    breakdown: { tms: 82, srs: 75, rns: 77 },
    status: 'review' as const,
    avatar: 'MR'
  },
  {
    id: '3',
    name: 'Emily Watson',
    headline: 'Product Designer',
    location: 'Seattle, WA',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems', 'User Research'],
    fitScore: 65,
    confidence: 'medium' as const,
    breakdown: { tms: 70, srs: 68, rns: 57 },
    status: 'review' as const,
    avatar: 'EW'
  },
  {
    id: '4',
    name: 'David Kim',
    headline: 'DevOps Engineer',
    location: 'Denver, CO',
    skills: ['CI/CD', 'Terraform', 'AWS', 'Kubernetes', 'Monitoring', 'Security'],
    fitScore: 88,
    confidence: 'high' as const,
    breakdown: { tms: 91, srs: 85, rns: 88 },
    status: 'review' as const,
    avatar: 'DK'
  },
  {
    id: '5',
    name: 'Jessica Park',
    headline: 'Backend Engineer',
    location: 'Portland, OR',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Redis', 'MongoDB', 'API Design'],
    fitScore: 45,
    confidence: 'low' as const,
    breakdown: { tms: 52, srs: 38, rns: 44 },
    status: 'review' as const,
    avatar: 'JP'
  },
  {
    id: '6',
    name: 'Michael Brown',
    headline: 'Senior Software Engineer',
    location: 'New York, NY',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Leadership', 'Architecture'],
    fitScore: 81,
    confidence: 'high' as const,
    breakdown: { tms: 85, srs: 78, rns: 80 },
    status: 'review' as const,
    avatar: 'MB'
  }
]

export const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    urgency: 'high' as const,
    applicants: 234,
    daysOpen: 12
  },
  {
    id: '2',
    title: 'Full-Stack Developer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    urgency: 'medium' as const,
    applicants: 156,
    daysOpen: 8
  }
]

export const mockStats = {
  totalCandidates: 248,
  highFitCandidates: 89,
  avgFitScore: 72,
  timeToHire: 18,
  openPositions: 12
}