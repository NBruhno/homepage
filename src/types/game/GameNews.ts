import type { GameNewsItem } from './GameNewsItem'

export type GameNews = {
	newsUrl: string,
	steamNews: Array<GameNewsItem>,
	otherNews: Array<GameNewsItem>,
}
