import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'containers/api/middleware'
import { users } from 'containers/api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	res.setHeader('Cache-Control', 'no-cache')
	return users(req, res, { transaction })
})

export default withSentry(handler)
