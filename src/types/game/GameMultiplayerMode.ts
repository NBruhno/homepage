import type { GamePlatform } from './GamePlatform'

export type GameMultiplayerMode = {
	hasCampaignCoop: boolean | null,
	hasDropIn: boolean | null,
	hasLanCoop: boolean | null,
	hasOfflineCoop: boolean | null,
	hasOnlineCoop: boolean | null,
	hasOnlineSplitScreen: boolean | null,
	hasSplitScreen: boolean | null,
	offlineCoopMax: number | null,
	offlineMax: number | null,
	onlineCoopMax: number | null,
	onlineMax: number | null,
	platform: GamePlatform,
}
