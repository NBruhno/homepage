import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'containers/api/middleware'
import { logout } from 'containers/api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	res.setHeader('Cache-Control', 'no-cache')
	return logout(req, res, { transaction })
})

export default withSentry(handler)
