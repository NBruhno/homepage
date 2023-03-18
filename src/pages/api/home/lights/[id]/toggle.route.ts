import { UserRole } from 'types'

import { object, string, create } from 'superstruct'

import { apiHandler, homeFetcher } from 'lib/api'
import { delay } from 'lib/delay'
import { Method } from 'lib/fetcher'
import { authenticate } from 'lib/middleware'

const Query = object({
	id: string(),
})

export default apiHandler({
	validMethods: ['POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/home/lights/{entityId}/toggle`,
})
	.post(async (req, res) => {
		const { token } = authenticate(req, { allowedRoles: [UserRole.Admin] })
		const { id } = create(req.query, Query)

		await homeFetcher(`/lights/${id}/toggle`, { accessToken: token, method: Method.Post, body: {} })
		await delay(0.2)

		return res.status(200).json({ message: `Toggled state for ${id}` })
	})
