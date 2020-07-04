export const useless = () => 1

// import { NextApiRequest, NextApiResponse } from 'next'

// import { firestore, serverTimestamp, auth } from 'server/firebaseAdmin'
// import { Permissions } from 'types/Permissions'

// type User = {
// 	createdAt: FirebaseFirestore.FieldValue,
// 	displayName: string,
// 	email: string,
// 	emailVerified: boolean,
// 	permissions: [Permissions] | [],
// 	uid: string,
// 	updatedAt: FirebaseFirestore.FieldValue,
// }

// export default (req?: NextApiRequest, res?: NextApiResponse) => new Promise((resolve) => {
// 	switch (req.method) {
// 		case 'GET': {
// 			res.setHeader('Content-Type', 'application/json')
// 			firestore.collection('test').get().then((snapshot) => {
// 				res.setHeader('Content-Type', 'application/json')
// 				res.status(200).json(snapshot.docs.map((doc) => doc.data()))
// 			})
// 				.catch((error) => {
// 					res.status(500).json(error)
// 					console.error(error)
// 					return resolve()
// 				})
// 			break
// 		}

// 		case 'POST': {
// 			const [type, token] = req.headers.authorization.split(' ')

// 			if (!type || !token) {
// 				res.status(401)
// 				return resolve()
// 			}

// 			if (!req.body && req.body.uid && req.body.email && req.body.displayName) {
// 				res.status(400)
// 				return resolve()
// 			}

// 			auth.verifyIdToken(token, true).then(() => {
// 				const userRef = firestore.collection('users').doc(req.body.uid)
// 				const user: User = {
// 					createdAt: serverTimestamp,
// 					displayName: req.body.displayName,
// 					email: req.body.email,
// 					emailVerified: false,
// 					permissions: [],
// 					uid: userRef.id,
// 					updatedAt: serverTimestamp,
// 				}

// 				userRef.set(user).then((result) => {
// 					res.setHeader('Content-Type', 'application/json')
// 					res.status(200).json(result)
// 					resolve()
// 				}).catch((error) => {
// 					auth.deleteUser(req.body.uid).then(() => {
// 						res.status(500).json(error)
// 						console.error(error)
// 						return resolve()
// 					}).catch(() => {
// 						res.status(500).json(error)
// 						console.error(error)
// 						return resolve()
// 					})
// 				})
// 			}).catch((error) => {
// 				res.status(401).json(error)
// 				console.error(error)
// 				return resolve()
// 			})
// 			break
// 		}

// 		default: {
// 			res.status(405).end()
// 			return resolve()
// 		}
// 	}
// })
