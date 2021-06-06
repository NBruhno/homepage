import type { Role } from './Role'
import type { TokenType } from './TokenType'

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
	typ: TokenType,
	userId: string,
}
