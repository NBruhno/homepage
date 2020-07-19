import { Item } from '../Item'

type Props = {
	games: Array<Record<string, any>>,
	error: string,

	onFollow: (id: string) => Promise<any>,
	onUnfollow: (id: string) => Promise<any>,
}

export const GameList = ({ games, onFollow, onUnfollow, error }: Props) => {
	const isLoading = !games
	const gamesToRender = !isLoading && !error ? games : [{}, {}, {}, {}, {}, {}, {}]

	return (
		<>
			{gamesToRender.map((game: any, index: number) => (
				<Item
					isLoading={isLoading}
					key={game?.id ?? index}
					index={index}
					onFollow={onFollow}
					onUnfollow={onUnfollow}
					{...game}
				/>
			))}
			{!isLoading && games.length === 0 && (<p>No games match the search critera</p>)}
		</>
	)
}
