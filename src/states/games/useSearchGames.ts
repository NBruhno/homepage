import type { Game } from 'types'

import { toLower } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher } from 'lib/fetcher'

export type SearchGames = {
	hasSearch: boolean,
}

export const useSearchGames = () => {
	const router = useRouter()
	const [{ games: gamesSearch, ...formState }, setFormState] = useGlobalState('forms')
	const [{ hasSearch }, setGameState] = useGlobalState('searchGames')

	const { data } = useSWR<{ games: Array<Game> }>(gamesSearch?.search && typeof gamesSearch.search === 'string'
		? ['/games?search=', toLower(gamesSearch.search)]
		: null, (link: string, searchParameter: string) => fetcher(`${link}${searchParameter}`), { revalidateOnFocus: false })

	// Every time we update the search form, we also want to update the URL to match the search query for easy sharing
	useEffect(() => {
		if (router.query.title !== gamesSearch?.search) {
			router.push(`/games/search${gamesSearch?.search ? `?title=${gamesSearch.search}` : ''}`, undefined, { shallow: true })
		}
	}, [gamesSearch?.search])

	// If there is a query on load (we assume it is on load because hasSearch is false initially), we populate the form
	// state with the search
	useEffect(() => {
		if (router.query.title && !hasSearch) {
			setFormState({ ...formState, games: { search: router.query.title.toString() } })
			setHasSearch(true)
		}
	}, [router.query])

	/**
	 * Indicates wether or not the user has searched for anything
	 */
	const setHasSearch = (hasSearchResponse: boolean) => {
		if (hasSearch !== hasSearchResponse) setGameState({ hasSearch: hasSearchResponse })
	}

	return { games: data?.games, gamesSearch, hasSearch, setHasSearch }
}
