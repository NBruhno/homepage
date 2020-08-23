/* eslint-disable no-console */
require('dotenv').config()
const chalk = require('chalk')

const { DEPLOY_ENV } = process.env

let missingAValue = false

const log = (value, result) => {
	const ending = () => {
		switch (result) {
			case 'exists': return chalk.green('Exists')
			case 'missing': return chalk.red('Missing')
			case 'production': return chalk.yellow('Production only')
		}
	}
	console.log(`${value}:${new Array(25 - value.length).join(' ')} ${ending()}`)
}

const verifyVariable = (value, productionOnly = false) => {
	if (process.env[value] === undefined) {
		if (!productionOnly && DEPLOY_ENV !== 'production') {
			log(value, 'missing')
			missingAValue = true
		} else {
			log(value, 'production')
		}
	} else {
		log(value, 'exists')
	}
}

console.log(`Current environment:      ${chalk.blue(DEPLOY_ENV ? DEPLOY_ENV.charAt(0).toUpperCase() + DEPLOY_ENV.slice(1) : 'Undefined')}`)
verifyVariable('AUTH_IV')
verifyVariable('AUTH_SECRET')
verifyVariable('FAUNADB_SECRET')
verifyVariable('FAUNADB_SERVER_KEY')
verifyVariable('IGDB_USER_KEY')
verifyVariable('NEXT_PUBLIC_SENTRY_DSN')
verifyVariable('SENTRY_AUTH_TOKEN', true)
verifyVariable('SENTRY_ORG', true)
verifyVariable('SENTRY_PROJECT', true)
verifyVariable('VERCEL_GITHUB_COMMIT_SHA', true)

if (missingAValue) {
	throw new Error('Missing the above mentioned env variable(s)')
}
