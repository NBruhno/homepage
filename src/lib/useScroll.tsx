import { useState, useEffect } from 'react'

type SsrRect = {
	bottom: number,
	height: number,
	left: number,
	right: number,
	top: number,
	width: number,
	x: number,
	y: number,
}
const emptySsrRect: SsrRect = {
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0,
}

/**
 * Listen to scroll events
 * @example
 * ```tsx
 * const { scrollX, scrollY, scrollDirection } = useScroll();
 * ```
 */
export const useScroll = () => {
	const [lastScrollTop, setLastScrollTop] = useState<number>(0)
	const [bodyOffset, setBodyOffset] = useState<DOMRect | SsrRect>(
		// window does not always exist
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		typeof window === 'undefined' || window.document
			? emptySsrRect
			: document.body.getBoundingClientRect(),
	)
	const [scrollY, setScrollY] = useState<number>(bodyOffset.top)
	const [scrollX, setScrollX] = useState<number>(bodyOffset.left)
	const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | undefined>()

	const listener = () => {
		setBodyOffset(
			// window does not always exist
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			typeof window === 'undefined' || window.document
				? emptySsrRect
				: document.body.getBoundingClientRect(),
		)
		setScrollY(-bodyOffset.top)
		setScrollX(bodyOffset.left)
		setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up')
		setLastScrollTop(-bodyOffset.top)
	}

	useEffect(() => {
		window.addEventListener('scroll', listener)
		return () => {
			window.removeEventListener('scroll', listener)
		}
	})

	return { scrollY, scrollX, scrollDirection }
}
