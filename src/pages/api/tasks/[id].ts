import { NextApiRequest, NextApiResponse } from 'next'

import initializeFirebaseAdmin, { serverTimestamp } from 'lib/firebaseServer'

export default (req?: NextApiRequest, res?: NextApiResponse) => {
	const { firestore } = initializeFirebaseAdmin()
	const { method, query: { id }, body } = req
	switch (method) {
		case 'PUT': {
			firestore().collection('tasks').doc(id.toString()).update({
				...body,
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
