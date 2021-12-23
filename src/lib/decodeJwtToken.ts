import type { UserToken } from 'types'

const convertBase64Json = <T>(base64String: string): T => JSON.parse(Buffer.from(base64String, 'base64').toString()) as T

/** Decodes our already known JWT to a JavaScript `object`, returning the `header` and `payload` of the JWT together */
export const decodeJwtToken = (token: string): UserToken => {
	const [base64Header, base64Payload] = token.split('.')
	const header = convertBase64Json<Pick<UserToken, 'alg' | 'typ'>>(base64Header)
	const payload = convertBase64Json<Omit<UserToken, 'alg' | 'typ'>>(base64Payload)

	return { ...header, ...payload }
}
