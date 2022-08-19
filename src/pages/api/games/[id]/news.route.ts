import type { SteamNews } from 'types/steam'

import { withSentry } from '@sentry/nextjs'
import { fromUnixTime } from 'date-fns'
import { create, object, string, coerce, optional, number, pattern } from 'superstruct'

import { apiHandler } from 'lib/api'
import type { statusCodes } from 'lib/errors'
import { ApiError } from 'lib/errors'
import { monitorAsync } from 'lib/sentryMonitor'

const newsMapper = (news: SteamNews['appnews']['newsitems']) => news.map(({ gid, title, url, contents, date, feedlabel: feedLabel, feedname: feedName }) => ({
	id: gid,
	url,
	title,
	description: contents,
	feedLabel,
	feedName,
	date: new Date(fromUnixTime(date)).toISOString(),
}))

const Query = object({
	id: string(),
	'steam-app-id': string(),
	take: optional(coerce(number(), pattern(string(), /[1-10]/), (value) => parseInt(value, 10))),
})

const handler = apiHandler({
	validMethods: ['GET'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/news`,
})
	.get(async (req, res) => {
		const { 'steam-app-id': appId, take = 5 } = create(req.query, Query)
		const news = await monitorAsync(() => fetch(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002?appid=${appId}&count=100&maxlength=300&format=json`, {
			method: 'GET',
		}), 'http:steam', 'game news').then(async (response) => {
			if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
			const steamNews = await response.json() as SteamNews
			return {
				newsUrl: `https://steamcommunity.com/games/${appId}/announcements`,
				steamNews: newsMapper(steamNews.appnews.newsitems.filter(({ feed_type: feedType, feedname }) => feedType === 0 || feedname === 'steam_community_announcements')).slice(0, take),
				otherNews: newsMapper(steamNews.appnews.newsitems.filter(({ feed_type: feedType, feedname }) => feedType === 1 && feedname !== 'steam_community_announcements')).slice(0, take),
			}
		})
		return res.status(200).json(news)
	})

export default withSentry(handler)
