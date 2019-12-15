import { NextApiRequest, NextApiResponse } from 'next'

export default (_req?: NextApiRequest, res?: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json')
	res.status(200).json([
		{ title: 'Test 1' },
		{ title: 'Test 2' },
		{ title: 'Test 3' },
	])
}
