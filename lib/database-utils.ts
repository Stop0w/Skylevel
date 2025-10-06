import { prisma } from './prisma'

// Helper function to generate mock fit scores (for development)
function generateMockFitScore(candidateId: string, jobId: string) {
  const tms = Math.floor(Math.random() * 40) + 60 // 60-100
  const srs = Math.floor(Math.random() * 40) + 60 // 60-100
  const rns = Math.floor(Math.random() * 40) + 60 // 60-100

  const weights = { tms: 0.5, srs: 0.3, rns: 0.2 }
  const overall = Math.round(tms * weights.tms + srs * weights.srs + rns * weights.rns)

  const confidenceValues = ['HIGH', 'MEDIUM', 'LOW'] as const
  const confidence = confidenceValues[Math.floor(Math.random() * confidenceValues.length)]

  return {
    id: `fit-${candidateId}-${jobId}`,
    candidateId,
    jobId,
    overall,
    tms,
    srs,
    rns,
    confidence,
    explanation: {
      tms: `Strong alignment with required technical skills`,
      srs: `Good cultural and behavioral fit indicators`,
      rns: `${Math.floor(Math.random() * 5)} peer validations`
    },
    version: 1,
    calculatedAt: new Date()
  }
}

// Generate mock candidates for development
function generateMockCandidates(count: number = 50) {
  const firstNames = ['Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Maria', 'James', 'Jennifer', 'William']
  const lastNames = ['Chen', 'Rodriguez', 'Watson', 'Kim', 'Johnson', 'Smith', 'Garcia', 'Lee', 'Taylor', 'Brown']
  const titles = ['Senior Frontend Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Backend Engineer', 'Software Architect', 'Data Engineer', 'Mobile Developer', 'Security Engineer', 'Machine Learning Engineer', 'Tech Lead']
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Terraform', 'Jenkins']
  const statuses = ['NEW', 'REVIEWING', 'SHORTLISTED', 'INTERVIEWING'] as const

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const experience = Math.floor(Math.random() * 15) + 1

    // Generate 5-10 skills per candidate
    const skillCount = Math.floor(Math.random() * 6) + 5
    const candidateSkills = Array.from({ length: skillCount }, () =>
      skills[Math.floor(Math.random() * skills.length)]
    ).filter((skill, index, arr) => arr.indexOf(skill) === index) // Remove duplicates

    return {
      id: `candidate-${i + 1}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      name: `${firstName} ${lastName}`,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      location: ['San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'New York, NY', 'Boston, MA', 'Los Angeles, CA'][Math.floor(Math.random() * 6)],
      role: titles[Math.floor(Math.random() * titles.length)],
      skills: candidateSkills.map(skill => ({ name: skill, proficiency: Math.floor(Math.random() * 3) + 3 })),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      source: ['direct', 'referral', 'ats_import'][Math.floor(Math.random() * 3)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Last 30 days
      updatedAt: new Date()
    }
  })
}

// Fetch candidates with fit scores for the Fit Queue
export async function getCandidatesForFitQueue(jobId?: string) {
  try {
    // For development, generate mock data if database is empty
    const existingCandidates = await prisma.candidate.findMany({
      take: 1,
      include: {
        fitScores: true
      }
    })

    if (existingCandidates.length === 0) {
      // Generate mock candidates
      const mockCandidates = generateMockCandidates(50)

      // Create a default job if none exists
      let defaultJob = await prisma.job.findFirst()
      if (!defaultJob) {
        defaultJob = await prisma.job.create({
          data: {
            id: 'default-job-1',
            title: 'Senior Software Engineer',
            company: 'TechCorp',
            location: 'San Francisco, CA',
            description: 'Looking for an experienced software engineer...',
            responsibilities: ['Develop high-quality code', 'Collaborate with team'],
            qualifications: ['5+ years experience', 'Strong problem-solving skills'],
            benefits: ['Health insurance', 'Flexible work hours'],
            requiredSkills: [
              { name: 'JavaScript', importance: 5 },
              { name: 'React', importance: 5 },
              { name: 'Node.js', importance: 4 }
            ],
            status: 'OPEN',
            recruiterId: 'default-recruiter-1'
          }
        })
      }

      // Insert mock candidates
      await prisma.candidate.createMany({
        data: mockCandidates,
        skipDuplicates: true
      })

      // Generate fit scores for each candidate
      for (const candidate of mockCandidates) {
        const fitScore = generateMockFitScore(candidate.id, defaultJob.id)
        await prisma.fitScore.create({
          data: fitScore
        })
      }
    }

    // Fetch candidates with their fit scores
    const candidates = await prisma.candidate.findMany({
      include: {
        fitScores: {
          where: { jobId: jobId || 'default-job-1' },
          orderBy: { overall: 'desc' },
          take: 1
        },
        _count: {
          select: {
            referrals: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data for the frontend
    return candidates.map(candidate => {
      const fitScore = candidate.fitScores[0]
      const skills = Array.isArray(candidate.skills)
        ? candidate.skills.map((s: any) => s.name || s)
        : []

      return {
        id: candidate.id,
        name: candidate.name,
        title: candidate.role,
        experience: `${Math.floor(Math.random() * 15) + 1} years`, // Mock experience
        location: candidate.location,
        email: candidate.email,
        phone: candidate.phone,
        skills,
        score: fitScore?.overall || Math.floor(Math.random() * 40) + 60,
        confidence: fitScore?.confidence?.toLowerCase() || 'medium',
        breakdown: fitScore ? {
          tms: Math.round(fitScore.tms),
          srs: Math.round(fitScore.srs),
          rns: Math.round(fitScore.rns)
        } : undefined,
        status: candidate.status.toLowerCase(),
        referrals: candidate._count.referrals,
        appliedDate: candidate.createdAt.toISOString().split('T')[0],
        lastActive: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
      }
    })
  } catch (error) {
    console.error('Error fetching candidates:', error)
    // Fallback to mock data if database fails
    const { mockCandidates } = await import('./mock-data')
    return mockCandidates
  }
}

// Fetch a single candidate with full details
export async function getCandidateById(candidateId: string, jobId?: string) {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        fitScores: {
          where: { jobId: jobId || 'default-job-1' },
          orderBy: { version: 'desc' },
          take: 1
        },
        referrals: {
          include: {
            referrer: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        applications: {
          include: {
            job: true
          }
        }
      }
    })

    if (!candidate) return null

    const fitScore = candidate.fitScores[0]
    const skills = Array.isArray(candidate.skills)
      ? candidate.skills.map((s: any) => ({ name: s.name || s, proficiency: s.proficiency || 4 }))
      : []

    return {
      ...candidate,
      skills,
      score: fitScore?.overall || 0,
      breakdown: fitScore ? {
        tms: Math.round(fitScore.tms),
        srs: Math.round(fitScore.srs),
        rns: Math.round(fitScore.rns)
      } : undefined,
      confidence: fitScore?.confidence?.toLowerCase() || 'medium'
    }
  } catch (error) {
    console.error('Error fetching candidate:', error)
    return null
  }
}

// Create or update candidate status
export async function updateCandidateStatus(candidateId: string, status: string) {
  try {
    const updated = await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        status: status.toUpperCase() as any,
        updatedAt: new Date()
      }
    })
    return updated
  } catch (error) {
    console.error('Error updating candidate status:', error)
    throw error
  }
}

// Get jobs for the current recruiter
export async function getRecruiterJobs(recruiterId: string) {
  try {
    const jobs = await prisma.job.findMany({
      where: { recruiterId },
      include: {
        _count: {
          select: {
            applications: true,
            fitScores: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return jobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      status: job.status.toLowerCase(),
      applicationCount: job._count.applications,
      createdAt: job.createdAt.toISOString().split('T')[0]
    }))
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

// Create shortlist
export async function createShortlist(name: string, recruiterId: string) {
  try {
    const shortlist = await prisma.shortlist.create({
      data: {
        name,
        recruiterId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return shortlist
  } catch (error) {
    console.error('Error creating shortlist:', error)
    throw error
  }
}

// Add candidate to shortlist
export async function addCandidateToShortlist(candidateId: string, shortlistId: string) {
  try {
    const entry = await prisma.shortlistCandidate.create({
      data: {
        candidateId,
        shortlistId,
        addedAt: new Date()
      }
    })
    return entry
  } catch (error) {
    console.error('Error adding candidate to shortlist:', error)
    throw error
  }
}

// Get shortlists for recruiter
export async function getRecruiterShortlists(recruiterId: string) {
  try {
    const shortlists = await prisma.shortlist.findMany({
      where: { recruiterId },
      include: {
        _count: {
          select: {
            candidates: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return shortlists.map(list => ({
      id: list.id,
      name: list.name,
      candidateCount: list._count.candidates,
      updatedAt: list.updatedAt.toISOString().split('T')[0]
    }))
  } catch (error) {
    console.error('Error fetching shortlists:', error)
    return []
  }
}