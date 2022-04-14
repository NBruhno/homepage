import { UserRole } from 'types'

import { withSentry } from '@sentry/nextjs'

import { config } from 'config.server'

import { fetcher } from 'lib/fetcher'

import { ApiError } from 'api/errors'
import { authenticate } from 'api/middleware'
import { apiHandler } from 'api/utils'

const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { role } = authenticate(req)
		if (role !== UserRole.Admin) throw ApiError.fromCode(403)

		const sensors = await fetcher('/sensors', { absoluteUrl: config.smartHomeHost })

		return res.status(200).json(sensors)
	})

export default withSentry(handler)
