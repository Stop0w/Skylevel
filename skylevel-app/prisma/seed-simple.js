const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Create test recruiter
    console.log('👤 Creating test recruiter...')
    const recruiter = await prisma.user.create({
      data: {
        clerkId: 'clerk_test_recruiter_001',
        email: 'recruiter@skylevel.com',
        name: 'Sarah Johnson',
        role: 'RECRUITER',
        company: 'Skylevel',
      },
    })

    console.log(`✅ Created recruiter: ${recruiter.name}`)

    // Create sample job
    console.log('💼 Creating sample job...')
    const job = await prisma.job.create({
      data: {
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        description: 'We are looking for a talented Senior Frontend Developer.',
        responsibilities: ['Develop React applications', 'Work with TypeScript'],
        qualifications: ['5+ years React experience', 'TypeScript proficiency'],
        benefits: ['Competitive salary', 'Remote work options'],
        requiredSkills: [
          { name: 'React', importance: 'required' },
          { name: 'TypeScript', importance: 'required' }
        ],
        salaryMin: 150000,
        salaryMax: 200000,
        status: 'OPEN',
        recruiterId: recruiter.id,
        tmsWeight: 0.6,
        srsWeight: 0.25,
        rnsWeight: 0.15,
      },
    })

    console.log(`✅ Created job: ${job.title}`)

    // Create sample candidates
    console.log('👥 Creating sample candidates...')
    const candidates = await Promise.all([
      prisma.candidate.create({
        data: {
          email: 'john.doe@example.com',
          name: 'John Doe',
          location: 'San Francisco, CA',
          role: 'Frontend Developer',
          skills: [
            { name: 'React', proficiency: 9 },
            { name: 'TypeScript', proficiency: 8 },
            { name: 'JavaScript', proficiency: 10 }
          ],
          linkedinUrl: 'https://linkedin.com/in/johndoe',
          githubUrl: 'https://github.com/johndoe',
        },
      }),
      prisma.candidate.create({
        data: {
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          location: 'Austin, TX',
          role: 'Senior Frontend Developer',
          skills: [
            { name: 'React', proficiency: 10 },
            { name: 'TypeScript', proficiency: 9 },
            { name: 'Next.js', proficiency: 8 }
          ],
          linkedinUrl: 'https://linkedin.com/in/janesmith',
          githubUrl: 'https://github.com/janesmith',
        },
      }),
    ])

    console.log(`✅ Created ${candidates.length} candidates`)

    // Create applications
    console.log('📄 Creating applications...')
    for (const candidate of candidates) {
      await prisma.application.create({
        data: {
          candidateId: candidate.id,
          jobId: job.id,
          status: 'SUBMITTED',
          coverLetter: 'I am excited to apply for this position.',
        },
      })

      // Create Fit Scores
      const tms = Math.floor(Math.random() * 30) + 60
      const srs = Math.floor(Math.random() * 30) + 50
      const rns = Math.floor(Math.random() * 40) + 30
      const overall = Math.round(tms * job.tmsWeight + srs * job.srsWeight + rns * job.rnsWeight)

      await prisma.fitScore.create({
        data: {
          candidateId: candidate.id,
          jobId: job.id,
          overall,
          tms,
          srs,
          rns,
          confidence: rns > 60 ? 'HIGH' : rns > 40 ? 'MEDIUM' : 'LOW',
          explanation: {
            tms: `${Math.floor((tms / 100) * 10)}/10 required skills matched.`,
            srs: `Soft skills rating: ${srs}/100.`,
            rns: `Network validation: ${rns}/100.`
          },
        },
      })
    }

    console.log('✅ Created applications and fit scores')

    // Test queries
    console.log('📊 Testing database queries...')
    const userCount = await prisma.user.count()
    const jobCount = await prisma.job.count()
    const candidateCount = await prisma.candidate.count()
    const applicationCount = await prisma.application.count()
    const fitScoreCount = await prisma.fitScore.count()

    console.log(`
📈 Database Summary:
- Users: ${userCount}
- Jobs: ${jobCount}
- Candidates: ${candidateCount}
- Applications: ${applicationCount}
- Fit Scores: ${fitScoreCount}
    `)

    console.log('✅ Database seed completed successfully!')

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