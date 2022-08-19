import { UserRole } from 'types'

import { withSentry } from '@sentry/nextjs'
import { create, object, string } from 'superstruct'

import { apiHandler } from 'lib/api'
import { authenticate } from 'lib/middleware'

const Query = object({
	id: string(),
})

const handler = apiHandler({
	validMethods: ['POST'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/news`,
})
	.post(async (req, res) => {
		authenticate(req, { allowedRoles: [UserRole.Admin] })
		const { id } = create(req.query, Query)

		await res.revalidate(`/games/${id}`)
		return res.status(200).json({ message: `Cache for /games/${id} has been cleared and re-rendered` })
	})

export default withSentry(handler)
