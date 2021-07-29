import type { NextApiRequest, NextApiResponse } from 'next'

import { getUnixTime } from 'date-fns'
import { query as q } from 'faunadb'

import { monitorAsync } from 'lib/sentryMonitor'

import { authenticateSystem } from 'api/middleware'
import { serverClient } from 'api/utils'

export const create = async (req: NextApiRequest, res: NextApiResponse) => {
	const { body } = req
	authenticateSystem(req, res)

	await monitorAsync(() => serverClient().query(q.Create(q.Collection('games'), {
		data: {
			...body,
			lastChecked: getUnixTime(new Date()),
		},
	})), 'faunadb - Create()')

	return res.status(200).json({ message: `${body.id} created` })
}
