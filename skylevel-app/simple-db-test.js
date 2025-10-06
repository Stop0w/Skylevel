const { PrismaClient } = require('./lib/generated/prisma')

const prisma = new PrismaClient()

// Simple Fit Score calculation
function calculateFitScore(candidateSkills, jobRequirements) {
  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase())
  const normalizedRequirements = jobRequirements.map(r => r.toLowerCase())

  const matchedSkills = normalizedCandidateSkills.filter(skill =>
    normalizedRequirements.some(req => req.includes(skill) || skill.includes(req))
  )

  const tms = Math.min(95, Math.round((matchedSkills.length / normalizedRequirements.length) * 100))
  const srs = Math.floor(Math.random() * 25) + 65
  const rns = Math.floor(Math.random() * 30) + 40
  const overall = Math.round((tms * 0.5) + (srs * 0.3) + (rns * 0.2))

  return { tms, srs, rns, overall, confidence: Math.floor(Math.random() * 20) + 75 }
}

async function testBasicDatabase() {
  console.log('🧪 Testing Basic Database Functionality...\n')

  try {
    // Test database connection
    console.log('1️⃣ Testing connection...')
    await prisma.$connect()
    console.log('   ✅ Connected to database')

    // Create test recruiter
    console.log('\n2️⃣ Creating test recruiter...')
    const recruiter = await prisma.user.create({
      data: {
        clerkId: `test_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        name: 'Test Recruiter',
        role: 'RECRUITER',
        company: 'Test Company'
      }
    })
    console.log(`   ✅ Created recruiter: ${recruiter.name} (ID: ${recruiter.id})`)

    // Create test job
    console.log('\n3️⃣ Creating test job...')
    const job = await prisma.job.create({
      data: {
        title: 'Senior Full Stack Engineer',
        company: 'Skylevel AI',
        location: 'San Francisco, CA',
        description: 'Looking for experienced full stack developer',
        responsibilities: ['Develop scalable applications', 'Team collaboration'],
        qualifications: ['5+ years experience', 'Bachelors in CS'],
        benefits: ['Health insurance', 'Remote work'],
        requiredSkills: [
          { name: 'React', importance: 5 },
          { name: 'TypeScript', importance: 5 },
          { name: 'Node.js', importance: 4 },
          { name: 'PostgreSQL', importance: 4 },
          { name: 'AWS', importance: 3 }
        ],
        salaryMin: 140000,
        salaryMax: 200000,
        recruiterId: recruiter.id,
        tmsWeight: 0.5,
        srsWeight: 0.3,
        rnsWeight: 0.2
      }
    })
    console.log(`   ✅ Created job: ${job.title} (ID: ${job.id})`)

    // Create test candidate
    console.log('\n4️⃣ Creating test candidate...')
    const candidate = await prisma.candidate.create({
      data: {
        name: 'John Doe',
        email: `john.doe${Date.now()}@example.com`,
        phone: '+1-555-123-4567',
        location: 'San Francisco, CA',
        role: 'Software Engineer',
        skills: [
          { name: 'React', proficiency: 5 },
          { name: 'TypeScript', proficiency: 4 },
          { name: 'Node.js', proficiency: 4 },
          { name: 'PostgreSQL', proficiency: 3 },
          { name: 'Docker', proficiency: 3 },
          { name: 'AWS', proficiency: 2 }
        ],
        linkedinUrl: 'https://linkedin.com/in/johndoe',
        githubUrl: 'https://github.com/johndoe',
        status: 'REVIEWING',
        source: 'direct'
      }
    })
    console.log(`   ✅ Created candidate: ${candidate.name} (ID: ${candidate.id})`)

    // Create application
    console.log('\n5️⃣ Creating application...')
    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId: job.id,
        status: 'UNDER_REVIEW'
      }
    })
    console.log(`   ✅ Created application (ID: ${application.id})`)

    // Calculate and store Fit Score
    console.log('\n6️⃣ Creating Fit Score...')
    const candidateSkills = candidate.skills.map(s => s.name)
    const jobRequirements = job.requiredSkills.map(s => s.name)
    const fitScoreData = calculateFitScore(candidateSkills, jobRequirements)

    const fitScore = await prisma.fitScore.create({
      data: {
        candidateId: candidate.id,
        jobId: job.id,
        overall: fitScoreData.overall,
        tms: fitScoreData.tms,
        srs: fitScoreData.srs,
        rns: fitScoreData.rns,
        confidence: 'MEDIUM',
        explanation: {
          tms: `${fitScoreData.tms}% technical match based on ${candidateSkills.filter(s => jobRequirements.includes(s)).length}/${jobRequirements.length} matching skills`,
          srs: `${fitScoreData.srs}% soft skills assessment`,
          rns: `${fitScoreData.rns}% referral network score`
        }
      }
    })
    console.log(`   ✅ Created Fit Score: ${fitScore.overall}% overall (TMS: ${fitScore.tms}, SRS: ${fitScore.srs}, RNS: ${fitScore.rns})`)

    // Test query performance
    console.log('\n7️⃣ Testing query performance...')
    const start = performance.now()

    const candidatesWithScores = await prisma.candidate.findMany({
      include: {
        fitScores: {
          include: { job: true }
        },
        applications: {
          include: { job: true }
        }
      },
      take: 10
    })

    const duration = Math.round(performance.now() - start)
    console.log(`   ⚡ Queried ${candidatesWithScores.length} candidates in ${duration}ms`)

    // Show results
    console.log('\n8️⃣ Query results:')
    candidatesWithScores.forEach((c, index) => {
      const fitScore = c.fitScores[0]
      if (fitScore) {
        console.log(`   ${index + 1}. ${c.name} - ${fitScore.overall}% for ${fitScore.job.title}`)
        console.log(`      Skills: ${(c.skills || []).slice(0, 3).map(s => s.name).join(', ')}...`)
      }
    })

    console.log('\n🎉 Database test completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Database connection: ✅`)
    console.log(`   - User creation: ✅`)
    console.log(`   - Job creation: ✅`)
    console.log(`   - Candidate creation: ✅`)
    console.log(`   - Application creation: ✅`)
    console.log(`   - Fit Score calculation: ✅`)
    console.log(`   - Query performance: ${duration}ms ${duration < 100 ? '✅' : '⚠️'}`)

    console.log('\n✅ Database layer is READY for Fit Queue scaffolding!')

  } catch (error) {
    console.error('\n❌ Database test failed:', error)
    console.error('Error details:', error.message)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testBasicDatabase().catch(console.error)