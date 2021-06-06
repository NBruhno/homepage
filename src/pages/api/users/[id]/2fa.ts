import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'api/middleware'
import { twoFactorAuthentication } from 'api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	const { query: { id } } = req

	res.setHeader('Cache-Control', 'no-cache')
	return twoFactorAuthentication(req, res, { transaction, userId: id as string })
})

export default withSentry(handler)
