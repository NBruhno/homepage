/* eslint-disable no-console */

require('dotenv').config()

const { VERCEL_ENV } = process.env

const characterSpacing = 37
const missingValues = []

const log = (value, result) => {
	const ending = () => {
		switch (result) {
			case 'exists': return 'Exists'
			case 'missing': return 'Missing'
			case 'deploy': return 'Deployment only'
		}
	}
	console.log(`${value}:${new Array(characterSpacing - value.length).join(' ')} ${ending()}`)
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

console.log(`Current environment:${new Array(characterSpacing - 18).join(' ')}${VERCEL_ENV ? VERCEL_ENV.charAt(0).toUpperCase() + VERCEL_ENV.slice(1) : 'Undefined'}`)
verifyVariable('ACCESS_CODE')
verifyVariable('AUTH_IV')
verifyVariable('AUTH_SECRET')
verifyVariable('AUTH_SYSTEM_TOKEN')
verifyVariable('IGDB_CLIENT_ID')
verifyVariable('IGDB_CLIENT_SECRET')
verifyVariable('IGDB_TOKEN')
verifyVariable('ITAD_TOKEN')
verifyVariable('SMART_HOME_HOST')
verifyVariable('STATIC_HOST')
verifyVariable('DATABASE_URL', true)
verifyVariable('NEXT_PUBLIC_SENTRY_DSN', true)
verifyVariable('SENTRY_AUTH_TOKEN', true)
verifyVariable('SENTRY_DSN', true)
verifyVariable('SENTRY_ORG', true)
verifyVariable('SENTRY_PROJECT', true)
verifyVariable('SENTRY_URL', true)

if (missingValues.length > 0) {
	console.log('Error: Missing the above mentioned env variables')
	process.exit(1)
} else {
	console.log('All required env variables are available')
}
