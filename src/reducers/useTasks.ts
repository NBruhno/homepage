import { useEffect, useCallback } from 'react'
import { useStore } from 'lib/store'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import isEqual from 'lodash/isEqual'

import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	GET_TASKS: 'GET_TASKS',
}

const useTestList = () => {
	const { state, dispatch } = useStore()
	const [firebase] = useFirebase()
	const [data, loading, error] = useCollectionData(firebase?.firestore()?.collection(`tasks`))

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_TASKS,
		payload: { tasks: { data, loading, error } },
	}), [dispatch, error, loading, data])

	useEffect(() => {
		if (!loading && !isEqual(state.tasks?.data, data)) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.tasks, state.tasks.data, data, firebase])

	return { tasks: state.tasks.data, tasksLoading: state.tasks.loading, tasksError: state.tasks.error }
}

export default useTestList
