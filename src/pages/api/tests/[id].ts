import { NextApiRequest, NextApiResponse } from 'next'

import initializeFirebaseAdmin, { serverTimestamp } from 'lib/firebaseServer'

export default (req?: NextApiRequest, res?: NextApiResponse) => {
	const { firestore } = initializeFirebaseAdmin()
	return new Promise((resolve) => {
		const { method, query: { id } } = req
		switch (method) {
			case 'PUT': {
				firestore().collection('test').doc(id.toString()).update({
					title: 'testing update',
					updatedAt: serverTimestamp,
				})
					.then((result) => {
						res.setHeader('Content-Type', 'application/json')
						res.status(200).json(result)
						resolve()
					})
					.catch((error) => {
						res.status(500).json(error)
						console.error(error)
						return resolve()
					})
				break
			}

			default: {
				res.status(405).end()
				return resolve()
			}
		}
	})
}
