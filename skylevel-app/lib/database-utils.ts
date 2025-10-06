import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient()

// Fit Score calculation utilities
export interface FitScoreBreakdown {
  tms: number
  srs: number
  rns: number
  overall: number
  confidence: number
}

export function calculateFitScore(
  candidateSkills: string[],
  jobRequirements: string[],
  jobWeights?: { tms: number; srs: number; rns: number }
): FitScoreBreakdown {
  const weights = jobWeights || { tms: 0.5, srs: 0.3, rns: 0.2 }

  // Calculate Technical Match Score (TMS)
  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase())
  const normalizedRequirements = jobRequirements.map(r => r.toLowerCase())

  const matchedSkills = normalizedCandidateSkills.filter(skill =>
    normalizedRequirements.some(req =>
      req.includes(skill) || skill.includes(req)
    )
  )

  const tms = Math.min(95, Math.round((matchedSkills.length / normalizedRequirements.length) * 100))

  // Calculate Soft Skills Rating (SRS) - placeholder for now
  const srs = Math.floor(Math.random() * 25) + 65 // 65-90 range

  // Calculate Referral Network Score (RNS) - placeholder for now
  const rns = Math.floor(Math.random() * 30) + 40 // 40-70 range

  // Calculate weighted overall score
  const overall = Math.round((tms * weights.tms) + (srs * weights.srs) + (rns * weights.rns))

  // Confidence based on data completeness
  const confidence = Math.floor(Math.random() * 20) + 75 // 75-95 range

  return { tms, srs, rns, overall, confidence }
}

// Candidate query utilities
export interface CandidateQueryOptions {
  limit?: number
  offset?: number
  sortBy?: 'overall' | 'tms' | 'srs' | 'rns' | 'name' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  minScore?: number
  jobId?: string
  skills?: string[]
}

export async function getCandidatesWithFitScores(options: CandidateQueryOptions = {}) {
  const {
    limit = 50,
    offset = 0,
    sortBy = 'overall',
    sortOrder = 'desc',
    minScore = 0,
    jobId,
    skills = []
  } = options

  try {
    const whereClause: any = {
      status: 'REVIEWING'
    }

    if (minScore > 0) {
      whereClause.fitScores = {
        some: {
          overall: { gte: minScore }
        }
      }
    }

    if (jobId) {
      whereClause.fitScores = {
        ...whereClause.fitScores,
        some: {
          ...(whereClause.fitScores?.some || {}),
          jobId
        }
      }
    }

    if (skills.length > 0) {
      whereClause.skills = {
        some: {
          OR: skills.map(skill => ({
            name: { contains: skill, mode: 'insensitive' }
          }))
        }
      }
    }

    const candidates = await prisma.candidate.findMany({
      where: whereClause,
      include: {
        fitScores: jobId ? {
          where: { jobId },
          include: { job: true }
        } : {
          include: { job: true },
          take: 1
        },
        applications: {
          include: { job: true },
          take: 5
        }
      },
      orderBy: sortBy === 'name'
        ? { name: sortOrder }
        : { createdAt: sortOrder },
      take: limit,
      skip: offset
    })

    return candidates
  } catch (error) {
    console.error('Error fetching candidates:', error instanceof Error ? error.message : error)
    throw error
  }
}

// Performance monitoring utilities
export async function measureQueryPerformance<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<{ data: T; duration: number }> {
  const start = performance.now()

  try {
    const data = await queryFn()
    const duration = Math.round(performance.now() - start)

    console.log(`⚡ ${queryName}: ${duration}ms`)

    if (duration > 100) {
      console.warn(`⚠️  Slow query detected: ${queryName} took ${duration}ms`)
    }

    return { data, duration }
  } catch (error) {
    const duration = Math.round(performance.now() - start)
    console.error(`❌ ${queryName} failed after ${duration}ms:`, error instanceof Error ? error.message : error)
    throw error
  }
}

