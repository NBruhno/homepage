/* eslint-disable @typescript-eslint/naming-convention */
export type SteamNews = {
	appnews: {
		appid: number,
		newsitems: Array<{
			gid: string,
			title: string,
			url: string,
			is_external_url: boolean,
			author: string,
			contents: string,
			feedlabel: string,
			date: number,
			feedname: string | 'steam_community_announcements',
			feed_type: 0 | 1,
			appid: number,
		}>,
		count: number,
	},
}
