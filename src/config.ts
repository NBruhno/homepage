/* eslint-disable @typescript-eslint/camelcase */

export const config = {
	firebase: {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.FIREBASE_DATABASE_URL,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
		measurementId: process.env.FIREBASE_MEASUREMENT_ID,
	},

	firebaseServiceAccount: {
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	},

	sentry: {
		dsn: process.env.SENTRY_DSN,
	},

	environment: process.env.ENVIRONMENT,
}
