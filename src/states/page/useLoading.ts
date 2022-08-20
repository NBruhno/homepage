import { useEffect } from 'react'

import { usePage } from './usePage'

export type Loading = boolean

export const useLoading = (shouldLoad?: boolean) => {
	const isLoading = usePage((state) => state.isLoading)
	const setIsLoading = usePage((state) => state.setIsLoading)

	useEffect(() => {
		if (shouldLoad !== undefined && shouldLoad !== isLoading) setIsLoading(shouldLoad)
	})

	return { isLoading, setIsLoading }
}
