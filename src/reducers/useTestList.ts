import { useEffect, useCallback } from 'react'
import { useStore } from 'lib/store'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import isEqual from 'lodash/isEqual'

import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	GET_TEST_LIST: 'GET_TEST_LIST',
}

const useTestList = () => {
	const { state, dispatch } = useStore()
	const [firebase] = useFirebase()
	const [data, loading, error] = useCollectionData(firebase?.firestore()?.collection(`test`))

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_TEST_LIST,
		payload: { tests: { data, loading, error } },
	}), [dispatch, error, loading, data])

	useEffect(() => {
		if (!loading && !isEqual(state.tests?.data, data)) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.tests, state.tests.data, data, firebase])

	return [state.tests.data, state.tests.loading, state.tests.error]
}

export default useTestList
