import { useState } from 'react'

import useSizeEffect from './useSizeEffect'

/**
 * Stateful wrapper around `ResizeObserver`. Returns a ref for the object to be
 * observed and a DOMRect. For the first render, all values are undefined.
 *
 * @example
 * ```ts
 * const Observer = () => {
 *  const [ref, { width = 'unknown' }] = useSizeEffect((contentRect) => console.log(contentRect.width))
 *  return <div ref={ref}>Width is ${width}</div>
 * }
 * ```
 */

const useSize = () => {
	const [size, setSize] = useState<Partial<DOMRectReadOnly>>({})
	const ref = useSizeEffect(setSize)

	return [ref, size] as [(element: Element | null) => void, Partial<DOMRectReadOnly>]
}

export default useSize
