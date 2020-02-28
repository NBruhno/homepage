import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useCallback } from 'react'
import { isEqual } from 'lodash-es'

import { useStore } from 'lib/store'
import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	GET_AUTH_STATE: 'GET_AUTH_STATE',
}

const useTestList = () => {
	const { state, dispatch } = useStore()
	const [firebase] = useFirebase()
	const [user, loading, error] = useAuthState(firebase?.auth() || { onAuthStateChanged: (firebaseUser) => firebaseUser, currentUser: undefined })

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_AUTH_STATE,
		payload: { user },
	}), [dispatch, user])

	useEffect(() => {
		if (!loading && !isEqual(state.user, user)) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.user, user, firebase])

	return { user, userLoading: user !== undefined ? loading : true, userError: error }
}

export default useTestList
