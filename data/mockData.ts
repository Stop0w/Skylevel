export const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Frontend Engineer',
    experience: '8 years • React, TypeScript, Node.js',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
    score: 92,
    breakdown: {
      tms: 95,
      srs: 88,
      rns: 92
    },
    status: 'new' as const,
    avatar: ''
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Full Stack Developer',
    experience: '6 years • Python, JavaScript, PostgreSQL',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Redis', 'Kubernetes'],
    score: 78,
    breakdown: {
      tms: 82,
      srs: 75,
      rns: 76
    },
    status: 'reviewing' as const,
    avatar: ''
  },
  {
    id: '3',
    name: 'Emily Johnson',
    title: 'DevOps Engineer',
    experience: '5 years • AWS, Docker, K8s',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring'],
    score: 85,
    breakdown: {
      tms: 88,
      srs: 82,
      rns: 85
    },
    status: 'shortlisted' as const,
    avatar: ''
  },
  {
    id: '4',
    name: 'David Kim',
    title: 'Backend Engineer',
    experience: '7 years • Java, Spring, Microservices',
    skills: ['Java', 'Spring Boot', 'Microservices', 'MongoDB', 'Kafka', 'Elasticsearch'],
    score: 71,
    breakdown: {
      tms: 75,
      srs: 68,
      rns: 70
    },
    status: 'new' as const,
    avatar: ''
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    title: 'Frontend Developer',
    experience: '4 years • Vue.js, CSS, JavaScript',
    skills: ['Vue.js', 'JavaScript', 'SASS', 'Webpack', 'Jest', 'Git'],
    score: 65,
    breakdown: {
      tms: 68,
      srs: 62,
      rns: 65
    },
    status: 'reviewing' as const,
    avatar: ''
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'Senior Software Engineer',
    experience: '10 years • C++, Python, Systems',
    skills: ['C++', 'Python', 'System Design', 'Algorithms', 'Leadership', 'Mentoring'],
    score: 88,
    breakdown: {
      tms: 90,
      srs: 85,
      rns: 89
    },
    status: 'shortlisted' as const,
    avatar: ''
  }
]

export const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    applicants: 45,
    activeCandidates: 12,
    avgScore: 78
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Hybrid',
    type: 'Full-time',
    applicants: 32,
    activeCandidates: 8,
    avgScore: 72
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    applicants: 28,
    activeCandidates: 6,
    avgScore: 81
  }
]