import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type NavigationLoadingState = {
	isNavigationLoading: boolean,
	setIsNavigationLoading: (isNavigationLoading: boolean) => void,
}

export const useNavigationLoadingStore = create<NavigationLoadingState>()(devtools((set) => ({
	isNavigationLoading: false,
	setIsNavigationLoading: (isNavigationLoading) => set({ isNavigationLoading }),
}), { anonymousActionType: 'useNavigationLoadingStore' }))

export const useNavigationLoading = () => {
	const setIsNavigationLoading = useNavigationLoadingStore((state) => state.setIsNavigationLoading)
	const isNavigationLoading = useNavigationLoadingStore((state) => state.isNavigationLoading)
	const router = useRouter()

	const handleLoadingStart = (url: string) => url !== router.asPath && !isNavigationLoading && setIsNavigationLoading(true)
	const handleLoadingFinished = () => isNavigationLoading && setIsNavigationLoading(false)

	useEffect(() => {
		router.events.on('routeChangeStart', handleLoadingStart)
		router.events.on('routeChangeComplete', handleLoadingFinished)
		router.events.on('routeChangeError', handleLoadingFinished)

		return () => {
			router.events.off('routeChangeStart', handleLoadingStart)
			router.events.off('routeChangeComplete', handleLoadingFinished)
			router.events.off('routeChangeError', handleLoadingFinished)
		}
	})

	return isNavigationLoading
}
