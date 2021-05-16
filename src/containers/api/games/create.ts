import type { Options } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUnixTime } from 'date-fns'
import { query as q } from 'faunadb'

import { serverClient } from '../faunaClient'
import { authenticateSystem } from '../middleware'
import { monitorAsync } from '../performanceCheck'

export const create = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { body } = req
	const { transaction } = options
	authenticateSystem(req, res)

	await monitorAsync(() => serverClient.query(q.Create(q.Collection('games'), {
		data: {
			...body,
			lastChecked: getUnixTime(new Date()),
		},
	})), 'faunadb - Create()', transaction)

	return res.status(200).json({ message: `${body.id} created` })
}
