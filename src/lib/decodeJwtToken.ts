import type { Token } from 'types/Token'

export const decodeJwtToken = (token: string): Token => {
	const [header, payload] = token.split('.').slice(0, 2).map((part) => JSON.parse(atob(part)))

	return { ...header, ...payload }
}
