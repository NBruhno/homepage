import type { GameWebsite } from 'types'
import { GameWebsiteType } from 'types'

import isNaN from 'lodash/isNaN'

export const getSteamAppId = (websites: Array<GameWebsite> | null | undefined) => {
	if (!websites) return null
	const steamUrl = websites.find(({ type }) => type === GameWebsiteType.Steam)?.url
	if (!steamUrl) return null
	const steamUrlParts = steamUrl.split('/').reverse()
	return steamUrlParts.find((part) => part !== '/' && !isNaN(parseInt(part, 10))) ?? null
}
