import { serialize, parse } from 'cookie'
import { NextApiResponse, NextApiRequest } from 'next'

import { config } from 'config.server'

const maxAge = 60 * 60

export const setRefreshCookie = (res: NextApiResponse, token: string) => {
	const cookie = serialize('refreshToken', token, {
		sameSite: 'strict',
		secure: config.environment !== 'development',
		maxAge,
		expires: new Date(Date.now() + (maxAge * 1000)),
		httpOnly: true,
		path: '/',
	})

	res.setHeader('Set-Cookie', cookie)
}

export const removeRefreshCookie = (res: NextApiResponse) => {
	const cookie = serialize('refreshToken', '', {
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
	return cookies['refreshToken']
}
