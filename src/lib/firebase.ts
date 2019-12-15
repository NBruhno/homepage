import config from '../config'

export default async () => {
	const firebase = await import('firebase/app')
	await import('firebase/firestore')

	const {
		apiKey, authDomain, databaseURL, projectId, storageBucket,
		messagingSenderId, appId, measurementId,
	} = config.firebase

	if (firebase.apps.length) {
		return firebase
	}

	const firebaseConfig = {
		apiKey,
		authDomain,
		databaseURL,
		projectId,
		storageBucket,
		messagingSenderId,
		appId,
		measurementId,
	}

	try {
		firebase.initializeApp(firebaseConfig)
	} catch (error) {
		if (!/already exists/.test(error.message)) {
			console.error('Firebase initialization error', error.stack)
		}
	}

	return firebase
}
