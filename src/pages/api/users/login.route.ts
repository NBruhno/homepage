import { UserTokenType } from 'types'

import { setUser } from '@sentry/nextjs'
import { verify } from 'argon2'
import { object, create } from 'superstruct'

import { email, password } from 'validation/shared'

import { getJwtToken, apiHandler, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { setRefreshCookie } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Body = object({
	email: email(),
	password: password(),
})

export default apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		const { email: loginEmail, password } = create(req.body, Body)

		const user = await monitorAsync(() => prisma.users.findUnique({
			where: {
				email: loginEmail,
			},
			select: {
				id: true,
				email: true,
				passwordHash: true,
				role: true,
				twoFactorSecret: true,
				steamId: true,
				username: true,
			},
		}), 'db:prisma', 'findUnique()')

		if (!user) throw ApiError.fromCodeWithError(401, new Error('Invalid email and/or password'))
		const { id, email, role, passwordHash, twoFactorSecret, username, steamId } = user

		if (!await monitorAsync(async () => verify(passwordHash, password), 'argon2', 'verify()')) {
			throw ApiError.fromCodeWithError(401, new Error('Invalid email and/or password'))
		}

		setUser({ id, username, email })

		if (twoFactorSecret) {
			const intermediateToken = getJwtToken({ sub: email, username, role, userId: id }, { type: UserTokenType.Intermediate })

			return res.status(200).json({ intermediateToken })
		} else {
			const accessToken = getJwtToken({ sub: email, username, role, userId: id, steamId })
			const refreshToken = getJwtToken({ sub: email, username, role, userId: id, steamId }, { type: UserTokenType.Refresh })
			setRefreshCookie(res, refreshToken)

			return res.status(200).json({ accessToken })
		}
	})
