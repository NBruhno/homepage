import { PrismaClient } from '@prisma/client'

// global prisma is technically only available in local dev
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const prisma = new PrismaClient()
