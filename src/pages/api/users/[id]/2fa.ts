import { UserRole, UserTokenType } from 'types'

import { withSentry } from '@sentry/nextjs'
import { authenticator as otpAuthenticator } from 'otplib'
import { toDataURL as getQRCodeImage } from 'qrcode'
import { create, object, string } from 'superstruct'

import { monitorReturn, monitor, monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { authenticate, setRefreshCookie } from 'api/middleware'
import { apiHandler, getJwtToken, prisma } from 'api/utils'

const Query = object({
	id: string(),
})

const handler = apiHandler({
	validMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method!} api/users/{userId}/2fa`,
})
	.get(async (req, res) => {
		const { userId: requestUserId, sub } = authenticate(req)
		const { id } = create(req.query, Query)
		if (requestUserId !== id) throw ApiError.fromCode(403)

		const twoFactorSecret = monitorReturn(() => otpAuthenticator.generateSecret(32), 'otplib - generateSecret()')
		const qrCode = await getQRCodeImage(`otpauth://totp/${encodeURI(sub)}?secret=${twoFactorSecret}&issuer=Bruhno`, { type: 'image/webp' })

		return res.status(200).json({ twoFactorSecret, qrCode })
	})
	.post(async (req, res) => {
		const { otp } = create(req.body, object({ otp: string() }))
		const { id } = create(req.query, Query)
		const { sub, username, role, userId: requestUserId } = authenticate(req, { type: UserTokenType.Intermediate })
		if (requestUserId !== id) throw ApiError.fromCode(403)

		const user = await monitorReturnAsync(() => prisma.user.findUnique({
			where: {
				id: requestUserId,
			},
			select: {
				twoFactorSecret: true,
			},
		}), 'prisma - findUnique()')

		if (!user || !user.twoFactorSecret) throw ApiError.fromCode(404)

		monitor(() => { // TS somehow fails to acknowledge that the check above ensures the value is not falsy (not null)
			if (!otpAuthenticator.verify({ token: otp, secret: user.twoFactorSecret! })) throw ApiError.fromCode(401)
		}, 'otplib - verify()')

		const accessToken = getJwtToken({ sub, username, role, userId: requestUserId })
		const refreshToken = getJwtToken({ sub, username, role, userId: requestUserId }, { type: UserTokenType.Refresh })

		setRefreshCookie(res, refreshToken)
		return res.status(200).json({ accessToken })
	})
	.patch(async (req, res) => {
		const { secret, otp } = create(req.body, object({
			otp: string(),
			secret: string(),
		}))
		const { userId: requestUserId } = authenticate(req)
		const { id } = create(req.query, Query)
		if (requestUserId !== id) throw ApiError.fromCode(403)

		monitor(() => {
			if (!otpAuthenticator.verify({ token: otp, secret })) throw ApiError.fromCode(401)
		}, 'otplib - verify()')

		await monitorAsync(() => prisma.user.update({
			where: {
				id,
			},
			data: {
				twoFactorSecret: secret,
			},
		}), 'prisma - update()')

		return res.status(200).json({ message: '2FA has been activated' })
	})
	.delete(async (req, res) => {
		const { id } = create(req.query, Query)
		const { userId: requestUserId, role } = authenticate(req)
		if (requestUserId !== id && role !== UserRole.Admin) throw ApiError.fromCode(403)

		await monitorAsync(() => prisma.user.update({
			where: {
				id,
			},
			data: {
				twoFactorSecret: null,
			},
		}), 'prisma - update()')

		return res.status(200).json({ message: '2FA has been removed' })
	})

export default withSentry(handler)
