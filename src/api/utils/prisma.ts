import { PrismaClient } from '@prisma/client'

import { config } from 'config.server'

// global prisma is technically only available in local dev
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const prisma = globalThis.prisma ?? new PrismaClient()

if (config.environment === 'development') globalThis.prisma = prisma
