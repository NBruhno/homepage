import { PrismaClient } from '@prisma/client'

import { config } from 'config.server'

const options = {
	log: [
		{ emit: 'event', level: 'query' } as const,
	],
}

// global prisma is technically only available in local dev
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const prisma = globalThis.prisma ?? new PrismaClient({
	log: [{
		emit: 'event',
		level: 'query',
	}],
}) as PrismaClient<typeof options>

if (config.environment === 'development') globalThis.prisma = prisma
