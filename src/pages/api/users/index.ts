import { withSentry } from '@sentry/nextjs'

import { withTracking } from 'api/middleware'
import { users } from 'api/users'

const handler = withTracking(async (req, res, transaction) => {
	res.setHeader('Cache-Control', 'no-cache')
	return users(req, res, { transaction })
})

export default withSentry(handler)
