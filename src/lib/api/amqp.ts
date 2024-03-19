import { AMQPClient } from '@cloudamqp/amqp-client'

import { config } from 'config.server'

export const createAmqp = async () => {
	const client = new AMQPClient(config.amqp.url)
	await client.connect()

	return client
}
