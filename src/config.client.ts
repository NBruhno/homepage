import type { Environment } from 'types'

export const config = Object.freeze({
	environment: process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV as Environment,
	staticHost: process.env.STATIC_HOST as string,
} as const)
