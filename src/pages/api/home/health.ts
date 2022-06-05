import { UserRole } from 'types'

import { withSentry } from '@sentry/nextjs'

import { config } from 'config.server'

import { fetcher } from 'lib/fetcher'

import { authenticate } from 'api/middleware'
import { apiHandler } from 'api/utils'

const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { token } = authenticate(req, { allowedRoles: [UserRole.Admin] })

		const health = await fetcher('/health', { absoluteUrl: config.smartHomeHost, accessToken: token })

		return res.status(200).json(health)
	})

export default withSentry(handler)