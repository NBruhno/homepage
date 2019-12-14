import { useEffect, useCallback } from 'react'
import { useStore } from 'lib/store'
import { useCollection } from 'react-firebase-hooks/firestore'

import firebase from 'lib/firebase'

export const ACTIONS = {
	GET_TEST_LIST: 'GET_TEST_LIST',
}

const useTestList = () => {
	const { state, dispatch } = useStore()
	const [snapshot, loading, error] = useCollection(firebase.firestore().collection(`test`))

	const dispatchToGlobalState = useCallback(async () => dispatch({
		type: ACTIONS.GET_TEST_LIST,
		payload: { tests: { data: snapshot.docs, loading, error } },
	}), [dispatch, error, loading, snapshot])

	useEffect(() => {
		if (!loading && state.tests.data !== snapshot?.docs) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.tests.data, snapshot])

	return [state.tests.data, state.tests.loading, state.tests.error]
}

export default useTestList
