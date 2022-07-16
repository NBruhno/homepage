import { useEffect } from 'react'

import { usePage } from './usePage'

export type Loading = boolean

export const useLoading = (shouldLoad?: boolean) => {
	const { isLoading, setResponsive } = usePage((state) => ({ isLoading: state.isLoading, setResponsive: state.setResponsive }))

	const setIsLoading = (isLoading: boolean) => setResponsive({ isLoading })

	useEffect(() => {
		if (shouldLoad !== undefined && shouldLoad !== isLoading) setIsLoading(shouldLoad)
	})

	return { isLoading, setIsLoading }
}
