import { UserTokenType } from 'types'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { accessTokenMatch, refreshTokenMatch, intermediateTokenMatch } from 'lib/test'

import { getJwtToken } from './getJwtToken'

const defaultPayload = { sub: 'mail+test@bruhno.dev', username: 'Test', role: 'user' }
const expectedJwtContent = {
	alg: 'RS256',
	aud: ['https://bruhno.com', 'https://bruhno.dev'],
	username: 'Test',
	iss: 'https://bruhno.dev',
	role: 'user',
	sub: 'mail+test@bruhno.dev',
}

describe('/lib/api/getJwtToken', () => {
	test('Token › Access token', async () => {
		const token = getJwtToken(defaultPayload)
		expect(token).toMatch(accessTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: UserTokenType.Access }))
	})

	test('Token › Refresh token', async () => {
		const token = getJwtToken(defaultPayload, { type: UserTokenType.Refresh })
		expect(token).toMatch(refreshTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: UserTokenType.Refresh }))
	})

	test('Token › Intermediate token', async () => {
		const token = getJwtToken(defaultPayload, { type: UserTokenType.Intermediate })
		expect(token).toMatch(intermediateTokenMatch)
		expect(decodeJwtToken(token)).toEqual(expect.objectContaining({ ...expectedJwtContent, typ: UserTokenType.Intermediate }))
	})

	test('Token › Invalid type', async () => {
		// @ts-expect-error: We expect an error here because we are testing an invalid type
		expect(() => getJwtToken(defaultPayload, { type: 'invalid' })).toThrow('Invalid type supplied')
	})
})
