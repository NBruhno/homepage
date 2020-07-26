/* eslint-disable no-console */

require('dotenv').config()
const chalk = require('chalk')

const { log } = console

log(`Current environment:      ${chalk.blue(process.env.NODE_ENV)}`)
log(`AUTH_IV:                  ${process.env.AUTH_IV ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`AUTH_SECRET:              ${process.env.AUTH_SECRET ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`FAUNADB_SECRET:           ${process.env.FAUNADB_SECRET ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`FAUNADB_SERVER_KEY:       ${process.env.FAUNADB_SERVER_KEY ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`IGDB_USER_KEY:            ${process.env.IGDB_USER_KEY ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`NEXT_PUBLIC_SENTRY_DSN:   ${process.env.NEXT_PUBLIC_SENTRY_DSN ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`SENTRY_AUTH_TOKEN:        ${process.env.SENTRY_AUTH_TOKEN ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`SENTRY_ORG:               ${process.env.SENTRY_ORG ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`SENTRY_PROJECT:           ${process.env.SENTRY_PROJECT ? chalk.green('Exists') : chalk.red('Missing')}`)
log(`VERCEL_GITHUB_COMMIT_SHA: ${process.env.VERCEL_GITHUB_COMMIT_SHA ? chalk.green('Exists') : chalk.red('Missing')}`)
