import type { ParsedUrlQuery } from 'querystring'
import type { GameSimple } from 'types'

import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher } from 'lib/fetcher'

export type FollowingGames = {
	isLimitReached: boolean,
	numberOfPages: number,
	skips: Array<number>,
	take: number,
}

export const useFollowingGames = (query: ParsedUrlQuery, newSkip: number = 0) => {
	const [state, setState] = useGlobalState('followingGames')
	const { data } = useSWR<{ games: Array<GameSimple>, skip: number, take: number, before: GameSimple | null, after: GameSimple | null }>(
		query.user
			? ['/games', query.user, newSkip]
			: null, (link: string, followedGamesUser: string, skip: number) => fetcher(`${link}?user=${followedGamesUser}${skip ? `&skip=${skip}` : ''}`), {
			revalidateOnFocus: false,
		},
	)

	const setIsLimitReached = (isLimitReached: boolean) => setState({ ...state, isLimitReached })
	return { games: data?.games, after: data?.after, before: data?.before, setIsLimitReached }
}
