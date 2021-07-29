import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'

import { getActiveTransaction } from '@sentry/tracing'
import { errors, query as q } from 'faunadb'

import { monitorAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { authenticate } from 'api/middleware'
import { faunaClient } from 'api/utils'

interface Request extends NextApiRequest {
	body: {
		newPassword: string,
	}
}

type Options = {
	userId: string,
} & ApiOptions

export const changePassword = async (req: Request, res: NextApiResponse, options: Options) => {
	const { method, body: { newPassword } } = req
	const { userId } = options
	const transaction = getActiveTransaction()
	if (transaction) transaction.setName(`${method} - api/users/{userId}/changePassword`)
	const { secret } = authenticate(req, res)

	switch (method) {
		case 'POST': {
			if (!newPassword) throw createAndAttachError(400, res)

			await monitorAsync(async () => faunaClient(secret).query(
				q.Update(q.Ref(q.Collection('users'), userId), { credentials: { password: newPassword } }),
			).catch((error: unknown) => {
				if (error instanceof errors.Unauthorized) throw createAndAttachError(401, res)
				throw error
			}), 'faunadb - Update()')
			return res.status(200).json({ message: 'Your password has been updated' })
		}

		default: throw createAndAttachError(405, res)
	}
}
