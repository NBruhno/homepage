import { query } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'

import { generateAccessToken, generateRefreshToken } from 'server/generateTokens'
import { authenticateRefreshToken } from 'server/authenticateRefreshToken'
import { authenticateAccessToken } from 'server/authenticateAccessToken'
import { setRefreshCookie, removeRefreshCookie } from 'server/cookies'
import { serverClient, faunaClient } from 'server/faunaClient'

const login = async (req?: NextApiRequest, res?: NextApiResponse) => {
	const { method, cookies, body: { email, password } } = req

	switch (method) {
		// Login
		case 'POST': {
			try {
				if (!email || !password) {
					res.status(400).json('Please provide both an email and a password')
					break
				}

				const loginRes: { secret: string } = await serverClient.query(
					query.Login(query.Match(query.Index('users_by_email'), email), {
						password,
					}),
				)

				if (!loginRes.secret) {
					res.status(401).end('Failed to login with the provided email and/or password')
					break
				}

				const { id }: { id: string } = await faunaClient(loginRes.secret).query(query.Identity())

				const accessToken = generateAccessToken(loginRes.secret, { email, sub: id })
				const refreshToken = generateRefreshToken(loginRes.secret, { email, sub: id })

				setRefreshCookie(res, refreshToken)

				res.setHeader('Content-Type', 'text/plain')
				res.status(200).send(accessToken)
			} catch (error) {
				res.status(500).json(error)
				throw new Error(error)
			}
			break
		}

		// Sign up
		case 'PUT': {
			try {
				if (!email || !password) {
					res.status(400).json('Please provide both email and password')
					break
				}

				const user: Record<string, any> = await serverClient.query(
					query.Create(query.Collection('users'), {
						credentials: { password },
						data: { email },
					}),
				)

				if (!user.ref) {
					res.status(401).end('Failed to sign up with the provided email and/or password')
					break
				}

				const loginRes: { secret: string } = await serverClient.query(
					query.Login(user.ref, {
						password,
					}),
				)

				if (!loginRes.secret) {
					res.status(401).end('Failed to sign up with the provided email and/or password')
					break
				}

				const accessToken = generateAccessToken(loginRes.secret, { sub: user.ref.id, email })
				const refreshToken = generateRefreshToken(loginRes.secret, { sub: user.ref.id, email })

				setRefreshCookie(res, refreshToken)

				res.setHeader('Content-Type', 'text/plain')
				res.status(200).send(accessToken)
			} catch (error) {
				res.status(500).json(error)
				throw new Error(error)
			}
			break
		}

		// Re-authenticate with refresh token
		case 'GET': {
			try {
				if (!cookies.refreshToken) {
					res.status(400).end('Invalid token.')
					break
				}

				const token: Record<string, any> = await authenticateRefreshToken(req, res, cookies.refreshToken)

				const accessToken = generateAccessToken(token.secret, { email: token.email, sub: token.id })
				const refreshToken = generateRefreshToken(token.secret, { email: token.email, sub: token.id })

				setRefreshCookie(res, refreshToken)

				res.setHeader('Content-Type', 'text/plain')
				res.status(200).send(accessToken)
			} catch (error) {
				res.status(500).json(error)
				throw new Error(error)
			}
			break
		}

		// Logout
		case 'DELETE': {
			try {
				const token = await authenticateAccessToken(req, res)
				if (!token.secret) {
					res.status(200).end()
					break
				}

				await faunaClient(token.secret).query(query.Logout(false))

				removeRefreshCookie(res)

				res.setHeader('Content-Type', 'text/plain')
				res.status(200).end()
			} catch (error) {
				res.status(500).json(error)
				throw new Error(error)
			}
			break
		}

		default: {
			res.status(405).end()
		}
	}
}

export default login
