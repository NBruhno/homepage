import type { Environment } from 'types/Environment'

export const config = Object.freeze({
	environment: process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV as Environment,
} as const)
