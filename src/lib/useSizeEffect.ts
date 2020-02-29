import { useMemo, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type Callback = (contentRect: DOMRectReadOnly) => void

/**
 * Wrapper for `ResizeObserver`. Returns a ref for the element to be observed.
 *
 * @example
 * ```ts
 * const Observer = () => {
 * 	const ref = useSizeEffect((contentRect) => console.log(contentRect.width))
 * 	return <div ref={ref} />
 * }
 * ```
 */

const useSizeEffect = (callback: Callback) => {
	const persistedCallback = useRef<Callback>()
	const canUseDOM: boolean = !!(
		typeof window !== 'undefined'
		&& typeof window.document !== 'undefined'
		&& typeof window.document.createElement !== 'undefined'
	)

	const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

	useIsomorphicLayoutEffect(() => {
		persistedCallback.current = callback
	}, [callback])

	const internalRef = useRef<Element | null>(null)
	const observer = useMemo(() => new ResizeObserver(([{ contentRect }]) => {
		// Handle cases where persistant reference hasn't been set yet
		const current = persistedCallback.current || callback
		current(contentRect as DOMRectReadOnly)
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

export default useSizeEffect
