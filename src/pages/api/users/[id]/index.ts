import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'containers/api/middleware'
import { user } from 'containers/api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	const { query: { id } } = req

	res.setHeader('Cache-Control', 'no-cache')
	return user(req, res, { transaction, userId: id as string })
})

export default withSentry(handler)
