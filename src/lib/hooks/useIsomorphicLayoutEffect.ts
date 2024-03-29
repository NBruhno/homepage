import type { EffectCallback, DependencyList } from 'react'

import { useLayoutEffect, useEffect } from 'react'

/**
 * Uses either useEffect or useLayoutEffect based on wether this is being computed on the server or client.
 * This is a replacement for useLayoutEffect, which cannot run on the server side.
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change.
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
export const useIsomorphicLayoutEffect = (effect: EffectCallback, deps?: DependencyList) => {
	const canUseDom = Boolean(
		typeof window !== 'undefined'
		// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
		&& typeof window.document !== 'undefined'
		&& typeof window.document.createElement !== 'undefined',
	)

	const useRelevantEffect = canUseDom ? useLayoutEffect : useEffect
	return useRelevantEffect(effect, deps)
}
