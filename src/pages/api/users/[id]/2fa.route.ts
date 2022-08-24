import { UserRole, UserTokenType } from 'types'

import { withSentry } from '@sentry/nextjs'
import { authenticator as otpAuthenticator } from 'otplib'
import { toDataURL as getQRCodeImage } from 'qrcode'
import { create, object, string } from 'superstruct'

import { apiHandler, getJwtToken, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { authenticate, setRefreshCookie } from 'lib/middleware'
import { monitor, monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	id: string(),
})

const handler = apiHandler({
	validMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/users/{userId}/2fa`,
})
	.get(async (req, res) => {
		const { userId: requestUserId, sub } = authenticate(req)
		const { id } = create(req.query, Query)
		if (requestUserId !== id) throw ApiError.fromCode(403)

		const twoFactorSecret = monitor(() => otpAuthenticator.generateSecret(32), 'otplib', 'generateSecret()')
		const qrCode = await getQRCodeImage(`otpauth://totp/${encodeURI(sub)}?secret=${twoFactorSecret}&issuer=Bruhno`, { type: 'image/webp' })

		return res.status(200).json({ twoFactorSecret, qrCode })
	})
	.post(async (req, res) => {
		const { otp } = create(req.body, object({ otp: string() }))
		const { id } = create(req.query, Query)
		const { sub, username, role, userId: requestUserId } = authenticate(req, { type: UserTokenType.Intermediate })
		if (requestUserId !== id) throw ApiError.fromCode(403)

		const user = await monitorAsync(() => prisma.user.findUnique({
			where: {
				id: requestUserId,
			},
			select: {
				twoFactorSecret: true,
			},
		}), 'db:prisma', 'findUnique()')

		if (!user?.twoFactorSecret) throw ApiError.fromCode(404)

		monitor(() => { // TS somehow fails to acknowledge that the check above ensures the value is not falsy (not null)
			if (!otpAuthenticator.verify({ token: otp, secret: user.twoFactorSecret! })) throw ApiError.fromCode(401)
		}, 'otplib', 'verify()')

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
		}, 'otplib', 'verify()')

		await monitorAsync(() => prisma.user.update({
			where: {
				id,
			},
			data: {
				twoFactorSecret: secret,
			},
		}), 'db:prisma', 'update()')

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
		}), 'db:prisma', 'update()')

		return res.status(200).json({ message: '2FA has been removed' })
	})

export default withSentry(handler)
