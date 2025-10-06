const { PrismaClient } = require('./skylevel-app/lib/generated/prisma')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to database')

    // Check what tables exist
    const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    console.log('📋 Available tables:', tables)

    // Test creating a user
    const user = await prisma.user.create({
      data: {
        clerkId: 'test_123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'RECRUITER',
      },
    })

    console.log('✅ Created user:', user)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()