import { useCallback } from 'react'

import { useStore, State } from 'lib/store'

export const useResponsive = () => {
	const { state, dispatch } = useStore()
	const updateResponsive = useCallback((responsive: Partial<State['responsive']>) => dispatch({ responsive: { ...state.responsive, ...responsive } }), [dispatch, state.responsive])

	return {
		...state.responsive,
		updateResponsive,
	}
}
