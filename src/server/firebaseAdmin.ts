import admin from 'firebase-admin'

import { config } from 'config'

try {
	admin.initializeApp({
		credential: admin.credential.cert({
			...config.firebaseServiceAccount,
			privateKey: Buffer.from(config.firebaseServiceAccount.privateKey, 'base64').toString('ascii'),
		}),
		databaseURL: config.firebase.databaseURL,
	})
} catch (error) {
	if (!/already exists/u.test(error.message)) {
		// eslint-disable-next-line no-console
		console.error('Firebase admin initialization error', error.stack)
	}
}

export const auth = admin.auth()
export const firestore = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp()
