import type { Span } from '@sentry/types'
import type { InstantGamingGame } from 'types/instantGaming/InstantGamingGame'

import { config } from 'config.server'

import { monitorAsync } from 'lib/sentryMonitor'

type Options = {
	nickname?: string
	span?: Span
}

export const instantGamingFetcher = async (
	gameTitle: string,
	{ span, nickname }: Options = {},
): Promise<{ hits: Array<InstantGamingGame> }> => {
	const data = await monitorAsync(
		() =>
			fetch(config.instantGaming.queryUrl, {
				method: 'POST',
				body: `{"params":"query=${gameTitle}&hitsPerPage=60&filters=(sites%3Aig)%20AND%20(region%3AWorldwide%20OR%20region%3A%22DK%22%20OR%20region%3A%22Europe%22%20OR%20region%3A%22Europe%20%26%20MEA%20%26%20Africa%22%20OR%20region%3A%22Europe%20%26%20US%20%26%20Canada%22%20OR%20region%3A%22Europe%20%26%20UK%22)"}`,
				headers: new Headers({
					'content-type': 'application/x-www-form-urlencoded',
					// biome-ignore lint/style/useNamingConvention: Required to be uppercase for the API
					Referer: 'https://www.instant-gaming.com/',
					accept: 'application/json',
				}),
			}),
		'http:instant-gaming',
		nickname ?? '',
		span,
	)

	return data.json() as unknown as { hits: Array<InstantGamingGame> }
}
