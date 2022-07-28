import type { IncomingMessage, ServerResponse } from 'http'
import type { NextApiHandler } from 'next'

import { createServer } from 'http'

import { apiResolver } from 'next/dist/server/api-utils/node'

export const createTestServer = (handler: NextApiHandler, query?: Record<string, any>) => {
	const requestHandler = (req: IncomingMessage, res: ServerResponse) => apiResolver(
		req,
		res,
		query,
		handler,
		{ previewModeEncryptionKey: '', previewModeId: '', previewModeSigningKey: '' },
		true,
	)
	const server = createServer(requestHandler)

	return server
}
