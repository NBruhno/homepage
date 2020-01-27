import * as firebase from 'firebase-admin'

import config from '../config'

export default () => {
	try {
		return firebase.initializeApp({
			credential: firebase.credential.cert(config.firebaseServiceAccount),
			databaseURL: config.firebase.databaseURL,
		}).firestore()
	} catch (error) {
		if (!/already exists/.test(error.message)) {
			console.error('Firebase admin initialization error', error.stack)
		}
	}
	return firebase.firestore()
}

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
