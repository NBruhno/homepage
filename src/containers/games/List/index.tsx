import { SimpleGame } from 'types/Games'

import { Item } from '../Item'

import { Container } from './Container'
import { Subtitle } from './Subtitle'

type Props = {
	games: Array<SimpleGame>,
	isLoading: boolean,
	undefinedMessage?: string,
	emptyMessage?: string,
}

export const GameList = ({
	isLoading, games,
	undefinedMessage = 'You can use the search field above to look for a game',
	emptyMessage = 'No games match the search criteria',
}: Props) => {
	if (isLoading) {
		return (
			<Container>
				{[{}, {}, {}, {}, {}, {}, {}].map((game: SimpleGame, index: number) => (
					<Item
						{...game}
						index={index}
						isLoading={isLoading}
						key={index}
					/>
				))}
			</Container>
		)
	}

	if (!games) {
		return (
			<Container>
				<Subtitle>{undefinedMessage}</Subtitle>
			</Container>
		)
	}

	if (games.length === 0) {
		return (
			<Container>
				{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
			</Container>
		)
	}

	return (
		<Container>
			{games.map(({ id, cover, name, releaseDate, status }, index: number) => (
				<Item
					id={id}
					cover={cover}
					name={name}
					releaseDate={releaseDate}
					status={status}
					index={index}
					isLoading={isLoading}
					key={id ?? index}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
