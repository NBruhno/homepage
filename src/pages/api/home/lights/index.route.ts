import { UserRole } from '@prisma/client'

import { apiHandler, homeFetcher } from 'lib/api'
import { authenticate } from 'lib/middleware'

export default apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { token } = authenticate(req, { allowedRoles: [UserRole.Admin] })
		const lights = await homeFetcher('/lights', { accessToken: token })

		return res.status(200).json(lights)
	})
