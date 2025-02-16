import type { Game } from 'types'

import { useRouter } from 'next/compat/router'
import { useEffect } from 'react'
import useSwr from 'swr'
import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import { useFormStore, useLoading } from 'states/page'

import { fetcher } from 'lib/fetcher'

export type SearchGames = {
	hasSearch: boolean
}

type SearchGamesState = {
	hasSearch: boolean
	setHasSearch: (hasSearch: boolean) => void
}

export const useSearchGamesStore = createWithEqualityFn<SearchGamesState>()(
	devtools(
		(set) => ({
			hasSearch: false,
			setHasSearch: (hasSearch) => set({ hasSearch }, false, 'setHasSearch'),
		}),
		{ anonymousActionType: 'useSearchGamesStore' },
	),
	shallow,
)

export const useSearchGames = () => {
	const router = useRouter()
	const gameSearch = useFormStore((state) => state.searchGames.search)
	const setFormState = useFormStore((state) => state.setFormState)
	const setHasSearch = useSearchGamesStore((state) => state.setHasSearch)
	const hasSearch = useSearchGamesStore((state) => state.hasSearch)

	const { data } = useSwr(
		gameSearch && typeof gameSearch === 'string'
			? ['/games?search=', encodeURIComponent(gameSearch.toLowerCase())]
			: null,
		([link, searchParameter]) => fetcher<{ games: Array<Game> }>(`${link}${searchParameter}`),
		{ revalidateOnFocus: false },
	)

	const { setIsLoading, isLoading } = useLoading()
	// Every time we update the search form, we also want to update the URL to match the search query for easy sharing
	useEffect(() => {
		if (gameSearch && !hasSearch) setHasSearch(true)
		if (gameSearch && router?.query.title !== gameSearch) {
			void router?.push({ query: { title: encodeURIComponent(gameSearch) } }, undefined, { shallow: true })
		}
	}, [gameSearch, hasSearch])

	useEffect(() => {
		if (gameSearch) setHasSearch(true)
	}, [gameSearch])

	// If there is a query on load (we assume it is on load because hasSearch is false initially), we populate the form
	// state with the search
	useEffect(() => {
		if (router?.query.title && !hasSearch) {
			setFormState('searchGames', { search: decodeURIComponent(router.query.title.toString()) })
			setHasSearch(true)
		}
	}, [router?.query])

	useEffect(() => {
		if (data && isLoading) setIsLoading(false)
	}, [data, isLoading])

	return { games: data?.games, hasSearch }
}
