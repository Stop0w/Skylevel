// Mock data for Territory C - Professional Efficiency testing
export const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Frontend Engineer',
    experience: '8 years',
    location: 'San Francisco, CA',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    appliedDate: '2024-10-01',
    lastActive: '2024-10-05',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
    score: 92,
    confidence: 'high' as const,
    breakdown: {
      tms: 95,
      srs: 88,
      rns: 92
    },
    status: 'reviewing' as const,
    referrals: 3,
    source: 'LinkedIn',
    salary: '$150k-$180k',
    responseRate: 85,
    notes: 12,
    emails: 5,
    activities: ['Applied', 'Screening call', 'Technical assessment scheduled']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Full Stack Developer',
    experience: '6 years',
    location: 'Austin, TX',
    email: 'michael.rodriguez@email.com',
    phone: '+1 (555) 234-5678',
    appliedDate: '2024-10-02',
    lastActive: '2024-10-04',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Redis', 'Kubernetes'],
    score: 78,
    confidence: 'medium' as const,
    breakdown: {
      tms: 82,
      srs: 75,
      rns: 76
    },
    status: 'new' as const,
    referrals: 1,
    source: 'Referral',
    salary: '$130k-$150k',
    responseRate: 92,
    notes: 3,
    emails: 2,
    activities: ['Applied', 'Initial outreach sent']
  },
  {
    id: '3',
    name: 'Emily Watson',
    title: 'DevOps Engineer',
    experience: '10 years',
    location: 'Seattle, WA',
    email: 'emily.watson@email.com',
    phone: '+1 (555) 345-6789',
    appliedDate: '2024-09-28',
    lastActive: '2024-10-03',
    skills: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'Python'],
    score: 88,
    confidence: 'high' as const,
    breakdown: {
      tms: 90,
      srs: 85,
      rns: 89
    },
    status: 'shortlisted' as const,
    referrals: 5,
    source: 'Employee Referral',
    salary: '$160k-$190k',
    responseRate: 78,
    notes: 8,
    emails: 7,
    activities: ['Applied', 'Phone screen', 'Technical interview', 'Team interview']
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Backend Engineer',
    experience: '5 years',
    location: 'New York, NY',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    appliedDate: '2024-10-03',
    lastActive: '2024-10-05',
    skills: ['Java', 'Spring Boot', 'MongoDB', 'Kafka', 'Docker', 'AWS'],
    score: 71,
    confidence: 'medium' as const,
    breakdown: {
      tms: 75,
      srs: 68,
      rns: 70
    },
    status: 'reviewing' as const,
    referrals: 0,
    source: 'Indeed',
    salary: '$120k-$140k',
    responseRate: 65,
    notes: 2,
    emails: 1,
    activities: ['Applied', 'Resume review']
  },
  {
    id: '5',
    name: 'Jessica Taylor',
    title: 'Product Designer',
    experience: '7 years',
    location: 'Los Angeles, CA',
    email: 'jessica.taylor@email.com',
    phone: '+1 (555) 567-8901',
    appliedDate: '2024-09-30',
    lastActive: '2024-10-02',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'CSS'],
    score: 84,
    confidence: 'high' as const,
    breakdown: {
      tms: 87,
      srs: 82,
      rns: 83
    },
    status: 'shortlisted' as const,
    referrals: 2,
    source: 'Dribbble',
    salary: '$130k-$160k',
    responseRate: 88,
    notes: 6,
    emails: 4,
    activities: ['Applied', 'Portfolio review', 'Design exercise completed']
  },
  {
    id: '6',
    name: 'Robert Johnson',
    title: 'Data Scientist',
    experience: '9 years',
    location: 'Chicago, IL',
    email: 'robert.johnson@email.com',
    phone: '+1 (555) 678-9012',
    appliedDate: '2024-10-01',
    lastActive: '2024-10-04',
    skills: ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Tableau'],
    score: 67,
    confidence: 'low' as const,
    breakdown: {
      tms: 70,
      srs: 62,
      rns: 68
    },
    status: 'rejected' as const,
    referrals: 0,
    source: 'GitHub',
    salary: '$140k-$170k',
    responseRate: 45,
    notes: 4,
    emails: 2,
    activities: ['Applied', 'Rejected: Not enough ML experience']
  }
]

export const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    postedDate: '2024-09-15',
    applicants: 127,
    viewed: 89,
    status: 'active' as const,
    priority: 'high' as const,
    hiringManager: 'John Smith',
    teamSize: 12
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    postedDate: '2024-09-20',
    applicants: 84,
    viewed: 52,
    status: 'active' as const,
    priority: 'medium' as const,
    hiringManager: 'Sarah Davis',
    teamSize: 8
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Seattle, WA',
    type: 'Full-time',
    postedDate: '2024-09-10',
    applicants: 65,
    viewed: 43,
    status: 'active' as const,
    priority: 'high' as const,
    hiringManager: 'Mike Wilson',
    teamSize: 6
  }
]

export const mockShortlists = [
  {
    id: '1',
    name: 'Q4 Engineering Hires',
    candidateCount: 15,
    createdDate: '2024-09-01',
    lastModified: '2024-10-05',
    owner: 'John Smith',
    shared: true,
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Frontend Pipeline',
    candidateCount: 8,
    createdDate: '2024-09-15',
    lastModified: '2024-10-04',
    owner: 'Sarah Davis',
    shared: false,
    status: 'active' as const
  },
  {
    id: '3',
    name: 'Senior Candidates',
    candidateCount: 12,
    createdDate: '2024-08-20',
    lastModified: '2024-10-03',
    owner: 'Mike Wilson',
    shared: true,
    status: 'archived' as const
  }
]

export const mockActivityFeed = [
  {
    id: '1',
    type: 'candidate_applied',
    candidateId: '6',
    candidateName: 'Robert Johnson',
    jobTitle: 'Data Scientist',
    timestamp: '2024-10-01T09:30:00Z',
    user: 'System'
  },
  {
    id: '2',
    type: 'status_changed',
    candidateId: '3',
    candidateName: 'Emily Watson',
    oldStatus: 'reviewing',
    newStatus: 'shortlisted',
    timestamp: '2024-10-03T14:15:00Z',
    user: 'John Smith'
  },
  {
    id: '3',
    type: 'referral_received',
    candidateId: '2',
    candidateName: 'Michael Rodriguez',
    referrerName: 'Alice Brown',
    timestamp: '2024-10-02T11:45:00Z',
    user: 'Alice Brown'
  },
  {
    id: '4',
    type: 'interview_scheduled',
    candidateId: '1',
    candidateName: 'Sarah Chen',
    jobTitle: 'Senior Frontend Engineer',
    timestamp: '2024-10-05T16:00:00Z',
    user: 'Sarah Davis'
  }
]