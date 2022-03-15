import { useEffect } from 'react'

import { useGlobalState } from 'states/global'

export type Loading = boolean

export const useLoading = (shouldLoad?: boolean) => {
	const [isLoading, setIsLoading] = useGlobalState('isLoading')

	useEffect(() => {
		if (shouldLoad !== undefined && shouldLoad !== isLoading) setIsLoading(shouldLoad)
	})

	return { isLoading, setIsLoading }
}
