import { kv } from '@vercel/kv'
import { createClient as createRedisClient } from 'redis'

import { config } from 'config.server'

type ReturnType = Promise<{
	hDel: (hash: string, keys: Array<string>) => Promise<number>,
	hGet: (hash: string, key: string) => Promise<string | null>,
	hGetAll: (hash: string) => Promise<Record<string, string> | null>,
	hSet: (hash: string, key: string | number, value: string | number) => Promise<number>,
	disconnect: () => Promise<void>,
}>

export const createRedis = async (): ReturnType => {
	if (config.environment === 'development') {
		const client = await createRedisClient({
			url: config.kv.url,
		})
			.on('error', (error) => {
				throw error
			})
			.connect()

		return {
			hDel: async (hash, ...keys) => client.hDel(hash, ...keys),
			hGet: async (hash, key) => {
				const result = await client.hGet(hash, key)
				return result ?? null
			},
			hGetAll: async (hash) => client.hGetAll(hash),
			hSet: async (hash, key, value) => client.hSet(hash, key, value),
			disconnect: async () => client.disconnect(),
		}
	} else {
		const client = kv

		return {
			hDel: async (hash, keys) => client.hdel(hash, ...keys),
			hGet: async (hash, key) => client.hget(hash, key),
			hGetAll: async (hash) => client.hgetall(hash),
			hSet: async (hash, key, value) => client.hset(hash, { [key]: value }),
			disconnect: async () => undefined,
		}
	}
}
