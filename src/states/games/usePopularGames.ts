import type { Game } from 'types/Games'

import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher } from 'lib/fetcher'

export type PopularGames = {
	afters: Array<string | undefined>,
	numberOfPages: number,
}

export const usePopularGames = (after?: string) => {
	const [{ afters, numberOfPages }, setGameState] = useGlobalState('popularGames')
	const { data } = useSWR<{ games: Array<Game>, after?: string }>(
		['/games', after],
		(link) => fetcher(`${link}${after ? `?after=${after}` : ''}`), {
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
