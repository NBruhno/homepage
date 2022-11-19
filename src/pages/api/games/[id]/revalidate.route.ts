import { UserRole } from '@prisma/client'
import { create, object, string } from 'superstruct'

import { apiHandler } from 'lib/api'
import { authenticate } from 'lib/middleware'

const Query = object({
	id: string(),
})

export default apiHandler({
	validMethods: ['POST'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/revalidate`,
})
	.post(async (req, res) => {
		authenticate(req, { allowedRoles: [UserRole.Admin] })
		const { id } = create(req.query, Query)

		await res.revalidate(`/games/${id}`)
		return res.status(200).json({ message: `Cache for /games/${id} has been cleared and re-rendered` })
	})
