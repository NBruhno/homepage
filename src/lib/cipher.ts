import type { BinaryLike, Encoding } from 'crypto'

import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

type Options = {
	iv?: string | undefined,
	outputEncoding?: Encoding,
	inputEncoding?: Encoding,
}

export const encryptAes256gcm = (payload: string, secret: string | undefined, { iv, outputEncoding = 'base64', inputEncoding = 'utf8' }: Options) => {
	if (!secret) throw new Error('Missing secret for encryption')
	if (!payload) throw new Error('Missing payload to encrypt')

	let ivBuffer: Buffer
	if (iv) ivBuffer = Buffer.from(iv)
	else ivBuffer = randomBytes(12)

	const cipher = createCipheriv('aes-256-gcm', Buffer.from(secret), ivBuffer)
	let encryptedContent = cipher.update(payload, inputEncoding, outputEncoding)
	encryptedContent += cipher.final(outputEncoding)

	if (iv) return `${cipher.getAuthTag().toString(outputEncoding)}:${encryptedContent}`
	else return `${ivBuffer.toString(outputEncoding)}:${cipher.getAuthTag().toString(outputEncoding)}:${encryptedContent}`
}

export const decryptAes256gcm = (payload: string, secret: string | undefined, { iv, outputEncoding = 'utf8', inputEncoding = 'base64' }: Options) => {
	if (!secret) throw new Error('Missing secret for decryption')
	if (!payload) throw new Error('Missing payload to decrypt')

	const decrypt = (ivBuffer: BinaryLike, authTag: string, encryptedContent: string) => {
		const decipher = createDecipheriv('aes-256-gcm', secret, ivBuffer)
		decipher.setAuthTag(Buffer.from(authTag, inputEncoding))
		let decryptedContent = decipher.update(encryptedContent, inputEncoding, outputEncoding)
		decryptedContent += decipher.final(outputEncoding)
		return decryptedContent
	}

	if (iv) {
		const [authTag, encryptedContent] = payload.split(':')
		if (!authTag || !encryptedContent) throw new Error('Invalid payload, cannot decrypt')
		return decrypt(iv, authTag, encryptedContent)
	} else {
		const [includedIv, authTag, encryptedContent] = payload.split(':')
		if (!includedIv || !authTag || !encryptedContent) throw new Error('Invalid payload, cannot decrypt')
		return decrypt(Buffer.from(includedIv, inputEncoding), authTag, encryptedContent)
	}
}
