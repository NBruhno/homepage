import { useEffect, useState, Dispatch } from 'react'

import { config } from 'config'

const loadFirebase = async () => {
	const [firebase] = await Promise.all([
		await import('firebase/app'),
		await import('firebase/auth'),
		await import('firebase/firestore'),
		// await import('firebase/storage'),
	])

	if (firebase.apps.length) {
		return firebase
	}

	try {
		firebase.initializeApp(config.firebase)
	} catch (error) {
		if (!/already exists/.test(error.message)) {
			console.error('Firebase initialization error', error.stack)
		}
	}

	return firebase
}

let firebasePromise = null
let firebaseInstance = null

const initializeFirebase = async (setFirebase: Dispatch<any>) => {
	if (!firebasePromise) {
		firebasePromise = loadFirebase()
		firebaseInstance = await firebasePromise
		setFirebase(firebaseInstance)
	} else {
		setFirebase(await firebasePromise)
	}
}

const useFirebase = () => {
	const [firebase, setFirebase] = useState(firebaseInstance)
	useEffect(() => {
		if (firebase) {
			return
		}
		initializeFirebase(setFirebase)
	}, [firebase])

	return [firebase, firebasePromise, firebaseInstance]
}

export default useFirebase
