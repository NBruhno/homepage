import { UserTokenType } from 'types'

import { setUser, withSentry } from '@sentry/nextjs'
import { verify } from 'argon2'
import { object, create } from 'superstruct'

import { monitorReturnAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { setRefreshCookie } from 'api/middleware'
import { getJwtToken, apiHandler, prisma, argonDefaultOptions } from 'api/utils'
import { email, password } from 'api/validation'

const Body = object({
	email: email(),
	password: password(),
})

export const handler = apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		const { email: loginEmail, password } = create(req.body, Body)

		const user = await monitorReturnAsync(() => prisma.user.findUnique({
			where: {
				email: loginEmail,
			},
			select: {
				id: true,
				email: true,
				passwordHash: true,
				role: true,
				twoFactorSecret: true,
				username: true,
			},
		}), 'prisma - findUnique()')

		if (!user) throw ApiError.fromCodeWithError(401, new Error('Invalid email and/or password'))
		const { id, email, role, passwordHash, twoFactorSecret, username } = user

		if (!await monitorReturnAsync(async () => verify(passwordHash, password, argonDefaultOptions), 'argon2 - verify')) {
			throw ApiError.fromCodeWithError(401, new Error('Invalid email and/or password'))
		}

		setUser({ id, username, email })

		if (twoFactorSecret) {
			const intermediateToken = getJwtToken({ sub: email, username, role, userId: id }, { type: UserTokenType.Intermediate })

			return res.status(200).json({ intermediateToken })
		} else {
			const accessToken = getJwtToken({ sub: email, username, role, userId: id })
			const refreshToken = getJwtToken({ sub: email, username, role, userId: id }, { type: UserTokenType.Refresh })
			setRefreshCookie(res, refreshToken)

			return res.status(200).json({ accessToken })
		}
	})

export default withSentry(handler)
