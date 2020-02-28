import { NextApiRequest, NextApiResponse } from 'next'

import initializeFirebaseAdmin, { serverTimestamp } from 'lib/firebaseServer'

export default (req?: NextApiRequest, res?: NextApiResponse) => {
	const { firestore } = initializeFirebaseAdmin()
	switch (req.method) {
		case 'GET': {
			res.setHeader('Content-Type', 'application/json')
			firestore().collection('tasks').get().then((snapshot) => {
				res.setHeader('Content-Type', 'application/json')
				res.status(200).json(snapshot.docs.map((doc) => doc.data()))
			})
				.catch((error) => {
					res.status(500).json(error)
					throw error
				})
			break
		}

		case 'POST': {
			const tasksRef = firestore().collection('tasks').doc()
			const task = {
				id: tasksRef.id,
				title: 'This is a tasks of creating',
				objectExample: {
					with: 'values',
					to: 'tasks',
					functionality: 1234,
				},
				createdAt: serverTimestamp,
				updatedAt: null,
			}

			tasksRef.set(task).then((result) => {
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
