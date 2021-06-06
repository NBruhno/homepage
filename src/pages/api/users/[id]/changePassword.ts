import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'api/middleware'
import { changePassword } from 'api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	const { query: { id } } = req

	res.setHeader('Cache-Control', 'no-cache')
	return changePassword(req, res, { transaction, userId: id as string })
})

export default withSentry(handler)
