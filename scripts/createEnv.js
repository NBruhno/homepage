/* eslint-disable no-console */

require('isomorphic-fetch')
require('dotenv').config()

const fs = require('fs')

const { VERCEL_ENV, IGDB_CLIENT_ID, IGDB_CLIENT_SECRET } = process.env

const createEnv = async () => {
	if (VERCEL_ENV && VERCEL_ENV !== 'development') {
		try {
			const token = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${IGDB_CLIENT_ID}&client_secret=${IGDB_CLIENT_SECRET}&grant_type=client_credentials`, {
				method: 'POST',
			}).then(async (response) => {
				const json = await response.json()
				return json.access_token
			})

			fs.appendFile('.env', `IGDB_TOKEN="${token}"`, (error) => {
				if (error) throw error
				console.log('Deploy env appended to .env')
			})
		} catch (error) {
			console.log(error)
			throw new Error('Failed to generate deploy env')
		}
	} else console.log('Building locally, skipping deploy env generation')
}

createEnv()
