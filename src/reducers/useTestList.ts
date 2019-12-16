import { useEffect, useCallback } from 'react'
import { useStore } from 'lib/store'
import { useCollection } from 'react-firebase-hooks/firestore'

import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	GET_TEST_LIST: 'GET_TEST_LIST',
}

const useTestList = () => {
	const { state, dispatch } = useStore()
	const [firebase] = useFirebase()
	const [snapshot, loading, error] = useCollection(firebase?.firestore()?.doc(`test`))

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_TEST_LIST,
		payload: { test: { docs: snapshot.docs, loading, error } },
	}), [dispatch, error, loading, snapshot])

	useEffect(() => {
		if (!loading && state.test?.docs !== snapshot?.docs) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.test, state.test.docs, snapshot, firebase])

	return [state.test.docs, state.test.loading, state.test.error]
}

export default useTestList
