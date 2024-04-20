import { create, number, type } from 'superstruct'

import { config } from 'config.server'

import { apiHandler, createAmqp, redis } from 'lib/api'
import { ApiError } from 'lib/errors'

const valiator = type({
	id: number(),
})

export default apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		if (req.headers['x-secret'] !== config.igdb.webhookSecret) throw ApiError.fromCodeWithCause(401, new Error(`Invalid secret`))
		const { id } = create(req.body, valiator)

		if (config.queueStrategy === 'amqp') {
			const amqp = await createAmqp()
			try {
				const channel = await amqp.channel()

				await channel.queue(`game:create`, { durable: true })
				await channel.basicPublish('', `game:create`, id.toString(), {})
			} finally {
				await amqp.close()
			}
		} else {
			await redis.hset('game', id.toString(), 'create')
		}

		return res.status(200).json({ message: `Added create request for game with ID ${id} to queue.` })
	})
