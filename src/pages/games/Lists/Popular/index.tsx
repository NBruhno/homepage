import type { GameSimple } from 'types'

import { Container } from '../Common/Container'
import { Item } from '../Common/Item'
import { Subtitle } from '../Common/Subtitle'

const emptyMessage = 'Could not find any popular games at the moment'

type Props = {
	games: Array<GameSimple>,
	isLoading: boolean,
}

export const Popular = ({ games, isLoading }: Props) => {
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
					isPriority={index <= 10}
					isLoading={isLoading}
					key={id}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
