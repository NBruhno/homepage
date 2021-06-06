import type { Role } from './Role'

export type FaunaUser = {
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
