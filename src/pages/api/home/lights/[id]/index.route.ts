import { UserRole } from '@prisma/client'
import { object, string, create, boolean, number, size, tuple, optional } from 'superstruct'

import { apiHandler, homeFetcher } from 'lib/api'
import { Method } from 'lib/fetcher'
import { authenticate } from 'lib/middleware'

const Query = object({
	id: string(),
})

const Body = object({
	isLightOn: optional(boolean()),
	brightness: optional(size(number(), 0, 255)),
	color: optional(tuple([size(number(), 0, 255), size(number(), 0, 255), size(number(), 0, 255)])),
})

export default apiHandler({
	validMethods: ['PATCH'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/home/lights/{entityId}`,
})
	.patch(async (req, res) => {
		const { token } = authenticate(req, { allowedRoles: [UserRole.Admin] })
		const { id } = create(req.query, Query)
		const { isLightOn, brightness, color } = create(req.query, Body)

		await homeFetcher(`/lights/${id}`, {
			accessToken: token,
			method: Method.Patch,
			body: {
				isLightOn,
				brightness,
				color,
			},
		})

		return res.status(200).json({ message: `Toggled state for ${id}` })
	})
