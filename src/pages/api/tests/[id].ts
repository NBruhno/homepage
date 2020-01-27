import { NextApiRequest, NextApiResponse } from 'next'

import initializeFirebaseAdmin, { serverTimestamp } from 'lib/firebaseServer'

export default (req?: NextApiRequest, res?: NextApiResponse) => {
	const firestore = initializeFirebaseAdmin()
	const { method, query: { id } } = req
	switch (method) {
		case 'PUT': {
			firestore.collection('test').doc(id.toString()).update({
				title: 'testing update',
				updatedAt: serverTimestamp,
			})
				.then((result) => {
					res.setHeader('Content-Type', 'application/json')
					res.status(200).json(result)
				})
				.catch((error) => {
					res.status(500).json(error)
					throw error
				})
			break
		}
	}
}
