import { useEffect } from 'react'

import { usePage } from './usePage'

export const useCookieBanner = () => {
	const setIsCookieBannerDismissed = usePage((state) => state.setIsCookieBannerDismissed)
	const isDismissed = usePage((state) => state.isCookieBannerDismissed)
	const setIsDismissed = () => {
		window.localStorage.setItem('isCookieBannerDismissed', 'yes')
		setIsCookieBannerDismissed(true)
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const isCookieBannerDismissed = window?.localStorage?.getItem('isCookieBannerDismissed') as 'yes' | null
		if (isCookieBannerDismissed === null) setIsCookieBannerDismissed(false)
	}, [])

	return { isDismissed, setIsDismissed }
}
