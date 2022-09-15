import { UserRole } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'

import { apiHandler, homeFetcher } from 'lib/api'
import { authenticate } from 'lib/middleware'

const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { token } = authenticate(req, { allowedRoles: [UserRole.Admin] })

		const sensors = await homeFetcher('/sensors', { accessToken: token })

		return res.status(200).json(sensors)
	})

export default withSentry(handler)
