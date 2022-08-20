/* eslint-disable @typescript-eslint/naming-convention */
export type SteamOwnedGames = {
	response: {
		game_count: number,
		games: Array<{
			appid: number,
			playtime_forever: number,
			playtime_windows_forever: number,
			playtime_mac_forever: number,
			playtime_linux_forever: number,
		}>,
	},
}
