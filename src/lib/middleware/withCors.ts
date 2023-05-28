import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextHandler } from 'next-connect'

const defaultName = 'Access-Control-Allow'

type Props = {
	methods: Array<'DELETE' | 'GET' | 'METHOD' | 'PATCH' | 'POST' | 'PUT'>,
}

/** A `Access-Control-Allow-*` header middleware for setting up CORS rules for security. */
export const withCors = ({ methods }: Props) => (
	(req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
		res.setHeader(`${defaultName}-Origin`, req.headers.origin ?? '*')
		res.setHeader(`${defaultName}-Headers`, '*')
		res.setHeader(`${defaultName}-Credentials`, 'true')
		res.setHeader(`${defaultName}-Methods`, [...methods, 'OPTIONS'])
		next()
	}
)
