import type { GameSimple, GameSimpleExtended } from 'types'

import { Container } from '../Common/Container'
import { Item } from '../Common/Item'
import { Subtitle } from '../Common/Subtitle'

const emptyMessage = 'Could not find any popular games at the moment'

type Props = {
	games: Array<GameSimple | GameSimpleExtended>,
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
					coverProps={null}
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
