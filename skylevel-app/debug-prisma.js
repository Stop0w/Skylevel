const { PrismaClient } = require('./lib/generated/prisma')

console.log('🔍 Debugging Prisma Client...\n')

const prisma = new PrismaClient()

// Check what's available in the client
console.log('Prisma client object keys:', Object.keys(prisma))
console.log('Prisma client user property:', typeof prisma.user)
console.log('Prisma client models:', Object.keys(prisma).filter(key => typeof prisma[key] === 'object' && prisma[key] !== null && prisma[key].create))

// Test connection
async function testConnection() {
  try {
    console.log('\n🔗 Testing connection...')
    await prisma.$connect()
    console.log('✅ Connected successfully')

    // Try to list tables
    console.log('\n📋 Testing basic query...')
    const result = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    console.log('Available tables:', result.map(r => r.table_name))

    // Test simple count
    console.log('\n🔢 Testing count queries...')
    try {
      const userCount = await prisma.user.count()
      console.log(`Users in database: ${userCount}`)
    } catch (e) {
      console.log('❌ User count failed:', e.message)
    }

    try {
      const candidateCount = await prisma.candidate.count()
      console.log(`Candidates in database: ${candidateCount}`)
    } catch (e) {
      console.log('❌ Candidate count failed:', e.message)
    }

  } catch (error) {
    console.error('❌ Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()