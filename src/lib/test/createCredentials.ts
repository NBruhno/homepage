import { randomBytes } from 'crypto'

export const createCredentials = ({ label, shouldPrefixEmail = false }: { label?: string, shouldPrefixEmail?: boolean } = {}) => ({
	accessCode: process.env.ACCESS_CODE!,
	defaultPassword: process.env.TESTING_CREDENTIALS_PASSWORD!,
	email: `${shouldPrefixEmail ? randomBytes(10).toString('hex') : 'test'}${label ? `+${label}` : ''}@${process.env.TESTING_DOMAIN!}`,
	password: randomBytes(20).toString('hex'),
	username: label ? `Test ${label}` : 'Test',
	twoFactorSecret: process.env.TESTING_CREDENTIALS_TWO_FACTOR_SECRET!,
})
