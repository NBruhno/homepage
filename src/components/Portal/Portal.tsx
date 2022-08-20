import type { ReactNode } from 'react'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
	children: ReactNode,
}

export const Portal = ({ children }: Props) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		return () => setIsMounted(false)
	}, [])

	const rootElement = typeof window === 'undefined' ? null : document.querySelector('#portal')
	return (isMounted && rootElement)
		? createPortal(children, rootElement)
		: null
}
