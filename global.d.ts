/* eslint-disable vars-on-top */
/* eslint-disable no-var */

import type { PrismaClient } from '@prisma/client'

const options = {
	log: [
		{ emit: 'event', level: 'query' } as const,
	],
}

declare global {
	var prisma: PrismaClient<typeof options>
}
