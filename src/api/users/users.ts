import type { NextApiRequest, NextApiResponse } from 'next'
import type { Infer } from 'superstruct'
import type { FaunaUser } from 'types'
import { TokenType } from 'types'

import { query as q, errors } from 'faunadb'
import { assert, StructError, object, pattern, string, create, define } from 'superstruct'

import { config } from 'config.server'

import { monitorReturn, monitorReturnAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { setRefreshCookie } from 'api/middleware'
import { serverClient, getJwtToken } from 'api/utils'

const Body = object({
	email: pattern(string(), /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),
	password: string(),
	displayName: string(),
	accessCode: define('accessCode', (accessCode) => accessCode === config.auth.accessCode),
})

interface Request extends NextApiRequest {
	body: Infer<typeof Body>
}

export const users = async (req: Request, res: NextApiResponse) => {
	const { method, body } = req

	switch (method) {
		case 'POST': {
			try {
				assert(body, Body)
			} catch (error) {
				if (error instanceof StructError) res.status(400)
				throw error
			}
			const { email, password, displayName } = create(body, Body)

			const { ref } = await monitorReturnAsync(() => (
				serverClient().query<FaunaUser>(
					q.Create(q.Collection('users'), {
						credentials: { password },
						data: { email, role: 'user', twoFactorSecret: null, displayName },
					}),
				).then(async ({ ref }) => serverClient().query<FaunaUser>(
					q.Update(ref, {
						data: {
							owner: ref,
						},
					}),
				)).catch((error) => {
					if (error instanceof errors.BadRequest) throw createAndAttachError(400, res, new Error('Email is already in use'))
					throw error
				})
			), 'faunadb - Create().then(Update())')

			const loginRes = await monitorReturnAsync(() => (
				serverClient().query<{ secret: string }>(
					q.Login(ref, {
						password,
					}),
				)
			), 'faunadb - Login()')

			const userId = monitorReturn(
				() => ref.toString().split(',')[1].replace(/[") ]/gi, ''),
				'userId',
			)

			const accessToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId })
			const refreshToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId }, { type: TokenType.Refresh })
			setRefreshCookie(res, refreshToken)

			return res.status(200).json({ accessToken })
		}

		default: throw createAndAttachError(405, res)
	}
}
