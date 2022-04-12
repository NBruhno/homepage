import type { GameSimple } from 'types'

import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher } from 'lib/fetcher'

export type PopularGames = {
	isLimitReached: boolean,
	numberOfPages: number,
	skips: Array<number>,
	take: number,
}

export const usePopularGames = (newSkip: number = 0) => {
	const [state, setState] = useGlobalState('popularGames')
	const { data } = useSWR<{ games: Array<GameSimple>, skip: number, take: number, before: GameSimple | null, after: GameSimple | null }>(
		['/games', newSkip],
		([link, skip]: [string, number]) => fetcher(`${link}?is-popular=yes${skip ? `&skip=${skip}` : ''}`),
		{ revalidateOnFocus: false },
	)

	const setIsLimitReached = (isLimitReached: boolean) => setState({ ...state, isLimitReached })
	return { games: data?.games, after: data?.after, before: data?.before, setIsLimitReached }
}
