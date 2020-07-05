import { NextApiRequest, NextApiResponse } from 'next'

export const defaultApi = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'POST': {
			break
		}

		default: res.status(405).end()
	}
}
