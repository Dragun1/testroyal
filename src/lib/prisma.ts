'use client'

import { PrismaClient } from '@prisma/client'

// Глобальная переменная для поддержки единственного экземпляра
declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | PrismaClient
}

const globalPrisma = globalThis.prisma

export const prisma = globalPrisma ?? new PrismaClient()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export const getPrismaClient = () => {
  return prisma
}
