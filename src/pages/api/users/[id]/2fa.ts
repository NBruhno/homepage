import { withSentry } from '@sentry/nextjs'

import { withTracking } from 'api/middleware'
import { twoFactorAuthentication } from 'api/users'

const handler = withTracking(async (req, res, transaction) => {
	const { query: { id } } = req

	res.setHeader('Cache-Control', 'no-cache')
	return twoFactorAuthentication(req, res, { transaction, userId: id as string })
})

export default withSentry(handler)
