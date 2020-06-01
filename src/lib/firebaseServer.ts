import * as firebase from 'firebase-admin'

import { config } from 'config'

export default () => {
	try {
		return firebase.initializeApp({
			credential: firebase.credential.cert({
				...config.firebaseServiceAccount,
				privateKey: Buffer.from(config.firebaseServiceAccount.privateKey, 'base64').toString('ascii'),
			}),
			databaseURL: config.firebase.databaseURL,
		})
	} catch (error) {
		if (!/already exists/.test(error.message)) {
			console.error('Firebase admin initialization error', error.stack)
		}
	}

	return firebase
}

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
