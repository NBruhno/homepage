/* eslint-disable @typescript-eslint/naming-convention */

export type SteamOwnedGames = {
	response: {
		/** Number of games owned */
		game_count: number,
		games: Array<{
			appid: number,
			/** In minutes */
			playtime_2weeks: number | undefined,
			/** In minutes */
			playtime_forever: number,
			/** In minutes */
			playtime_windows_forever: number,
			/** In minutes */
			playtime_mac_forever: number,
			/** In minutes */
			playtime_linux_forever: number,
			/** Last played in milliseconds date, un-padded */
			rtime_last_played: number,
			/** In minutes */
			playtime_disconnected: number,
		}>,
	},
}
