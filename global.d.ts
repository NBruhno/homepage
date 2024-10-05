/* eslint-disable @typescript-eslint/no-unused-vars */

import type { PrismaClient } from '@prisma/client'

const options = {
	log: [
		{ emit: 'event', level: 'query' } as const,
	],
}

declare global {
	var prisma: PrismaClient<typeof options>
}
