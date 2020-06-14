import { NextApiRequest, NextApiResponse } from 'next'

import { firestore, serverTimestamp, auth } from 'server/firebaseAdmin'

export default (req?: NextApiRequest, res?: NextApiResponse) => new Promise((resolve) => {
	const { method, query: { id } } = req
	switch (method) {
		case 'GET': {
			firestore.collection('tests').doc(id.toString()).get()
				.then((result) => {
					res.setHeader('Content-Type', 'application/json')
					res.status(200).json(result)
					return resolve()
				})
				.catch((error) => {
					res.status(500).json(error)
					console.error(error)
					return resolve()
				})
			break
		}
		case 'PUT': {
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
				firestore.collection('tests').doc(id.toString()).update({
					...req.body,
					updatedAt: serverTimestamp,
				})
					.then((result) => {
						res.setHeader('Content-Type', 'application/json')
						res.status(200).json(result)
						return resolve()
					})
					.catch((error) => {
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
		case 'DELETE': {
			const [type, token] = req.headers.authorization.split(' ')

			if (!type || !token) {
				res.status(401)
				return resolve()
			}

			auth.verifyIdToken(token, true).then(() => {
				firestore.collection('tests').doc(id.toString()).delete()
					.then((result) => {
						res.setHeader('Content-Type', 'application/json')
						res.status(200).json(result)
						return resolve()
					})
					.catch((error) => {
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
