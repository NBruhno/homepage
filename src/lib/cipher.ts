import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

const ivLength = 16

export const encrypt = (payload: string) => {
	const iv = randomBytes(ivLength)
	const cipher = createCipheriv('aes-256-cbc', Buffer.from(process.env.AUTH_SECRET), iv)
	let encrypted = cipher.update(payload)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decrypt = (payload: string): string => {
	const parts = payload.split(':')
	const iv = Buffer.from(parts.shift(), 'hex')
	const encrypted = Buffer.from(parts.join(':'), 'hex')
	const decipher = createDecipheriv('aes-256-cbc', Buffer.from(process.env.AUTH_SECRET), iv)
	let decrypted = decipher.update(encrypted)

	decrypted = Buffer.concat([decrypted, decipher.final()])

	return decrypted.toString() as string
}

export const decryptConfig = (payload: string) => {
	const decipher = createDecipheriv('aes-256-cbc', process.env.AUTH_SECRET, process.env.AUTH_IV)
	let decrypted = decipher.update(payload, 'base64', 'utf8')

	decrypted += decipher.final('utf8')

	return decrypted
}
