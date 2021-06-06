import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'api/middleware'
import { logout } from 'api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	res.setHeader('Cache-Control', 'no-cache')
	return logout(req, res, { transaction })
})

export default withSentry(handler)
