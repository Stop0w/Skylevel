import { PrismaClient } from './lib/generated/prisma'

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

function generateRandomSkills(): Array<{name: string, proficiency: number}> {
  const numSkills = Math.floor(Math.random() * 8) + 5 // 5-12 skills
  const shuffled = [...techSkills].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numSkills).map(skill => ({
    name: skill,
    proficiency: Math.floor(Math.random() * 3) + 3 // 3-5 proficiency level
  }))
}

function generateRequiredSkills(): Array<{name: string, importance: number}> {
  const numSkills = Math.floor(Math.random() * 5) + 3 // 3-7 required skills
  const shuffled = [...techSkills].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numSkills).map(skill => ({
    name: skill,
    importance: Math.floor(Math.random() * 3) + 3 // 3-5 importance level
  }))
}

function calculateFitScore(candidateSkills: string[], jobRequirements: string[]): {
  overall: number
  tms: number
  srs: number
  rns: number
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

  // Calculate overall score
  const overall = Math.round((tms * 0.5) + (srs * 0.3) + (rns * 0.2))

  return { overall, tms, srs, rns }
}

async function main() {
  console.log('🌱 Starting simple database seed...')

  try {
    // Test database connection first
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Clean existing data
    console.log('🧹 Cleaning existing data...')
    await prisma.activity.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.fitScore.deleteMany()
    await prisma.referral.deleteMany()
    await prisma.shortlistCandidate.deleteMany()
    await prisma.shortlist.deleteMany()
    await prisma.application.deleteMany()
    await prisma.candidate.deleteMany()
    await prisma.referrer.deleteMany()
    await prisma.job.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Database cleaned')

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
    const jobRequirements = [
      generateRequiredSkills(), // Full Stack
      generateRequiredSkills(), // Frontend
      generateRequiredSkills(), // DevOps
      generateRequiredSkills(), // Backend
      generateRequiredSkills(), // ML
    ]

    const jobs = [
      {
        title: 'Senior Full Stack Engineer',
        company: 'Skylevel AI',
        location: 'San Francisco, CA',
        description: 'Looking for experienced full stack developer to join our growing team. Build scalable applications using modern technologies.',
        responsibilities: ['Develop scalable web applications', 'Collaborate with cross-functional teams', 'Code reviews and mentorship'],
        qualifications: ['5+ years experience', 'Bachelors in CS or related', 'Strong problem-solving skills'],
        benefits: ['Health insurance', 'Remote work', 'Professional development budget'],
        requiredSkills: jobRequirements[0],
        salaryMin: 140000,
        salaryMax: 200000,
        recruiterId: recruiters[0].id,
        tmsWeight: 0.5,
        srsWeight: 0.3,
        rnsWeight: 0.2,
      },
      {
        title: 'Frontend Developer',
        company: 'TechCorp Solutions',
        location: 'New York, NY',
        description: 'Creative frontend developer passionate about user experience and modern web technologies.',
        responsibilities: ['Build responsive user interfaces', 'Optimize application performance', 'Work with design team'],
        qualifications: ['3+ years experience', 'Strong portfolio', 'Experience with modern frameworks'],
        benefits: ['Flexible hours', 'Health benefits', 'Learning opportunities'],
        requiredSkills: jobRequirements[1],
        salaryMin: 120000,
        salaryMax: 160000,
        recruiterId: recruiters[0].id,
        tmsWeight: 0.6,
        srsWeight: 0.25,
        rnsWeight: 0.15,
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudFirst Inc',
        location: 'Austin, TX',
        description: 'Infrastructure and deployment specialist to help build and maintain our cloud infrastructure.',
        responsibilities: ['Manage CI/CD pipelines', 'Infrastructure as code', 'System monitoring'],
        qualifications: ['AWS/Azure certification', 'Experience with containers', 'Strong automation skills'],
        benefits: ['Remote first', 'Competitive salary', 'Cutting-edge tech'],
        requiredSkills: jobRequirements[2],
        salaryMin: 130000,
        salaryMax: 180000,
        recruiterId: recruiters[1].id,
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
      const skillNames = skills.map(s => s.name)

      const candidate = await prisma.candidate.create({
        data: {
          name,
          email,
          phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          location: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA', 'Remote'][Math.floor(Math.random() * 6)],
          role: 'Software Engineer',
          skills,
          linkedinUrl: `https://linkedin.com/in/${name.toLowerCase().replace(' ', '_')}`,
          githubUrl: `https://github.com/${name.toLowerCase().replace(' ', '')}`,
          status: 'REVIEWING',
          source: 'direct',
        },
      })

      candidates.push(candidate)

      // Create applications for random jobs
      const numApplications = Math.floor(Math.random() * 2) + 1 // 1-2 applications per candidate
      const randomJobs = [...createdJobs].sort(() => 0.5 - Math.random()).slice(0, numApplications)

      for (const job of randomJobs) {
        await prisma.application.create({
          data: {
            candidateId: candidate.id,
            jobId: job.id,
            status: 'UNDER_REVIEW',
          },
        })

        // Calculate and create Fit Score
        const requiredSkills = job.requiredSkills as any[] || []
        const jobSkillNames = requiredSkills.map((req: any) => req.name)
        const fitScoreData = calculateFitScore(skillNames, jobSkillNames)

        await prisma.fitScore.create({
          data: {
            candidateId: candidate.id,
            jobId: job.id,
            overall: fitScoreData.overall,
            tms: fitScoreData.tms,
            srs: fitScoreData.srs,
            rns: fitScoreData.rns,
            confidence: 'MEDIUM',
            explanation: {
              tms: `${fitScoreData.tms}% technical match based on skills`,
              srs: `${fitScoreData.srs}% soft skills assessment`,
              rns: `${fitScoreData.rns}% referral network score`
            },
          },
        })
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
          jobId: createdJobs[0].id,
          recruiterId: recruiters[0].id,
          shareToken: `share_${Math.random().toString(36).substring(2, 15)}`,
        },
      }),
      prisma.shortlist.create({
        data: {
          name: 'Frontend Priority',
          jobId: createdJobs[1].id,
          recruiterId: recruiters[0].id,
          shareToken: `share_${Math.random().toString(36).substring(2, 15)}`,
        },
      }),
    ])

    // Add top-scoring candidates to shortlists
    console.log('➕ Adding candidates to shortlists...')
    const topFitScores = await prisma.fitScore.findMany({
      where: { overall: { gte: 80 } },
      orderBy: { overall: 'desc' },
      take: 10,
      include: { candidate: true },
    })

    for (let i = 0; i < topFitScores.length; i++) {
      const fitScore = topFitScores[i]
      const shortlist = shortlists[i % shortlists.length]

      await prisma.shortlistCandidate.create({
        data: {
          shortlistId: shortlist.id,
          candidateId: fitScore.candidateId,
          position: i + 1,
          notes: `Excellent candidate with ${fitScore.overall}% overall fit score`,
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
      prisma.shortlist.count(),
    ])

    console.log('\n🎉 Database seed completed successfully!')
    console.log('📊 Final statistics:')
    console.log(`   👤 Users: ${stats[0]}`)
    console.log(`   👥 Candidates: ${stats[1]}`)
    console.log(`   💼 Jobs: ${stats[2]}`)
    console.log(`   📄 Applications: ${stats[3]}`)
    console.log(`   📊 Fit Scores: ${stats[4]}`)
    console.log(`   📋 Shortlists: ${stats[5]}`)

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
      console.log(`   ${index + 1}. ${candidate.name} - Overall Score: ${fitScore?.overall || 'N/A'}`)
      console.log(`      Skills: ${(candidate.skills as any[]).slice(0, 3).map(s => s.name).join(', ')}...`)
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