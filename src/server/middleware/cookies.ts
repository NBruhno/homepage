import { serialize, parse } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'

import { config } from 'config.server'

export const setRefreshCookie = (res: NextApiResponse, token: string) => {
	const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
	const cookie = serialize(config.environment !== 'development' ? '__Host-refreshToken' : 'refreshToken', token, {
		sameSite: 'strict',
		secure: config.environment !== 'development',
		maxAge: 60 * 60 * 24 * 3,
		expires: new Date(expiration * 1000),
		httpOnly: true,
		path: '/',
	})

	res.setHeader('Set-Cookie', cookie)
}

export const removeRefreshCookie = (res: NextApiResponse) => {
	const cookie = serialize(config.environment !== 'development' ? '__Host-refreshToken' : 'refreshToken', '', {
		maxAge: -1,
		path: '/',
	})

	res.setHeader('Set-Cookie', cookie)
}

export const parseCookies = (req: NextApiRequest) => {
	if (req.cookies) return req.cookies

	const cookie = req.headers?.cookie
	return parse(cookie || '')
}

export const getRefreshCookie = (req: NextApiRequest) => {
	const cookies = parseCookies(req)
	return cookies[config.environment !== 'development' ? '__Host-refreshToken' : 'refreshToken']
}
