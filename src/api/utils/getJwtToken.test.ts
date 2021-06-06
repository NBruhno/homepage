import { TokenType } from 'types'

import { accessTokenMatch, refreshTokenMatch, intermediateTokenMatch, transaction } from 'test/utils'

import { decrypt } from 'lib/cipher'
import { decodeJwtToken } from 'lib/decodeJwtToken'

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
		const token = getJwtToken('secret', defaultPayload, { transaction })
		expect(token).toMatch(accessTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: TokenType.Access }))
		expect(decrypt(decodeJwtToken(token).secret)).toEqual('secret')
	})
})

describe('/api/getJwtToken', () => {
	test('Token › Refresh token', async () => {
		const token = getJwtToken('secret', defaultPayload, { type: TokenType.Refresh, transaction })
		expect(token).toMatch(refreshTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: TokenType.Refresh }))
		expect(decrypt(decodeJwtToken(token).secret)).toEqual('secret')
	})
})

describe('/api/getJwtToken', () => {
	test('Token › Intermediate token', async () => {
		const token = getJwtToken('secret', defaultPayload, { type: TokenType.Intermediate, transaction })
		expect(token).toMatch(intermediateTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: TokenType.Intermediate }))
		expect(decrypt(decodeJwtToken(token).secret)).toEqual('secret')
	})
})

describe('/api/getJwtToken', () => {
	test('Token › Invalid type', async () => {
		// @ts-expect-error: We expect an error here because we are testing an invalid type
		expect(() => getJwtToken('secret', defaultPayload, { type: 'invalid', transaction })).toThrow('Invalid type supplied')
	})
})
