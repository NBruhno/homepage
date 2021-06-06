import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'api/middleware'
import { user } from 'api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	const { query: { id } } = req

	res.setHeader('Cache-Control', 'no-cache')
	return user(req, res, { transaction, userId: id as string })
})

export default withSentry(handler)
