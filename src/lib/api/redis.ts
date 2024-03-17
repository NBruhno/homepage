import { createClient } from 'redis'

import { config } from 'config.server'

export const createRedis = async () => {
	const redis = await createClient({
		url: config.redis.url,
	})
		.on('error', (error) => {
			throw error
		})
		.connect()

	return redis
}
