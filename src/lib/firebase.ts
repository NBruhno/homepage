import config from '../config'

export default async () => {
	const firebase = await import('firebase/app')
	await import('firebase/firestore')

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
