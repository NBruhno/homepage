import { accessTokenMatch, refreshTokenMatch, intermediateTokenMatch } from 'test/utils'

import { TokenTypes } from 'types/Token'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { decrypt } from 'lib/cipher'

import { getJwtToken } from './getJwtToken'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: 'user' }
const expectedJwtContent = {
	alg: 'RS256',
	aud: ['https://bruhno.com', 'https://bruhno.dev'],
	displayName: 'Test',
	iss: 'https://bruhno.dev',
	role: 'user',
	sub: 'mail+test@bruhno.dev',
}

describe('/api/getJwtToken', () => {
	test('Token › Access token', async () => {
		const token = getJwtToken('secret', defaultPayload)
		expect(token).toMatch(accessTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: TokenTypes.Access }))
		expect(decrypt(decodeJwtToken(token).secret)).toEqual('secret')
	})
})

describe('/api/getJwtToken', () => {
	test('Token › Refresh token', async () => {
		const token = getJwtToken('secret', defaultPayload, TokenTypes.Refresh)
		expect(token).toMatch(refreshTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: TokenTypes.Refresh }))
		expect(decrypt(decodeJwtToken(token).secret)).toEqual('secret')
	})
})

describe('/api/getJwtToken', () => {
	test('Token › Intermediate token', async () => {
		const token = getJwtToken('secret', defaultPayload, TokenTypes.Intermediate)
		expect(token).toMatch(intermediateTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: TokenTypes.Intermediate }))
		expect(decrypt(decodeJwtToken(token).secret)).toEqual('secret')
	})
})

describe('/api/getJwtToken', () => {
	test('Token › Invalid type', async () => {
		// @ts-expect-error
		expect(() => getJwtToken('secret', defaultPayload, 'invalid')).toThrow('Invalid type supplied')
	})
})
