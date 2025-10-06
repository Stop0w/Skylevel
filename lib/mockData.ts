export const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Frontend Engineer',
    experience: '8 years experience',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS', 'AWS'],
    score: 92,
    breakdown: {
      tms: 95,
      srs: 88,
      rns: 90
    },
    status: 'new' as const,
    avatar: '',
    email: 'sarah.chen@example.com',
    location: 'San Francisco, CA',
    education: 'BS Computer Science, Stanford University',
    bio: 'Passionate frontend developer with expertise in React ecosystem and modern web technologies. Leading cross-functional teams to deliver exceptional user experiences.',
    source: 'LinkedIn',
    appliedDate: '2024-01-20',
    lastActive: '2 hours ago',
    referrals: 3,
    responseRate: 95,
    notes: 2,
    emails: 4
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    title: 'Full Stack Developer',
    experience: '5 years experience',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
    score: 78,
    breakdown: {
      tms: 82,
      srs: 75,
      rns: 72
    },
    status: 'reviewing' as const,
    avatar: '',
    email: 'marcus.rodriguez@example.com',
    location: 'Austin, TX',
    education: 'MS Software Engineering, UT Austin',
    bio: 'Full stack developer specializing in Python and React. Experienced in building scalable web applications and mentoring junior developers.',
    source: 'Indeed',
    appliedDate: '2024-01-18',
    lastActive: '1 day ago',
    referrals: 1,
    responseRate: 78,
    notes: 5,
    emails: 3
  },
  {
    id: '3',
    name: 'Elena Volkov',
    title: 'DevOps Engineer',
    experience: '6 years experience',
    skills: ['AWS', 'Terraform', 'Jenkins', 'Kubernetes', 'Python', 'Go'],
    score: 85,
    breakdown: {
      tms: 88,
      srs: 82,
      rns: 84
    },
    status: 'shortlisted' as const,
    avatar: '',
    email: 'elena.volkov@example.com',
    location: 'Seattle, WA',
    education: 'BS Information Systems, University of Washington',
    bio: 'DevOps engineer focused on infrastructure automation and cloud-native solutions. Certified AWS Solutions Architect.',
    source: 'Referral',
    appliedDate: '2024-01-15',
    lastActive: '3 hours ago',
    referrals: 5,
    responseRate: 88,
    notes: 8,
    emails: 6
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Backend Engineer',
    experience: '4 years experience',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Redis', 'MongoDB', 'Kafka'],
    score: 71,
    breakdown: {
      tms: 75,
      srs: 68,
      rns: 70
    },
    status: 'reviewing' as const,
    avatar: '',
    email: 'david.kim@example.com',
    location: 'New York, NY',
    education: 'BS Computer Engineering, Columbia University',
    bio: 'Backend engineer specializing in Java and microservices architecture. Experience in high-performance distributed systems.',
    source: 'Company Website',
    appliedDate: '2024-01-22',
    lastActive: '5 hours ago',
    referrals: 0,
    responseRate: 65,
    notes: 1,
    emails: 2
  },
  {
    id: '5',
    name: 'Amara Okonkwo',
    title: 'Product Designer',
    experience: '7 years experience',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'UI/UX', 'Design Systems'],
    score: 88,
    breakdown: {
      tms: 85,
      srs: 92,
      rns: 87
    },
    status: 'shortlisted' as const,
    avatar: '',
    email: 'amara.okonkwo@example.com',
    location: 'Los Angeles, CA',
    education: 'BFA Design, Art Center College of Design',
    bio: 'Product designer with a focus on user-centered design and design systems. Experienced in leading design projects from concept to launch.',
    source: 'Dribbble',
    appliedDate: '2024-01-19',
    lastActive: '1 day ago',
    referrals: 2,
    responseRate: 82,
    notes: 4,
    emails: 5
  },
  {
    id: '6',
    name: 'Thomas Wright',
    title: 'Data Scientist',
    experience: '3 years experience',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Visualization', 'Statistics'],
    score: 65,
    breakdown: {
      tms: 68,
      srs: 62,
      rns: 64
    },
    status: 'new' as const,
    avatar: '',
    email: 'thomas.wright@example.com',
    location: 'Boston, MA',
    education: 'MS Data Science, MIT',
    bio: 'Data scientist with expertise in machine learning and statistical analysis. Passionate about extracting insights from complex datasets.',
    source: 'GitHub',
    appliedDate: '2024-01-23',
    lastActive: '30 minutes ago',
    referrals: 0,
    responseRate: 72,
    notes: 0,
    emails: 1
  }
]

export const mockStats = {
  totalCandidates: 247,
  highFitCandidates: 48,
  avgFitScore: 73.2,
  timeToHire: 14,
  openPositions: 6
}

export const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    postedDate: '2024-01-15',
    applicantsCount: 45,
    avgScore: 78
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Seattle, WA / Hybrid',
    type: 'Full-time',
    postedDate: '2024-01-10',
    applicantsCount: 32,
    avgScore: 82
  }
]