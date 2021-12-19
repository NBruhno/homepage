/* eslint-disable vars-on-top */
/* eslint-disable no-var */

import type { PrismaClient } from '@prisma/client'

declare global {
	var prisma: PrismaClient
}
