import { useEffect, useCallback } from 'react'
import { useStore } from 'lib/store'
import { useDocument } from 'react-firebase-hooks/firestore'
import isEqual from 'lodash/isEqual'

import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	GET_TASK: 'GET_TASK',
}

const useTest = (id?: string | string[]) => {
	const { state, dispatch } = useStore()
	const [firebase] = useFirebase()
	const [snapshot, loading, error] = useDocument(firebase?.firestore()?.doc(`tasks/${id}`))

	const dispatchToGlobalState = useCallback(() => dispatch({
		type: ACTIONS.GET_TASK,
		payload: { task: { data: snapshot?.data(), loading, error } },
	}), [dispatch, error, loading, snapshot])

	useEffect(() => {
		if (!loading && !isEqual(state.task?.data, snapshot?.data())) {
			dispatchToGlobalState()
		}
	}, [dispatchToGlobalState, loading, state.task, state.task.data, snapshot])

	const update = async (id: string, body: object) => {
		const response = await fetch(`/api/tasks/${id}`, { method: 'PUT', mode: 'cors', body: JSON.stringify(body) })
		return response.json()
	}

	const create = async () => {
		const response = await fetch('/api/tasks', { method: 'POST', mode: 'cors' })
		return response.json()
	}

	return { task: state.task.data, taskLoading: state.task.loading, taskError: state.task.loading, updateTask: update, createTask: create }
}

export default useTest
