export type GameUserData = {
	isFollowing: boolean,
	isInSteamLibrary: boolean,
	/** In hours */
	timePlayed: number | null,
	/** In hours */
	timePlayedLastTwoWeeks: number | null,
	/** ISO date */
	lastPlayedAt: string | null,
}
