/* eslint-disable no-console */

const fs = require('node:fs')

const { fetch } = require('undici')
require('dotenv').config()

const { VERCEL_ENV, IGDB_CLIENT_ID, IGDB_CLIENT_SECRET, VGINSIGHTS_EMAIL, VGINSIGHTS_PASSWORD } = process.env

const createEnv = async () => {
	if (VERCEL_ENV && VERCEL_ENV !== 'development') {
		try {
			await Promise.all([
				(async () => {
					const igdbToken = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`, {
						method: 'POST',
					}).then(async (response) => {
						const responseBody = await response.json()
						return responseBody.access_token
					})

					fs.appendFile('.env', `IGDB_TOKEN="${igdbToken}"\n`, (error) => {
						if (error) throw error
						console.log('IGDB token appended to .env')
					})
				})(),
				(async () => {
					const vgInsightsToken = await fetch(`https://vginsights.com/api/v1/auth/email/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: VGINSIGHTS_EMAIL,
							password: VGINSIGHTS_PASSWORD,
						}),
					}).then(async (response) => {
						const responseBody = await response.json()
						return responseBody.token
					})

					fs.appendFile('.env', `VGINSIGHTS_TOKEN="${vgInsightsToken}"\n`, (error) => {
						if (error) throw error
						console.log('VG Insights token appended to .env')
					})
				})(),
			])

			console.log(fs.readFile('.env', 'utf-8'))
		} catch (error) {
			console.log(error)
			throw new Error('Failed to generate deploy env')
		}
	} else console.log('Building locally, skipping deploy env generation')
}

createEnv()
