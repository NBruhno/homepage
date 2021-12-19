/* eslint-disable no-console */

require('dotenv').config()
const chalk = require('chalk')

const { VERCEL_ENV } = process.env

const characterSpacing = 37
const missingValues = []

const log = (value, result) => {
	const ending = () => {
		switch (result) {
			case 'exists': return chalk.green('Exists')
			case 'missing': return chalk.red('Missing')
			case 'deploy': return chalk.yellow('Deployment only')
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

console.log(`Current environment:${new Array(characterSpacing - 18).join(' ')}${chalk.blue(VERCEL_ENV ? VERCEL_ENV.charAt(0).toUpperCase() + VERCEL_ENV.slice(1) : 'Undefined')}`)
verifyVariable('ACCESS_CODE')
verifyVariable('AUTH_IV')
verifyVariable('AUTH_SECRET')
verifyVariable('AUTH_SYSTEM_TOKEN')
verifyVariable('FAUNADB_SECRET')
verifyVariable('IGDB_CLIENT_ID')
verifyVariable('IGDB_CLIENT_SECRET')
verifyVariable('IGDB_TOKEN')
verifyVariable('ITAD_TOKEN')
verifyVariable('NEXT_PUBLIC_SENTRY_DSN', true)
verifyVariable('SENTRY_AUTH_TOKEN', true)
verifyVariable('SENTRY_DSN', true)
verifyVariable('SENTRY_ORG', true)
verifyVariable('SENTRY_PROJECT', true)
verifyVariable('SENTRY_URL', true)

if (missingValues.length > 0) {
	console.log(chalk.red('Error: Missing the above mentioned env variables'))
	process.exit(1)
} else {
	console.log(chalk.green('All required env variables are available'))
}
