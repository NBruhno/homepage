import { serialize, parse } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'

import { config } from 'config.server'

const isProduction = config.environment !== 'development'

export const setRefreshCookie = (res: NextApiResponse, token: string) => {
	const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)
	const cookie = serialize(isProduction ? '__Host-refreshToken' : 'refreshToken', token, {
		expires: new Date(expiration * 1000),
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 3,
		path: '/',
		sameSite: 'strict',
		secure: isProduction,
	})

	res.setHeader('Set-Cookie', cookie)
}

export const removeRefreshCookie = (res: NextApiResponse) => {
	const cookie = serialize(isProduction ? '__Host-refreshToken' : 'refreshToken', '', {
		httpOnly: true,
		maxAge: -1,
		path: '/',
		sameSite: 'strict',
		expires: new Date('1970'),
		secure: isProduction,
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
	return cookies[isProduction ? '__Host-refreshToken' : 'refreshToken']
}
