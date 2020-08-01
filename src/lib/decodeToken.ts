import type { Token } from 'types/Token'

export const decodeToken = (token: string) => {
	try {
		return JSON.parse(atob(token.split('.')[1])) as Token
	} catch (error) {
		return null
	}
}
