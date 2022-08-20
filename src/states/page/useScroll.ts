import { useEffect } from 'react'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

type PageScrollState = {
	bottom: number,
	height: number,
	left: number,
	right: number,
	top: number,
	width: number,
	x: number,
	y: number,
	scrollY: number,
	scrollX: number,
	windowScrollX: number,
	windowScrollY: number,
	setScrollState: (scrollState: Omit<PageScrollState, 'setScrollState'>) => void,
}

export const useScrollStore = create(devtools<PageScrollState>((set) => ({
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0,
	scrollY: 0,
	scrollX: 0,
	windowScrollX: 0,
	windowScrollY: 0,
	setScrollState: (scrollState) => set(scrollState),
}), { anonymousActionType: 'useScrollStore' }))

const emptyRect = {
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0,
	toJSON: () => undefined,
}

export const useScroll = () => {
	const setScrollState = useScrollStore((state) => state.setScrollState)

	const listener = () => {
		const bodyOffset = typeof window === 'undefined'
			? emptyRect
			: document.body.getBoundingClientRect()

		setScrollState({
			...bodyOffset,
			scrollY: -bodyOffset.top,
			scrollX: bodyOffset.left,
			...(typeof window === 'undefined'
				? { windowScrollX: 0, windowScrollY: 0 }
				: { windowScrollX: window.scrollX, windowScrollY: window.scrollY }),
		})
	}

	useEffect(() => {
		window.addEventListener('scroll', listener)
		return () => {
			window.removeEventListener('scroll', listener)
		}
	}, [])

	useEffect(() => {
		listener()
	}, [])
}
