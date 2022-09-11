import type { UserTokenType } from './UserTokenType'
import type { UserRole } from '@prisma/client'

export type UserToken = {
	alg: string,
	aud: Array<string>,
	username: string,
	exp: number,
	iat: number,
	iss: string,
	nbf: number,
	ref: string,
	role: UserRole,
	/** User email */
	sub: string,
	typ: UserTokenType,
	userId: string,
	steamId: string | null,
}
