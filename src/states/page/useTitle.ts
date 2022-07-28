import { useEffect } from 'react'

import { usePage } from './usePage'

export const useTitle = (title?: string) => {
	const setTitle = usePage((state) => state.setTitle)
	const currentTitle = usePage((state) => state.title)

	useEffect(() => {
		setTitle(title ? `${title} • Bruhno` : 'Bruhno')
	}, [title, setTitle])

	return currentTitle
}
