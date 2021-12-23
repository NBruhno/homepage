import { useMemo, useRef, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import { useIsomorphicLayoutEffect } from 'lib/useIsomorphicLayoutEffect'

type Callback = (contentRect: DOMRectReadOnly) => void

/**
 * Wrapper for `ResizeObserver`. Returns a ref for the element to be observed.
 * @example
 * ```tsx
 * const Observer = () => {
 * 	const ref = useSizeEffect((contentRect) => console.log(contentRect.width))
 * 	return <div ref={ref} />
 * }
 * ```
 */
export const useSizeEffect = (callback: Callback) => {
	const persistedCallback = useRef<Callback>()

	useIsomorphicLayoutEffect(() => {
		persistedCallback.current = callback
	}, [callback])

	const internalRef = useRef<Element | null>(null)
	const observer = useMemo(() => new ResizeObserver(([{ contentRect }]: Array<{ contentRect: DOMRectReadOnly }>) => {
		// Handle cases where persistent reference hasn't been set yet
		const current = persistedCallback.current ?? callback
		current(contentRect)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}), [])
	const ref = useCallback((element: Element | null) => {
		if (element === internalRef.current) {
			return
		}
		if (internalRef.current) {
			observer.unobserve(internalRef.current)
			internalRef.current = null
		}
		if (element instanceof Element) {
			observer.observe(element)
			internalRef.current = element
		}
	}, [observer])

	return ref
}
