const prisma = require('./lib/generated/prisma/index.js')

const PrismaClient = prisma.PrismaClient
const client = new PrismaClient()

async function simpleTest() {
  try {
    await client.$connect()
    console.log('✅ Connected to database')

    // Test creating a user
    const user = await client.user.create({
      data: {
        clerkId: 'test_123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'RECRUITER',
      },
    })

    console.log('✅ Created user:', user)

    // Count users
    const count = await client.user.count()
    console.log(`📊 Total users: ${count}`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await client.$disconnect()
  }
}

simpleTest()