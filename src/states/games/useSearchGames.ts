import type { Game } from 'types'

import toLower from 'lodash/toLower'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { useFormStore } from 'states/page'

import { fetcher } from 'lib/fetcher'

export type SearchGames = {
	hasSearch: boolean,
}

type SearchGamesState = {
	hasSearch: boolean,
	setHasSearch: (hasSearch: boolean) => void,
}

export const useSearchGamesStore = create(devtools<SearchGamesState>((set) => ({
	hasSearch: false,
	setHasSearch: (hasSearch) => set({ hasSearch }, false, 'setHasSearch'),
}), { name: 'useSearchGamesStore' }))

export const useSearchGames = () => {
	const router = useRouter()
	const gameSearch = useFormStore((state) => state.searchGames.search)
	const setFormState = useFormStore((state) => state.setFormState)
	const setHasSearch = useSearchGamesStore((state) => state.setHasSearch)
	const hasSearch = useSearchGamesStore((state) => state.hasSearch)

	const { data } = useSWR<{ games: Array<Game> }>(gameSearch && typeof gameSearch === 'string'
		? ['/games?search=', encodeURIComponent(toLower(gameSearch))]
		: null, ([link, searchParameter]: [string, string]) => fetcher(`${link}${searchParameter}`), { revalidateOnFocus: false })

	// Every time we update the search form, we also want to update the URL to match the search query for easy sharing
	useEffect(() => {
		if (gameSearch && !hasSearch) setHasSearch(true)
		if (router.query.title !== gameSearch) {
			router.push(`/games/search${gameSearch ? `?title=${encodeURIComponent(gameSearch)}` : ''}`, undefined, { shallow: true })
		}
	}, [gameSearch, hasSearch])

	useEffect(() => {
		if (gameSearch) setHasSearch(true)
	}, [gameSearch])

	// If there is a query on load (we assume it is on load because hasSearch is false initially), we populate the form
	// state with the search
	useEffect(() => {
		if (router.query.title && !hasSearch) {
			setFormState('searchGames', { search: decodeURIComponent(router.query.title.toString()) })
			setHasSearch(true)
		}
	}, [router.query])

	return { games: data?.games, hasSearch }
}
