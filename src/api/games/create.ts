import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'

import { getUnixTime } from 'date-fns'
import { query as q } from 'faunadb'

import { authenticateSystem } from 'api/middleware'
import { serverClient, monitorAsync } from 'api/utils'

export const create = async (req: NextApiRequest, res: NextApiResponse, options: ApiOptions) => {
	const { body } = req
	const { transaction } = options
	authenticateSystem(req, res)

	await monitorAsync(() => serverClient(transaction).query(q.Create(q.Collection('games'), {
		data: {
			...body,
			lastChecked: getUnixTime(new Date()),
		},
	})), 'faunadb - Create()', transaction)

	return res.status(200).json({ message: `${body.id} created` })
}
