// This is an external API type
/* eslint-disable @typescript-eslint/naming-convention */
import type { IgdbPlatform } from './platform'

export type IgdbMultiplayerMode = {
	id: number,
	/** True if the game supports campaign coop */
	campaigncoop: boolean,
	/** True if the game supports drop in/out multiplayer */
	dropin: boolean,
	/** True if the game supports LAN coop */
	lancoop: boolean,
	/** True if the game supports offline coop */
	offlinecoop: boolean,
	/** Maximum number of offline players in offline coop */
	offlinecoopmax: number,
	/** Maximum number of players in offline multiplayer */
	offlinemax: number | null,
	/** True if the game supports online coop */
	onlinecoop: boolean,
	/** Maximum number of online players in online coop */
	onlinecoopmax: number | null,
	/** Maximum number of players in online multiplayer */
	onlinemax: number | null,
	/** True if the game supports split screen, offline multiplayer */
	splitscreen: boolean,
	/** True if the game supports split screen, online multiplayer */
	splitscreenonline: boolean,
	platform: IgdbPlatform | null,
}
