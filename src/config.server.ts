import type { Environment } from 'types'

export const config = Object.freeze({
	amqp: {
		url: process.env.AMQP_URL as string,
	},

	auth: {
		accessCode: process.env.ACCESS_CODE as string,
		privateKey: process.env.AUTH_PRIVATE_KEY as string,
		publicKey: process.env.AUTH_PUBLIC_KEY as string,
		systemToken: process.env.AUTH_SYSTEM_TOKEN as string,
	},

	igdb: {
		clientId: process.env.IGDB_CLIENT_ID as string,
		token: process.env.IGDB_TOKEN as string,
		webhookSecret: process.env.IGDB_WEBHOOK_SECRET as string,
	},

	itad: {
		apiKey: process.env.ITAD_TOKEN as string,
	},

	kv: {
		url: process.env.KV_URL as string,
		api: {
			url: process.env.KV_REST_API_URL as string,
			token: process.env.KV_REST_API_TOKEN as string,
			readOnlyToken: process.env.KV_REST_API_READ_ONLY_TOKEN as string,
		},
	},

	steam: {
		apiKey: process.env.STEAM_API_KEY as string,
	},

	vgInsights: {
		token: process.env.VGINSIGHTS_TOKEN as string,
	},

	environment: process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV as Environment,
	staticHost: process.env.STATIC_HOST as string,
	smartHomeHost: process.env.SMART_HOME_HOST as string,
} as const)
