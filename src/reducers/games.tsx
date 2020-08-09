import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { useAuth } from 'reducers/auth'

import type { Game, SimpleGame } from 'types/Games'

import { fetcher, Method } from 'lib/fetcher'

export const useGames = () => {
	const [query, setQuery] = useState(undefined)
	const [games, setGames] = useState<{ games: Array<SimpleGame>, following: Array<SimpleGame> }>({ games: null, following: null })
	const { user } = useAuth()
	const { data, error } = useSWR<{ games: Array<SimpleGame>, following: Array<SimpleGame> }>(
		user?.isStateKnown ? ['/games', query, user.accessToken] : null, (link, query) => fetcher(link, { body: query, accessToken: user?.accessToken, method: Method.Post }), { revalidateOnFocus: false },
	)

	const follow = async (id: string) => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follow`, { accessToken: user.accessToken, method: Method.Post })
		if (response.message) {
			setGames({
				games: games.games.map((game: SimpleGame) => {
					if (id === game.id) return { ...game, following: true }
					return game
				}),
				following: games.following.map((game: SimpleGame) => {
					if (id === game.id) return { ...game, following: true }
					return game
				}),
			})
		}
	}

	const unfollow = async (id: string) => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/unfollow`, { accessToken: user.accessToken, method: Method.Post })
		if (response.message) {
			setGames({
				games: games.games.map((game: SimpleGame) => {
					if (id === game.id) return { ...game, following: false }
					return game
				}),
				following: games.following.map((game: SimpleGame) => {
					if (id === game.id) return { ...game, following: false }
					return game
				}),
			})
		}
	}

	useEffect(() => setGames(data), [data])

	return { ...games, error, setQuery, follow: async (id: string) => follow(id), unfollow: async (id: string) => unfollow(id) }
}

export const useGame = (id: string) => {
	const [game, setGame] = useState(null)
	const { user } = useAuth()
	const { data, error } = useSWR<Game>((id && user?.isStateKnown) ? `/games/${id}` : null, (link) => fetcher(link, { accessToken: user?.accessToken }), { revalidateOnFocus: false })

	const follow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follow`, { accessToken: user.accessToken, method: Method.Post })

		if (response.message) {
			setGame(() => {
				if (id === game.id) return { ...game, following: true }
				return game
			})
		}
	}

	const unfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/unfollow`, { accessToken: user.accessToken, method: Method.Post })
		if (response.message) {
			setGame(() => {
				if (id === game.id) return { ...game, following: false }
				return game
			})
		}
	}
	useEffect(() => setGame(data), [data])

	return { game, error, follow: async () => follow(), unfollow: async () => unfollow() }
}
