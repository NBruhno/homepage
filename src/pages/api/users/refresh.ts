import { withSentry } from '@sentry/nextjs'

import { withSentryTracking } from 'containers/api/middleware'
import { refresh } from 'containers/api/users'

const handler = withSentryTracking(async (req, res, transaction) => {
	res.setHeader('Cache-Control', 'no-cache')
	return refresh(req, res, { transaction })
})

export default withSentry(handler)
