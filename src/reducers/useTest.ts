import { useEffect, useCallback, useState } from 'react'
import { useStore } from 'lib/store'
import { useDocument } from 'react-firebase-hooks/firestore'

import firebasePromise from 'lib/firebase'

export const ACTIONS = {
	GET_TESTS: 'GET_TESTS',
}

const useTest = (testId: string) => {
	const { state, dispatch } = useStore()
	const [firebase, setFirebase] = useState(null)
	const [snapshot, loading, error] = useDocument(firebase?.firestore()?.doc(`test/${testId}`))

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_TESTS,
		payload: { test: { data: snapshot?.data(), loading, error } },
	}), [dispatch, error, loading, snapshot])

	useEffect(() => {
		if (!firebase) {
			firebasePromise().then((value) => {
				setFirebase(value)
			})
		}

		if (!loading && state.test?.data?.updatedAt !== snapshot?.data()?.updatedAt) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.test, state.test.data, snapshot, firebase])

	return [
		state.test.data,
		state.test.loading,
		state.test.error,
	]
}

export default useTest
