import type { ParsedUrlQuery } from 'querystring'
import type { Game } from 'types/Games'

import useSWR from 'swr'

import { useGlobalState } from 'states/globalState'

import { fetcher } from 'lib/fetcher'

export const useFollowingGames = (query: ParsedUrlQuery, after?: string) => {
	const [{ afters, numberOfPages }, setGameState] = useGlobalState('followingGames')
	const { data } = useSWR<{ games: Array<Game>, before?: string, after?: string }>(
		query.user
			? ['/games', query.user, after]
			: null, (link, followedGamesUser, after) => fetcher(`${link}?user=${followedGamesUser}${after ? `&after=${after}` : ''}`), {
			revalidateOnFocus: false,
			onSuccess: (data) => {
				if (data?.after) {
					setGameState({ afters: [...afters, data?.after], numberOfPages })
				}
			},
		},
	)

	return { games: data?.games }
}
