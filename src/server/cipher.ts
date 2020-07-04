import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

import { config } from 'config.server'

const ivLength = 16

export const encrypt = (payload: string) => {
	const iv = randomBytes(ivLength)
	const cipher = createCipheriv('aes-256-cbc', Buffer.from(config.auth.secret), iv)
	let encrypted = cipher.update(payload)

	encrypted = Buffer.concat([encrypted, cipher.final()])

	return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decrypt = (payload: string) => {
	const parts = payload.split(':')
	const iv = Buffer.from(parts.shift(), 'hex')
	const encrypted = Buffer.from(parts.join(':'), 'hex')
	const decipher = createDecipheriv('aes-256-cbc', Buffer.from(config.auth.secret), iv)
	let decrypted = decipher.update(encrypted)

	decrypted = Buffer.concat([decrypted, decipher.final()])

	return decrypted.toString()
}
