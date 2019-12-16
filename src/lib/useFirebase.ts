import { useEffect, useState, Dispatch } from 'react'

import config from '../config'

const load = async () => {
	const firebase = await import('firebase/app')
	await import('firebase/firestore')
	await import('firebase/storage')
	await import('firebase/auth')

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

const setup = async (setFirebase: Dispatch<any>) => {
	if (!firebasePromise) {
		firebasePromise = load()
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
		setup(setFirebase)
	}, [firebase])

	return [firebase, firebasePromise, firebaseInstance]
}

export default useFirebase
