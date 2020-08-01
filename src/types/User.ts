export type User = {
	secret: string,
	ref: string,
	data: {
		displayName: string,
		email: string,
		owner?: boolean,
		user?: boolean,
		twoFactorSecret?: string,
	},
}
