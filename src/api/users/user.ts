import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'

import { query as q } from 'faunadb'

import { monitorAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { authenticate, removeRefreshCookie } from 'api/middleware'
import { faunaClient } from 'api/utils'

type Options = {
	userId: string,
} & ApiOptions

export const user = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { userId, transaction } = options
	transaction.setName(`${method} - api/users/{userId}`)
	const { secret } = authenticate(req, res, { transaction })

	switch (method) {
		case 'DELETE': {
			await monitorAsync(
				() => faunaClient(secret, transaction).query(q.Delete(q.Ref(q.Collection('users'), userId))),
				'faunadb - Delete()', transaction,
			)

			removeRefreshCookie(res, transaction)
			return res.status(200).json({ message: 'Your user has been deleted' })
		}

		default: throw createAndAttachError(405, res)
	}
}
