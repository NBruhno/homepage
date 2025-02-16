import { TokenType } from 'types'

import { config } from 'config.server'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { accessTokenMatch, intermediateTokenMatch, refreshTokenMatch, systemTokenMatch } from 'lib/test'

import { getJwtToken } from './getJwtToken'

const defaultPayload = { sub: 'mail+test@bruhno.dev', username: 'Test', role: 'user' }
const expectedJwtContent = {
	aud: ['https://bruhno.com', 'https://bruhno.dev'],
	iss: 'https://bruhno.dev',
	role: 'user',
	sub: 'mail+test@bruhno.dev',
	typ: 'JWT',
	username: 'Test',
}

describe('/lib/api/getJwtToken', () => {
	test('Token › Default access token', async () => {
		const keyPair = config.auth.keyPairs.find(({ type }) => type === TokenType.Access)!

		const token = await getJwtToken(defaultPayload)
		expect(token).toMatch(accessTokenMatch)
		return expect(decodeJwtToken(token)).toEqual(
			expect.objectContaining({
				...expectedJwtContent,
				alg: keyPair.algorithm,
				kid: keyPair.id,
			}),
		)
	})

	test('Token › Access token', async () => {
		const keyPair = config.auth.keyPairs.find(({ type }) => type === TokenType.Access)!

		const token = await getJwtToken(defaultPayload, { type: TokenType.Access })
		expect(token).toMatch(accessTokenMatch)
		return expect(decodeJwtToken(token)).toEqual(
			expect.objectContaining({
				...expectedJwtContent,
				alg: keyPair.algorithm,
				kid: keyPair.id,
			}),
		)
	})

	test('Token › Refresh token', async () => {
		const keyPair = config.auth.keyPairs.find(({ type }) => type === TokenType.Refresh)!

		const token = await getJwtToken(defaultPayload, { type: TokenType.Refresh })
		expect(token).toMatch(refreshTokenMatch)
		return expect(decodeJwtToken(token)).toEqual(
			expect.objectContaining({
				...expectedJwtContent,
				alg: keyPair.algorithm,
				kid: keyPair.id,
			}),
		)
	})

	test('Token › Intermediate token', async () => {
		const keyPair = config.auth.keyPairs.find(({ type }) => type === TokenType.Intermediate)!

		const token = await getJwtToken(defaultPayload, { type: TokenType.Intermediate })
		expect(token).toMatch(intermediateTokenMatch)
		return expect(decodeJwtToken(token)).toEqual(
			expect.objectContaining({
				...expectedJwtContent,
				alg: keyPair.algorithm,
				kid: keyPair.id,
			}),
		)
	})

	test('Token › System token', async () => {
		const keyPair = config.auth.keyPairs.find(({ type }) => type === TokenType.System)!

		const token = await getJwtToken(defaultPayload, { type: TokenType.System })
		expect(token).toMatch(systemTokenMatch)
		return expect(decodeJwtToken(token)).toEqual(
			expect.objectContaining({
				...expectedJwtContent,
				alg: keyPair.algorithm,
				kid: keyPair.id,
			}),
		)
	})

	test('Token › Token from key', async () => {
		const keyPair = config.auth.keyPairs.find(({ type }) => type === TokenType.Access)!

		const token = await getJwtToken(defaultPayload, { type: TokenType.Access, keyId: keyPair.id })
		expect(token).toMatch(accessTokenMatch)
		expect(decodeJwtToken(token)).toEqual(
			expect.objectContaining({
				...expectedJwtContent,
				alg: keyPair.algorithm,
				kid: keyPair.id,
			}),
		)
	})

	test('Token › Invalid type', async () => {
		// @ts-expect-error: We expect an error here because we are testing an invalid type
		await expect(getJwtToken(defaultPayload, { type: 'invalid' })).rejects.toThrow(
			'No key pair found for the supplied key ID or token type',
		)
	})
})
