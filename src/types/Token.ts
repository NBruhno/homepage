import type { Role } from './User'

export enum TokenTypes {
	Refresh = 'refresh',
	Intermediate = 'intermediate',
	Access = 'access',
}

export type Token = {
	aud: Array<string>,
	displayName: string,
	exp: number,
	iat: number,
	iss: string,
	nbf: number,
	ref: string,
	role: Role,
	secret: string,
	sub: string,
	typ: TokenTypes,
	userId: string,
}
