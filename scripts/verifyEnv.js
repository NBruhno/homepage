/* eslint-disable no-console */

require('dotenv').config()

const { VERCEL_ENV } = process.env

const characterSpacing = 37
const missingValues = []

const log = (_value, result) => {
	const ending = () => {
		switch (result) {
			case 'exists':
				return 'Exists'
			case 'missing':
				return 'Missing'
			case 'deploy':
				return 'Deployment only'
		}
	}
}

const verifyVariable = (value, isDeployOnly = false) => {
	if (process.env[value] === undefined) {
		if (isDeployOnly && VERCEL_ENV !== 'development') {
			log(value, 'missing')
			missingValues.push(value)
		} else {
			log(value, 'deploy')
		}
	} else {
		log(value, 'exists')
	}
}
verifyVariable('ACCESS_CODE')
verifyVariable('AMQP_URL')
verifyVariable('AUTH_PRIVATE_KEY')
verifyVariable('AUTH_PUBLIC_KEY')
verifyVariable('AUTH_SYSTEM_TOKEN')
verifyVariable('IGDB_TOKEN')
verifyVariable('IGDB_WEBHOOK_SECRET')
verifyVariable('ITAD_TOKEN')
verifyVariable('KV_URL')
verifyVariable('POSTGRES_PRISMA_URL')
verifyVariable('POSTGRES_URL_NON_POOLING')
verifyVariable('SMART_HOME_HOST')
verifyVariable('STATIC_HOST')
verifyVariable('STEAM_API_KEY')
verifyVariable('VGINSIGHTS_TOKEN')
verifyVariable('KV_REST_API_READ_ONLY_TOKEN', true)
verifyVariable('KV_REST_API_TOKEN', true)
verifyVariable('KV_REST_API_URL', true)
verifyVariable('NEXT_PUBLIC_SENTRY_DSN', true)
verifyVariable('SENTRY_AUTH_TOKEN', true)
verifyVariable('SENTRY_DSN', true)
verifyVariable('SENTRY_ORG', true)
verifyVariable('SENTRY_PROJECT', true)
verifyVariable('SENTRY_URL', true)

if (missingValues.length > 0) {
	process.exit(1)
} else {
}
