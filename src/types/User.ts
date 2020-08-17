export enum Role {
	Owner = 'owner',
	user = 'User',
}

export type User = {
	secret: string,
	ref: string,
	data: {
		displayName: string,
		email: string,
		owner: string,
		role: Role,
		twoFactorSecret?: string,
	},
}
