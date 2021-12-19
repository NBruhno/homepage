import type { ParsedUrlQuery } from 'querystring'
import type { Game } from 'types'

import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher } from 'lib/fetcher'

export type FollowingGames = {
	afters: Array<string | undefined>,
	numberOfPages: number,
}

export const useFollowingGames = (query: ParsedUrlQuery, after?: string) => {
	const [{ afters, numberOfPages }, setGameState] = useGlobalState('followingGames')
	const { data } = useSWR<{ games: Array<Game>, before?: string, after?: string }>(
		query.user
			? ['/games', query.user, after]
			: null, (link: string, followedGamesUser: string, after: string) => fetcher(`${link}?user=${followedGamesUser}${after ? `&after=${after}` : ''}`), {
			revalidateOnFocus: false,
			onSuccess: (data) => {
				setGameState({ afters: [...afters, data.after ?? undefined], numberOfPages })
			},
		},
	)

	return { games: data?.games }
}
