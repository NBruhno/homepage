import { NextApiRequest, NextApiResponse } from 'next'

import initializeFirebaseAdmin, { serverTimestamp } from 'lib/firebaseServer'

export default (req?: NextApiRequest, res?: NextApiResponse) => {
	const firestore = initializeFirebaseAdmin()
	switch (req.method) {
		case 'GET': {
			res.setHeader('Content-Type', 'application/json')
			firestore.collection('test').get().then((snapshot) => {
				res.setHeader('Content-Type', 'application/json')
				res.status(200).json(snapshot.docs.map((doc) => doc.data()))
			}).catch((error) => {
				res.status(500).json(error)
				throw error
			})
			break
		}

		case 'POST': {
			const testRef = firestore.collection('test').doc()
			const test = {
				id: testRef.id,
				title: 'This is a test of creating',
				objectExample: {
					with: 'values',
					to: 'test',
					functionality: 1234,
				},
				createdAt: serverTimestamp,
				updatedAt: null,
			}

			testRef.set(test).then((result) => {
				res.setHeader('Content-Type', 'application/json')
				res.status(200).json(result)
			}).catch((error) => {
				res.status(500).json(error)
				throw error
			})
			break
		}
	}
}
