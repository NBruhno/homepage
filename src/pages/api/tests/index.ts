import { NextApiRequest, NextApiResponse } from 'next'

import { firestore, serverTimestamp, auth } from 'server/firebaseAdmin'

export default (req?: NextApiRequest, res?: NextApiResponse) => new Promise((resolve) => {
	switch (req.method) {
		case 'GET': {
			res.setHeader('Content-Type', 'application/json')
			firestore.collection('tests').get().then((snapshot) => {
				res.setHeader('Content-Type', 'application/json')
				res.status(200).json(snapshot.docs.map((doc) => doc.data()))
			})
				.catch((error) => {
					res.status(500).json(error)
					console.error(error)
					return resolve()
				})
			break
		}

		case 'POST': {
			const [type, token] = req.headers.authorization.split(' ')

			if (!type || !token) {
				res.status(401)
				return resolve()
			}

			if (!req.body) {
				res.status(400)
				return resolve()
			}

			auth.verifyIdToken(token, true).then(() => {
				const testRef = firestore.collection('tests').doc()
				const test = {
					id: testRef.id,
					createdAt: serverTimestamp,
					updatedAt: serverTimestamp,
					...req.body,
				}

				testRef.set(test).then((result) => {
					res.setHeader('Content-Type', 'application/json')
					res.status(200).json(result)
					resolve()
				}).catch((error) => {
					res.status(500).json(error)
					console.error(error)
					return resolve()
				})
			}).catch((error) => {
				res.status(401).json(error)
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
