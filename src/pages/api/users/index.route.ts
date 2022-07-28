import { UserTokenType } from 'types'

import { UserRole } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { setUser, withSentry } from '@sentry/nextjs'
import { hash } from 'argon2'
import { object, create } from 'superstruct'

import { accessCode } from 'validation/api'
import { username, email, password } from 'validation/shared'

import { getJwtToken, apiHandler, prisma, argonDefaultOptions } from 'lib/api'
import { ApiError } from 'lib/errors'
import { setRefreshCookie } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Body = object({
	email: email(),
	password: password(),
	username: username(),
	accessCode: accessCode(),
})

const handler = apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
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
			const accessToken = getJwtToken({ sub: email, username: user.username, role: UserRole.User, userId: user.id })
			const refreshToken = getJwtToken({ sub: email, username: user.username, role: UserRole.User, userId: user.id }, { type: UserTokenType.Refresh })
			setRefreshCookie(res, refreshToken)

			return res.status(200).json({ accessToken })
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
				throw ApiError.fromCodeWithError(409, new Error('Email is already in use'))
			} else {
				throw error
			}
		}
	})

export default withSentry(handler)