// Batch operations for Fit Queue
export async function batchUpdateCandidateStatus(
  candidateIds: string[],
  status: 'NEW' | 'REVIEWING' | 'SHORTLISTED' | 'INTERVIEWING' | 'OFFERED' | 'HIRED' | 'REJECTED' | 'WITHDRAWN'
) {
  try {
    const result = await prisma.candidate.updateMany({
      where: {
        id: { in: candidateIds }
      },
      data: { status }
    })

    console.log(`✅ Updated ${result.count} candidates to status: ${status}`)
    return result
  } catch (error) {
    console.error('Error batch updating candidates:', error instanceof Error ? error.message : error)
    throw error
  }
}

export async function createShortlist(
  name: string,
  recruiterId: string,
  candidateIds: string[],
  jobId: string
) {
  try {
    const shareToken = `share_${Math.random().toString(36).substring(2, 15)}`

    const shortlist = await prisma.shortlist.create({
      data: {
        name,
        recruiterId,
        jobId,
        shareToken,
        isPublic: false,
        candidates: {
          create: candidateIds.map((candidateId, index) => ({
            candidateId,
            position: index + 1
          }))
        }
      },
      include: {
        candidates: {
          include: { candidate: true }
        }
      }
    })

    console.log(`✅ Created shortlist "${name}" with ${candidateIds.length} candidates`)
    return shortlist
  } catch (error) {
    console.error('Error creating shortlist:', error instanceof Error ? error.message : error)
    throw error
  }
}

// Connection and health check utilities
export async function checkDatabaseHealth() {
  try {
    const start = performance.now()
    await prisma.$connect()
    const connectionTime = Math.round(performance.now() - start)

    // Test basic query
    const queryStart = performance.now()
    const userCount = await prisma.user.count()
    const queryTime = Math.round(performance.now() - queryStart)

    return {
      status: 'healthy',
      connectionTime,
      queryTime,
      userCount,
      message: `Database healthy (${connectionTime}ms connect, ${queryTime}ms query)`
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      status: 'unhealthy',
      error: errorMessage,
      message: `Database connection failed: ${errorMessage}`
    }
  } finally {
    await prisma.$disconnect()
  }
}

// Mock data generation for development
export function generateMockCandidate() {
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia']
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL']

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const name = `${firstName} ${lastName}`

  const numSkills = Math.floor(Math.random() * 6) + 4
  const shuffledSkills = [...skills].sort(() => 0.5 - Math.random())
  const selectedSkills = shuffledSkills.slice(0, numSkills)

  return {
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: `+1-555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    location: 'San Francisco, CA',
    role: 'Software Engineer',
    skills: selectedSkills.map(skill => ({ name: skill, proficiency: Math.floor(Math.random() * 3) + 3 })),
    linkedinUrl: `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    githubUrl: `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    status: 'REVIEWING',
    source: 'direct'
  }
}

export function generateMockJob(recruiterId: string) {
  const jobs = [
    { title: 'Senior Full Stack Engineer', company: 'TechCorp Inc' },
    { title: 'Frontend Developer', company: 'StartupXYZ' },
    { title: 'DevOps Engineer', company: 'CloudFirst' },
    { title: 'Backend Engineer', company: 'DataDriven' }
  ]

  const job = jobs[Math.floor(Math.random() * jobs.length)]
  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL']

  return {
    ...job,
    location: 'San Francisco, CA',
    description: `Looking for experienced ${job.title} to join our growing team.`,
    responsibilities: ['Develop scalable applications', 'Collaborate with team', 'Code reviews'],
    qualifications: ['3+ years experience', 'Bachelors in CS', 'Strong problem-solving'],
    benefits: ['Health insurance', 'Remote work', 'Professional development'],
    requiredSkills: skills.slice(0, 5).map(skill => ({ name: skill, importance: Math.floor(Math.random() * 3) + 3 })),
    salaryMin: 120000,
    salaryMax: 180000,
    recruiterId,
    tmsWeight: 0.5,
    srsWeight: 0.3,
    rnsWeight: 0.2
  }
}

export default prisma