export enum TokenTypes {
	Refresh = 'refresh',
	Intermediate = 'intermediate',
	Access = 'access',
}

export type Token = {
	aud: Array<string>,
	email: string,
	exp: number,
	iat: number,
	id: string,
	iss: string,
	nbf: number,
	secret: string,
	sub: string,
	type: TokenTypes,
}