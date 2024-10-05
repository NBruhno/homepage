import { type TokenType, type Environment } from 'types'

import { type Algorithm } from '@node-rs/jsonwebtoken'

export const config = Object.freeze({
	amqp: {
		url: process.env.AMQP_URL as string,
	},

	auth: {
		accessCode: process.env.ACCESS_CODE as string,
		systemToken: process.env.AUTH_SYSTEM_TOKEN as string,

		keyPairs: JSON.parse(process.env.AUTH_KEY_PAIRS as string) as Array<{
			id: string,
			type: TokenType,
			algorithm: Algorithm,
			privateKey: string,
			publicKey: string,
		}>,
	},

	igdb: {
		clientId: process.env.IGDB_CLIENT_ID as string,
		token: process.env.IGDB_TOKEN as string,
		webhookSecret: process.env.IGDB_WEBHOOK_SECRET as string,
	},

	instantGaming: {
		queryUrl: process.env.INSTANT_GAMING_QUERY_URL as string,
	},

	itad: {
		apiKey: process.env.ITAD_TOKEN as string,
	},

	redis: {
		url: process.env.REDIS_URL as string,
	},

	steam: {
		apiKey: process.env.STEAM_API_KEY as string,
	},

	vgInsights: {
		token: process.env.VGINSIGHTS_TOKEN as string,
	},

	environment: process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV as Environment,
	queueStrategy: process.env.QUEUE_STRATEGY as 'redis' | 'amqp',
	smartHomeHost: process.env.SMART_HOME_HOST as string,
	staticHost: process.env.STATIC_HOST as string,
} as const)
