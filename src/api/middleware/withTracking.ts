import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextHandler } from 'next-connect'

import { updateTransaction } from 'api/utils'

type Props = {
	name?: ((req: NextApiRequest) => string) | undefined,
}

export const withTracking = ({ name }: Props) => (req: NextApiRequest, _res: NextApiResponse, next: NextHandler) => {
	if (name) {
		updateTransaction({ name: name(req) })
	}
	next()
}
