import { useEffect, useState, Dispatch } from 'react'

import { config } from 'config'
import { Await } from 'types/Await'

/**
 * Lazy loads `firebase` and its additions. The basic `firebase/app` is always loaded first. Any additional libraries
 * for `firebase` will be loaded afterwards at once.
 * @returns The collectively loaded firebase or a promise
*/
const loadFirebase = async () => {
	const firebase = await import('firebase/app')
	await Promise.all([
		import('firebase/auth'),
		import('firebase/firestore'),
		// import('firebase/storage'),
	])

	if (firebase.apps.length) {
		return firebase
	}

	try {
		firebase.initializeApp(config.firebase)
	} catch (error) {
		if (!/already exists/.test(error.message)) {
			// eslint-disable-next-line no-console
			console.error('Firebase initialization error', error.stack)
		}
	}

	return firebase
}

let firebasePromise: ReturnType<typeof loadFirebase> = null
let firebaseInstance: Await<ReturnType<typeof loadFirebase>> = null

/**
 * Initializes the loading of `firebase` if it is not already initialized.
*/
const initializeFirebase = async (setFirebase: Dispatch<any>) => {
	if (!firebasePromise) {
		firebasePromise = loadFirebase()
		firebaseInstance = await firebasePromise
		setFirebase(firebaseInstance)
	} else {
		setFirebase(await firebasePromise)
	}
}

/**
 * Hook that returns `firebase` for consumption. A `firebase` instance does not exist unless this hook is used.
 * @example
 * ```tsx
 * const [firebase, firebasePromise, firebaseInstance] = useFirebase()
 * ```
*/
export const useFirebase = () => {
	const [firebase, setFirebase] = useState(firebaseInstance)

	useEffect(() => {
		if (firebase) {
			return
		}

		initializeFirebase(setFirebase)
	}, [firebase])

	return { firebase }
}
