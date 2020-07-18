/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { config } from 'config.server'

import { Game as IGDBGame } from 'types/IGDB'
import { Game } from 'types/Games'

import { authenticateAccessToken } from 'server/middleware'
import { faunaClient } from 'server/faunaClient'
import { ApiError } from 'server/errors/ApiError'

export const gameList = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	const token = await authenticateAccessToken(req, res)
	switch (method) {
		case 'GET': {
			const response = await fetch('https://api-v3.igdb.com/games', {
				method: 'POST',
				body: 'fields name, release_dates, cover.image_id, first_release_date, slug; sort popularity desc; limit 7;',
				headers: new Headers({
					'user-key': config.igdb.userKey,
					'Content-Type': 'text/plain',
					accept: 'application/json',
				}),
			})
			const result = await response.json()

			if (result[0]?.status && result[0]?.status <= 400) {
				const error = ApiError.fromCode(result[0]?.status)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			if (result.length > 0) {
				const followedGames: { data: Array<string> } = await faunaClient(token.secret).query(q.Paginate(q.Match(q.Index('gamesByUser'), q.Identity())))
				const transformedResult: Array<Game> = result.map((game: IGDBGame) => {
					const following = followedGames.data.includes(game.slug)
					return {
						cover: {
							url: game.cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${game.cover.image_id}.jpg` : null,
						},
						id: game.slug ?? null,
						name: game.name,
						releaseDate: game.first_release_date ?? null,
						following,
					}
				})
				res.status(200).send(transformedResult)
			} else {
				res.status(200).send([])
			}
			break
		}

		case 'POST': {
			const followedGames: { data: Array<string> } = await faunaClient(token.secret).query(q.Paginate(q.Match(q.Index('gamesByUser'), q.Identity())))
			const response = await fetch('https://api-v3.igdb.com/games', {
				method: 'POST',
				body: body?.search
					? `fields name, release_dates, cover.image_id, first_release_date, slug; limit 20; search "${body?.search}";`
					: `fields name, release_dates, cover.image_id, first_release_date, slug; sort first_release_date asc; limit 100; where slug = ("${followedGames.data.join(`", "`)}");`,
				headers: new Headers({
					'user-key': config.igdb.userKey,
					'Content-Type': 'text/plain',
					accept: 'application/json',
				}),
			})
			const result = await response.json()

			if (result[0]?.status && result[0]?.status <= 400) {
				const error = ApiError.fromCode(result[0]?.status)
				res.status(error.statusCode).json({ error: error.message })
				throw result
			}

			if (result.length > 0) {
				const transformedResult: Array<Game> = result.map((game: IGDBGame) => {
					const following = body?.search ? followedGames.data.includes(game.slug) : true
					return ({
						cover: {
							url: game.cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${game.cover.image_id}.jpg` : null,
						},
						id: game.slug ?? null,
						name: game.name,
						releaseDate: game.first_release_date ?? null,
						following,
					})
				})
				res.status(200).send(transformedResult)
			} else {
				res.status(200).send([])
			}
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
