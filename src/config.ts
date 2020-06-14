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

	auth0: {
		clientId: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		scope: process.env.AUTH0_SCOPE,
		domain: process.env.AUTH0_DOMAIN,
		redirectUri: process.env.AUTH0_REDIRECT_URI,
		postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
		session: {
			cookieSecret: process.env.SESSION_COOKIE_SECRET,
			cookieLifetime: parseInt(process.env.SESSION_COOKIE_LIFETIME, 10),
		},
	},

	environment: process.env.NODE_ENV,
}
