import type { GameSimpleExtended } from 'types'

import { Container } from '../Common/Container'
import { Item } from '../Common/Item'
import { Subtitle } from '../Common/Subtitle'

const emptyMessage = 'Could not find any popular games at the moment'

type Props = {
	games: Array<GameSimpleExtended>,
}

export const Popular = ({ games }: Props) => {
	// if (isLoading) {
	// 	return (
	// 		<Container>
	// 			{Array.from(Array(15)).map((_, index: number) => (
	// 				<Item
	// 					id={index}
	// 					cover={null}
	// 					coverProps={null}
	// 					name=''
	// 					releaseDate={null}
	// 					status={null}
	// 					index={index}
	// 					isPriority={index <= 10}
	// 					isLoading
	// 					key={index}
	// 				/>
	// 			))}
	// 		</Container>
	// 	)
	// }

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
					key={id}
				/>
			))}
			{games.length === 0 && (<Subtitle>{emptyMessage}</Subtitle>)}
		</Container>
	)
}
