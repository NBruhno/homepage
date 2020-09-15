import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { useAuth } from 'states/auth'

import type { Game, SimpleGame, ListTypes } from 'types/Games'

import { fetcher, Method } from 'lib/fetcher'
import { useGlobalState } from './globalState'

type GameList = {
	following: Array<SimpleGame>,
	games: Array<SimpleGame>,
	popular: Array<SimpleGame>,
}

export const useGames = () => {
	const [forms] = useGlobalState('forms')
	const [gamesState, setGameState] = useGlobalState('games')
	const [games, setGames] = useState<GameList>({ popular: null, games: null, following: null })
	const { user } = useAuth()
	const { data, error } = useSWR<GameList>(
		user?.isStateKnown ? ['/games', forms.games?.search, user.shouldRefresh] : null, (link, search, accessToken) => fetcher(link, { body: { search }, accessToken, method: Method.Post }), { revalidateOnFocus: false },
	)

	const follow = async (id: string) => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follow`, { accessToken: user.accessToken, method: Method.Post })
		if (response.message) {
			setGames({
				popular: games.popular.map((game: SimpleGame) => {
					if (id === game.id) return { ...game, following: true }
					return game
				}),
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
		const response = await fetcher<{ message?: string }>(`/games/${id}/unfollow`, { accessToken: user.accessToken, method: Method.Patch })
		if (response.message) {
			setGames({
				popular: games.popular.map((game: SimpleGame) => {
					if (id === game.id) return { ...game, following: false }
					return game
				}),
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

	const setCurrentList = (currentList: ListTypes) => {
		if (currentList !== gamesState.currentList) {
			setGameState({ ...gamesState, currentList })
		}
	}

	useEffect(() => setGames(data), [data])

	return { ...games, error, currentList: gamesState.currentList, setCurrentList, follow, unfollow }
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
		const response = await fetcher<{ message?: string }>(`/games/${id}/unfollow`, { accessToken: user.accessToken, method: Method.Patch })
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
