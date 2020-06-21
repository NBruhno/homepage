import { Item } from '../Item'

type Props = {
	games: Array<Record<string, any>>,
	error: string,
}

export const GameList = ({ games, error }: Props) => {
	const isLoading = !games
	const gamesToRender = !isLoading && !error ? games : [{}, {}, {}, {}, {}, {}, {}]

	return (
		<>
			{gamesToRender.map((game: any, index: number) => (
				<Item
					isLoading={isLoading}
					key={game?.id ?? index}
					index={index}
					{...game}
				/>
			))}
			{!isLoading && games.length === 0 && (<p>No games match the search critera</p>)}
		</>
	)
}
