import { useDocument } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useCallback } from 'react'
import { isEqual } from 'lodash-es'

import { useStore } from 'lib/store'
import { useFirebase } from 'lib/useFirebase'

export const useAuth = () => {
	const { state, dispatch } = useStore()
	const { firebase } = useFirebase()
	// @ts-expect-error The auth hook specifically wants the Auth type, but that is not available during load.
	const [user, loading, error] = useAuthState(firebase?.auth() ?? { onAuthStateChanged: (firebaseUser) => firebaseUser, currentUser: undefined })
	const [snapshot, userDataLoading, userDataError] = useDocument(user?.uid ? firebase?.firestore()?.doc(`users/${user.uid}`) : null)

	const dispatchToGlobalState = useCallback((user) => dispatch({ user }), [dispatch, user])

	useEffect(() => {
		if (!loading && !isEqual(state.user, user) && (!userDataLoading && !userDataError && snapshot?.data())) {
			if (!user) {
				dispatchToGlobalState({})
			} else {
				dispatchToGlobalState({
					uid: user.uid,
					email: user.email,
					permissions: snapshot.data().permissions,
					displayName: snapshot.data().displayName,
				})
			}
		}
	}, [dispatchToGlobalState, user, firebase, snapshot])

	return { user: state.user, userLoading: user !== undefined ? loading : true, userError: error }
}
