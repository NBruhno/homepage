import { createClient } from 'redis'

export const createRedis = async () => {
	const redis = await createClient()
		.on('error', (error) => {
			throw error
		})
		.connect()

	return redis
}
