import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { Game } from 'types/Games'

import { useStore } from 'lib/store'
import { fetcher, Method } from 'lib/fetcher'

export const useGames = () => {
	const [query, setQuery] = useState(undefined)
	const [games, setGames] = useState(null)
	const { state } = useStore()
	const { data, error } = useSWR(['/games', query], (link, query) => fetcher(link, { body: query, accessToken: state.user?.accessToken, method: Method.Post }), { revalidateOnFocus: false })

	const follow = async (id: string) => {
		const response = await fetcher(`/games/${id}/follow`, { accessToken: state.user.accessToken, method: Method.Post })
		if (response.message) {
			setGames(games.map((game: Game) => {
				if (id === game.id) return { ...game, following: true }
				return game
			}))
		}
	}

	const unfollow = async (id: string) => {
		const response = await fetcher(`/games/${id}/unfollow`, { accessToken: state.user.accessToken, method: Method.Post })
		if (response.message) {
			setGames(games.map((game: Game) => {
				if (id === game.id) return { ...game, following: false }
				return game
			}))
		}
	}

	useEffect(() => setGames(data), [data])

	return { games, error, setQuery, follow: async (id: string) => follow(id), unfollow: async (id: string) => unfollow(id) }
}

export const useGame = (id: string) => {
	const [game, setGame] = useState(null)
	const { state } = useStore()
	const { data, error } = useSWR(id ? `/games/${id}` : null, (link) => fetcher(link, { accessToken: state.user?.accessToken }), { revalidateOnFocus: false })

	const follow = async () => {
		const response = await fetcher(`/games/${id}/follow`, { accessToken: state.user.accessToken, method: Method.Post })

		if (response.message) {
			setGame(() => {
				if (id === game.id) return { ...game, following: true }
				return game
			})
		}
	}

	const unfollow = async () => {
		const response = await fetcher(`/games/${id}/unfollow`, { accessToken: state.user.accessToken, method: Method.Post })
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
