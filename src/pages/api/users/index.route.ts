import { UserTokenType } from 'types'

import { UserRole } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { setUser } from '@sentry/nextjs'
import { hash } from 'argon2'
import { object, create } from 'superstruct'

import { accessCode } from 'validation/api'
import { username, email, password } from 'validation/shared'

import { getJwtToken, apiHandler, prisma, argonDefaultOptions } from 'lib/api'
import { ApiError } from 'lib/errors'
import { authenticate, setRefreshCookie } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Body = object({
	email: email(),
	password: password(),
	username: username(),
	accessCode: accessCode(),
})

export default apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		authenticate(req, { allowedRoles: [UserRole.Admin] })
		const result = await monitorAsync(() => prisma.user.findMany(), 'db:prisma', 'findMany()')

		return res.status(200).json(result)
	})
	.post(async (req, res) => {
		try {
			const { email, password, username } = create(req.body, Body)
			const passwordHash = await monitorAsync(() => hash(password, argonDefaultOptions), 'argon2', 'hash()')

			const user = await monitorAsync(() => prisma.user.create({
				data: {
					email,
					username,
					passwordHash,
				},
			}), 'db:prisma', 'create()')

			setUser({ id: user.id, username: user.username, email: user.email })
			const accessToken = getJwtToken({ sub: email, username: user.username, role: UserRole.User, userId: user.id, steamId: user.steamId })
			const refreshToken = getJwtToken({ sub: email, username: user.username, role: UserRole.User, userId: user.id, steamId: user.steamId }, { type: UserTokenType.Refresh })
			setRefreshCookie(res, refreshToken)

			return res.status(200).json({ accessToken })
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
				throw ApiError.fromCodeWithError(409, error, 'Email is already in use')
			} else {
				throw error
			}
		}
	})
