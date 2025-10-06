const {
  checkDatabaseHealth,
  generateMockCandidate,
  generateMockJob,
  calculateFitScore
} = require('./lib/database-utils')

const { PrismaClient } = require('./lib/generated/prisma')

const prisma = new PrismaClient()

async function testDatabaseLayer() {
  console.log('🧪 Testing Skylevel Database Layer...\n')

  try {
    // Test 1: Database health check
    console.log('1️⃣ Testing database health...')
    const health = await checkDatabaseHealth()
    console.log(`   ${health.message}`)
    if (health.status !== 'healthy') {
      throw new Error('Database health check failed')
    }

    // Test 2: Create sample data
    console.log('\n2️⃣ Creating sample data...')

    // Create recruiter
    const recruiter = await prisma.user.create({
      data: {
        clerkId: `test_recruiter_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        name: 'Test Recruiter',
        role: 'RECRUITER',
        company: 'Test Company'
      }
    })
    console.log(`   ✅ Created recruiter: ${recruiter.name}`)

    // Create job
    const jobData = generateMockJob(recruiter.id)
    const job = await prisma.job.create({ data: jobData })
    console.log(`   ✅ Created job: ${job.title}`)

    // Create candidate
    const candidateData = generateMockCandidate()
    const candidate = await prisma.candidate.create({ data: candidateData })
    console.log(`   ✅ Created candidate: ${candidate.name}`)

    // Test 3: Create application
    console.log('\n3️⃣ Creating application...')
    const application = await prisma.application.create({
      data: {
        candidateId: candidate.id,
        jobId: job.id,
        status: 'UNDER_REVIEW'
      }
    })
    console.log(`   ✅ Created application`)

    // Test 4: Calculate Fit Score
    console.log('\n4️⃣ Calculating Fit Score...')
    const candidateSkills = (candidate.skills || []).map(s => s.name)
    const jobRequirements = (job.requiredSkills || []).map(s => s.name)
    const fitScore = calculateFitScore(candidateSkills, jobRequirements)
    console.log(`   📊 TMS: ${fitScore.tms}, SRS: ${fitScore.srs}, RNS: ${fitScore.rns}`)
    console.log(`   📊 Overall: ${fitScore.overall}% (confidence: ${fitScore.confidence}%)`)

    // Test 5: Store Fit Score
    console.log('\n5️⃣ Storing Fit Score...')
    const storedFitScore = await prisma.fitScore.create({
      data: {
        candidateId: candidate.id,
        jobId: job.id,
        overall: fitScore.overall,
        tms: fitScore.tms,
        srs: fitScore.srs,
        rns: fitScore.rns,
        confidence: 'MEDIUM',
        explanation: {
          tms: `${fitScore.tms}% technical match based on skills`,
          srs: `${fitScore.srs}% soft skills assessment`,
          rns: `${fitScore.rns}% referral network score`
        }
      }
    })
    console.log(`   ✅ Stored Fit Score with ID: ${storedFitScore.id}`)

    // Test 6: Query candidates with Fit Scores
    console.log('\n6️⃣ Querying candidates with Fit Scores...')
    const candidates = await prisma.candidate.findMany({
      include: {
        fitScores: {
          include: { job: true }
        }
      },
      take: 10
    })
    console.log(`   📋 Found ${candidates.length} candidates`)

    candidates.forEach((c, index) => {
      const fitScore = c.fitScores[0]
      if (fitScore) {
        console.log(`   ${index + 1}. ${c.name} - ${fitScore.overall}% for ${fitScore.job.title}`)
      }
    })

    // Test 7: Performance test
    console.log('\n7️⃣ Performance test (querying 10 candidates)...')
    const start = performance.now()
    const perfTest = await prisma.candidate.findMany({
      include: {
        fitScores: {
          include: { job: true }
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    })
    const duration = Math.round(performance.now() - start)
    console.log(`   ⚡ Queried ${perfTest.length} candidates in ${duration}ms`)

    if (duration < 50) {
      console.log(`   ✅ Excellent performance (<50ms)`)
    } else if (duration < 100) {
      console.log(`   ✅ Good performance (<100ms)`)
    } else {
      console.log(`   ⚠️  Slow performance (>100ms)`)
    }

    console.log('\n🎉 Database layer test completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Users: 1 (recruiter)`)
    console.log(`   - Jobs: 1`)
    console.log(`   - Candidates: 1`)
    console.log(`   - Applications: 1`)
    console.log(`   - Fit Scores: 1`)
    console.log(`   - Query Performance: ${duration}ms`)

    console.log('\n✅ Database layer is ready for Fit Queue scaffolding!')

  } catch (error) {
    console.error('\n❌ Database layer test failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test
testDatabaseLayer().catch(console.error)