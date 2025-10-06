import { PrismaClient } from '../skylevel-app/lib/generated/prisma'

const prisma = new PrismaClient()

// Sample data for realistic candidates
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna'
]

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
]

const techSkills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'AWS', 'Docker',
  'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs', 'Next.js', 'Vue.js',
  'Angular', 'HTML/CSS', 'Git', 'CI/CD', 'Agile', 'Scrum', 'TDD', 'Microservices',
  'Redis', 'Elasticsearch', 'Kafka', 'Terraform', 'Ansible', 'Linux', 'Azure', 'GCP'
]

function generateRandomName(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

function generateRandomSkills(): string[] {
  const numSkills = Math.floor(Math.random() * 8) + 5 // 5-12 skills
  const shuffled = [...techSkills].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numSkills)
}

function generateExperience(): any[] {
  const numPositions = Math.floor(Math.random() * 3) + 1 // 1-3 positions
  const positions = []

  for (let i = 0; i < numPositions; i++) {
    positions.push({
      title: ['Senior Software Engineer', 'Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'DevOps Engineer'][Math.floor(Math.random() * 5)],
      company: ['TechCorp', 'StartupXYZ', 'MegaTech', 'CloudFirst', 'DataDriven'][Math.floor(Math.random() * 5)],
      duration: `${Math.floor(Math.random() * 4) + 1}-${Math.floor(Math.random() * 3) + 2} years`,
      description: 'Responsible for developing and maintaining scalable applications'
    })
  }

  return positions
}

function generateEducation(): any[] {
  return [{
    degree: ['Bachelor of Science in Computer Science', 'Master of Science in Software Engineering', 'Bachelor of Engineering in Computer Engineering'][Math.floor(Math.random() * 3)],
    university: ['Stanford University', 'MIT', 'UC Berkeley', 'Carnegie Mellon', 'Georgia Tech'][Math.floor(Math.random() * 5)],
    year: 2015 + Math.floor(Math.random() * 8)
  }]
}

function calculateFitScore(candidateSkills: string[], jobRequirements: string[]): {
  tms: number
  srs: number
  rns: number
  overall: number
  confidence: number
} {
  // Calculate TMS (Technical Match Score)
  const matchedSkills = candidateSkills.filter(skill =>
    jobRequirements.some(req => req.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(req.toLowerCase()))
  )
  const tms = Math.min(95, Math.round((matchedSkills.length / jobRequirements.length) * 100))

  // Generate SRS (Soft Skills Rating) - simulated based on experience
  const srs = Math.floor(Math.random() * 25) + 65 // 65-90 range

  // Generate RNS (Referral Network Score) - start with base score
  const rns = Math.floor(Math.random() * 30) + 40 // 40-70 range

  // Calculate overall score (default weights: 50% TMS, 30% SRS, 20% RNS)
  const overall = Math.round((tms * 0.5) + (srs * 0.3) + (rns * 0.2))

  // Confidence based on data completeness
  const confidence = Math.floor(Math.random() * 20) + 75 // 75-95 range

  return { tms, srs, rns, overall, confidence }
}

async function main() {
  console.log('🌱 Starting comprehensive database seed...')

  try {
    // Test database connection first
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Clean existing data (for fresh seed)
    console.log('🧹 Cleaning existing data...')
    await prisma.fitScore.deleteMany()
    await prisma.referral.deleteMany()
    await prisma.application.deleteMany()
    await prisma.shortlist.deleteMany()
    await prisma.job.deleteMany()
    await prisma.candidate.deleteMany()
    await prisma.user.deleteMany()

    // Create recruiters
    console.log('👤 Creating recruiters...')
    const recruiters = await Promise.all([
      prisma.user.create({
        data: {
          clerkId: 'clerk_recruiter_001',
          email: 'sarah.johnson@skylevel.com',
          name: 'Sarah Johnson',
          role: 'RECRUITER',
          company: 'Skylevel AI',
        },
      }),
      prisma.user.create({
        data: {
          clerkId: 'clerk_recruiter_002',
          email: 'mike.chen@techcorp.com',
          name: 'Mike Chen',
          role: 'HIRING_MANAGER',
          company: 'TechCorp Solutions',
        },
      }),
    ])

    console.log('✅ Created recruiters:', recruiters.map(r => r.name))

    // Create jobs
    console.log('💼 Creating job listings...')
    const jobs = [
      {
        title: 'Senior Full Stack Engineer',
        description: 'Looking for experienced full stack developer to join our growing team',
        requirements: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
        location: 'San Francisco, CA',
        type: 'FULL_TIME',
        salaryMin: 140000,
        salaryMax: 200000,
        remote: true,
        recruiterId: recruiters[0].id,
        tmsWeight: 0.5,
        srsWeight: 0.3,
        rnsWeight: 0.2,
      },
      {
        title: 'Frontend Developer',
        description: 'Creative frontend developer passionate about user experience',
        requirements: ['React', 'TypeScript', 'Next.js', 'HTML/CSS', 'Tailwind CSS'],
        location: 'New York, NY',
        type: 'FULL_TIME',
        salaryMin: 120000,
        salaryMax: 160000,
        remote: true,
        recruiterId: recruiters[0].id,
        tmsWeight: 0.6,
        srsWeight: 0.25,
        rnsWeight: 0.15,
      },
      {
        title: 'DevOps Engineer',
        description: 'Infrastructure and deployment specialist',
        requirements: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
        location: 'Austin, TX',
        type: 'FULL_TIME',
        salaryMin: 130000,
        salaryMax: 180000,
        remote: true,
        recruiterId: recruiters[1].id,
        tmsWeight: 0.7,
        srsWeight: 0.2,
        rnsWeight: 0.1,
      },
      {
        title: 'Backend Engineer',
        description: 'Scalable backend systems development',
        requirements: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Microservices'],
        location: 'Seattle, WA',
        type: 'FULL_TIME',
        salaryMin: 135000,
        salaryMax: 190000,
        remote: false,
        recruiterId: recruiters[1].id,
        tmsWeight: 0.65,
        srsWeight: 0.25,
        rnsWeight: 0.1,
      },
      {
        title: 'Machine Learning Engineer',
        description: 'AI/ML specialist for innovative projects',
        requirements: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'PostgreSQL'],
        location: 'Boston, MA',
        type: 'FULL_TIME',
        salaryMin: 150000,
        salaryMax: 220000,
        remote: true,
        recruiterId: recruiters[0].id,
        tmsWeight: 0.7,
        srsWeight: 0.2,
        rnsWeight: 0.1,
      },
    ]

    const createdJobs = await Promise.all(
      jobs.map(job => prisma.job.create({ data: job }))
    )

    console.log('✅ Created jobs:', createdJobs.map(j => j.title))

    // Create candidates
    console.log('👥 Creating 50 candidates...')
    const candidates = []

    for (let i = 0; i < 50; i++) {
      const name = generateRandomName()
      const email = `${name.toLowerCase().replace(' ', '.')}@example.com`
      const skills = generateRandomSkills()
      const experience = generateExperience()
      const education = generateEducation()

      const candidate = await prisma.candidate.create({
        data: {
          name,
          email,
          phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          location: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA', 'Remote'][Math.floor(Math.random() * 6)],
          skills,
          experience,
          education,
          summary: `Experienced software developer with expertise in ${skills.slice(0, 3).join(', ')}`,
          resumeUrl: `https://resumes.example.com/${name.toLowerCase().replace(' ', '_')}.pdf`,
          linkedinUrl: `https://linkedin.com/in/${name.toLowerCase().replace(' ', '_')}`,
          githubUrl: `https://github.com/${name.toLowerCase().replace(' ', '')}`,
          portfolioUrl: `https://portfolio.example.com/${name.toLowerCase().replace(' ', '')}`,
          status: 'ACTIVE',
          source: 'DIRECT',
        },
      })

      candidates.push(candidate)

      // Create applications for random jobs
      const numApplications = Math.floor(Math.random() * 3) + 1 // 1-3 applications per candidate
      const randomJobs = [...createdJobs].sort(() => 0.5 - Math.random()).slice(0, numApplications)

      for (const job of randomJobs) {
        const application = await prisma.application.create({
          data: {
            candidateId: candidate.id,
            jobId: job.id,
            status: 'UNDER_REVIEW',
            appliedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Applied within last 30 days
            source: 'DIRECT',
          },
        })

        // Calculate and create Fit Score
        const fitScoreData = calculateFitScore(skills, job.requirements)

        await prisma.fitScore.create({
          data: {
            candidateId: candidate.id,
            jobId: job.id,
            tmsScore: fitScoreData.tms,
            srsScore: fitScoreData.srs,
            rnsScore: fitScoreData.rns,
            overallScore: fitScoreData.overall,
            confidence: fitScoreData.confidence,
            breakdown: {
              skillMatches: skills.filter(skill =>
                job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
              ),
              missingSkills: job.requirements.filter(req =>
                !skills.some(skill => req.toLowerCase().includes(skill.toLowerCase()))
              ),
              experienceRelevance: experience.length > 1 ? 'high' : 'medium',
            },
            calculatedAt: new Date(),
          },
        })

        // Create some referrals for high-scoring candidates
        if (fitScoreData.overall > 75 && Math.random() > 0.5) {
          const referrerName = generateRandomName()
          const referrerEmail = `${referrerName.toLowerCase().replace(' ', '.')}@company.com`

          await prisma.referral.create({
            data: {
              candidateId: candidate.id,
              referrerName,
              referrerEmail,
              referrerTitle: ['Senior Engineer', 'Engineering Manager', 'Tech Lead', 'Principal Developer'][Math.floor(Math.random() * 4)],
              referrerCompany: ['TechCorp', 'StartupXYZ', 'MegaTech', 'CloudFirst'][Math.floor(Math.random() * 4)],
              relationship: ['Manager', 'Colleague', 'Mentor', 'Team Lead'][Math.floor(Math.random() * 4)],
              trustScore: Math.floor(Math.random() * 30) + 70, // 70-100 trust score
              validation: {
                technicalSkills: Math.floor(Math.random() * 30) + 70,
                workEthic: Math.floor(Math.random() * 20) + 80,
                collaboration: Math.floor(Math.random() * 25) + 75,
                problemSolving: Math.floor(Math.random() * 30) + 70,
              },
              comments: `${name} would be an excellent addition to the team. Strong technical skills and great work ethic.`,
              publicToken: `ref_${Math.random().toString(36).substring(2, 15)}`,
              status: 'ACTIVE',
              createdAt: new Date(),
            },
          })
        }
      }

      if ((i + 1) % 10 === 0) {
        console.log(`📊 Created ${i + 1}/50 candidates...`)
      }
    }

    // Create some shortlists
    console.log('📋 Creating shortlists...')
    const shortlists = await Promise.all([
      prisma.shortlist.create({
        data: {
          name: 'Top Candidates - Full Stack',
          description: 'Best matching full stack engineers',
          recruiterId: recruiters[0].id,
        },
      }),
      prisma.shortlist.create({
        data: {
          name: 'Frontend Priority',
          description: 'High-potential frontend developers',
          recruiterId: recruiters[0].id,
        },
      }),
      prisma.shortlist.create({
        data: {
          name: 'DevOps Candidates',
          description: 'Qualified DevOps engineers',
          recruiterId: recruiters[1].id,
        },
      }),
    ])

    // Add top-scoring candidates to shortlists
    console.log('➕ Adding candidates to shortlists...')
    const topFitScores = await prisma.fitScore.findMany({
      where: { overallScore: { gte: 80 } },
      orderBy: { overallScore: 'desc' },
      take: 15,
      include: { candidate: true },
    })

    for (let i = 0; i < topFitScores.length; i++) {
      const fitScore = topFitScores[i]
      const shortlist = shortlists[i % shortlists.length]

      await prisma.shortlist.update({
        where: { id: shortlist.id },
        data: {
          candidates: {
            connect: { id: fitScore.candidateId },
          },
        },
      })
    }

    // Generate final statistics
    const stats = await prisma.$transaction([
      prisma.user.count(),
      prisma.candidate.count(),
      prisma.job.count(),
      prisma.application.count(),
      prisma.fitScore.count(),
      prisma.referral.count(),
      prisma.shortlist.count(),
    ])

    console.log('\n🎉 Database seed completed successfully!')
    console.log('📊 Final statistics:')
    console.log(`   👤 Users: ${stats[0]}`)
    console.log(`   👥 Candidates: ${stats[1]}`)
    console.log(`   💼 Jobs: ${stats[2]}`)
    console.log(`   📄 Applications: ${stats[3]}`)
    console.log(`   📊 Fit Scores: ${stats[4]}`)
    console.log(`   🤝 Referrals: ${stats[5]}`)
    console.log(`   📋 Shortlists: ${stats[6]}`)

    // Show sample data
    const sampleCandidates = await prisma.candidate.findMany({
      take: 3,
      include: {
        fitScores: {
          include: { job: true },
          take: 1,
        },
      },
    })

    console.log('\n🔍 Sample candidate data:')
    sampleCandidates.forEach((candidate, index) => {
      const fitScore = candidate.fitScores[0]
      console.log(`   ${index + 1}. ${candidate.name} - Overall Score: ${fitScore?.overallScore || 'N/A'}`)
      console.log(`      Skills: ${candidate.skills.slice(0, 3).join(', ')}...`)
      console.log(`      Applied for: ${fitScore?.job.title || 'N/A'}`)
    })

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })