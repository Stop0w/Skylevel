const { PrismaClient } = require('./lib/generated/prisma')

const prisma = new PrismaClient()

async function checkTables() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to database')

    // Get table names from information_schema
    const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
    console.log('\n📋 Available tables:')
    tables.forEach(table => console.log(`   - ${table.table_name}`))

    // Test basic prisma operations
    console.log('\n🔍 Testing Prisma client models:')
    const models = Object.keys(prisma._baseDmmf.modelMap || {})
    models.forEach(model => console.log(`   - ${model}`))

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkTables()