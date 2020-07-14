export type User = {
	secret: string,
	ref: string,
	data: {
		displayName: string,
		email: string,
		role: string,
		twoFactorSecret?: string,
	},
}
