import { useEffect, useCallback } from 'react'
import { useStore } from 'lib/store'
import { useDocument } from 'react-firebase-hooks/firestore'
import isEqual from 'lodash/isEqual'

import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	GET_TESTS: 'GET_TESTS',
}

const useTest = (id: string | string[]) => {
	const { state, dispatch } = useStore()
	const [firebase] = useFirebase()
	const [snapshot, loading, error] = useDocument(firebase?.firestore()?.doc(`test/${id}`))

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_TESTS,
		payload: { test: { data: snapshot?.data(), loading, error } },
	}), [dispatch, error, loading, snapshot])

	useEffect(() => {
		if (!loading && !isEqual(state.test?.data, snapshot?.data())) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.test, state.test.data, snapshot])

	const update = async (id: string, body: BodyInit) => {
		const response = await fetch(`/api/tests/${id}`, { method: 'PUT', mode: 'cors', body: JSON.stringify(body) })
		return response.json()
	}

	const create = async () => {
		const response = await fetch('/api/tests', { method: 'POST', mode: 'cors' })
		return response.json()
	}

	return [state.test.data, state.test.loading, state.test.error, update, create]
}

export default useTest
