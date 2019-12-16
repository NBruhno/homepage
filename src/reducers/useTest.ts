import { useEffect, useCallback } from 'react'
import { useStore } from 'lib/store'
import { useDocument } from 'react-firebase-hooks/firestore'

import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	GET_TESTS: 'GET_TESTS',
}

const useTest = (testId: string) => {
	const { state, dispatch } = useStore()
	const [firebase] = useFirebase()
	const [snapshot, loading, error] = useDocument(firebase?.firestore()?.doc(`test/${testId}`))

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_TESTS,
		payload: { test: { data: snapshot?.data(), loading, error } },
	}), [dispatch, error, loading, snapshot])

	useEffect(() => {
		if (!loading && state.test?.data?.updatedAt !== snapshot?.data()?.updatedAt) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.test, state.test.data, snapshot])

	return [state.test.data, state.test.loading, state.test.error]
}

export default useTest
