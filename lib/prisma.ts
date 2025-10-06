import { PrismaClient } from '@prisma/client'

// Global variable to store Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create singleton Prisma client
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma