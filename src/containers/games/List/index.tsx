import type { GameSimple } from 'types'

import { Item } from '../Item'

import { Container } from './Container'
import { Subtitle } from './Subtitle'

type Props = {
	games: Array<GameSimple> | null,
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
				{[{}, {}, {}, {}, {}, {}, {}].map((_, index: number) => (
					<Item
						id={index}
						cover={null}
						name=''
						releaseDate={null}
						status={null}
						index={index}
						isLoading
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
				<Subtitle>{emptyMessage}</Subtitle>
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
					key={id}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
