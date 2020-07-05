export const config = {
	auth: {
		publicKey: process.env.AUTH_PUBLIC_KEY,
		privateKey: process.env.AUTH_PRIVATE_KEY,
		secret: process.env.AUTH_SECRET,
		refresh: {
			publicKey: process.env.AUTH_REFRESH_PUBLIC_KEY,
			privateKey: process.env.AUTH_REFRESH_PRIVATE_KEY,
		},
	},

	fauna: {
		secret: process.env.FAUNA_SECRET,
		serverKey: process.env.FAUNA_SERVER_KEY,
	},

	igdb: {
		userKey: process.env.IGDB_USER_KEY,
	},

	environment: process.env.NEXT_PUBLIC_NODE_ENV,
}
